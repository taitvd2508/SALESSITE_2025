
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(site)" | "/(admin)" | "/" | "/(site)/about" | "/(site)/account" | "/(site)/account/change-password" | "/(site)/account/orders" | "/(admin)/admin" | "/(admin)/admin/orders" | "/(admin)/admin/orders/[id]" | "/(admin)/admin/orders/[id]/manage" | "/(admin)/admin/products" | "/(admin)/admin/products/[id]" | "/(admin)/admin/roles" | "/(admin)/admin/users" | "/(admin)/admin/users/[id]" | "/api" | "/api/events" | "/api/recommendations" | "/(site)/auth" | "/(site)/auth/forgot" | "/(site)/auth/login" | "/(site)/auth/register" | "/(site)/cart" | "/(site)/checkout" | "/(site)/contact" | "/(site)/products" | "/(site)/products/[id]" | "/test-products";
		RouteParams(): {
			"/(admin)/admin/orders/[id]": { id: string };
			"/(admin)/admin/orders/[id]/manage": { id: string };
			"/(admin)/admin/products/[id]": { id: string };
			"/(admin)/admin/users/[id]": { id: string };
			"/(site)/products/[id]": { id: string }
		};
		LayoutParams(): {
			"/(site)": { id?: string };
			"/(admin)": { id?: string };
			"/": { id?: string };
			"/(site)/about": Record<string, never>;
			"/(site)/account": Record<string, never>;
			"/(site)/account/change-password": Record<string, never>;
			"/(site)/account/orders": Record<string, never>;
			"/(admin)/admin": { id?: string };
			"/(admin)/admin/orders": { id?: string };
			"/(admin)/admin/orders/[id]": { id: string };
			"/(admin)/admin/orders/[id]/manage": { id: string };
			"/(admin)/admin/products": { id?: string };
			"/(admin)/admin/products/[id]": { id: string };
			"/(admin)/admin/roles": Record<string, never>;
			"/(admin)/admin/users": { id?: string };
			"/(admin)/admin/users/[id]": { id: string };
			"/api": Record<string, never>;
			"/api/events": Record<string, never>;
			"/api/recommendations": Record<string, never>;
			"/(site)/auth": Record<string, never>;
			"/(site)/auth/forgot": Record<string, never>;
			"/(site)/auth/login": Record<string, never>;
			"/(site)/auth/register": Record<string, never>;
			"/(site)/cart": Record<string, never>;
			"/(site)/checkout": Record<string, never>;
			"/(site)/contact": Record<string, never>;
			"/(site)/products": { id?: string };
			"/(site)/products/[id]": { id: string };
			"/test-products": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/about/" | "/account" | "/account/" | "/account/change-password" | "/account/change-password/" | "/account/orders" | "/account/orders/" | "/admin" | "/admin/" | "/admin/orders" | "/admin/orders/" | `/admin/orders/${string}` & {} | `/admin/orders/${string}/` & {} | `/admin/orders/${string}/manage` & {} | `/admin/orders/${string}/manage/` & {} | "/admin/products" | "/admin/products/" | `/admin/products/${string}` & {} | `/admin/products/${string}/` & {} | "/admin/roles" | "/admin/roles/" | "/admin/users" | "/admin/users/" | `/admin/users/${string}` & {} | `/admin/users/${string}/` & {} | "/api" | "/api/" | "/api/events" | "/api/events/" | "/api/recommendations" | "/api/recommendations/" | "/auth" | "/auth/" | "/auth/forgot" | "/auth/forgot/" | "/auth/login" | "/auth/login/" | "/auth/register" | "/auth/register/" | "/cart" | "/cart/" | "/checkout" | "/checkout/" | "/contact" | "/contact/" | "/products" | "/products/" | `/products/${string}` & {} | `/products/${string}/` & {} | "/test-products" | "/test-products/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}