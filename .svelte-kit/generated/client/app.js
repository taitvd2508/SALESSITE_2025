export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26')
];

export const server_loads = [];

export const dictionary = {
		"/(site)": [13,[3]],
		"/(site)/about": [14,[3]],
		"/(site)/account": [15,[3]],
		"/(site)/account/change-password": [16,[3]],
		"/(site)/account/orders": [17,[3]],
		"/(admin)/admin": [4,[2]],
		"/(admin)/admin/orders": [5,[2]],
		"/(admin)/admin/orders/[id]": [6,[2]],
		"/(admin)/admin/orders/[id]/manage": [7,[2]],
		"/(admin)/admin/products": [8,[2]],
		"/(admin)/admin/products/[id]": [9,[2]],
		"/(admin)/admin/roles": [10,[2]],
		"/(admin)/admin/users": [11,[2]],
		"/(admin)/admin/users/[id]": [12,[2]],
		"/(site)/auth/forgot": [18,[3]],
		"/(site)/auth/login": [19,[3]],
		"/(site)/auth/register": [20,[3]],
		"/(site)/cart": [21,[3]],
		"/(site)/checkout": [22,[3]],
		"/(site)/contact": [23,[3]],
		"/(site)/products": [24,[3]],
		"/(site)/products/[id]": [~25,[3]],
		"/test-products": [~26]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.svelte';