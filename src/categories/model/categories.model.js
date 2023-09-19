const mongoose = require(`mongoose`);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, `Too short category name`],
      maxlength: [32, `Too long category name`],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// hook to add the pase url to the brand image
categorySchema.post([`init`, `save`], (doc) => {
  if (doc.image) doc.image = `${process.env.BASE_URL}/categories/${doc.image}`;
});

const categoryModel = mongoose.model(`category`, categorySchema);

module.exports = categoryModel;
