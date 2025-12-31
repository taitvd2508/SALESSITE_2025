import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();

  if (user && url.pathname !== "/auth/callback") {
    throw redirect(303, "/account");
  }

  return {};
};
