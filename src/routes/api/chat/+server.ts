import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GROQ_API_KEY, GROQ_MODEL } from '$env/static/private';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// =====================
// Memory (per server instance)
// =====================
const lastSearchBySid = new Map<string, any[]>(); // list gần nhất cho mỗi sid

// =====================
// Minimal in-memory rate limit per IP (demo-friendly)
// =====================
const WINDOW_MS = 30_000;
const MAX_REQ_PER_WINDOW = 25;
const ipHits = new Map<string, { ts: number; count: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const cur = ipHits.get(ip);
  if (!cur || now - cur.ts > WINDOW_MS) {
    ipHits.set(ip, { ts: now, count: 1 });
    return { ok: true };
  }
  if (cur.count >= MAX_REQ_PER_WINDOW) return { ok: false };
  cur.count++;
  return { ok: true };
}

// =====================
// Helpers
// =====================
function vnd(n: number) {
  return Number(n ?? 0).toLocaleString('vi-VN') + ' đ';
}

function formatList(items: any[], max = 5) {
  return items
    .slice(0, max)
    .map(
      (p: any, i: number) =>
        `${i + 1}. ${p.name} - ${Number(p.price ?? 0).toLocaleString(
          'vi-VN'
        )} đồng`
    )
    .join('\n');
}

