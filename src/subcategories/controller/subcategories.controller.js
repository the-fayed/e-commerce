const Subcategory = require(`../model/subcategories.model`);

const factory = require("../../../common/services/code.factor");

// setting req.filterObj to category id
exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if(req.params.categoryId) {
    filterObj = {category: req.params.categoryId};
    req.filterObj = filterObj;
  }
  next();
};

// @desc   Get all subcategories for specific category
// @route  GET /api/v1/categories/:id/subcategories
// @access Public
exports.getAllSubcategoriesHandler = factory.findAllService(Subcategory);

// @desc   Get specific subcategory
// @route  GET /api/v1/subcategory/:id
// @access Public
exports.getSpecificSubcategoryHandler = factory.findOneService(Subcategory);

// setting category id dynamic
exports.setCategoryId = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

// @desc   Create subcategory
// @route  POST /api/v1/subcategories
// @access Privet
exports.createSubcategoryHandler = factory.createService(Subcategory);

// @desc   Update subcategory
// @route  PUT /api/v1/subcategories/:id
// @access Private
exports.updateSubcategoryHandler = factory.updateService(Subcategory);

// @desc   Delete subcategory
// @route  DELETE /api/v1/subcategories/:id
// @access Private
exports.deleteSubcategoryHandler = factory.deleteService(Subcategory);
