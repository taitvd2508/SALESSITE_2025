//cart store dùng localStorage
import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';

export type CartItem = {
  product_id: number; //BIGINT id của products
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
    //sync giữa tab
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) set(loadInitial());
    });
  }

  return {
    subscribe,
    set,
    clear() {
      set({ items: [] });
      save({ items: [] });
    },

    add(item: Omit<CartItem, 'quantity'>, qty = 1) {
      update((state) => {
        const items = [...state.items];
        const i = items.findIndex((x) => x.product_id === item.product_id);
        if (i >= 0)
          items[i] = { ...items[i], quantity: items[i].quantity + qty };
        else items.push({ ...item, quantity: Math.max(1, qty) });

        const next = { items };
        save(next);
        return next;
      });
    },

    remove(product_id: number) {
      update((state) => {
        const next = {
          items: state.items.filter((x) => x.product_id !== product_id),
        };
        save(next);
        return next;
      });
    },

    removeByKeyword(keyword: string) {
      const k = (keyword ?? '').toLowerCase().trim();
      if (!k) return;

      update((state) => {
        const next = {
          items: state.items.filter((x) => {
            const name = String(x.name ?? '').toLowerCase();
            const slug = String(x.slug ?? '').toLowerCase();

            // keyword có thể là "tai nghe", "bàn phím", "k380", "r7000p"...
            return !name.includes(k) && !slug.includes(k);
          }),
        };
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

      //remove item if quantity would become 0 or less
      if (item.quantity <= 1) {
        this.remove(product_id);
      } else {
        this.setQty(product_id, item.quantity - 1);
      }
    },
  };
}

export const cart = createCart();

//save cart to server (for logout)
export async function saveCartToServer(): Promise<boolean> {
  if (!browser) return false;
  const state = get(cart);
  if (state.items.length === 0) return true;

  try {
    const res = await fetch('/api/cart/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: state.items.map((x) => ({
          product_id: x.product_id,
          quantity: x.quantity,
        })),
      }),
    });
    const data = await res.json();
    return data.ok === true;
  } catch (e) {
    console.error('saveCartToServer error:', e);
    return false;
  }
}

//load cart from server and merge with localStorage (for login)
export async function mergeCartFromServer(): Promise<{
  merged: boolean;
  addedCount: number;
}> {
  if (!browser) return { merged: false, addedCount: 0 };

  try {
    const res = await fetch('/api/cart/load');
    const data = await res.json();

    if (!data.ok || !Array.isArray(data.items) || data.items.length === 0) {
      return { merged: false, addedCount: 0 };
    }

    const serverItems: CartItem[] = data.items;
    const localState = get(cart);
    const localItems = [...localState.items];

    let addedCount = 0;

    //merge: add server items to local cart
    for (const serverItem of serverItems) {
      const localIndex = localItems.findIndex(
        (x) => x.product_id === serverItem.product_id
      );
      if (localIndex >= 0) {
        //product exists in local cart - add quantities
        localItems[localIndex] = {
          ...localItems[localIndex],
          quantity: localItems[localIndex].quantity + serverItem.quantity,
        };
        addedCount += serverItem.quantity;
      } else {
        //product not in local cart - add it
        localItems.push(serverItem);
        addedCount += serverItem.quantity;
      }
    }

    if (addedCount > 0) {
      const next = { items: localItems };
      cart.set(next);
      save(next);

      //clear server cart after merging
      await fetch('/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [] }),
      });
    }

    return { merged: true, addedCount };
  } catch (e) {
    console.error('mergeCartFromServer error:', e);
    return { merged: false, addedCount: 0 };
  }
}

//clear localStorage cart only (for logout)
export function clearLocalCart() {
  if (!browser) return;
  cart.set({ items: [] });
  save({ items: [] });
}

export function cartTotals(items: CartItem[]) {
  const subtotal = items.reduce((s, x) => s + x.price * x.quantity, 0);
  const count = items.reduce((s, x) => s + x.quantity, 0);
  return { subtotal, count };
}

export function vnd(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n) + ' ₫';
}
