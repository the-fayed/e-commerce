const router = require(`express`).Router({ mergeParams: true });

const {
  getAllSubcategoriesHandler,
  getSpecificSubcategoryHandler,
  createSubcategoryHandler,
  updateSubcategoryHandler,
  deleteSubcategoryHandler,
  createFilterObj,
  setCategoryId,
} = require("./subcategories.controller");

const {
  createSubcategoryValidator,
  getSpecificSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} = require(`./subcategories.validator`);

const { isAuthorized } = require("../../shared/middlewares/authorization.middleware");

const { CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY, DELETE_SUBCATEGORY } = require("./endpoints");

router
  .route(`/`)
  .get(createFilterObj, getAllSubcategoriesHandler)
  .post(isAuthorized(CREATE_SUBCATEGORY), setCategoryId, createSubcategoryValidator, createSubcategoryHandler);
router
  .route(`/:id`)
  .get(getSpecificSubcategoryValidator, getSpecificSubcategoryHandler)
  .put(isAuthorized(UPDATE_SUBCATEGORY), updateSubcategoryValidator, updateSubcategoryHandler)
  .delete(isAuthorized(DELETE_SUBCATEGORY), deleteSubcategoryValidator, deleteSubcategoryHandler);

module.exports = router;
