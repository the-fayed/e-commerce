const subcategoriesRoutes = require(`./../modules/subcategories/subcategories.routes`);
const appSettingRoutes = require("./../modules/app-settings/app-settings.routes");
const categoriesRoutes = require(`./../modules/categories/categories.routes`);
const wishlistsRoutes = require("./../modules/wishlists/wishlists.routes");
const addressesRoutes = require("./../modules/addresses/address.routes");
const productsRoutes = require(`./../modules/products/products.routes`);
const reviewsRoutes = require("./../modules/reviews/reviews.routes");
const couponsRoutes = require("./../modules/coupons/coupons.routes");
const ordersRoutes = require("./../modules/orders/orders.routes");
const brandsRoutes = require(`./../modules/brands/brands.routes`);
const cartsRoutes = require("./../modules/carts/carts.routes");
const usersRoutes = require(`./../modules/users/users.routes`);
const authRoutes = require(`./../modules/auth/auth.routes`);

exports.mountRoutes = (app) => {
  app.use(`/api/v1/subcategories`, subcategoriesRoutes);
  app.use("/api/v1/app-setting", appSettingRoutes);
  app.use(`/api/v1/categories`, categoriesRoutes);
  app.use("/api/v1/addresses", addressesRoutes);
  app.use("/api/v1/wishlist", wishlistsRoutes);
  app.use(`/api/v1/products`, productsRoutes);
  app.use("/api/v1/coupons", couponsRoutes);
  app.use("/api/v1/reviews", reviewsRoutes);
  app.use("/api/v1/orders", ordersRoutes);
  app.use(`/api/v1/brands`, brandsRoutes);
  app.use(`/api/v1/users`, usersRoutes);
  app.use("/api/v1/cart", cartsRoutes);
  app.use(`/api/v1/auth`, authRoutes);
};
