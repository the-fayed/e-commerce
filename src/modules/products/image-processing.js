const sharp = require(`sharp`);
const asyncHandler = require(`express-async-handler`);

const { uploadMixedImages } = require("../../shared/middlewares/upload.image.middleware");

exports.uploadProductImages = uploadMixedImages([
  { name: `cover`, maxCount: 1 },
  { name: `images`, maxCount: 10 },
]);

exports.imageProcessing = asyncHandler(async (req, res, next) => {
  if (req.files) {
    if (req.files.cover) {
      const coverName = `product-${Date.now()}-cover.jpeg`;
      await sharp(req.files.cover[0].buffer)
        .resize(2000, 1333)
        .toFormat(`jpeg`)
        .jpeg({ quality: 98 })
        .toFile(`uploads/products/${coverName}`);
      req.body.cover = coverName;
    }
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (image, index) => {
          const imageName = `product-${Date.now()}-${index + 1}.jpeg`;
          await sharp(image.buffer)
            .resize(2000, 1333)
            .toFormat(`jpeg`)
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageName}`);
          req.body.images.push(imageName);
        })
      );
    }
    next();
  }
});
