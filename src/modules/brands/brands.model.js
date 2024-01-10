const mongoose = require(`mongoose`);

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, `Too short brand name`],
    maxlength: [32, `Too long brand name`],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  image: {
    type: String,
  }
}, {timestamps: true});

// hook to add the pase url to the brand image
brandSchema.post([`init`, `save`], (doc) => {
  if (doc.image) doc.image = `${process.env.BASE_URL}/brands/${doc.image}`;
});

const brandModel = mongoose.model(`brand`, brandSchema);

module.exports = brandModel;