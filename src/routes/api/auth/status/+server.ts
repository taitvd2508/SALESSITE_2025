import { json } from "@sveltejs/kit";

export const GET = async ({ locals: { getSession } }) => {
  const { user } = await getSession();
  return json({ user });
};
