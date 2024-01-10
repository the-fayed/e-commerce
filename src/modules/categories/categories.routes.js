const router = require(`express`).Router();

const {
  getAllCategoriesHandler,
  getSpecificCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require("./categories.controller");

const {
  createCategoryValidator,
  getSpecificCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require(`./categories.validator`);

const { resizeImage, uploadCategoryImage } = require("./image-processing");

const { isAuthorized } = require("../../shared/middlewares/authorization.middleware");
const { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } = require("./endpoints");
const subcategoriesRoutes = require(`./../subcategories/subcategories.routes`);

router
  .route(`/`)
  .get(getAllCategoriesHandler)
  .post(
    isAuthorized(CREATE_CATEGORY),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategoryHandler
  );
router
  .route(`/:id`)
  .get(getSpecificCategoryValidator, getSpecificCategoryHandler)
  .put(isAuthorized(UPDATE_CATEGORY), uploadCategoryImage, resizeImage, updateCategoryValidator, updateCategoryHandler)
  .delete(isAuthorized(DELETE_CATEGORY), deleteCategoryValidator, deleteCategoryHandler);

router.use(`/:categoryId/subcategories`, subcategoriesRoutes);

module.exports = router;
