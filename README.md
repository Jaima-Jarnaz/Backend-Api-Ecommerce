# E-commerce (Fashionava) Backend API

**Version:** `1.0.0`

REST API backend for an e-commerce application. Built with Node.js, Express, and MongoDB. Handles user authentication, product management, order processing, newsletter email subscriptions, and Cloudinary image storage.

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
- Automatically notify active newsletter subscribers when a new product is created

### Newsletter / Email Subscriptions

- Public email subscription (no account required)
- Email validation and duplicate handling
- Resubscribe support for previously unsubscribed users
- Unsubscribe via secure token link
- HTML confirmation page shown after unsubscribe (success, already unsubscribed, or error)
- New product notification emails sent via [Resend](https://resend.com) with styled HTML templates
- Background email delivery when products are created (non-blocking, no cron job)

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
- Schemas for Users, Products, Orders, and Subscribers

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
| Resend        | `6.12.4`  | Transactional email   |
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
| resend        | `^6.12.4`      | `6.12.4`                        |
| morgan        | `^1.10.0`      | `1.11.0`                        |

---

## Prerequisites

- **Node.js `20.17.0`** (required — other versions may cause runtime errors, e.g. v25 breaks `jsonwebtoken`)
- **npm** `10.x` or higher (bundled with Node 20.17.0)
- **MongoDB** `6.x` or higher (local or MongoDB Atlas)
- **Cloudinary** account (for product images)
- **Resend** account (for newsletter and product notification emails)

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
git clone https://github.com/Jaima-Jarnaz/Backend-Api-Ecommerce/
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

Add the following variables and replace the placeholder values with your own credentials:

```env
# Server
PORT=4000
BASE_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000

# Database
DB_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

# Auth
TOKEN_SECRET=your_jwt_secret
TOKEN_KEY=token

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Resend (email subscriptions)
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
```

| Variable         | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| `RESEND_API_KEY` | API key from [Resend Dashboard](https://resend.com/api-keys)                |
| `EMAIL_FROM`     | Sender address (`onboarding@resend.dev` for testing; use your domain in prod) |
| `FRONTEND_URL`   | Frontend base URL used in product links inside notification emails           |
| `BASE_URL`       | Backend base URL used for unsubscribe links in emails                       |

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

### Subscriptions (`/subscriptions`)

| Method | Endpoint                          | Auth | Description                                      |
| ------ | --------------------------------- | ---- | ------------------------------------------------ |
| POST   | `/subscriptions/subscribe`        | No   | Subscribe an email to the newsletter             |
| GET    | `/subscriptions/unsubscribe/:token` | No | Unsubscribe and show HTML confirmation page    |

**Subscribe — `POST /subscriptions/subscribe`**

```json
{
  "email": "user@example.com"
}
```

**Success responses**

| Status | Message                      | When                          |
| ------ | ---------------------------- | ----------------------------- |
| `201`  | `Subscribed successfully`    | New subscriber                |
| `200`  | `Already subscribed`         | Email is already active       |
| `200`  | `Resubscribed successfully`  | Previously unsubscribed email |

**Example success (`201`)**

```json
{
  "success": true,
  "message": "Subscribed successfully",
  "data": {
    "email": "user@example.com"
  }
}
```

**Error responses**

| Status | Message                    |
| ------ | -------------------------- |
| `400`  | `Email is required`        |
| `400`  | `Invalid email format`     |
| `409`  | `Email already subscribed` |
| `500`  | `Server error`             |

**Unsubscribe — `GET /subscriptions/unsubscribe/:token`**

When a user clicks the unsubscribe link in a product notification email, the backend:

1. Marks the subscriber as inactive (`isActive: false`)
2. Returns a styled HTML page (not JSON)

Example link (included in notification emails):

```
http://localhost:4000/subscriptions/unsubscribe/<unsubscribeToken>
```

**Unsubscribe page states**

| Case                    | HTTP Status | Page shown              |
| ----------------------- | ----------- | ----------------------- |
| Successfully unsubscribed | `200`     | Success confirmation    |
| Already unsubscribed    | `200`       | Already unsubscribed    |
| Invalid or expired token | `404`      | Error page              |
| Server error            | `500`       | Error page              |

### How product notification emails work

1. User subscribes via `POST /subscriptions/subscribe`
2. Admin creates a product via `POST /products/new`
3. After the product is saved, the API responds immediately
4. Emails are sent in the background to all active subscribers via Resend
5. Each email includes a product link (`FRONTEND_URL/product/:id`) and an unsubscribe link

No cron job is required — notifications are triggered instantly on product creation.

**Frontend integration example**

```javascript
const subscribeNewsletter = async (email) => {
  const res = await fetch("http://localhost:4000/subscriptions/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
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
│   │   ├── subscriptions/      # Newsletter subscribe, unsubscribe, notify logic
│   │   ├── users/              # User routes, controller, model
│   │   └── orders/             # Order routes, controller, model
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── errorHandler.js     # Global error handler
│   ├── helpers/
│   │   └── constants.js        # API response constants
│   └── utils/
│       ├── apiFeatures.js      # Search & filter utilities
│       ├── customErrorHandler.js
│       ├── emailTemplates.js   # HTML templates for product & unsubscribe emails
│       └── sendEmail.js        # Resend email sender utility
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

**Resend error: `Missing API key` on startup**

- Ensure `RESEND_API_KEY` is set in `.env`
- `dotenv.config()` must run before other modules load (configured at the top of `src/app.js` and `src/server.js`)

**Product notification emails not received**

- Confirm the subscriber email exists and `isActive: true` in the database
- With Resend's test sender (`onboarding@resend.dev`), emails can only be sent to verified addresses until you add your own domain
- Check server logs for `Failed to notify` or `Email send failed` messages

---

## Author

Jaima

## License

ISC
