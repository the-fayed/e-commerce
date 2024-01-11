const asyncHandler = require(`express-async-handler`);
const sharp = require("sharp");

const { uploadSingleImage } = require("../../shared/middlewares/upload-image.middleware");

exports.uploadCategoryImage = uploadSingleImage(`image`);

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const { buffer } = req.file.buffer;
    const filename = `category-${Date.now()}.jpeg`;
    await sharp(buffer)
      .resize(450, 450)
      .toFormat(`jpeg`)
      .jpeg({ quality: 98 })
      .toFile(`uploads/categories/${filename}`);
    req.body.image = filename;
    next();
  }
});
