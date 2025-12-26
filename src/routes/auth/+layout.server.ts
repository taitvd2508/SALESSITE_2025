import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  // cách 1: dùng getSession bạn đã gắn trong hooks (khuyến nghị)
  const { session } = await locals.getSession();

  // Nếu bạn chưa có locals.getSession thì dùng:
  // const { data: { session } } = await locals.supabase.auth.getSession();

  if (session) {
    // ✅ đã login => cấm vào /auth/*
    throw redirect(303, '/account');
    // hoặc: throw redirect(303, url.searchParams.get('next') ?? '/account')
  }

  return {};
};
