import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const load = async () => {
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from('products')
    .select('id,name,slug,price,active')
    .limit(10);

  return {
    products: data ?? [],
    error: error?.message ?? null
  };
};
