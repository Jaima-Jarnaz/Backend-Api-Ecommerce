# E-commerce (Fashionava) Backend API

**Version:** `1.0.0`

REST API backend for an e-commerce application. Built with Node.js, Express, and MongoDB. Handles user authentication, product management, order processing, and Cloudinary image storage.

---

## Features

### User Management

- User registration with email uniqueness check
- Password hashing with bcrypt (salt rounds: 10)
- Sign in with email and password validation
- JWT token generation on registration (1-hour expiry)
- Sign out (clears auth cookie)
- Protected route example (`GET /users/hello`) with JWT cookie auth
- User roles support (`user`, `admin`)

### Product Management

- Create new products with name, price, quantity, description, color, model, and image URL
- Get all products
- Search products by name (`?keyword=`)
- Get a single product by ID
- Update product details
- Delete a product

### Order Management

- Create orders with customer info, delivery address, products, and payment method
- Get all orders
- Get a single order by ID
- Update order delivery details (address, city, division)
- Delete an order

### Authentication & Security

- JWT-based authentication
- Cookie-based token storage (`cookie-parser`)
- Custom error handler with structured error responses
- Password comparison via bcrypt

### Database

- MongoDB with Mongoose ODM
- Schemas for Users, Products, and Orders

### Image Storage

- Cloudinary integration for product image uploads (configured via environment variables)

### API Utilities

- CORS enabled for cross-origin requests
- HTTP request logging with Morgan
- Centralized error handling middleware
- Custom `ApiFeatures` utility for product search

---

## Tech Stack

| Technology    | Version   | Purpose               |
| ------------- | --------- | --------------------- |
| Node.js       | `20.17.0` | Runtime (required)    |
| Express       | `4.22.2`  | Web framework         |
| MongoDB       | —         | Database              |
| Mongoose      | `7.8.9`   | ODM                   |
| jsonwebtoken  | `9.0.3`   | JWT authentication    |
| bcrypt        | `5.1.1`   | Password hashing      |
| Cloudinary    | `1.41.3`  | Image storage         |
| cookie-parser | `1.4.7`   | Cookie parsing        |
| cors          | `2.8.6`   | Cross-origin requests |
| dotenv        | `16.6.1`  | Environment variables |
| Morgan        | `1.11.0`  | Request logging       |
| Nodemon       | `2.0.22`  | Dev auto-reload       |

---

## Versions

| Package       | `package.json` | Installed (`package-lock.json`) |
| ------------- | -------------- | ------------------------------- |
| Project       | `1.0.0`        | `1.0.0`                         |
| Node.js       | —              | `20.17.0` (required)            |
| express       | `^4.18.2`      | `4.22.2`                        |
| mongoose      | `^7.1.1`       | `7.8.9`                         |
| jsonwebtoken  | `^9.0.0`       | `9.0.3`                         |
| bcrypt        | `^5.1.0`       | `5.1.1`                         |
| cloudinary    | `^1.37.0`      | `1.41.3`                        |
| cookie-parser | `^1.4.6`       | `1.4.7`                         |
| cors          | `^2.8.5`       | `2.8.6`                         |
| dotenv        | `^16.0.3`      | `16.6.1`                        |
| nodemon       | `^2.0.22`      | `2.0.22`                        |
| morgan        | `^1.10.0`      | `1.11.0`                        |

---

## Prerequisites

- **Node.js `20.17.0`** (required — other versions may cause runtime errors, e.g. v25 breaks `jsonwebtoken`)
- **npm** `10.x` or higher (bundled with Node 20.17.0)
- **MongoDB** `6.x` or higher (local or MongoDB Atlas)
- **Cloudinary** account (for product images)

### Install Node 20.17.0 with nvm

```bash
nvm install 20.17.0
nvm use 20.17.0
node -v   # should print v20.17.0
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Backend-Api-Ecommerce
```

### 2. Use Node 20.17.0

```bash
nvm use 20.17.0
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env` file

Create a `.env` file in the project root (same folder as `package.json`). The app loads variables via `dotenv` from this file — not from `.env.local`.

```bash
touch .env
```

Add the following from .env.local and replace the placeholder values with your own .env

> **Note:** Never commit `.env` to version control. It is already listed in `.gitignore`.

