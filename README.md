# NxtTrendz E-commerce Application

A React-based e-commerce frontend that supports user login, protected routes, product listing, product details, sorting, filtering, and cart basics.

## Features

- User authentication flow with login API
- Authorization using JWT stored in browser cookies
- Protected routing for authenticated pages
- Product listing with sorting and filters
- Product details with similar products
- Add-to-cart flow with cart display

## Tech Stack

- React (Class and Functional Components)
- React Router DOM (`v5`)
- `js-cookie` for token handling
- `react-loader-spinner` for loading states

## Authentication and Authorization (Cookies)

- On successful login, JWT token is saved as `jwt_token` using `js-cookie`.
- Protected pages verify the token before rendering.
- If token is missing/invalid, user is redirected to `/login`.
- On logout, `jwt_token` is removed and user is redirected to login.

Main files:

- `src/components/LoginForm/index.js`
- `src/components/ProtectedRoute/index.js`
- `src/components/Header/index.js`

## Routing

Application routes are configured in `src/components/App.js`.

- `/login` -> Login page
- `/` -> Home (protected)
- `/products` -> Products list (protected)
- `/products/:id` -> Product details (protected)
- `/cart` -> Cart page (protected)
- `/not-found` -> Not found page

`ProtectedRoute` wraps private routes and checks `jwt_token` from cookies.

## Product Sorting and Filtering

Sorting and filter logic is handled in `AllProductsSection`.

- Sort options:
  - `PRICE_HIGH`
  - `PRICE_LOW`
- Supports category, rating, and search filters.
- Selected sort/filter values are used to build query params for products API.

Main file:

- `src/components/AllProductsSection'/index.js`

## Cart Flow

- From product details page, clicking `ADD TO CART` stores selected item in `localStorage`.
- If product already exists in cart, quantity is incremented.
- User is navigated to `/cart` after adding.
- Cart page reads and renders stored cart items.

Main files:

- `src/components/ProductitemDetails/index.js`
- `src/components/Cart/index.js`

## Getting Started

### Prerequisites

- Node.js (recommended: LTS version)
- npm

### Installation

```bash
npm install
```

### Run development server

```bash
npm start
```

App runs at:

- [http://localhost:3001](http://localhost:3001)

### Build for production

```bash
npm run build
```

## Project Structure

```text
src/
  components/
    App.js
    LoginForm/
    ProtectedRoute/
    Header/
    Products/
    ProductitemDetails/
    SimilarProductItem/
    Cart/
```

## Notes

- This project currently stores cart data in browser `localStorage`.
- JWT token is stored in cookies and used for authenticated API requests.
