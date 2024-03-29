const router = require(`express`).Router();

const {
  getAllProductsHandler,
  getSpecificProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("./products.controller");

const { uploadProductImages, imageProcessing } = require("./image-processing");

const {
  getSpecificProductValidator,
  updateProductValidator,
  deleteProductValidator,
  createProductValidator,
} = require("./products.validator");

const { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } = require("./endpoints");

const { isAuthorized } = require("../../shared/middlewares/authorization.middleware");

const reviewsRoutes = require('../reviews/reviews.routes');

router.use('/:productId/reviews', reviewsRoutes);

router
  .route(`/`)
  .get(getAllProductsHandler)
  .post(
    isAuthorized(CREATE_PRODUCT),
    uploadProductImages,
    imageProcessing,
    createProductValidator,
    createProductHandler
  );
router
  .route(`/:id`)
  .get(getSpecificProductValidator, getSpecificProductHandler)
  .put(isAuthorized(UPDATE_PRODUCT), uploadProductImages, imageProcessing, updateProductValidator, updateProductHandler)
  .delete(isAuthorized(DELETE_PRODUCT), deleteProductValidator, deleteProductHandler);

module.exports = router;
