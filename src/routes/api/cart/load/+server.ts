import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
  const { data: { user } } = await locals.supabase.auth.getUser();
  
  if (!user) {
    return json({ ok: false, error: 'Not authenticated', items: [] }, { status: 401 });
  }

  try {
    // Get saved cart items with product details
    const { data: cartItems, error } = await locals.supabase
      .from('saved_cart')
      .select(`
        product_id,
        quantity,
        products (
          id,
          slug,
          name,
          price,
          old_price,
          images
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('saved_cart load error:', error.message);
      return json({ ok: false, error: error.message, items: [] }, { status: 500 });
    }

    // Transform to cart item format
    const items = (cartItems ?? [])
      .filter((row: any) => row.products) // Only include items where product still exists
      .map((row: any) => ({
        product_id: Number(row.products.id),
        slug: row.products.slug,
        name: row.products.name,
        price: Number(row.products.price),
        old_price: row.products.old_price ? Number(row.products.old_price) : null,
        image: row.products.images?.[0] ?? null,
        quantity: row.quantity,
      }));

    return json({ ok: true, items });
  } catch (e: any) {
    console.error('Cart load error:', e);
    return json({ ok: false, error: e?.message ?? 'Unknown error', items: [] }, { status: 500 });
  }
};
