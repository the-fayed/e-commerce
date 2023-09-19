const mongoose = require(`mongoose`);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [2, `Too short product name`],
      maxlength: [100, `Too long product name`],
      unique: [true, `Product name must be unique`],
    },
    slug: {
      type: String,
      required: true,
      minlength: [2, `Too short product slug`],
      maxlength: [100, `Too long product slug`],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [2, `Too short product description`],
      maxlength: [2000, `Too long product description`],
    },
    price: {
      type: Number,
      required: true,
      min: [0, `Price cannot be negative`],
      maxlength: [2000, `Too long product price`],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `category`,
      required: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `subcategory`,
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `brand`,
    },
    images: [String],
    cover: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String
      }
    ],
    ratingsAverage: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    // enabling virtual populate
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);

//virtual
productSchema.virtual("reviews", {
  ref: `review`,
  localField: `_id`,
  foreignField: `product`,
});

// mongoose middleware to populate category name
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: `category`,
    select: `name -_id`,
  });
  next();
});

// mongoose middleware to populate brand name
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: `brand`,
    select: `name -_id`,
  });
  next();
});

// mongoose middleware to add baseurl to images names
productSchema.post([`init`, `save`], (doc) => {
  if (doc.cover) doc.cover = `${process.env.BASE_URL}/products/${doc.cover}`;
  if (doc.images) {
    const images = [];
    for (let image in doc.images) {
      const imageUrl = `${process.env.BASE_URL}/products/${doc.images[image]}`;
      images.push(imageUrl);
    }
    doc.images = images;
  }
});

const brandModel = mongoose.model(`product`, productSchema);

module.exports = brandModel;
