import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

type ValidateItem = {
  product_id: number;
  quantity: number;
};

type StockError = {
  product_id: number;
  name: string;
  requested: number;
  available: number;
};

export const POST: RequestHandler = async ({ request, locals }) => {
  const body = await request.json().catch(() => null);
  
  if (!body?.items || !Array.isArray(body.items)) {
    return json({ ok: false, error: 'Invalid request', errors: [] }, { status: 400 });
  }

  const items: ValidateItem[] = body.items;
  
  if (items.length === 0) {
    return json({ ok: true, errors: [] });
  }

  try {
    const ids = items.map((x) => x.product_id);
    
    const { data: products, error } = await locals.supabase
      .from('products')
      .select('id, name, quantity, active')
      .in('id', ids);

    if (error) {
      return json({ ok: false, error: error.message, errors: [] }, { status: 500 });
    }

    const productMap = new Map<number, { name: string; quantity: number; active: boolean }>(
      (products ?? []).map((p) => [Number(p.id), { name: p.name, quantity: p.quantity, active: p.active }])
    );

    const errors: StockError[] = [];

    for (const item of items) {
      const product = productMap.get(item.product_id);
      
      if (!product) {
        errors.push({
          product_id: item.product_id,
          name: 'Sản phẩm không tồn tại',
          requested: item.quantity,
          available: 0,
        });
        continue;
      }

      if (!product.active) {
        errors.push({
          product_id: item.product_id,
          name: product.name,
          requested: item.quantity,
          available: 0,
        });
        continue;
      }

      if (product.quantity < item.quantity) {
        errors.push({
          product_id: item.product_id,
          name: product.name,
          requested: item.quantity,
          available: product.quantity,
        });
      }
    }

    return json({ 
      ok: errors.length === 0, 
      errors 
    });
  } catch (e: any) {
    console.error('Stock validation error:', e);
    return json({ ok: false, error: e?.message ?? 'Unknown error', errors: [] }, { status: 500 });
  }
};
