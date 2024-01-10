const path = require(`path`);

const express = require("express");
const morgan = require(`morgan`);
const cors = require("cors");
const compression = require("compression");

const { unhandledRoutesHandler, globalErrorHandler } = require(`../shared/middlewares/error.handling.middleware`);
const limiter = require('../shared/middlewares/rate-limiter.middleware');
const DBConnection = require("./../config/db-connection");

// configure environment variables
require(`dotenv`).config();

// connecting to database
DBConnection();

const app = express();

// app middlewares
app.use(cors());
app.options("*", cors());
app.use(compression());
app.use(limiter);

// @desc    Stripe webhook configuration
const checkoutWebhookHandler = require("./../modules/orders/orders.controller").checkoutWebhookHandler;
app.post("/checkout-webhook", express.raw({ type: "application/json" }), checkoutWebhookHandler);

// public middleware
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));
app.use(express.static(path.join(__dirname, `uploads`)));

// logging on development mode
if (process.env.NODE_ENV === `development`) {
  app.use(morgan(`dev`));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// mount categories routes
const categoriesRoutes = require(`./../modules/categories/categories.routes`);
app.use(`/api/v1/categories`, categoriesRoutes);
// mount subcategories routes
const subcategoriesRoutes = require(`./../modules/subcategories/subcategories.routes`);
app.use(`/api/v1/subcategories`, subcategoriesRoutes);
// mount brands routes
const brandsRoutes = require(`./../modules/brands/brands.routes`);
app.use(`/api/v1/brands`, brandsRoutes);
// mount products routes
const productsRoutes = require(`./../modules/products/products.routes`);
app.use(`/api/v1/products`, productsRoutes);
// mount users routes
const usersRoutes = require(`./../modules/users/users.routes`);
app.use(`/api/v1/users`, usersRoutes);
// mount auth routes
const authRoutes = require(`./../modules/auth/auth.routes`);
app.use(`/api/v1/auth`, authRoutes);
// mount reviews routes
const reviewsRoutes = require("./../modules/reviews/reviews.routes");
app.use("/api/v1/reviews", reviewsRoutes);
// mount wishlist routes
const wishlistsRoutes = require("./../modules/wishlists/wishlists.routes");
app.use("/api/v1/wishlist", wishlistsRoutes);
// mount addresses routes
const addressesRoutes = require("./../modules/addresses/address.routes");
app.use("/api/v1/addresses", addressesRoutes);
// mount coupons routes
const couponsRoutes = require("./../modules/coupons/coupons.routes");
app.use("/api/v1/coupons", couponsRoutes);
// mount cart routes
const cartsRoutes = require("./../modules/carts/carts.routes");
app.use("/api/v1/cart", cartsRoutes);
// mount orders routes
const ordersRoutes = require("./../modules/orders/orders.routes");
app.use("/api/v1/orders", ordersRoutes);
// mount app setting routes
const appSettingRoutes = require("./../modules/app-settings/app-settings.routes");
app.use("/api/v1/app-setting", appSettingRoutes);

// handle unhandled routes
app.all(`*`, unhandledRoutesHandler);

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