// làm q gọn: bỏ các từ thừa nhưng KHÔNG xóa loại hàng
function cleanQuery(q: string) {
  return (q ?? '')
    .toLowerCase()
    .replace(
      /\b(tư vấn|gợi ý|cho tôi|cho mình|giúp tôi|mẫu|sản phẩm|sp|có giá|dưới|trên|tầm|loại|dòng|một|1|vài|giùm|dùm|với|nhé)\b/g,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim();
}

// tránh PostgREST bị vỡ chuỗi or/ilike vì dấu %, _, , ...
function safeIlikeToken(s: string) {
  return (s ?? '')
    .replace(/[%_]/g, ' ')
    .replace(/[,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isGreeting(text: string) {
  const t = (text ?? '').trim().toLowerCase();
  return (
    /^(xin chào|chào|hello|hi|hey|yo|lô|lo|lô bro|lo bro|bro)\b/.test(t) &&
    t.length <= 40
  );
}

function isHelp(text: string) {
  const t = (text ?? '').toLowerCase();
  return /(hướng dẫn|cách dùng|chat sao|dùng như nào|help|hdsd)/.test(t);
}

// =====================
// Money parse (VN)
// =====================
function parseMoneyToken(raw: string): number | null {
  const s = (raw ?? '').toLowerCase().replace(/\s+/g, '').trim();
  if (!s) return null;

  const m1 = s.match(/^(\d+(?:[.,]\d+)?)\s*(k|nghìn|nghin)$/i);
  if (m1) return Math.round(Number(String(m1[1]).replace(',', '.')) * 1000);

  const m2 = s.match(/^(\d+(?:[.,]\d+)?)\s*(tr|triệu|trieu)$/i);
  if (m2)
    return Math.round(Number(String(m2[1]).replace(',', '.')) * 1_000_000);

  const m3 = s.match(/^(\d+(?:[.,]\d+)?)\s*(triệu|trieu)$/i);
  if (m3)
    return Math.round(Number(String(m3[1]).replace(',', '.')) * 1_000_000);

  const n = Number(s.replace(/[^\d.]/g, ''));
  if (Number.isFinite(n) && n >= 10_000) return Math.round(n);

  return null;
}

function extractBudget(text: string): { min: number; max: number } {
  const t = (text ?? '').toLowerCase();

  const range =
    t.match(
      /từ\s+([0-9.,]+\s*(?:k|nghìn|nghin|tr|triệu|trieu)?)\s+đến\s+([0-9.,]+\s*(?:k|nghìn|nghin|tr|triệu|trieu)?)/i
    ) ||
    t.match(
      /([0-9.,]+\s*(?:k|nghìn|nghin|tr|triệu|trieu)?)\s*-\s*([0-9.,]+\s*(?:k|nghìn|nghin|tr|triệu|trieu)?)/i
    );

  if (range) {
    const a = parseMoneyToken(range[1]) ?? 0;
    const b = parseMoneyToken(range[2]) ?? 0;
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return { min: min > 0 ? min : 0, max: max > 0 ? max : 0 };
  }

  const under = t.match(
    /dưới\s+([0-9.,]+\s*(?:k|nghìn|nghin|tr|triệu|trieu))/i
  );
  if (under) {
    const max = parseMoneyToken(under[1]) ?? 0;
    return { min: 0, max };
  }

  const above = t.match(
    /trên\s+([0-9.,]+\s*(?:k|nghìn|nghin|tr|triệu|trieu))/i
  );
  if (above) {
    const min = parseMoneyToken(above[1]) ?? 0;
    return { min, max: 0 };
  }

  return { min: 0, max: 0 };
}

// =====================
// Intent (buy/checkout)
// =====================
function isCheckoutIntent(text: string) {
  const t = (text ?? '').toLowerCase();
  return /(chốt|mua|lấy|đặt|order|thêm vào giỏ|add to cart|giỏ hàng|thanh toán|lấy cho|chốt cho|ấy\s+(cho|lấy|chốt))/i.test(
    t
  );
}

function isGenericCheckoutOnly(text: string) {
  const t = (text ?? '').toLowerCase().trim();
  // chỉ coi là "chung chung" nếu KHÔNG có từ khóa sản phẩm đáng kể
  // chấp nhận: "chốt 1 cái", "lấy 1 cái", "mua 1 cái", "chốt giúp tôi 1 cái"
  // KHÔNG chấp nhận: "lấy 1 HyperX Cloud", "chốt k380", ...
  return /^(?:chốt|lấy|mua|đặt|order)(?:\s+giúp|\s+cho\s+(?:tôi|mình))?(?:\s+\d{1,2}|\s+một)?(?:\s*(?:cái|chiếc|sp|sản phẩm))?\s*$/i.test(
    t
  );
}

function looksLikeSelectingFromList(text: string) {
  const t = (text ?? '').toLowerCase();

  if (/#\s*\d{1,2}/.test(t)) return true;
  if (
    /(mẫu này|cái này|cái trên|con này|lấy luôn|chốt luôn|mẫu đó|cái đó|cái đầu|mẫu đầu|đầu tiên)/.test(
      t
    )
  )
    return true;

  if (/\b[a-z]{1,8}\d{2,5}[a-z]?\b/i.test(t)) return true;

  if (/(?<![a-zA-Z])(\d{1,2})(?!\d)\s*(cái|chiếc|sp|sản phẩm)\b/i.test(t))
    return true;

  if (/\bx\s*\d{1,2}\b/i.test(t)) return true;

  return false;
}

function isCompareIntent(text: string) {
  const t = (text ?? '').toLowerCase();
  return /(so\s*sánh|compare|vs\b|v\s*s\b|đối\s*chiếu)/.test(t);
}

// lấy ra 2 "key" để match: ưu tiên #n, nếu không thì ưu tiên model token, nếu không thì lấy theo cụm text
function extractCompareKeys(text: string): { idxs: number[]; keys: string[] } {
  const raw = (text ?? '').trim();

  // 1) ưu tiên #n
  const idxs = [...raw.matchAll(/#\s*(\d{1,2})/g)]
    .map((m) => Number(m[1]))
    .filter((n) => Number.isFinite(n) && n > 0);

  // 2) bỏ các cụm điều khiển + số lượng "2 mẫu/2 sản phẩm"
  const cleaned = raw
    .toLowerCase()
    .replace(/so\s*sánh|compare|đối\s*chiếu/gi, ' ')
    .replace(/\b(giúp|cho tôi|cho mình|với|nhé)\b/gi, ' ')
    .replace(/\b(2|hai)\s*(mẫu|sp|sản phẩm|mặt hàng|món)\b/gi, ' ')
    .replace(/\b(mẫu|sp|sản phẩm|mặt hàng|món)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 3) split theo "và / vs / với / ,"
  const parts = cleaned
    .split(/\s*(?:và|vs|v\s*s|với|,|&|\+)\s*/gi)
    .map((s) => s.trim())
    .filter(Boolean);

  const norm = (s: string) =>
    (s ?? '')
      .toLowerCase()
      .replace(/^[\-\u2022\*]+\s*/g, '') // bỏ "- ", "• ", "* "
      .replace(/^\d+\s+/g, '') // bỏ "2 " ở đầu nếu còn
      .replace(/^(mẫu|mẫu số)\s*/g, '') // bỏ "mẫu ..."
      .replace(/\s+/g, ' ')
      .trim();

  const keys: string[] = [];
  for (const p of parts) {
    const pp = norm(p);

    // ưu tiên bắt model token trước
    const model = pp.match(/\b[a-z]{1,8}\d{2,5}[a-z]?\b/i)?.[0];
    keys.push(model ? model : pp);
  }

  return { idxs, keys: keys.filter(Boolean).slice(0, 2) };
}

// tìm 1 sản phẩm theo key từ list gần nhất, nếu không có thì search db
async function resolveCompareItem(
  supabase: any,
  list: any[],
  key: string,
  inferredType: string,
  inferredBrand: string
) {
  const k = (key ?? '')
    .toLowerCase()
    .replace(/^[\-\u2022\*]+\s*/g, '')
    .replace(/^\d+\s+/g, '') // bỏ số đầu câu
    .replace(/\b(2|hai)\s*(mẫu|sp|sản phẩm|mặt hàng|món)\b/g, ' ')
    .replace(/\b(mẫu|sp|sản phẩm|mặt hàng|món)\b/g, ' ')
    .replace(/\b(tai nghe|bàn phím|chuột|màn hình|laptop|phụ kiện)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!k) return null;

  // 1) thử match từ list gần nhất
  const fromList = pickFromListByKey(list, k);
  if (fromList?.id) return fromList;

  // 2) fallback: search db theo key (limit 1)
  const rs = await search_products(supabase, {
    q: k,
    type: inferredType || '',
    brand: inferredBrand || '',
    min_price: 0,
    max_price: 0,
    limit: 5,
    sort: 'newest',
  });

  if (rs.ok && rs.items.length > 0) {
    // ưu tiên item có name chứa key nhất
    const best =
      rs.items.find((x: any) =>
        String(x.name ?? '')
          .toLowerCase()
          .includes(k)
      ) ?? rs.items[0];
    return best;
  }

  return null;
}

// =====================
// Parse multi items from a sentence
// =====================
function extractWantedItems(text: string) {
  const raw = (text ?? '').toLowerCase();

  const parts = raw
    .split(/\s*(?:và|,|&|\+)\s*/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const noise =
    /\b(chốt|mua|lấy|đặt|order|cho tôi|cho mình|giúp tôi|với|nhé|dùm|mẫu|cái|con|sản phẩm|sp|hàng|mặt hàng|giùm)\b/g;

  const categoryNoise =
    /\b(bàn phím|tai nghe|laptop|notebook|chuột|màn hình|phụ kiện|accessories|gaming|văn phòng|office)\b/g;

  const out: Array<{ key: string; qty: number }> = [];

  for (let p of parts) {
    p = p.replace(noise, ' ').replace(/\s+/g, ' ').trim();

    let qty = 1;

    const qtyX = p.match(/\bx\s*(\d{1,2})\b/i);
    if (qtyX) qty = Math.max(1, Number(qtyX[1]));

    if (!qtyX) {
      const qtyUnit = p.match(
        /(?<![a-zA-Z])(\d{1,2})(?!\d)\s*(cái|chiếc|sp|sản phẩm)\b/i
      );
      if (qtyUnit) qty = Math.max(1, Number(qtyUnit[1]));
    }

    if (!qtyX) {
      const qtyPrefix = p.match(/^\s*(?<![a-zA-Z])(\d{1,2})(?!\d)\s+/i);
      if (qtyPrefix) qty = Math.max(1, Number(qtyPrefix[1]));
    }

    p = p
      .replace(/\bx\s*\d{1,2}\b/gi, ' ')
      .replace(/(?<![a-zA-Z])\d{1,2}(?!\d)\s*(cái|chiếc|sp|sản phẩm)\b/gi, ' ')
      .replace(/^\s*(?<![a-zA-Z])\d{1,2}(?!\d)\s+/gi, ' ');

    p = p.replace(categoryNoise, ' ').replace(/\s+/g, ' ').trim();
    if (!p) continue;

    const modelMatch = p.match(/\b[a-z]{1,8}\d{2,5}[a-z]?\b/i);
    const key = (modelMatch?.[0] ?? p).toLowerCase().trim();

    if (!key) continue;
    out.push({ key, qty });
  }

  const merged = new Map<string, number>();
  for (const it of out) merged.set(it.key, (merged.get(it.key) ?? 0) + it.qty);

  return [...merged.entries()].map(([key, qty]) => ({ key, qty }));
}

function pickFromListByKey(list: any[], key: string) {
  const k = (key ?? '').toLowerCase().trim();
  if (!k) return null;

  const byModel = list.find((p) => String(p.model ?? '').toLowerCase() === k);
  if (byModel) return byModel;

  const bySlug = list.find((p) => String(p.slug ?? '').toLowerCase() === k);
  if (bySlug) return bySlug;

  const byName = list.find((p) =>
    String(p.name ?? '')
      .toLowerCase()
      .includes(k)
  );
  if (byName) return byName;

  const compact = k.replace(/\s+/g, ' ');
  const byName2 = list.find((p) => {
    const nm = String(p.name ?? '')
      .toLowerCase()
      .replace(/\s+/g, ' ');
    return nm.includes(compact);
  });

  return byName2 ?? null;
}

// =====================
// Types + Brands cache (dynamic)
// =====================
let cachedTypes: { ts: number; types: string[] } = { ts: 0, types: [] };
let cachedBrands: { ts: number; brands: string[] } = { ts: 0, brands: [] };
const CACHE_TTL_MS = 5 * 60_000;

async function getTypesCached(supabase: any): Promise<string[]> {
  const now = Date.now();
  if (cachedTypes.types.length && now - cachedTypes.ts < CACHE_TTL_MS)
    return cachedTypes.types;

  const { data, error } = (await supabase
    .from('products')
    .select('type')
    .eq('active', true)) as {
    data: Array<{ type: string | null }> | null;
    error: any;
  };

  if (error) return cachedTypes.types;

  const types: string[] = Array.from(
    new Set(
      (data ?? [])
        .map((x) => (x?.type ?? '').trim())
        .filter((x) => x.length > 0)
    )
  );

  cachedTypes = { ts: now, types };
  return types;
}

async function getBrandsCached(supabase: any): Promise<string[]> {
  const now = Date.now();
  if (cachedBrands.brands.length && now - cachedBrands.ts < CACHE_TTL_MS)
    return cachedBrands.brands;

  const { data, error } = (await supabase
    .from('products')
    .select('brand')
    .eq('active', true)) as {
    data: Array<{ brand: string | null }> | null;
    error: any;
  };

  if (error) return cachedBrands.brands;

  const brands: string[] = Array.from(
    new Set(
      (data ?? [])
        .map((x) => (x?.brand ?? '').trim())
        .filter((x) => x.length > 0)
    )
  );

  brands.sort((a, b) => b.length - a.length);
  cachedBrands = { ts: now, brands };
  return brands;
}

async function inferTypeFromText(supabase: any, text: string) {
  const t = (text ?? '').toLowerCase();
  const types = await getTypesCached(supabase);

  const hints: Array<{ keys: RegExp; typeLike: string }> = [
    { keys: /\b(laptop|notebook)\b/, typeLike: 'laptop' },
    { keys: /\b(bàn phím|keyboard)\b/, typeLike: 'bàn phím' },
    { keys: /\b(tai nghe|headphone|earphone)\b/, typeLike: 'tai nghe' },
    { keys: /\b(chuột|mouse)\b/, typeLike: 'chuột' },
    { keys: /\b(màn hình|monitor)\b/, typeLike: 'màn hình' },
    { keys: /\b(phụ kiện|accessories)\b/, typeLike: 'phụ kiện' },
  ];

  for (const h of hints) {
    if (h.keys.test(t)) {
      const found = types.find((x) =>
        String(x).toLowerCase().includes(h.typeLike)
      );
      if (found) return found;
      return h.typeLike.charAt(0).toUpperCase() + h.typeLike.slice(1);
    }
  }

  for (const ty of types) {
    const low = String(ty).toLowerCase();
    if (low && t.includes(low)) return String(ty);
  }

  return '';
}

async function inferBrandFromText(supabase: any, text: string) {
  const t = (text ?? '').toLowerCase();
  const brands = await getBrandsCached(supabase);
  for (const b of brands) {
    const low = b.toLowerCase();
    if (low && t.includes(low)) return b;
  }
  return '';
}

// =====================
// Tools (DB)
// =====================
async function search_products(
  supabase: any,
  args: {
    q?: string;
    type?: string;
    brand?: string;
    tags?: string[];
    min_price?: number;
    max_price?: number;
    limit?: number;
    sort?: 'price_asc' | 'price_desc' | 'newest';
  }
) {
  const limit = Math.min(Math.max(Number(args.limit ?? 10), 1), 20);

  const minP = Number(args.min_price ?? 0);
  const maxP = Number(args.max_price ?? 0);

  const base = () => {
    let query = supabase
      .from('products')
      .select(
        'id,name,slug,brand,type,model,price,quantity,active,images,description,tags,created_at'
      )
      .eq('active', true)
      .limit(limit);

    if (args.type?.trim()) query = query.ilike('type', `%${args.type.trim()}%`);
    if (args.brand?.trim())
      query = query.ilike('brand', `%${args.brand.trim()}%`);

    if (Number.isFinite(minP) && minP > 0) query = query.gte('price', minP);
    if (Number.isFinite(maxP) && maxP > 0) query = query.lte('price', maxP);

    if (args.sort === 'price_asc')
      query = query.order('price', { ascending: true });
    if (args.sort === 'price_desc')
      query = query.order('price', { ascending: false });
    if (args.sort === 'newest')
      query = query.order('created_at', { ascending: false });

    return query;
  };

  let query = base();

  if (args.q?.trim()) {
    const q0 = safeIlikeToken(cleanQuery(args.q.trim()));
    if (q0) {
      const or = [
        `name.ilike.%${q0}%`,
        `model.ilike.%${q0}%`,
        `brand.ilike.%${q0}%`,
        `description.ilike.%${q0}%`,
      ].join(',');
      query = query.or(or);
    }
  }

  if (args.tags && Array.isArray(args.tags) && args.tags.length > 0) {
    query = query.contains('tags', args.tags);
  }

  const { data, error } = await query;

  if (
    error &&
    String(error.message ?? '')
      .toLowerCase()
      .includes('tags')
  ) {
    let q2 = (args.q ?? '').trim();
    if ((!q2 || q2.length === 0) && args.tags?.length) q2 = args.tags.join(' ');

    const retry = base();
    const q0 = safeIlikeToken(cleanQuery(q2));
    const retry2 =
      q0.length > 0
        ? retry.or(
            [
              `name.ilike.%${q0}%`,
              `model.ilike.%${q0}%`,
              `brand.ilike.%${q0}%`,
              `description.ilike.%${q0}%`,
            ].join(',')
          )
        : retry;

    const rr = await retry2;
    if (rr.error) return { ok: false, error: rr.error.message, items: [] };
    const dd = rr.data ?? [];
    return {
      ok: true,
      items: dd.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price ?? 0),
        brand: p.brand ?? null,
        type: p.type ?? null,
        model: p.model ?? null,
        slug: p.slug ?? null,
        quantity: p.quantity ?? null,
        image_url:
          Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null,
      })),
    };
  }

  if (error) return { ok: false, error: error.message, items: [] };

  return {
    ok: true,
    items: (data ?? []).map((p: any) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price ?? 0),
      brand: p.brand ?? null,
      type: p.type ?? null,
      model: p.model ?? null,
      slug: p.slug ?? null,
      quantity: p.quantity ?? null,
      image_url:
        Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null,
    })),
  };
}

async function get_product(supabase: any, args: { id: number }) {
  const id = Number(args.id);
  if (!Number.isFinite(id)) return { ok: false, error: 'Invalid id' };

  const { data, error } = await supabase
    .from('products')
    .select(
      'id,name,slug,brand,type,model,price,old_price,quantity,active,images,description,tags'
    )
    .eq('id', id)
    .maybeSingle();

  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: false, error: 'Not found' };

  return { ok: true, product: data };
}