### 5. Run the development server

```bash
npm run dev
```

The server starts on `http://localhost:4000` (or the port set in `PORT`).

You should see:

```
Server is listening on port 4000
Database connected : <your-mongodb-host>
```

### 6. Run in production mode

```bash
npm run serve
```

---

## API Endpoints

Base URL: `http://localhost:4000`

### Users (`/users`)

| Method | Endpoint          | Auth | Description                            |
| ------ | ----------------- | ---- | -------------------------------------- |
| POST   | `/users/register` | No   | Register a new user                    |
| POST   | `/users/signin`   | No   | Sign in and receive JWT token          |
| POST   | `/users/signout`  | No   | Sign out (clears cookie)               |
| GET    | `/users/hello`    | Yes  | Protected route (requires auth cookie) |

**Register — `POST /users/register`**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": 1234567890,
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Sign in — `POST /users/signin`**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Products (`/products`)

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/products/all`          | Get all products        |
| GET    | `/products/all?keyword=` | Search products by name |
| POST   | `/products/new`          | Create a new product    |
| GET    | `/products/:id`          | Get a single product    |
| PUT    | `/products/update/:id`   | Update a product        |
| DELETE | `/products/delete/:id`   | Delete a product        |

**Get all products**

```
GET http://localhost:4000/products/all
```

**Search products**

```
GET http://localhost:4000/products/all?keyword=iphone
```

**Create product — `POST /products/new`**

```json
{
  "name": "iPhone 14 Pro",
  "price": 120000,
  "quantity": 10,
  "description": "Latest Apple smartphone",
  "color": "black",
  "model": "14 Pro",
  "imageUrl": {
    "public_id": "new_products/iphone-14",
    "url": "https://res.cloudinary.com/<cloud_name>/image/upload/v123/new_products/iphone-14.jpg"
  }
}
```

---

### Orders (`/orders`)

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| GET    | `/orders/all`        | Get all orders          |
| POST   | `/orders/create`     | Create a new order      |
| GET    | `/orders/:id`        | Get a single order      |
| PUT    | `/orders/update/:id` | Update delivery details |
| DELETE | `/orders/delete/:id` | Delete an order         |

**Create order — `POST /orders/create`**

```json
{
  "customer": {
    "name": "John Doe",
    "address": "123 Main St",
    "city": "Dhaka",
    "division": "Dhaka",
    "phone": 1234567890,
    "email": "john@example.com"
  },
  "deliveryPlace": {
    "address": "456 Delivery Rd",
    "city": "Dhaka",
    "division": "Dhaka"
  },
  "products": {
    "productId": "6597c53ee8ff6c7b09ec3700",
    "quantity": 2
  },
  "paymentMethod": "cash_on_delivery"
}
```

**Update order delivery — `PUT /orders/update/:id`**

```json
{
  "deliveryPlace": {
    "address": "789 New Address",
    "city": "Chittagong",
    "division": "Chittagong"
  }
}
```

---

## Project Structure

```
Backend-Api-Ecommerce/
├── src/
│   ├── app.js                  # Express app setup & routes
│   ├── server.js               # Server entry point
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── cloudinary.js       # Cloudinary configuration
│   ├── domains/
│   │   ├── products/           # Product routes, controller, model
│   │   ├── users/              # User routes, controller, model
│   │   └── orders/             # Order routes, controller, model
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── errorHandler.js     # Global error handler
│   ├── helpers/
│   │   └── constants.js        # API response constants
│   └── utils/
│       ├── apiFeatures.js      # Search & filter utilities
│       └── customErrorHandler.js
├── .env                        # Environment variables (create this)
├── package.json
└── README.md
```

---

## Scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start dev server with nodemon (auto-reload) |
| `npm run serve` | Start production server                     |

---

## Troubleshooting

**App crashes on startup with `buffer-equal-constant-time` error**

Use Node.js `20.17.0`. Higher versions (e.g. v25) can break older dependencies:

```bash
nvm use 20.17.0
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Database connection fails**

- Verify `DB_URL` in `.env` is correct
- Ensure your IP is whitelisted in MongoDB Atlas (if using Atlas)

**Port already in use**

Change `PORT` in `.env` or stop the process using port 4000.

---

## Author

Jaima

## License

ISC
