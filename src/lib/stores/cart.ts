// cart store dùng localStorage
import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';

export type CartItem = {
  product_id: number; // BIGINT id của products
  slug: string;
  name: string;
  price: number;
  old_price?: number | null;
  image?: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const STORAGE_KEY = 'tt_cart_v1';

function loadInitial(): CartState {
  if (!browser) return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed?.items || !Array.isArray(parsed.items)) return { items: [] };
    return { items: parsed.items };
  } catch {
    return { items: [] };
  }
}

function save(state: CartState) {
  if (!browser) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createCart() {
  const { subscribe, set, update } = writable<CartState>(loadInitial());

  if (browser) {
    // sync giữa tab
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) set(loadInitial());
    });
  }

  return {
    subscribe,

    clear() {
      set({ items: [] });
      save({ items: [] });
    },

    add(item: Omit<CartItem, 'quantity'>, qty = 1) {
      update((state) => {
        const items = [...state.items];
        const i = items.findIndex((x) => x.product_id === item.product_id);
        if (i >= 0) items[i] = { ...items[i], quantity: items[i].quantity + qty };
        else items.push({ ...item, quantity: Math.max(1, qty) });

        const next = { items };
        save(next);
        return next;
      });
    },

    remove(product_id: number) {
      update((state) => {
        const next = { items: state.items.filter((x) => x.product_id !== product_id) };
        save(next);
        return next;
      });
    },

    setQty(product_id: number, qty: number) {
      update((state) => {
        const items = state.items.map((x) =>
          x.product_id === product_id ? { ...x, quantity: Math.max(1, qty) } : x
        );
        const next = { items };
        save(next);
        return next;
      });
    },

    inc(product_id: number) {
      const state = get({ subscribe });
      const item = state.items.find((x) => x.product_id === product_id);
      if (!item) return;
      this.setQty(product_id, item.quantity + 1);
    },

    dec(product_id: number) {
      const state = get({ subscribe });
      const item = state.items.find((x) => x.product_id === product_id);
      if (!item) return;
      this.setQty(product_id, item.quantity - 1);
    }
  };
}

export const cart = createCart();

export function cartTotals(items: CartItem[]) {
  const subtotal = items.reduce((s, x) => s + x.price * x.quantity, 0);
  const count = items.reduce((s, x) => s + x.quantity, 0);
  return { subtotal, count };
}

export function vnd(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n) + ' ₫';
}
