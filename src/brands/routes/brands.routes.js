const {
  getAllBrandsHandler,
  createBrandHandler,
  getSpecificBrandHandler,
  updateBrandHandler,
  deleteBrandHandler,
} = require("../controller/brands.controller");

const {
  createBrandValidator,
  getSpecificBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require(`../validator/brand.validator`);

const { uploadBrandImage, resizeImage } = require("../images/image.processing");

const { isAuthorized } = require("../../../common/middleware/authorization.middleware");
const { CREATE_BRAND, UPDATE_BRAND, DELETE_BRAND } = require("../endpoints");

const router = require(`express`).Router();

router
  .route(`/`)
  .get(getAllBrandsHandler)
  .post(isAuthorized(CREATE_BRAND), uploadBrandImage, resizeImage, createBrandValidator, createBrandHandler);
router
  .route(`/:id`)
  .get(getSpecificBrandValidator, getSpecificBrandHandler)
  .put(isAuthorized(UPDATE_BRAND), uploadBrandImage, resizeImage, updateBrandValidator, updateBrandHandler)
  .delete(isAuthorized(DELETE_BRAND), deleteBrandValidator, deleteBrandHandler);

module.exports = router;
