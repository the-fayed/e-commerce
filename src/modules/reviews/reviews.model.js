const mongoose = require("mongoose");

const Product = require("../products/products.model");

const reviewsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    tile: {
      type: String,
    },
    rating: {
      type: Number,
      min: [1, "Minimum ratings value is 1.0"],
      max: [5, "Max ratings value is 5.0"],
      required: true,
    },
  },
  { timestamps: true }
);

// populate user name on find reviews
reviewsSchema.pre(/^find/, function (next) {
  this.populate("user", "avatar name");
  next();
});

// calculate reviews quantity and rating average for specific product
reviewsSchema.statics.calcRatingsAverageAndQuantity = async function (productId) {
  const results = await this.aggregate([
    // match stage
    { $match: { product: productId } },
    // grouping stage
    { $group: { _id: "product", avgRatings: { $avg: "$rating" }, ratingsQuantity: { $sum: 1 } } },
  ]);
  if (results.length > 0) {
    await Product.findOneAndUpdate(
      productId,
      {
        ratingsAverage: results[0].avgRatings,
        ratingsQuantity: results[0].ratingsQuantity,
      }
    );
  } else {
    await Product.findOneAndUpdate(
      productId,
      {
        ratingsAverage: 0,
        ratingsQuantity: 0,
      }
    );
  }
};

reviewsSchema.post("save", async function () {
  await this.constructor.calcRatingsAverageAndQuantity(this.product);
});

reviewsSchema.post("findOneAndDelete", async function (doc) {
  await doc.constructor.calcRatingsAverageAndQuantity(doc.product);
});

const reviewsModel = mongoose.model("review", reviewsSchema);

module.exports = reviewsModel;
