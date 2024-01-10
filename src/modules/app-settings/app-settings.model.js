const mongoose = require("mongoose");

const taxAndShipmentPriceSchema = new mongoose.Schema(
  {
    taxPrice: {
      type: Number,
      required: true,
    },
    shipmentPrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const taxAndShipmentPrice = mongoose.model("taxAndShipPrice", taxAndShipmentPriceSchema);

module.exports = taxAndShipmentPrice;
