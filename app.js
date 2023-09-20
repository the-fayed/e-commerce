const path = require(`path`);

const express = require("express");
const morgan = require(`morgan`);
const cors = require("cors");
const compression = require("compression");

const DBConnection = require(`./config/db.connection`);

// configure environment variables
require(`dotenv`).config();

const port = process.env.PORT || 4002;

// connecting to database
DBConnection();

const app = express();

// enable cors
app.use(cors());
app.options("*", cors());

// enable response compression
app.use(compression());

// @desc    Stripe webhook configuration
const checkoutWebhookHandler = require("./src/orders/controller/order.controller").checkoutWebhookHandler;
app.post("/checkout-webhook", express.raw({ type: "application/json" }), checkoutWebhookHandler);

// public middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, `uploads`)));

// logging on development mode
if (process.env.NODE_ENV === `development`) {
  app.use(morgan(`dev`));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// mount categories routes
const categoriesRoutes = require(`./src/categories/routes/categories.routes`);
app.use(`/api/v1/categories`, categoriesRoutes);
// mount subcategories routes
const subcategoriesRoutes = require(`./src/subcategories/routes/subcategories.routes`);
app.use(`/api/v1/subcategories`, subcategoriesRoutes);
// mount brands routes
const brandsRoutes = require(`./src/brands/routes/brands.routes`);
app.use(`/api/v1/brands`, brandsRoutes);
// mount products routes
const productsRoutes = require(`./src/products/routes/products.routes`);
app.use(`/api/v1/products`, productsRoutes);
// mount users routes
const usersRoutes = require(`./src/users/routes/users.routes`);
app.use(`/api/v1/users`, usersRoutes);
// mount auth routes
const authRoutes = require(`./src/auth/routes/auth.routes`);
app.use(`/api/v1/auth`, authRoutes);
// mount reviews routes
const reviewsRoutes = require("./src/reviews/routes/reviews.routes");
app.use("/api/v1/reviews", reviewsRoutes);
// mount wishlist routes
const wishlistRoutes = require("./src/wishlist/routes/wishlist.routes");
app.use("/api/v1/wishlist", wishlistRoutes);
// mount addresses routes
const addressesRoutes = require("./src/addresses/routes/address.routes");
app.use("/api/v1/addresses", addressesRoutes);
// mount coupons routes
const couponsRoutes = require("./src/coupons/routes/coupons.routes");
app.use("/api/v1/coupons", couponsRoutes);
// mount cart routes
const cartRoutes = require("./src/cart/routes/cart.routes");
app.use("/api/v1/cart", cartRoutes);
// mount orders routes
const ordersRoutes = require("./src/orders/routes/order.routes");
app.use("/api/v1/orders", ordersRoutes);
// mount app setting routes
const appSettingRoutes = require("./src/appSetting/routes/appSetting.routs");
app.use("/api/v1/appSetting", appSettingRoutes);

// handle unhandled routes
const { unhandledRoutesHandler, globalErrorHandler } = require(`./common/middleware/error.handling.middleware`);
app.all(`*`, unhandledRoutesHandler);

// global error handling middleware
app.use(globalErrorHandler);

const server = app.listen(port, () => console.log(`app is running on port ${port}`));

// handle rejections outside express
process.on(`unhandledRejection`, (error) => {
  console.error(`Unhandled Rejection error >> ${error.name} || ${error.message}`);
  server.close(() => {
    console.error(`Shuting down...`);
    process.exit(1);
  });
});
