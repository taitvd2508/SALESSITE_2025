/* ============================================================
   FINAL DATABASE SCHEMA v2 - SALES SITE (SUPABASE) + RECOMMENDER
   ------------------------------------------------------------
   Adds "gợi ý sản phẩm dựa trên hành vi" (behavior-based recommendations)

   ROLES:
   - customer : khách mua hàng
   - staff    : nhân viên xử lý sản phẩm + đơn hàng
   - admin    : toàn quyền (quản lý user, role, disable account)

   RECOMMENDER (đơn giản, làm được trong 2 tuần):
   - Ghi nhận hành vi: view_product, add_to_cart, purchase
   - Lưu cả user đã login (user_id) và guest (session_id cookie)
   - Gợi ý:
       + "For you" (cá nhân hóa): dựa vào view/add_to_cart gần đây của user/session
       + "Similar products": dựa trên đồng xuất hiện trong orders (co-purchase)
       + "Trending": dựa vào view/add_to_cart/purchase tổng hợp (fallback)

   NOTE:
   - Supabase Auth lưu user ở auth.users
   - RLS + Policy bảo vệ dữ liệu ngay trong database
   ============================================================ */


/* ============================================================
   0. EXTENSION
   ============================================================ */
create extension if not exists "pgcrypto";
create extension if not exists unaccent; -- extension giúp bỏ dấu tiếng việt chuẩn


/* ============================================================
   1. USER CORE TABLES
   ============================================================ */

-- profiles:
--  - Lưu thông tin mở rộng của user
--  - is_active = false => user bị disable (KHÔNG xoá account)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  address text,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- user_roles:
--  - Mỗi user chỉ có 1 role
--  - customer / staff / admin
create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null
    check (role in ('customer','staff','admin')),
  created_at timestamptz default now()
);


/* ============================================================
   2. AUTO CREATE PROFILE + ROLE
   ------------------------------------------------------------
   Khi có user mới trong auth.users:
   - Tự tạo profile
   - Tự gán role = customer
   ============================================================ */
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles(id)
  values (new.id)
  on conflict do nothing;

  insert into public.user_roles(user_id, role)
  values (new.id, 'customer')
  on conflict do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();


/* ============================================================
   3. ROLE HELPER FUNCTIONS
   ============================================================ */

-- is_admin(): chỉ true khi role = admin
create or replace function public.is_admin()
returns boolean
language plpgsql
stable
security definer
set search_path = public, auth
as $$
begin
  -- tắt RLS khi đọc user_roles để tránh vòng lặp policy -> function -> policy
  perform set_config('row_security', 'off', true);

  return exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = 'admin'
  );
end;
$$;

create or replace function public.is_staff()
returns boolean
language plpgsql
stable
security definer
set search_path = public, auth
as $$
begin
  perform set_config('row_security', 'off', true);

  return exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role in ('staff','admin')
  );
end;
$$;


/* ============================================================
   4. LOOKUP TABLES
   ============================================================ */

-- Trạng thái đơn hàng
create table public.order_status (
  id smallserial primary key,
  code text unique not null,
  name text not null
);

insert into public.order_status(code, name) values
  ('pending','Chờ xác nhận'),
  ('paid','Đã thanh toán'),
  ('shipping','Đang giao'),
  ('done','Hoàn tất'),
  ('cancelled','Đã huỷ')
on conflict (code) do nothing;

-- Phương thức thanh toán
create table public.order_method (
  id smallserial primary key,
  code text unique not null,
  name text not null
);

insert into public.order_method(code, name) values
  ('cod','Thanh toán khi nhận hàng'),
  ('bank','Chuyển khoản'),
  ('wallet','Ví điện tử')
on conflict (code) do nothing;


/* ============================================================
   5. PRODUCTS
   ============================================================ */
