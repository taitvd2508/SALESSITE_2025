import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();

  //don't redirect if on callback page
  if (url.pathname === "/auth/callback") {
    return {};
  }

  if (user) {
    //preserve the next parameter for redirect destination
    const next = url.searchParams.get("next");
    const destination = next && next.startsWith("/") ? next : "/account";
    throw redirect(303, destination);
  }

  return {};
};
