const Product = require(`../model/products.model`);

const factory = require("../../../common/services/code.factor");

// @desc   Get all products
// @route  GET api/v1/products
// @access Public
exports.getAllProductsHandler = factory.findAllService(Product);

// @desc   Get specific product
// @route  GET /api/v1/products/:id
// @access Public
exports.getSpecificProductHandler = factory.findOneService(Product, 'reviews');

// @desc   Create new product
// @route  POST /api/v1/products
// @access Privet
exports.createProductHandler = factory.createService(Product);

// @desc   update product
// @route  PUT /api/v1/products/:id
// @access Privet
exports.updateProductHandler = factory.updateService(Product);

// @desc   delete product
// @route  DELETE /api/v1/products/:id
// @access Private
exports.deleteProductHandler = factory.deleteService(Product);
