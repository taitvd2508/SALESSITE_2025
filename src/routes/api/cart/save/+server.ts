import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  const { data: { user } } = await locals.supabase.auth.getUser();
  
  if (!user) {
    return json({ ok: false, error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.items || !Array.isArray(body.items)) {
    return json({ ok: false, error: 'Invalid cart data' }, { status: 400 });
  }

  const items: Array<{ product_id: number; quantity: number }> = body.items;

  try {
    // Delete existing cart items for this user
    await locals.supabase
      .from('saved_cart')
      .delete()
      .eq('user_id', user.id);

    // Insert new cart items
    if (items.length > 0) {
      const rows = items.map((it) => ({
        user_id: user.id,
        product_id: it.product_id,
        quantity: it.quantity,
        meta: {},
      }));

      const { error: insertErr } = await locals.supabase
        .from('saved_cart')
        .insert(rows);

      if (insertErr) {
        console.error('saved_cart insert error:', insertErr.message);
        return json({ ok: false, error: insertErr.message }, { status: 500 });
      }
    }

    return json({ ok: true });
  } catch (e: any) {
    console.error('Cart save error:', e);
    return json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
};
