import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, locals: { supabase }, url }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;
    const full_name = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    const agree = formData.get("agree");

    if (!agree) {
      return fail(400, {
        error: "Bạn cần đồng ý Điều khoản dịch vụ.",
        values: { email, full_name, phone },
      });
    }

    if (!email || !password || !confirm) {
      return fail(400, {
        error: "Vui lòng điền đầy đủ thông tin.",
        values: { email, full_name, phone },
      });
    }

    if (password.length < 6) {
      return fail(400, {
        error: "Mật khẩu tối thiểu 6 ký tự.",
        values: { email, full_name, phone },
      });
    }

    if (password !== confirm) {
      return fail(400, {
        error: "Xác nhận mật khẩu không khớp.",
        values: { email, full_name, phone },
      });
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name, phone },
        emailRedirectTo: `${url.origin}/auth/callback`,
      },
    });

    if (error) {
      return fail(400, {
        error: error.message,
        values: { email, full_name, phone },
      });
    }

    return { success: true, email };
  },
};
