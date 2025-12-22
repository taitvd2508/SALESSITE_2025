# SALESSITE_2025 (ttstore-svelte-ui)

## Project Overview

This is a SvelteKit-based e-commerce application named `ttstore-svelte-ui`. It features a public-facing storefront and a dedicated admin dashboard. The project leverages Supabase for backend services (Authentication, Database) and Tailwind CSS for styling.

### Key Technologies

*   **Framework:** SvelteKit (v2.8.5)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (v3.4.17)
*   **Backend/Auth:** Supabase (using `@supabase/ssr` and `@supabase/supabase-js`)
*   **State Management:** Svelte Stores (e.g., `src/lib/stores/cart.ts`)

## Architecture & Structure

The project uses SvelteKit's file-based routing with route groups to separate concerns:

*   **`src/routes/(site)`**: The public-facing e-commerce site.
    *   Pages: Home, About, Account (Orders, Change Password), Cart, Checkout, Contact, Products.
*   **`src/routes/(admin)`**: The administration dashboard.
    *   Pages: Orders, Products, Roles, Users.
*   **`src/routes/auth`**: Authentication flow (Login, Register, Forgot Password, etc.).
*   **`src/routes/api`**: Backend API endpoints.
    *   `checkout`: Payment processing.
    *   `events`: User behavior tracking.
    *   `recommendations`: Product recommendations logic.

### Key Directories

*   **`src/lib`**: Shared code and components.
    *   `components`: Reusable UI components (`SiteHeader`, `SiteFooter`, `AdminShell`).
    *   `stores`: Global state management.
    *   `supabase`: Supabase client configuration.
*   **`src/hooks.server.ts`**: Server-side hooks.
    *   Handles session management via Supabase.
    *   Implements a custom tracking cookie `tt_sid` for anonymous user tracking.

## Configuration

*   **Environment Variables:** Requires `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
*   **Vite:** Configured to allow specific hosts (e.g., `webhook.trinhtaigroup.qzz.io`).
*   **TypeScript:** Configured with `strict: false`.

## Development

### Prerequisites

*   Node.js
*   Supabase project setup

### Commands

*   **Start Development Server:**
    ```bash
    npm run dev
    ```
*   **Build for Production:**
    ```bash
    npm run build
    ```
*   **Preview Production Build:**
    ```bash
    npm run preview
    ```
*   **Type Check:**
    ```bash
    npm run check
    ```

## Conventions

*   **Routing:** Uses SvelteKit route groups `(...)` to organize layouts without affecting the URL structure.
*   **Data Fetching:** Relies on `+page.server.ts` for server-side data loading.
*   **Styling:** Utility-first CSS using Tailwind.
