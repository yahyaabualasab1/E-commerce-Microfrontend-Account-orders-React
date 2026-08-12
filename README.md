# Account Orders Microfrontend

Account Orders Microfrontend is a React and Vite application for the account area of a car parts and accessories marketplace. It provides authenticated customer screens for profile management, order history, wishlist items, product reviews, and a dashboard summary.

The project currently uses an in-memory mock service layer with asynchronous Promise-based calls. This keeps the UI close to production behavior while remaining easy to run locally without a backend.

## Submission Links

- Live component URL: [https://e-commerce-microfrontend-account-or.vercel.app](https://e-commerce-microfrontend-account-or.vercel.app)
- Repository: [https://github.com/yahyaabualasab1/E-commerce-Microfrontend-Account-orders-](https://github.com/yahyaabualasab1/E-commerce-Microfrontend-Account-orders-)
- Group app type: Car parts & accessories
- Owned role: Account & orders
- Framework: React
- Material Design library: Material UI

## Project Overview

- Framework: React 19 with TypeScript
- Build tool: Vite
- UI system: Material UI
- Routing: React Router
- Forms and validation: React Hook Form with Zod
- Data layer: mock services under `src/services`
- Microfrontend entry points: mount function and custom element registration
- Deployment: Vercel

Demo credentials:

- Email: `alex.morgan@example.com`
- Password: `Password123`

You can also create a new account from the register page.

## Features

- Authentication flow with guest and protected routes
- Persistent demo session using `localStorage`
- Responsive dashboard with account, order, wishlist, review, and profile status cards
- Editable profile dialog with validation and async save handling
- Order history with detail dialogs
- Wishlist grid with remove, restore, loading, error, and empty states
- Product reviews with images, Material UI ratings, edit dialogs, delete actions, loading, error, and empty states
- Premium split-screen authentication for login and registration
- Advanced wishlist search, category/brand/availability filters, sorting, grid/list views, confirmation dialogs, and load-more pagination
- Reviews analytics, rating distribution, search, rating/category filters, sorting, edit validation, and delete confirmations
- Shared UI primitives for page headers, loading indicators, empty states, error retry states, and snackbars
- Route-level lazy loading for better initial bundle performance
- Web Component support for future host application integration

## Exposed Routes

The component is a standalone SPA and supports the following routes:

- `/login`
- `/register`
- `/dashboard`
- `/profile`
- `/orders`
- `/wishlist`
- `/reviews`

Protected routes redirect unauthenticated users to `/login`. Vercel SPA rewrites are configured in `vercel.json`, so refreshing nested routes such as `/profile`, `/orders`, `/wishlist`, or `/reviews` works after deployment.

## Folder Structure

```text
src/
  app/                 Application shell, providers, and mount helpers
  components/          Shared UI components
    brand/             Brand mark
    feedback/          Loading, error, empty, and snackbar components
    media/             Product image handling with skeletons and fallbacks
    navigation/        Navigation menu
    page/              Page-level layout components
    shell/             App bar, drawer, and footer
  config/              Environment and navigation configuration
  contexts/            React contexts, including authentication
  features/            Feature modules grouped by domain
    auth/              Login, register, and auth validation
    dashboard/         Dashboard page and summary data
    orders/            Orders page, cards, dialogs, types, and formatters
    profile/           Profile page, edit dialog, and schema
    reviews/           Reviews page, cards, edit dialog, types, and formatters
    wishlist/          Wishlist page, product cards, types, and formatters
  hooks/               Shared React hooks
  mocks/               Central mock data for users, orders, wishlist, and reviews
  routes/              Route guards and application route map
  services/            Mock API services and HTTP client placeholder
  styles/              Theme and global styles
  types/               Shared domain types
  utils/               Shared formatting and utility helpers
  web-component/       Custom element wrapper for microfrontend usage
```

## Installation

Install dependencies with:

```bash
npm install
```

The project requires Node.js `20.19.0` or newer.

## Development

Start the local development server:

```bash
npm run dev
```

Vite serves the app at the URL printed in the terminal, usually `http://localhost:5173`.

Useful scripts:

```bash
npm run lint
npm run typecheck
npm run format:check
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production output locally:

```bash
npm run preview
```

The build uses route-level code splitting, generates a Vite manifest, and outputs assets to `dist/`.

## Future Microfrontend Integration

The app already exposes two integration paths for a host application:

- `mountAccountOrdersApp(containerOrId)` mounts the React app into a provided DOM element.
- `registerAccountOrdersElement()` registers the custom element named `account-orders-microfrontend`.
- The deployed URL can also be loaded by a shell app using iframe composition.

A future host shell can load the built JavaScript bundle, call the mount function directly, or render:

```html
<account-orders-microfrontend></account-orders-microfrontend>
```

Recommended next integration steps:

- Replace mock services with API-backed implementations while keeping the service contracts stable.
- Externalize shared dependencies such as React and Material UI if the host application already provides them.
- Add host-provided configuration for API base URL, auth tokens, locale, and navigation callbacks.
- Define a versioned contract for events emitted from the microfrontend to the host shell.

## Integration Notes

This component is prepared to integrate with the group shell as a live deployed microfrontend URL. For the fastest cross-framework integration, the shell can load this component through iframe composition. For a more advanced integration, the shell can use the provided custom element wrapper after loading the built bundle.

The hardest part of this component was keeping account-specific state isolated while still using mock data. Session, wishlist, reviews, profile preferences, and profile images are persisted with `localStorage` keys so the UI behaves like a real account area without requiring a backend.

### Emitted CustomEvents

The wishlist page emits framework-agnostic browser events for future Vue, Lit, or Cart microfrontend integration:

```ts
account: wishlist - move - to - cart;
```

```ts
{
  productId: string;
  productName: string;
  price: number;
  quantity: 1;
  source: 'account-orders';
}
```

```ts
account: wishlist - item - removed;
```

```ts
{
  productId: string;
  source: 'account-orders';
}
```

```ts
account: wishlist - cleared;
```

```ts
{
  productIds: string[];
  source: "account-orders";
}
```
