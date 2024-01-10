const crypto = require("crypto");

const asyncHandler = require(`express-async-handler`);
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const ApiFeatures = require("../utils/api.features");
const ApiError = require("../utils/api.error");

exports.findAllService = (Model) => {
  return asyncHandler(async (req, res) => {
    let filter = {}
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentCount = await Model.countDocuments(filter);
    const apiFeature = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentCount)
      .sort()
      .search()
      .filter()
      .fieldsLimiting();
    const { mongooseQuery, paginationResults } = apiFeature;
    const documents = await mongooseQuery;
    res.status(StatusCodes.OK).json({
      status: `success`,
      page: paginationResults.currentPage,
      next: paginationResults.next,
      prev: paginationResults.prev,
      numberOfPages: paginationResults.numberOfPages,
      results: documents.length,
      data: documents,
    });
  });
};

exports.findOneService = (Model, populationOpt) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const apiFeature = new ApiFeatures(Model.findOne({ _id: id }), req.query);
    const { mongooseQuery } = apiFeature;
    if (populationOpt) {
      mongooseQuery.populate(populationOpt);
    }
    const document = await mongooseQuery;
    if (!document) next(new ApiError(`Not found`, StatusCodes.NOT_FOUND));
    res.status(StatusCodes.OK).json({ status: `success`, data: document });
  });
};

exports.createService = (Model) => {
  return asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      const apiFeature = new ApiFeatures(Model.create(req.body), req.query);
      const { mongooseQuery } = apiFeature;
      const document = await mongooseQuery;
      res.status(StatusCodes.CREATED).json({ status: `success`, data: document });
    } else {
      req.body.category = req.params.id;
      const apiFeature = new ApiFeatures(Model.create(req.body), req.query);
      const { mongooseQuery } = apiFeature;
      const document = await mongooseQuery;
      res.status(StatusCodes.CREATED).json({ status: `success`, data: document });
    }
  });
};

exports.updateService = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const apiFeature = new ApiFeatures(Model.findOneAndUpdate({ _id: id }, req.body, { new: true }), req.query);
    const { mongooseQuery } = apiFeature;
    const document = await mongooseQuery;
    //trigger the 'save' event
    document.save();
    if (!document) next(new ApiError(`Error while updating!`, StatusCodes.NOT_MODIFIED));
    res.status(StatusCodes.OK).json({ status: `success`, data: document });
  });
};

exports.updateUserPasswordService = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { newPassword } = req.body;
      const apiFeature = new ApiFeatures(
        Model.findOneAndUpdate({ _id: id }, { password: newPassword }, { new: true }),
        req.query
      );
      const { mongooseQuery } = apiFeature;
      const document = await mongooseQuery;
      if (!document) return next(new ApiError(`Error while updating password`, StatusCodes.NOT_MODIFIED));
      res.status(StatusCodes.OK).json(document);
  });
};

exports.deleteService = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findOneAndDelete({_id: id});
    if (!document) return next(new ApiError(`Error while deleting`, StatusCodes.BAD_REQUEST));
    res.status(StatusCodes.NO_CONTENT).json({ msg: `Deleted successfully` });
  });
};

exports.generateToken = (payload) =>
  jwt.sign({ id: payload }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRATION_PERIOD });

exports.generateHashedPasswordResetCode = (resetCode) => {
  crypto.createHash("sha256").update(resetCode).digest("hex");
};

exports.generateEmailVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

exports.setResetPasswordVariablesToUndefined = async (user) => {
  user.resetPasswordCode = undefined;
  user.resetPasswordExpire = undefined;
  user.resetCodeVerified = undefined;
  await user.save();
};

exports.handleUserRoutes = () => {
  return asyncHandler(async (req, res, next) => {
    req.params.id = req.user.id;
    next();
  });
};

exports.calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  for(let item in cart.items) {
    totalPrice += cart.items[item].price * cart.items[item].quantity
  }
  cart.totalPriceAfterDiscount = undefined;
  cart.totalPrice = totalPrice;
};