import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, url }) => {
  const { user } = await locals.getSession();
  if (!user)
    throw redirect(303, `/auth/login?next=${encodeURIComponent(url.pathname)}`);

  return {
    email: user.email ?? "",
  };
};

//chưa login thì redirect về trang login
