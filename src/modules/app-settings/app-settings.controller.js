const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const TaxAndShipPrice = require("./app-settings.model");
const ApiError = require("../../shared/utils/api.error");

// @desc    Create tax and shipment prices
// @route   POST /api/v1/appSetting/taxAndShipments
// @access  Privet (Admin)
exports.addTaxAndShipmentPricesHandler = asyncHandler(async (req, res) => {
  const { taxPrice, shipmentPrice } = req.body;
  const taxAndShipmentPrices = await TaxAndShipPrice.find({});
  if (taxAndShipmentPrices.length > 0) {
    res.status(StatusCodes.OK).json({ message: "Tax and shipment prices already exists", data: taxAndShipmentPrices });
  } else {
    const newTaxAndShipPrices = await TaxAndShipPrice.create({
      createdBy: req.user._id,
      taxPrice,
      shipmentPrice,
    });
    res.status(StatusCodes.CREATED).json({ status: "success", data: newTaxAndShipPrices });
  }
});

// @desc    Get tax and shipment prices
// @route   GET /api/v1/appSetting/taxAndShipments
// @access  Privet (Admin)
exports.getTaxAndShipmentPricesHandler = asyncHandler(async (req, res, next) => {
  const taxAndShipmentPrices = await TaxAndShipPrice.find({});
  if (!taxAndShipmentPrices) return next(new ApiError("Tax and shipment prices not added yet", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.OK).json({ status: "success", data: taxAndShipmentPrices });
});

// @desc    Update tax and shipment prices
// @route   PUT /api/v1/appSetting/taxAndShipments
// @access  Privet (Admin)
exports.updateTaxAndShipmentPricesHandler = asyncHandler(async (req, res, next) => {
  const { taxPrice, shipmentPrice } = req.body;
  const taxAndShipmentPrices = await TaxAndShipPrice.find({});
  if (!taxAndShipmentPrices) return next(new ApiError("Tax and shipment prices not added yet", StatusCodes.NOT_FOUND));
  taxAndShipmentPrices[0].updateOne({
    createdBy: req.user._id,
    taxPrice,
    shipmentPrice,
  });
  await taxAndShipmentPrices.save();
  return res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Tax and shipment prices updated successfully", data: taxAndShipmentPrices });
});

// @desc    Delete tax and shipment prices
// @route   DELETE /api/v1/appSetting/taxAndShipments
// @access  Privet (Admin)
exports.deleteTaxAndShipmentPricesHandler = asyncHandler(async (req, res, next) => {
  const taxAndShipmentPrices = await TaxAndShipPrice.find({});
  if (!taxAndShipmentPrices) return next(new ApiError("Tax and shipment prices not added yet", StatusCodes.NOT_FOUND));
  taxAndShipmentPrices[0].deleteOne();
  await taxAndShipmentPrices.save();
  res.status(StatusCodes.NO_CONTENT).send();
});
