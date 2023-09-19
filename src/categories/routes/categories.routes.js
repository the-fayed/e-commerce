const router = require(`express`).Router();

const {
  getAllCategoriesHandler,
  getSpecificCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require("../controller/categories.controller");

const {
  createCategoryValidator,
  getSpecificCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require(`../validator/categories.validator`);

const { resizeImage, uploadCategoryImage } = require("../images/image.processing");

const subcategoriesRoutes = require(`../../subcategories/routes/subcategories.routes`);
const { isAuthorized } = require("../../../common/middleware/authorization.middleware");
const { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } = require("../endpoints");


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
  .get(
    getSpecificCategoryValidator,
    getSpecificCategoryHandler
    )
  .put(
    isAuthorized(UPDATE_CATEGORY),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategoryHandler
    )
  .delete(
    isAuthorized(DELETE_CATEGORY),
    deleteCategoryValidator,
    deleteCategoryHandler
    );

router.use(`/:categoryId/subcategories`, subcategoriesRoutes);

module.exports = router;
