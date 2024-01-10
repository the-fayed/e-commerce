const sharp = require(`sharp`);
const asyncHandler = require(`express-async-handler`);

const { uploadSingleImage } = require("../../shared/middlewares/upload.image.middleware");

exports.uploadBrandImage = uploadSingleImage(`image`);

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const { buffer } = req.file.buffer;
    const filename = `brand-${Date.now()}.jpeg`;
    sharp(buffer).resize(600, 600).toFormat(`jpeg`).jpeg({ quality: 98 }).toFile(`uploads/brands/${filename}`);
    req.body.image = filename;
    next();
  }
});
