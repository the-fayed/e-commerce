const Category = require(`../model/categories.model`);

const factory = require("../../../common/services/code.factor");


// @desc   Get all categories
// @route  GET /api/v1/categories
// @access Public
exports.getAllCategoriesHandler = factory.findAllService(Category);

// @desc   Get single category
// @route  GET /api/v1/categories/:id
// @access Public
exports.getSpecificCategoryHandler = factory.findOneService(Category);

// @desc   Create new category
// @route  POST /api/v1/categories
// @access Privet (Admin)
exports.createCategoryHandler = factory.createService(Category);

// @desc   Update category
// @route  PUT /api/v1/categories/:id
// @access Privet (Admin)
exports.updateCategoryHandler = factory.updateService(Category);

// @desc   Delete category
// @route  DELETE /api/v1/categories/:id
// @access Privet (Admin)
exports.deleteCategoryHandler = factory.deleteService(Category);
