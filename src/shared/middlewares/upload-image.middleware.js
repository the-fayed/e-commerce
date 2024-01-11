const multer = require(`multer`);
const { StatusCodes } = require('http-status-codes');

const ApiError = require('../utils/api-error');

const multerOpt = () => {
    const storage = multer.memoryStorage();
    const filter = (req, file, cb) => {
      const filetype = file.mimetype.startsWith(`image`);
      if (filetype) {
        cb(null, true);
      } else {
        cb(new ApiError(`Only images allowed`, StatusCodes.CONFLICT), false);
      }
    };
    const upload = multer({ storage: storage, fileFilter: filter });
    return upload
}

exports.uploadSingleImage = (fieldName) => multerOpt().single(fieldName);

exports.uploadMixedImages = (arrayOfFields) => multerOpt().fields(arrayOfFields);