async function build_cart(
  supabase: any,
  args: { items: Array<{ product_id: number; qty: number }> }
) {
  const items = Array.isArray(args.items) ? args.items : [];
  const normalized = items
    .map((it) => ({
      product_id: Number(it.product_id),
      qty: Math.max(1, Number(it.qty ?? 1)),
    }))
    .filter((it) => Number.isFinite(it.product_id) && Number.isFinite(it.qty));

  if (normalized.length === 0) return { ok: false, error: 'Empty items' };

  const ids = Array.from(new Set(normalized.map((x) => x.product_id)));
  const { data, error } = await supabase
    .from('products')
    .select('id,name,slug,price,old_price,quantity,active,images')
    .in('id', ids)
    .eq('active', true);

  if (error) return { ok: false, error: error.message };

  const map = new Map<number, any>(
    (data ?? []).map((p: any) => [Number(p.id), p])
  );
  const cartItems: any[] = [];
  let total = 0;

  for (const it of normalized) {
    const p = map.get(it.product_id);
    if (!p) continue;

    const stock = Number(p.quantity ?? 0);
    const qty = stock > 0 ? Math.min(it.qty, stock) : it.qty;
    const line = Number(p.price ?? 0) * qty;

    total += line;
    cartItems.push({
      product_id: p.id,
      slug: p.slug ?? '',
      name: p.name,
      price: Number(p.price ?? 0),
      old_price: p.old_price ?? null,
      image:
        Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null,
      quantity: qty,
    });
  }

  if (cartItems.length === 0) return { ok: false, error: 'No valid products' };
  return { ok: true, cart: { items: cartItems, total } };
}

