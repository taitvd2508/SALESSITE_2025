import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

const fmtVND = (n: any) =>
  new Intl.NumberFormat('vi-VN').format(Number(n ?? 0)) + ' đ';

const fmtDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

const esc = (s: any) =>
  String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export const GET: RequestHandler = async ({ params, locals, url }) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) throw error(400, 'Invalid order id');

  //bạn đã chặn staff/admin ở (admin)/+layout.server.ts rồi,
  //nên ở đây chỉ cần fetch.
  const supabase = locals.supabase;

  //1) Order + status/method (join qua FK)
  const { data: order, error: oErr } = await supabase
    .from('orders')
    .select(
      `
    id, created_at, full_name, email, phone, address, note, total_price,
    order_status:status_id (id, code, name),
    order_method:method_id (id, code, name)
  `
    )
    .eq('id', id)
    .single();

  if (oErr || !order) throw error(404, oErr?.message ?? 'Order not found');

  //2) Details + product
  const { data: items, error: dErr } = await supabase
    .from('order_details')
    .select(
      `
      id, order_id, product_id, quantity, price,
      product:products(id, name, slug)
    `
    )
    .eq('order_id', id)
    .order('id', { ascending: true });

  if (dErr) throw error(500, dErr.message);

  const pickName = (x: any) => (Array.isArray(x) ? x?.[0]?.name : x?.name);

  const rows = (items ?? [])
    .map((it: any, idx: number) => {
      const lineTotal = Number(it.price ?? 0) * Number(it.quantity ?? 0);
      return `
        <tr>
          <td class="c">${idx + 1}</td>
          <td>
            <div class="name">${esc(it.product?.name ?? 'Sản phẩm')}</div>
            <div class="muted">${esc(it.product?.slug ?? '')}</div>
          </td>
          <td class="r">${fmtVND(it.price)}</td>
          <td class="c">${esc(it.quantity)}</td>
          <td class="r">${fmtVND(lineTotal)}</td>
        </tr>
      `;
    })
    .join('');

  const autoPrint = url.searchParams.get('print') !== '0'; //default: print
  const download = url.searchParams.get('download') === '1';

  const html = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Hoá đơn #${esc(order.id)}</title>
  <style>
    :root { --fg:#0b1220; --muted:#5b677a; --border:#e6eaf0; }
    *{ box-sizing:border-box; }
    body{ margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; color:var(--fg); background:#fff; }
    .wrap{ max-width:900px; margin:24px auto; padding:0 16px; }
    .top{ display:flex; justify-content:space-between; gap:16px; align-items:flex-start; }
    .brand{ font-weight:900; letter-spacing:-.02em; font-size:20px; }
    .muted{ color:var(--muted); font-size:12px; margin-top:4px; }
    .box{ border:1px solid var(--border); border-radius:14px; padding:14px; }
    .grid{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-top:14px; }
    .k{ font-size:12px; color:var(--muted); }
    .v{ font-weight:700; margin-top:4px; }
    table{ width:100%; border-collapse:collapse; margin-top:16px; }
    th, td{ border-bottom:1px solid var(--border); padding:10px 8px; vertical-align:top; }
    th{ text-align:left; font-size:12px; color:var(--muted); }
    .c{ text-align:center; }
    .r{ text-align:right; }
    .name{ font-weight:700; }
    .totals{ display:flex; justify-content:flex-end; margin-top:14px; }
    .tot{ min-width:320px; border:1px solid var(--border); border-radius:14px; padding:12px; }
    .row{ display:flex; justify-content:space-between; padding:6px 0; }
    .row strong{ font-size:16px; }
    .actions{ margin-top:14px; display:flex; gap:10px; justify-content:flex-end; }
    .btn{ border:1px solid var(--border); background:#fff; padding:10px 12px; border-radius:12px; cursor:pointer; font-weight:700; }
    .btn.primary{ background:#2563eb; color:#fff; border-color:#2563eb; }
    @media print{
      .actions{ display:none; }
      .wrap{ margin:0; max-width:none; }
      body{ background:#fff; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div>
        <div class="brand">TT STORE</div>
        <div class="muted">Hoá đơn bán hàng</div>
      </div>
      <div class="box" style="min-width:300px;">
        <div class="k">Mã đơn</div>
        <div class="v">#${esc(order.id)}</div>
        <div class="muted">Ngày tạo: ${esc(fmtDate(order.created_at))}</div>
        <div class="muted">Trạng thái: ${esc(
          pickName(order.order_status) ?? ''
        )}</div>
        <div class="muted">Thanh toán: ${esc(
          pickName(order.order_method) ?? ''
        )}</div>
      </div>
    </div>

    <div class="grid">
      <div class="box">
        <div class="k">Khách hàng</div>
        <div class="v">${esc(order.full_name)}</div>
        <div class="muted">Email: ${esc(order.email)}</div>
        <div class="muted">SĐT: ${esc(order.phone)}</div>
      </div>
      <div class="box">
        <div class="k">Địa chỉ nhận hàng</div>
        <div class="v">${esc(order.address)}</div>
        ${
          order.note
            ? `<div class="muted">Ghi chú: ${esc(order.note)}</div>`
            : `<div class="muted">Ghi chú: —</div>`
        }
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th class="c" style="width:54px;">#</th>
          <th>Sản phẩm</th>
          <th class="r" style="width:140px;">Đơn giá</th>
          <th class="c" style="width:90px;">SL</th>
          <th class="r" style="width:160px;">Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        ${
          rows ||
          `<tr><td colspan="5" class="muted">Không có sản phẩm.</td></tr>`
        }
      </tbody>
    </table>

    <div class="totals">
      <div class="tot">
        <div class="row">
          <span class="k">Tổng cộng</span>
          <strong>${fmtVND(order.total_price)}</strong>
        </div>
        <div class="muted">Giá đã gồm các điều chỉnh (nếu có).</div>
      </div>
    </div>

    <div class="actions">
      <button class="btn" onclick="window.close()">Đóng</button>
      <button class="btn primary" onclick="window.print()">In hoá đơn</button>
    </div>
  </div>

  ${autoPrint ? `<script>setTimeout(() => window.print(), 250)</script>` : ``}
</body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      ...(download
        ? {
            'content-disposition': `attachment; filename="invoice-${order.id}.html"`,
          }
        : {}),
    },
  });
};
