const Brand = require(`./brands.model`);

const factory = require("../../shared/services/code-factor");

// @desc   Get all brands
// @route  GET /api/v1/brands
// @access Public
exports.getAllBrandsHandler = factory.findAllService(Brand);

// @desc   Get specific brand
// @route  GET /api/v1/brands/:id
// @access Public
exports.getSpecificBrandHandler = factory.findOneService(Brand);

// @desc   Create brand
// @route  POST /api/v1/brands
// @access Private
exports.createBrandHandler = factory.createService(Brand);

// @desc   Update brand
// @route  PUT /api/v1/brands/:id
// @access Private
exports.updateBrandHandler = factory.updateService(Brand);

// @desc   Delete brand
// @route  DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrandHandler = factory.deleteService(Brand);