// =====================
// Groq call (OpenAI-compatible)
// =====================
async function groqChat(messages: any[]) {
  if (!GROQ_API_KEY) throw new Error('Missing GROQ_API_KEY');
  const model = (GROQ_MODEL || 'llama-3.3-70b-versatile').trim();

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages,
    }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Groq error ${res.status}: ${text}`);
  return JSON.parse(text);
}

function safeJsonParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function normalizeAiObj(obj: any) {
  if (!obj) return null;
  if (obj.type === 'tool' || obj.type === 'final') return obj;

  if (typeof obj.type === 'string' && obj.args && !obj.name) {
    const t = obj.type;
    if (t === 'search_products' || t === 'get_product' || t === 'build_cart') {
      return { type: 'tool', name: t, args: obj.args };
    }
  }
  return obj;
}

// =====================
// System prompt
// =====================
const SYSTEM = `
Bạn là chatbot bán hàng. Bạn PHẢI luôn trả lời theo đúng JSON (không thêm chữ ngoài JSON).

Schema:
- {"type":"final","message":"..."}
- {"type":"tool","name":"search_products","args":{"q":"...","type":"...","brand":"...","tags":["..."],"min_price":0,"max_price":0,"limit":10,"sort":"price_asc|price_desc|newest"}}
- {"type":"tool","name":"get_product","args":{"id":123}}
- {"type":"tool","name":"build_cart","args":{"items":[{"product_id":123,"qty":2}]}}

