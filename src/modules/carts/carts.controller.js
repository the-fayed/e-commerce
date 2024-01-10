const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const { calcTotalCartPrice } = require("../../shared/services/code.factor");
const ApiError = require("../../shared/utils/api.error");
const Product = require("../products/products.model");
const Coupon = require("../coupons/coupons.model");
const Cart = require("./carts.model");

// @desc   Add product to cart
// @route  POST /api/v1/cart
// @access Privet (USer)
exports.addProductToCartHandler = asyncHandler(async (req, res) => {
  const { productId, color, size } = req.body;
  const product = await Product.findOne({ _id: productId });
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: product, color: color, price: product.price }],
    });
  } else {
    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.color === color && item.size === size
    );
    if (productIndex > -1) {
      const item = cart.items[productIndex];
      item.quantity += 1;
      cart.items[productIndex] = item;
    } else {
      cart.items.push({ product: product, color: color, size: size, price: product.price });
    }
  }
  calcTotalCartPrice(cart);
  await cart.save();
  return res.status(StatusCodes.OK).json({
    status: "success",
    message: "product has been added successfully to your cart",
    items: cart.items.length,
    data: cart,
  });
});

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Privet (User)
exports.getLoggedUserCartHandler = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new ApiError("No cart found for this user", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.OK).json({ status: "success", items: cart.items.length, data: cart });
});

// @desc    Update specific item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Private (User)
exports.updateSpecificItemQuantityHandler = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new ApiError("No cart for this user", StatusCodes.NOT_FOUND));
  const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
  if (itemIndex > -1) {
    const item = cart.items[itemIndex];
    item.quantity = quantity;
    cart.items[itemIndex] = item;
  } else {
    return next(new ApiError("No item found", StatusCodes.NOT_FOUND));
  }
  calcTotalCartPrice(cart);
  await cart.save();
  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Item quantity updated successfully", items: cart.items.length, data: cart });
});

// @desc    Remove item from cart
// @route   DELETE /api/v1/cart/:itemId
// @access  Privet (User)
exports.removeItemFromCartHandler = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { items: { _id: itemId } },
    },
    { new: true }
  );
  if (!cart) return next(new ApiError("Error while removing item from your cart", StatusCodes.NOT_MODIFIED));
  calcTotalCartPrice(cart);
  await cart.save();
  return res.status(StatusCodes.OK).json({
    status: "success",
    items: cart.items.length,
    message: "Item removed successfully from your cart",
    data: cart,
  });
});

// @desc    Clear logged user cart
// @route   DElETE /api/v1/cart
// @access  Privet (User)
exports.clearLoggedUserCartHandler = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user._id });
  if (!cart) return next(new ApiError("No cart found for this user", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.NO_CONTENT).send();
});

// @desc    Apply coupon to cart
// @route   POST /api/v1/cart/applyCoupon
// @access  Privet (User)
exports.applyCouponHandler = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({ name: req.body.coupon, expire: { $gt: Date.now() } });
  if (!coupon) return next(new ApiError("Invalid or expired coupon", StatusCodes.BAD_REQUEST));
  const cart = await Cart.findOne({ user: req.user._id });
  const totalPriceAfterDiscount = cart.totalPrice - ((cart.totalPrice * coupon.discount) / 100).toFixed(2);
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  await cart.save();
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Coupon has been applied successfully to your cart",
    items: cart.items.length,
    data: cart,
  });
});
