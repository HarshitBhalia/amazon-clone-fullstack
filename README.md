# Amazon Clone - Full Stack E-Commerce Application

A full-stack e-commerce web application that replicates Amazon's design and user experience, built with React.js, Express.js, and PostgreSQL.

## Live Demo
- **Frontend (Vercel)**: [https://amazon-clone-fullstack.vercel.app](https://amazon-clone-fullstack.vercel.app)
- **Backend API (Render)**: [https://amazon-clone-backend-1ovu.onrender.com](https://amazon-clone-backend-1ovu.onrender.com)
## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router v6, Axios, React Icons |
| **Backend** | Node.js, Express.js, CORS |
| **Database** | PostgreSQL with `pg` driver |
| **Styling** | Vanilla CSS with Amazon color palette |

## Features

### Core Features
- **Product Listing**: Grid layout with search by name and filter by category
- **Product Detail**: Image gallery, specifications table, ratings, Add to Cart & Buy Now
- **Shopping Cart**: View items, update quantities, remove items, subtotals
- **Checkout**: Shipping address form, order summary, place order
- **Order Confirmation**: Success page with order ID and purchased items

### Bonus Features
- **Responsive Design**: Mobile, tablet, and desktop layouts (1/2/3/4 column grids)
- **Order History**: View past orders with details
- **Hero Carousel**: Auto-playing image carousel on homepage
- **Loading Skeletons**: Smooth loading states for all pages
- **Amazon-like UI**: Sticky navbar, category sub-nav, footer, product cards

## Project Structure

```
amazon-clone/
├── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, ProductCard, ProductGrid, CartItem, SearchBar, ImageCarousel, Footer
│   │   ├── pages/         # HomePage, ProductDetailPage, CartPage, CheckoutPage, OrderConfirmationPage, OrderHistoryPage
│   │   ├── context/       # CartContext (global cart state)
│   │   ├── services/      # api.js (Axios API calls)
│   │   ├── App.jsx        # Router setup
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # All styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── config/            # db.js (PostgreSQL connection)
│   ├── models/            # productModel, cartModel, orderModel
│   ├── controllers/       # productController, cartController, orderController
│   ├── routes/            # productRoutes, cartRoutes, orderRoutes
│   ├── server.js          # Express app entry point
│   └── package.json
├── database/
│   ├── schema.sql         # Table definitions
│   └── seed.sql           # Sample product data
└── README.md
```

## Database Schema

| Table | Description |
|-------|------------|
| `users` | User accounts (default user ID=1) |
| `products` | Product catalog with images, specs, ratings |
| `cart` | Shopping cart items per user |
| `orders` | Order records with shipping details |
| `order_items` | Individual products within an order |
| `wishlist` | Saved products (bonus) |

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products (query: `search`, `category`) |
| GET | `/api/products/categories` | Get all categories |
| GET | `/api/products/:id` | Get product by ID |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart items (query: `userId`) |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update` | Update item quantity |
| DELETE | `/api/cart/remove` | Remove item from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders/:userId` | Get orders by user |
| GET | `/api/orders/detail/:orderId` | Get order details |

## Setup Instructions

### Prerequisites
- **Node.js** v18+ and npm
- **PostgreSQL** v14+

### 1. Database Setup

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE amazon_clone;

# Connect to it
\c amazon_clone

# Run schema
\i database/schema.sql

# Run seed data
\i database/seed.sql

# Exit
\q
```

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

The API server starts at `http://localhost:5000`.

**Environment Variables** (optional `.env` file in `backend/`):
```
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=amazon_clone
PORT=5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at `http://localhost:5173`.

## Assumptions

- A default user (ID=1) is assumed to be logged in — no authentication required
- All prices are in Indian Rupees (₹)
- Product images use Unsplash URLs (requires internet connection)
- PostgreSQL uses default credentials (`postgres`/`postgres` on port `5432`)
- The Vite dev server proxies `/api` requests to the backend at port `5000`

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Dark | `#131921` | Navbar background |
| Secondary | `#232F3E` | Sub-navbar, footer |
| Accent Yellow | `#FFD814` | Add to Cart buttons |
| Buy Now Orange | `#FFA41C` | Buy Now buttons |
| Page Background | `#E3E6E6` | Page background |
