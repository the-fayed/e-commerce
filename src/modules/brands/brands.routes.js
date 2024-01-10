const router = require(`express`).Router();

const {
  getAllBrandsHandler,
  createBrandHandler,
  getSpecificBrandHandler,
  updateBrandHandler,
  deleteBrandHandler,
} = require("./brands.controller");

const {
  createBrandValidator,
  getSpecificBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require(`./brands.validator`);

const { uploadBrandImage, resizeImage } = require("./image-processing");

const { isAuthorized } = require("../../shared/middlewares/authorization.middleware");
const { CREATE_BRAND, UPDATE_BRAND, DELETE_BRAND } = require("./endpoints");

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
