const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id is required"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: [true, "product id is required"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        size: String,
        price: Number,
      },
    ],
    taxPrice: {
      type: Number,
      default: 0,
    },
    shipmentPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String
    },
    totalPrice: Number,
    paymentMethod: {
      type: String,
      enum: ["online", "cash"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

// hook to populate user and product on find
orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name email phone -_id",
    populate: {
      path: "addresses",
      select: "-_id",
    },
  }).populate({
    path: "items.product",
    select: "title cover ratingsAverage ratingsQuantity",
  });
  next()
});



const order = mongoose.model("order", orderSchema);

module.exports = order;
