const mongoose = require(`mongoose`);

const subcategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, `Too short subcategory name`],
      maxlength: [32, `Too long subcategory name`],
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `category`,
      required: true,
    },
  },
  { timestamps: true }
);

const subcategoriesModel = mongoose.model(`subcategories`, subcategoriesSchema);

module.exports = subcategoriesModel;
