<<<<<<< HEAD
# vite-react-miniamazon-store
Modern full-stack storefront built with Vite + React on the frontend and Node + Express on the backend. The app delivers a MiniAmazon shopping experience with category and brand filtering, rich product cards, cart management, and protected auth flows.
=======
## ECommerce (Mini Amazon)

Modern full-stack storefront built with Vite + React on the frontend and Node + Express on the backend. The app delivers a MiniAmazon shopping experience with category and brand filtering, rich product cards, cart management, and protected auth flows.

### Highlights
- Rotating hero banner with CTA buttons that filter the catalog
- Category and brand filters backed by the API (`/api/products?category=...&brand=...`)
- Product detail pages with unique descriptions, add-to-cart, and buy-now actions
- Persistent shopping cart powered by React Context and `localStorage`
- Login/signup screens with form validation and friendly UI polish
- Express API serving 60+ curated products with placeholder images and filtering support

### Prerequisites
- Node.js 18+

### Install
```
npm install --prefix frontend
npm install --prefix backend
```

### Run (both apps)
```
npm run dev
```

Frontend: http://localhost:5173

Backend: http://localhost:5000 (health: /health, products: /api/products)

### Environment
Frontend can read `VITE_API_URL` (defaults to http://localhost:5000).

>>>>>>> 2d81a51 (Initial commit)