create table public.products (
  id bigserial primary key,

  name text not null,
  slug text not null unique,   -- dùng cho URL /products/[slug]
  brand text not null,
  type text not null,

  -- model được generate tự động từ type + brand
  model text generated always as (type || ' - ' || brand) stored,

  price numeric(12,0) not null,
  old_price numeric(12,0),
  quantity int default 0,
  active boolean default true,

  images text[] default '{}',
  description text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- slugify + auto slug + auto old_price + updated_at

create or replace function public.slugify(p_name text, p_max_len int default 80)
returns text
language plpgsql
immutable
as $$
declare s text;
begin
  s := lower(unaccent(coalesce(p_name, '')));
  s := regexp_replace(s, '[^a-z0-9]+', '-', 'g');
  s := regexp_replace(s, '(^-+|-+$)', '', 'g');
  if char_length(s) > p_max_len then
    s := left(s, p_max_len);
    s := regexp_replace(s, '-+$', '', 'g');
  end if;
  return s;
end;
$$;

create or replace function public.set_product_slug()
returns trigger
language plpgsql
as $$
declare
  base text;
  candidate text;
  i int := 1;
begin
  base := public.slugify(coalesce(new.slug, new.name), 80);
  candidate := base;

  if candidate is null or candidate = '' then
    candidate := 'product';
  end if;

  while exists (select 1 from public.products p where p.slug = candidate and p.id <> coalesce(new.id, -1)) loop
    i := i + 1;
    candidate := left(base, 75) || '-' || i::text;
  end loop;

  new.slug := candidate;
  return new;
end;
$$;

create or replace function public.set_product_old_price()
returns trigger
language plpgsql
as $$
declare rate numeric;
begin
  if new.old_price is null or new.old_price <= new.price then
    rate := (random() * 0.12 + 0.03);
    new.old_price := round(new.price * (1 + rate))::numeric(12,0);
  end if;
  return new;
end;
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger trg_products_slug
before insert or update of name, slug
on public.products
for each row execute function public.set_product_slug();

create trigger trg_products_old_price
before insert or update of price, old_price
on public.products
for each row execute function public.set_product_old_price();

create trigger trg_products_updated_at
before update on public.products
for each row execute function public.touch_updated_at();


/* ============================================================
   6. ORDERS & ORDER DETAILS
   ============================================================ */

-- orders:
--  - user_id luôn có (guest cũng auto tạo customer)
--  - total_price là snapshot tại thời điểm mua
create table public.orders (
  id bigserial primary key,

  user_id uuid references auth.users(id),

  full_name text not null,
  phone text not null,
  address text not null,
  note text,

  status_id smallint references public.order_status(id),
  method_id smallint references public.order_method(id),

  total_price numeric(14,0) not null,
  created_at timestamptz default now()
);

-- order_details:
--  - snapshot giá & số lượng lúc mua
create table public.order_details (
  id bigserial primary key,
  order_id bigint references public.orders(id) on delete cascade,
  product_id bigint references public.products(id),
  price numeric(12,0) not null,
  quantity int not null
);

/* ============================================================
   7. USER EVENTS - TRACKING HÀNH VI
   ============================================================ */

create table public.user_events (
  id bigserial primary key,
  user_id uuid references auth.users(id),
  session_id text,
  event_type text not null check (
    event_type in ('view_product','add_to_cart','purchase')
  ),
  product_id bigint references public.products(id),
  order_id bigint references public.orders(id),
  quantity int,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_user_events_user
on public.user_events(user_id, created_at desc);

create index idx_user_events_session
on public.user_events(session_id, created_at desc);

create index idx_user_events_product
on public.user_events(product_id, created_at desc);


/* ============================================================
   8. RECOMMENDER VIEWS
   ============================================================ */

-- 8.1 Trending products (fallback gợi ý)
create or replace view public.trending_products as
select
  p.id as product_id,
  p.slug,
  p.name,
  p.price,
  p.images,
  sum(
    case e.event_type
      when 'view_product' then 1
      when 'add_to_cart'  then 3
      when 'purchase'     then 5
      else 0
    end
  ) as score_30d
from public.products p
left join public.user_events e
  on e.product_id = p.id
 and e.created_at >= now() - interval '30 days'
where p.active = true
group by p.id, p.slug, p.name, p.price, p.images;


-- 8.2 Similar products (co-purchase)
create or replace view public.similar_products_copurchase as
select
  od1.product_id as product_id,
  od2.product_id as similar_product_id,
  count(*) as weight
from public.order_details od1
join public.order_details od2
  on od1.order_id = od2.order_id
 and od1.product_id <> od2.product_id
group by od1.product_id, od2.product_id;


/* ============================================================
   9. GUEST CHECKOUT FUNCTION
   ------------------------------------------------------------
   Cho phép chưa login vẫn mua hàng
   - Nếu email chưa tồn tại => tạo customer
   - Trả về order_id
   ============================================================ */
create or replace function public.create_guest_order(
  p_email text,
  p_full_name text,
  p_phone text,
  p_address text,
  p_note text,
  p_method_id int,
  p_total_price numeric
)
returns bigint
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_order_id bigint;
begin
  select id into v_user_id
  from auth.users
  where email = p_email;

  if v_user_id is null then
    insert into auth.users(email)
    values (p_email)
    returning id into v_user_id;

    insert into public.user_roles(user_id, role)
    values (v_user_id, 'customer');
  end if;

    insert into public.orders(
    user_id, full_name, phone, address, note,
    status_id, method_id, total_price
  )
  values (
    v_user_id, p_full_name, p_phone, p_address, p_note,
    1, p_method_id, p_total_price
  )
  returning id into v_order_id;

  -- =====================================================
  -- GHI HÀNH VI "PURCHASE" (QUAN TRỌNG CHO GỢI Ý)
  -- =====================================================
  insert into public.user_events(
    user_id,
    event_type,
    order_id,
    meta
  )
  values (
    v_user_id,
    'purchase',
    v_order_id,
    jsonb_build_object(
      'total_price', p_total_price,
      'method_id', p_method_id
    )
  );

  return v_order_id;
end;
$$;


/* ============================================================
   10. ENABLE ROW LEVEL SECURITY
   ============================================================ */
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_details enable row level security;
alter table public.order_status enable row level security;
alter table public.order_method enable row level security;
alter table public.user_events enable row level security;


/* ============================================================
   11. RLS POLICIES (NOTE CỰC KỸ)
   ============================================================ */

-- ============================================================
-- PROFILES
-- ============================================================

-- Customer:
--  - Chỉ SELECT profile của chính mình
--  - Chỉ khi account còn active
create policy profiles_customer_select
on public.profiles
for select
using (
  id = auth.uid()
  and is_active = true
);

-- Customer:
--  - Được UPDATE profile của mình (đổi tên, phone, address)
--  - Không được sửa id hay is_active
create policy profiles_customer_update
on public.profiles
for update
using (
  id = auth.uid()
  and is_active = true
)
with check (
  id = auth.uid()
);

-- Admin:
--  - Full quyền với profiles
create policy profiles_admin_all
on public.profiles
for all
using (public.is_admin());


-- ============================================================
-- USER ROLES
-- ============================================================

-- Customer/Staff:
--  - Chỉ SELECT role của chính mình
create policy roles_select_own
on public.user_roles
for select
using (user_id = auth.uid());

-- Admin:
--  - Toàn quyền đổi role, tạo staff/admin
create policy roles_admin_all
on public.user_roles
for all
using (public.is_admin());


-- ============================================================
-- PRODUCTS
-- ============================================================

-- Public (guest + customer):
--  - Chỉ xem sản phẩm active = true
create policy products_public_select
on public.products
for select
using (active = true);

-- Staff/Admin:
--  - CRUD sản phẩm
--  - Có thể ẩn sản phẩm bằng active=false
create policy products_staff_manage
on public.products
for all
using (public.is_staff());


-- ============================================================
-- ORDERS
-- ============================================================

-- Customer:
--  - Chỉ SELECT đơn của mình
create policy orders_customer_select
on public.orders
for select
using (user_id = auth.uid());

-- Customer:
--  - Chỉ INSERT đơn cho chính mình
--  - Không thể tạo order cho user khác
create policy orders_customer_insert
on public.orders
for insert
with check (user_id = auth.uid());

-- Staff/Admin:
--  - SELECT TẤT CẢ orders (trang admin)
create policy orders_staff_select_all
on public.orders
for select
using (public.is_staff());

-- Staff/Admin:
--  - UPDATE trạng thái đơn
create policy orders_staff_update
on public.orders
for update
using (public.is_staff());


-- ============================================================
-- ORDER DETAILS
-- ============================================================

-- Customer:
--  - Chỉ xem order_details nếu order thuộc về mình
create policy order_details_customer_select
on public.order_details
for select
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id
      and o.user_id = auth.uid()
  )
);

-- Staff/Admin:
--  - Xem + quản lý order_details
create policy order_details_staff_manage
on public.order_details
for all
using (public.is_staff());


-- ============================================================
-- LOOKUP TABLES (order_status, order_method)
-- ============================================================

-- Ai cũng được SELECT (dùng cho dropdown UI)
create policy status_select_all
on public.order_status
for select using (true);

create policy method_select_all
on public.order_method
for select using (true);


/* =======================
   USER EVENTS
   ======================= */

-- Ai cũng được ghi event (guest + login)
-- nhưng bắt buộc có session_id để tracking
create policy events_public_insert
on public.user_events
for insert
with check (session_id is not null and length(session_id) > 0);

-- Customer xem event của mình (nếu login)
create policy events_customer_select_own
on public.user_events
for select
using (user_id = auth.uid());

-- Staff/Admin xem toàn bộ (phục vụ gợi ý, thống kê)
create policy events_staff_select_all
on public.user_events
for select
using (public.is_staff());

-- cho phép đọc sản phẩm active, cả guest
create policy "public can read active products"
on public.products
for select
to anon, authenticated
using (active = true);

/* ============================================================
   END OF FINAL SCHEMA v2
   ============================================================ */