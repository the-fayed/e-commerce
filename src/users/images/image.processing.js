const sharp = require(`sharp`);
const asyncHandler = require(`express-async-handler`);

const { uploadSingleImage } = require("../../../common/middleware/upload.image.middleware");

exports.uploadUserAvatar = uploadSingleImage(`avatar`);

exports.imageProcessing = asyncHandler(async (req, res, next) => {
  const filename = `user-avatar-${Date.now()}.jpeg`;
  if (req.file) {
    const { buffer } = req.file;
    await sharp(buffer).resize(400, 400).toFormat(`jpeg`).jpeg({ quality: 95 }).toFile(`uploads/users/${filename}`);
    req.body.avatar = filename;
  }
  next();
});