QUY TẮC:
1) Nếu người dùng muốn tìm/tư vấn sản phẩm thì PHẢI gọi search_products trước. KHÔNG được final trước khi gọi tool.
2) Chỉ final SAU khi đã nhận tool_result.
3) Nếu tool_result items rỗng: hãy thử lại search_products với q NGẮN hơn hoặc bỏ bớt filter.
4) Chỉ trả 1 JSON object duy nhất.
5) Hiểu ngân sách: "900k"=900000, "1 triệu"=1000000, "2tr"=2000000, "1 củ"=1000000, "2000k"==2000000...
6) Nếu không có giới hạn giá: min_price=0 và max_price=0 (server hiểu 0 là không lọc giá).
7) q phải NGẮN (từ khóa chính), KHÔNG đưa cả câu dài.
8) KHÔNG được nói "đã chốt/đã thêm vào giỏ/đã thanh toán" nếu chưa gọi build_cart.
9) Khi final có danh sách: 
- Tối đa 5 dòng, có số thứ tự + tên + giá. 
- SAU danh sách PHẢI có 1 dòng trống (tức là dùng "\n\n"), rồi đến gợi ý chốt theo đúng 2 dòng: 
Dòng 1: "Để chốt đơn bạn có thể nhắn:"
Dòng 2: "Chốt mẫu #1 - 1 cái hoặc Chốt <model> 2 cái và chốt <model> 1 cái".
10) Nếu user nói nhu cầu "văn phòng/gaming" thì ƯU TIÊN dùng tags=["office"] hoặc tags=["gaming"]; KHÔNG dùng q="laptop văn phòng" hay "laptop chơi game" như một cụm dài.
`.trim();

// =====================
// Router helpers
// =====================
function wantCheapest(text: string) {
  const t = (text ?? '').toLowerCase();
  return /(rẻ nhất|re nhat|giá thấp nhất|gia thap nhat|thấp nhất|thap nhat)/.test(
    t
  );
}
function wantMostExpensive(text: string) {
  const t = (text ?? '').toLowerCase();
  return /(đắt nhất|dat nhat|giá cao nhất|gia cao nhat|cao nhất|cao nhat)/.test(
    t
  );
}
function wantRandom(text: string) {
  const t = (text ?? '').toLowerCase();
  if (wantCheapest(t) || wantMostExpensive(t)) return false;
  return /(ngẫu nhiên|random|bất kỳ|bất kì|chọn giúp)/.test(t);
}
function wantSingleItem(text: string) {
  const t = (text ?? '').toLowerCase();
  return (
    /\b(1|một)\b\s*(mặt hàng|sản phẩm|sp|món)\b/.test(t) ||
    /chỉ\s*(1|một)\b/.test(t)
  );
}
function wantSortedList(text: string) {
  const t = (text ?? '').toLowerCase();
  return /(từ thấp đến cao|tu thap den cao|từ cao đến thấp|tu cao den thap|sắp xếp|sap xep|list|lên đơn|len don)/.test(
    t
  );
}
function needOffice(text: string) {
  const t = (text ?? '').toLowerCase();
  return /(văn phòng|van phong|làm việc|lam viec|office|học tập|hoc tap)/.test(
    t
  );
}
function needGaming(text: string) {
  const t = (text ?? '').toLowerCase();
  return /(gaming|chơi game|choi game)/.test(t);
}
function isAdviceIntent(text: string) {
  const t = (text ?? '').toLowerCase();
  return /(tư vấn|gợi ý|recommend|đề xuất|phù hợp|nên mua)/.test(t);
}
function hasModelToken(text: string) {
  return /\b[a-z]{1,8}\d{2,5}[a-z]?\b/i.test(text ?? '');
}

// =====================
// POST
// =====================
export const POST: RequestHandler = async ({
  request,
  locals,
  cookies,
  getClientAddress,
}) => {
  // 0) rate limit
  const ip = getClientAddress?.() ?? 'unknown';
  const rl = rateLimit(ip);
  if (!rl.ok)
    return json({ ok: false, error: 'Too many requests' }, { status: 429 });

  // 1) parse body
  const body = await request.json().catch(() => null);
  const messages: ChatMessage[] = body?.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return json(
      { ok: false, error: 'messages[] is required' },
      { status: 400 }
    );
  }

  // 2) supabase
  const supabase = (locals as any)?.supabase;
  if (!supabase) {
    return json(
      { ok: false, error: 'Server supabase client not found in locals' },
      { status: 500 }
    );
  }

  // 3) sid
  const sid = cookies.get('tt_sid') ?? 'anon';

  // 4) last user text
  const lastUserText =
    [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
  const t = lastUserText.trim().toLowerCase();
  const list = lastSearchBySid.get(sid) ?? [];

  // greeting
  if (isGreeting(lastUserText)) {
    return json({
      ok: true,
      message:
        'Chào bạn 👋 Mình là trợ lý mua sắm.\nBạn thử:\n- "tư vấn bàn phím dưới 1 triệu"\n- "tư vấn bàn phím logitech"\n- "gợi ý laptop văn phòng"\n- "mặt hàng rẻ nhất có ở shop" / "chốt mặt hàng rẻ nhất"\n- "chốt mẫu #1 - 1 cái"\n- "lấy 1 EK87 và 2 K380"',
    });
  }

  // (Optional) block admin/staff checkout
  let viewerRole = 'guest';

  try {
    const { data: u } = await supabase.auth.getUser();
    const userId = u?.user?.id;
    if (userId) {
      const { data: prof } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();
      viewerRole = String(prof?.role ?? 'customer');
      console.log('auth user id =', u?.user?.id);
      console.log('prof role =', prof);
    }
  } catch {}

  if (isCheckoutIntent(lastUserText) && viewerRole === 'admin') {
    return json({
      ok: true,
      message:
        'Bạn đang đăng nhập với quyền admin nên tạm thời không thể đặt hàng. Mình vẫn có thể tư vấn sản phẩm cho bạn nhé!',
    });
  }

  // help
  if (isHelp(lastUserText)) {
    return json({
      ok: true,
      message:
        'Cách dùng nhanh:\n' +
        '1) Tìm theo giá: "bàn phím dưới 1 triệu"\n' +
        '2) Tìm theo hãng: "chuột logitech"\n' +
        '3) Theo nhu cầu: "laptop văn phòng", "chuột gaming"\n' +
        '4) Chốt theo #: "chốt mẫu #1 1 cái"\n' +
        '5) Chốt nhiều món: "lấy 1 EK87 và 2 K380"\n' +
        '6) Rẻ nhất/đắt nhất: "rẻ nhất" / "chốt rẻ nhất"\n' +
        '7) Ngẫu nhiên: "chọn giúp 1 món ngẫu nhiên"',
    });
  }

  // =====================
  // ROUTER (before AI): tính trước inferred/budget để dùng ở cả PRE-CHECKOUT + router
  // =====================
  const budget = extractBudget(lastUserText);
  const inferredType = await inferTypeFromText(supabase, lastUserText);
  const inferredBrand = await inferBrandFromText(supabase, lastUserText);

  // =====================
  // (COMPARE) So sánh 2 sản phẩm (ưu tiên trước AI)
  // =====================
  console.log('COMPARE_RAW:', lastUserText);
  console.log('COMPARE_PARSED:', extractCompareKeys(lastUserText));
  if (isCompareIntent(lastUserText) && !isCheckoutIntent(lastUserText)) {
    const { idxs, keys } = extractCompareKeys(lastUserText);

    // CASE 1: so sánh theo #n (ví dụ: "so sánh #3 và #5")
    if (idxs.length >= 2 && list.length) {
      const a = list[idxs[0] - 1];
      const b = list[idxs[1] - 1];

      if (a?.id && b?.id) {
        return json({
          ok: true,
          message:
            `So sánh nhanh 2 sản phẩm:\n` +
            `1) ${a.name} (${vnd(Number(a.price ?? 0))})\n` +
            `   - Hãng: ${a.brand ?? '—'}\n` +
            `   - Model: ${a.model ?? '—'}\n` +
            `   - Loại: ${a.type ?? '—'}\n` +
            `2) ${b.name} (${vnd(Number(b.price ?? 0))})\n` +
            `   - Hãng: ${b.brand ?? '—'}\n` +
            `   - Model: ${b.model ?? '—'}\n` +
            `   - Loại: ${b.type ?? '—'}\n` +
            `\n\nBạn có thể nói: "chốt mẫu #${idxs[0]} 1 cái" hoặc "chốt mẫu #${idxs[1]} 1 cái".`,
          results: [a, b],
        });
      }

      return json({
        ok: true,
        message:
          'Mình không thấy đủ 2 mẫu theo # trong danh sách gần nhất. Bạn thử "tư vấn <loại hàng> ..." để mình ra list lại nhé.',
      });
    }

    // CASE 2: so sánh theo tên/model (ví dụ: "JBL Tune 760NC và HyperX Cloud II")
    if (keys.length >= 2) {
      const a = await resolveCompareItem(
        supabase,
        list,
        keys[0],
        inferredType,
        inferredBrand
      );
      const b = await resolveCompareItem(
        supabase,
        list,
        keys[1],
        inferredType,
        inferredBrand
      );

      if (a?.id && b?.id) {
        // (optional) lưu list để user chốt tiếp bằng #1 #2
        lastSearchBySid.set(sid, [a, b]);

        return json({
          ok: true,
          message:
            `So sánh nhanh 2 sản phẩm:\n` +
            `1) ${a.name} (${vnd(Number(a.price ?? 0))})\n` +
            `   - Hãng: ${a.brand ?? '—'}\n` +
            `   - Model: ${a.model ?? '—'}\n` +
            `   - Loại: ${a.type ?? '—'}\n` +
            `2) ${b.name} (${vnd(Number(b.price ?? 0))})\n` +
            `   - Hãng: ${b.brand ?? '—'}\n` +
            `   - Model: ${b.model ?? '—'}\n` +
            `   - Loại: ${b.type ?? '—'}\n` +
            `\n\nBạn có thể nói: "chốt mẫu #1 - 1 cái" hoặc "chốt mẫu #2 1 cái".`,
          results: [a, b],
        });
      }

      // nếu thiếu 1 trong 2
      return json({
        ok: true,
        message:
          `Mình chưa tìm đủ 2 sản phẩm để so sánh.` +
          `\n- Mình thấy: ${a?.name ?? 'không thấy mẫu 1'}` +
          `\n- Mình thấy: ${b?.name ?? 'không thấy mẫu 2'}` +
          `\nBạn thử copy đúng tên sản phẩm trong danh sách gợi ý, hoặc dùng: "so sánh #3 và #5".`,
        results: [a, b].filter(Boolean),
      });
    }

    return json({
      ok: true,
      message:
        'Bạn muốn so sánh 2 mẫu nào? Ví dụ: "so sánh #3 và #5" hoặc "so sánh JBL Tune 760NC và HyperX Cloud II".',
    });
  }

  // =====================
  // PRE-CHECKOUT deterministic (chốt chắc chắn)
  // =====================
  if (isCheckoutIntent(lastUserText)) {
    const lower = lastUserText.toLowerCase();

    // ✅ FIX #1: ưu tiên “chốt rẻ nhất/đắt nhất” NGAY ĐẦU PRE-CHECKOUT
    if (wantCheapest(lastUserText) || wantMostExpensive(lastUserText)) {
      const rs = await search_products(supabase, {
        q: '',
        type: inferredType || '',
        brand: inferredBrand || '',
        min_price: 0,
        max_price: 0,
        limit: 1,
        sort: wantCheapest(lastUserText) ? 'price_asc' : 'price_desc',
      });

      if (rs.ok && rs.items.length > 0) {
        const pick = rs.items[0];
        const built = await build_cart(supabase, {
          items: [{ product_id: Number(pick.id), qty: 1 }],
        });

        if (built?.ok && built?.cart) {
          lastSearchBySid.set(sid, [pick]);
          return json({
            ok: true,
            message: `OK, mình đã chốt ${pick.name} x1. Tổng tạm tính: ${vnd(
              built.cart.total
            )}`,
            action: { type: 'cart', cart: built.cart, mode: 'replace' },
            results: [pick],
          });
        }
      }

      return json({
        ok: true,
        message:
          'Mình chưa tìm được sản phẩm rẻ nhất/đắt nhất lúc này. Bạn thử lại nhé.',
      });
    }

    // qty default: chỉ lấy khi có đơn vị hoặc xN
    let defaultQty = 1;
    const qtyUnit = lower.match(
      /(?<![a-zA-Z])(\d{1,2})(?!\d)\s*(cái|chiếc|sp|sản phẩm)\b/i
    );
    if (qtyUnit) defaultQty = Math.max(1, Number(qtyUnit[1]));
    const qtyX = lower.match(/\bx\s*(\d{1,2})\b/i);
    if (qtyX) defaultQty = Math.max(1, Number(qtyX[1]));

    // Nếu không có list gần đây thì không thể “chốt 1 cái” => rơi xuống AI
    if (list.length) {
      // Case 0: user nói chung chung "chốt 1 cái / lấy 1 cái" => pick #1 trong list gần nhất
      if (
        isGenericCheckoutOnly(lastUserText) &&
        !/#\s*\d{1,2}/.test(lower) &&
        !hasModelToken(lower) &&
        /(chốt|mua|lấy|đặt|order|ấy\s+(cho|lấy|chốt))/i.test(lower)
      ) {
        const pick = list[0];
        if (pick?.id) {
          const built = await build_cart(supabase, {
            items: [{ product_id: Number(pick.id), qty: defaultQty }],
          });
          if (built?.ok && built?.cart) {
            return json({
              ok: true,
              message: `OK, đã chốt ${
                pick.name
              } x${defaultQty}. Tổng tạm tính: ${vnd(built.cart.total)}`,
              action: { type: 'cart', cart: built.cart, mode: 'replace' },
              results: [
                {
                  id: Number(pick.id),
                  name: String(pick.name ?? ''),
                  slug: String(pick.slug ?? ''),
                  price: Number(pick.price ?? 0),
                  image_url: pick.image_url ?? null,
                  brand: pick.brand ?? null,
                  model: pick.model ?? null,
                  type: pick.type ?? null,
                },
              ],
            });
          }
        }
      }

      // case 0.5 :)) checkout có tên sản phẩm nhưng không dùng # (vd: "lấy 1 HyperX Cloud,...")
      if (
        isCheckoutIntent(lastUserText) &&
        !isGenericCheckoutOnly(lastUserText)
      ) {
        // cố bóc key như bạn đã làm cho multi-items
        const wants = extractWantedItems(lastUserText);

        // nếu parse ra được 1 key thì thử match list trước, không có thì search DB
        if (wants.length === 1) {
          const w = wants[0];

          // 1) ưu tiên match trong list gần nhất
          let pick = list.length ? pickFromListByKey(list, w.key) : null;

          // 2) fallback: search DB theo key
          if (!pick?.id) {
            const rs = await search_products(supabase, {
              q: w.key,
              type: inferredType || '',
              brand: inferredBrand || '',
              min_price: 0,
              max_price: 0,
              limit: 5,
              sort: 'newest',
            });
            if (rs.ok && rs.items.length > 0) pick = rs.items[0];
          }

          if (pick?.id) {
            const built = await build_cart(supabase, {
              items: [{ product_id: Number(pick.id), qty: Math.max(1, w.qty) }],
            });

            if (built?.ok && built?.cart) {
              lastSearchBySid.set(sid, [pick]);
              return json({
                ok: true,
                message: `OK, mình đã chốt ${pick.name} x${Math.max(
                  1,
                  w.qty
                )}. Tổng tạm tính: ${vnd(built.cart.total)}`,
                action: { type: 'cart', cart: built.cart, mode: 'replace' },
                results: [
                  {
                    id: Number(pick.id),
                    name: String(pick.name ?? ''),
                    slug: String(pick.slug ?? ''),
                    price: Number(pick.price ?? 0),
                    image_url: pick.image_url ?? null,
                    brand: pick.brand ?? null,
                    model: pick.model ?? null,
                    type: pick.type ?? null,
                  },
                ],
              });
            }
          }
        }
      }

      // Case 1: chốt theo #n,...
      const idxMatches = [...lower.matchAll(/#\s*(\d{1,2})/g)].map((m) =>
        Number(m[1])
      );

      // nếu có ít nhất 1 index
      if (idxMatches.length > 0) {
        // gộp trùng # (VD: "#1 #1" -> qty cộng dồn)
        const countByIdx = new Map<number, number>();
        for (const idx of idxMatches) {
          if (!Number.isFinite(idx) || idx <= 0) continue;
          countByIdx.set(idx, (countByIdx.get(idx) ?? 0) + 1);
        }

        const pickedItems: Array<{
          product_id: number;
          qty: number;
          name: string;
        }> = [];
        const missingIdx: number[] = [];

        for (const [idx, times] of countByIdx.entries()) {
          const pick = list[idx - 1];
          if (!pick?.id) {
            missingIdx.push(idx);
            continue;
          }

          // qty:
          // - nếu user không nói rõ qty thì "mỗi thứ 1 cái" => 1
          // - nếu user có defaultQty (vd "x2" hoặc "2 cái") thì áp cho từng mẫu
          // - nếu user lặp "#3 #3" thì times = 2 (coi như qty=2)
          const qty = Math.max(1, defaultQty) * Math.max(1, times);

          pickedItems.push({
            product_id: Number(pick.id),
            qty,
            name: pick.name,
          });
        }

        if (pickedItems.length > 0 && missingIdx.length === 0) {
          const built = await build_cart(supabase, {
            items: pickedItems.map((x) => ({
              product_id: x.product_id,
              qty: x.qty,
            })),
          });

          if (built?.ok && built?.cart) {
            const summary = pickedItems
              .map((x) => `${x.name} x${x.qty}`)
              .join(', ');

            return json({
              ok: true,
              message: `OK, mình đã chốt: ${summary}. Tổng tạm tính: ${vnd(
                built.cart.total
              )}`,
              action: { type: 'cart', cart: built.cart, mode: 'replace' },
              results: pickedItems.map((x) => {
                const p = list.find(
                  (z) => Number(z.id) === Number(x.product_id)
                );
                return {
                  id: Number(x.product_id),
                  name: String(p?.name ?? x.name ?? ''),
                  slug: String(p?.slug ?? ''),
                  price: Number(p?.price ?? 0),
                  image_url: p?.image_url ?? null,
                  brand: p?.brand ?? null,
                  model: p?.model ?? null,
                  type: p?.type ?? null,
                };
              }),
            });
          }
        }

        if (pickedItems.length > 0 && missingIdx.length > 0) {
          const summary = pickedItems
            .map((x) => `${x.name} x${x.qty}`)
            .join(', ');
          return json({
            ok: true,
            message: `Mình chốt được: ${summary}. Nhưng không thấy mẫu: ${missingIdx
              .map((x) => `#${x}`)
              .join(
                ', '
              )} trong danh sách. Bạn muốn mình chốt phần tìm được trước không?`,
          });
        }
      }

      // Case 2: chốt theo tên/model, có thể nhiều món
      const wants = extractWantedItems(lastUserText);
      if (wants.length > 0) {
        const picked: Array<{ product_id: number; qty: number; name: string }> =
          [];
        const missing: string[] = [];

        for (const w of wants) {
          const p = pickFromListByKey(list, w.key);
          if (!p?.id) {
            missing.push(w.key);
            continue;
          }
          picked.push({ product_id: Number(p.id), qty: w.qty, name: p.name });
        }

        if (picked.length > 0 && missing.length === 0) {
          const built = await build_cart(supabase, {
            items: picked.map((x) => ({
              product_id: x.product_id,
              qty: x.qty,
            })),
          });
          if (built?.ok && built?.cart) {
            const summary = picked.map((x) => `${x.name} x${x.qty}`).join(', ');
            return json({
              ok: true,
              message: `OK, mình đã chốt: ${summary}. Tổng tạm tính: ${vnd(
                built.cart.total
              )}`,
              action: { type: 'cart', cart: built.cart, mode: 'replace' },
              results: picked.map((x) => ({ id: x.product_id, name: x.name })), // optional
            });
          }
        }

        if (picked.length > 0 && missing.length > 0) {
          const summary = picked.map((x) => `${x.name} x${x.qty}`).join(', ');
          return json({
            ok: true,
            message: `Mình chốt được: ${summary}. Nhưng chưa thấy "${missing.join(
              ', '
            )}" trong danh sách vừa tìm. Bạn muốn mình tìm thêm mẫu còn thiếu không?`,
          });
        }
      }

      // Case 3: "mẫu này/cái này" khi list > 1
      if (
        /(mẫu này|cái này|cái trên|con này|mẫu đó|cái đó|cái đầu|mẫu đầu|đầu tiên)/.test(
          lower
        ) &&
        list.length > 1
      ) {
        return json({
          ok: true,
          message:
            '\n\nBạn muốn chốt mẫu nào? Bạn có thể nói: "chốt mẫu #1 - 1 cái" hoặc "chốt <model> 2 cái".',
        });
      }
    }
  }

  // =====================
  // ROUTER (before AI): tư vấn/nhu cầu/rẻ nhất/ngẫu nhiên...
  // =====================

  // (A) Needs-based: office/gaming
  if (
    (needOffice(lastUserText) || needGaming(lastUserText)) &&
    !isCheckoutIntent(lastUserText)
  ) {
    const tag = needGaming(lastUserText) ? 'gaming' : 'office';

    const rsByTags = await search_products(supabase, {
      q: '',
      type: inferredType || '',
      brand: inferredBrand || '',
      tags: [tag],
      min_price: budget.min,
      max_price: budget.max,
      limit: 10,
      sort: tag === 'gaming' ? 'price_desc' : 'price_asc',
    });

    if (rsByTags.ok && rsByTags.items.length > 0) {
      lastSearchBySid.set(sid, rsByTags.items);
      return json({
        ok: true,
        message:
          `Gợi ý sản phẩm phù hợp nhu cầu "${tag}"${
            inferredType ? ` (${inferredType})` : ''
          }:\n` +
          formatList(rsByTags.items, 5) +
          `\n\nBạn có thể nói: "chốt mẫu #1 - 1 cái" hoặc "tư vấn kỹ mẫu #2".`,
        results: rsByTags.items.slice(0, 5),
      });
    }

    const rsByDesc = await search_products(supabase, {
      q: tag,
      type: inferredType || '',
      brand: inferredBrand || '',
      min_price: budget.min,
      max_price: budget.max,
      limit: 10,
      sort: tag === 'gaming' ? 'price_desc' : 'price_asc',
    });

    if (rsByDesc.ok && rsByDesc.items.length > 0) {
      lastSearchBySid.set(sid, rsByDesc.items);
      return json({
        ok: true,
        message:
          `Mình chưa đủ tags để lọc chuẩn 100%, nhưng đây là gợi ý theo mô tả "${tag}":\n` +
          formatList(rsByDesc.items, 5) +
          `\n\nBạn có thể nói: "chốt mẫu #1 - 1 cái".`,
        results: rsByDesc.items.slice(0, 5),
      });
    }

    if (inferredType) {
      const rs = await search_products(supabase, {
        q: '',
        type: inferredType,
        brand: inferredBrand || '',
        min_price: budget.min,
        max_price: budget.max,
        limit: 10,
        sort: 'newest',
      });
      if (rs.ok && rs.items.length > 0) {
        lastSearchBySid.set(sid, rs.items);
        return json({
          ok: true,
          message:
            `Mình chưa lọc chính xác theo "${tag}", nhưng đây là vài gợi ý hiện có trong "${inferredType}":\n` +
            formatList(rs.items, 5) +
            `\n\nBạn có thể nói: "lọc dưới 2 triệu" hoặc "chốt mẫu #1 - 1 cái".`,
          results: rs.items.slice(0, 5),
        });
      }
    }
  }

  // (B) Advice: "tư vấn bàn phím", "tư vấn logitech", "tư vấn EK87"
  if (isAdviceIntent(lastUserText) && !isCheckoutIntent(lastUserText)) {
    const model = hasModelToken(lastUserText)
      ? lastUserText.match(/\b[a-z]{1,8}\d{2,5}[a-z]?\b/i)?.[0] ?? ''
      : '';

    const rs = await search_products(supabase, {
      q: model ? model : '',
      type: inferredType || '',
      brand: inferredBrand || '',
      min_price: budget.min,
      max_price: budget.max,
      limit: 10,
      sort: budget.max > 0 ? 'price_asc' : 'newest',
    });

    if (rs.ok && rs.items.length > 0) {
      lastSearchBySid.set(sid, rs.items);
      return json({
        ok: true,
        message:
          `Mình gợi ý một vài lựa chọn${
            inferredType ? ` (${inferredType})` : ''
          }${inferredBrand ? ` - hãng ${inferredBrand}` : ''}:\n` +
          formatList(rs.items, 5) +
          `\n\nBạn có thể nói: "chốt mẫu #1 - 1 cái" hoặc "lấy <model> 2 cái".`,
        results: rs.items.slice(0, 5),
      });
    }
  }

  // (C) Cheapest / Most expensive list (không checkout)
  const sortForExtreme = wantCheapest(lastUserText)
    ? 'price_asc'
    : wantMostExpensive(lastUserText)
    ? 'price_desc'
    : '';

  if (sortForExtreme && !isCheckoutIntent(lastUserText)) {
    const single = wantSingleItem(lastUserText);

    const rs = await search_products(supabase, {
      q: '',
      type: inferredType || '',
      brand: inferredBrand || '',
      min_price: 0,
      max_price: 0,
      limit: single ? 1 : 10,
      sort: sortForExtreme as any,
    });

    if (rs.ok && rs.items.length > 0) {
      lastSearchBySid.set(sid, rs.items);
      const pick = rs.items[0];

      if (single) {
        return json({
          ok: true,
          message:
            `Mặt hàng ${wantCheapest(lastUserText) ? 'rẻ nhất' : 'đắt nhất'}${
              inferredType ? ` (${inferredType})` : ''
            }:\n` +
            `1. ${pick.name} - ${Number(pick.price).toLocaleString(
              'vi-VN'
            )} đồng\n` +
            `\n\nBạn có thể nói: "chốt 1 cái" hoặc "chốt mẫu #1 - 1 cái".`,
          results: [pick],
        });
      }

      return json({
        ok: true,
        message:
          `${
            wantCheapest(lastUserText)
              ? 'Các sản phẩm rẻ nhất'
              : 'Các sản phẩm đắt nhất'
          }${inferredType ? ` (${inferredType})` : ''}:\n` +
          formatList(rs.items, 5) +
          `\n\nBạn có thể nói: "chốt mẫu #1 - 1 cái" hoặc "chốt rẻ nhất/đắt nhất".`,
        results: rs.items.slice(0, 5),
      });
    }
  }

  // (D) Random
  if (wantRandom(lastUserText) && !isCheckoutIntent(lastUserText)) {
    const rs = await search_products(supabase, {
      q: '',
      type: inferredType || '',
      brand: '',
      min_price: 0,
      max_price: 0,
      limit: 20,
      sort: 'newest',
    });

    if (rs.ok && rs.items.length > 0) {
      const pick = rs.items[Math.floor(Math.random() * rs.items.length)];
      // ✅ FIX #2: set lastSearch để “chốt 1 cái” hoạt động
      lastSearchBySid.set(sid, [pick]);
      return json({
        ok: true,
        message:
          `Mình chọn ngẫu nhiên giúp bạn:\n` +
          `1. ${pick.name} - ${Number(pick.price ?? 0).toLocaleString(
            'vi-VN'
          )} đồng\n` +
          `\n\nBạn có thể nói: "chốt 1 cái" hoặc "chốt mẫu #1 - 1 cái".`,
        results: [pick],
      });
    }

    return json({
      ok: true,
      message:
        'Mình chưa lấy được sản phẩm để chọn ngẫu nhiên. Bạn muốn chọn theo loại hàng nào không?',
    });
  }

  // (E) Sorted list request
  if (wantSortedList(lastUserText) && !isCheckoutIntent(lastUserText)) {
    const asc = /(thấp đến cao|thap den cao|giá thấp|gia thap)/.test(t);

    const rs = await search_products(supabase, {
      q: inferredType ? '' : cleanQuery(lastUserText),
      type: inferredType || '',
      brand: inferredBrand || '',
      min_price: budget.min,
      max_price: budget.max,
      limit: 10,
      sort: asc ? 'price_asc' : 'price_desc',
    });

    if (rs.ok && rs.items.length > 0) {
      lastSearchBySid.set(sid, rs.items);
      return json({
        ok: true,
        message:
          `Danh sách sản phẩm ${
            asc ? 'từ thấp đến cao' : 'từ cao đến thấp'
          }:\n` +
          formatList(rs.items, 5) +
          `\n\nBạn có thể nói: "chốt mẫu #1 - 1 cái".`,
        results: rs.items.slice(0, 5),
      });
    }
  }

  // =====================
  // Otherwise: Call Groq + tool loop
  // =====================
  const chat: any[] = [{ role: 'system', content: SYSTEM }];
  for (const m of messages) {
    chat.push({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    });
  }

  let lastCartAction: any = null;

  for (let step = 0; step < 4; step++) {
    const resp = await groqChat(chat);
    const content: string = resp?.choices?.[0]?.message?.content ?? '';
    let obj = safeJsonParse(content);
    obj = normalizeAiObj(obj);

    console.log('AI_OUT:', obj);

    if (!obj || (obj.type !== 'tool' && obj.type !== 'final')) {
      return json({
        ok: true,
        message:
          content || 'Mình chưa hiểu ý bạn. Bạn nói rõ hơn giúp mình nhé.',
        action: lastCartAction,
      });
    }

    if (obj.type === 'final') {
      return json({
        ok: true,
        message: String(obj.message ?? ''),
        action: lastCartAction,
      });
    }

    const name = String(obj.name ?? '');
    const args = obj.args ?? {};

    let toolResult: any = { ok: false, error: 'Unknown tool' };

    try {
      if (name === 'search_products') {
        if ((!args.type || String(args.type).trim() === '') && inferredType)
          args.type = inferredType;
        if ((!args.brand || String(args.brand).trim() === '') && inferredBrand)
          args.brand = inferredBrand;

        if (args.min_price == null) args.min_price = 0;
        if (args.max_price == null) args.max_price = 0;

        toolResult = await search_products(supabase, args);
        if (toolResult?.ok) lastSearchBySid.set(sid, toolResult.items ?? []);

        if (toolResult?.ok && (toolResult.items?.length ?? 0) === 0) {
          const qStr = String(args.q ?? '');
          if (hasModelToken(qStr)) {
            return json({
              ok: true,
              message:
                'Mình chưa thấy đúng mẫu bạn nêu trong shop. Bạn muốn mình gợi ý mẫu tương tự trong cùng tầm giá không?',
            });
          }
          return json({
            ok: true,
            message:
              'Mình chưa tìm thấy sản phẩm phù hợp theo tiêu chí này. Bạn thử nói rõ loại hàng hoặc ngân sách giúp mình nhé (ví dụ: "chuột dưới 500k", "laptop văn phòng dưới 20 triệu").',
          });
        }
      } else if (name === 'get_product') {
        toolResult = await get_product(supabase, args);
      } else if (name === 'build_cart') {
        toolResult = await build_cart(supabase, args);
        if (toolResult?.ok && toolResult?.cart) {
          lastCartAction = { type: 'cart', cart: toolResult.cart };
        }
      } else {
        toolResult = { ok: false, error: `Tool not supported: ${name}` };
      }
    } catch (e: any) {
      toolResult = { ok: false, error: e?.message ?? String(e) };
    }

    chat.push({ role: 'assistant', content });
    chat.push({
      role: 'user',
      content: JSON.stringify({ tool_result: { name, result: toolResult } }),
    });
  }

  return json(
    { ok: false, error: 'Tool loop exceeded', action: lastCartAction },
    { status: 500 }
  );
};
