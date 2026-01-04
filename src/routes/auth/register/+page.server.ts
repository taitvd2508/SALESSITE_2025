import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const confirm = String(formData.get('confirm') ?? '');
    const full_name = String(formData.get('full_name') ?? '');
    const phone = String(formData.get('phone') ?? '');
    const agree = formData.get('agree');

    if (!agree) {
      return fail(400, {
        error: 'Bạn cần đồng ý Điều khoản dịch vụ.',
        values: { email, full_name, phone },
      });
    }

    if (!email || !password || !confirm) {
      return fail(400, {
        error: 'Vui lòng điền đầy đủ thông tin.',
        values: { email, full_name, phone },
      });
    }

    if (password.length < 6) {
      return fail(400, {
        error: 'Mật khẩu tối thiểu 6 ký tự.',
        values: { email, full_name, phone },
      });
    }

    if (password !== confirm) {
      return fail(400, {
        error: 'Xác nhận mật khẩu không khớp.',
        values: { email, full_name, phone },
      });
    }

    // KHÔNG signUp ở server nữa (tránh lỗi code_verifier)
    return {
      success: true,
      values: { email: email.trim(), full_name, phone },
      // Không trả password/confirm về client
    };
  },
};
