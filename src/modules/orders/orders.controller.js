const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const TaxAndShipmentPrices = require("../app-settings/app-settings.model");
const factory = require("../../shared/services/code.factor");
const ApiError = require("../../shared/utils/api.error");
const Product = require("../products/products.model");
const User = require("../users/users.model");
const Cart = require("../carts/carts.model");
const Order = require("./orders.model");

// @desc    Create cash order
// @route   POST /api/v1/orders/:cartId
// @access  Privet (User)
exports.createNewCashOrderHandler = asyncHandler(async (req, res, next) => {
  const taxAndShipmenPrices = await TaxAndShipmentPrices.find({});
  const taxPrice = taxAndShipmenPrices[0].taxPrice || 0;
  const shipmentPrice = taxAndShipmenPrices[0].shipmentPrice || 0;
  const cart = await Cart.findOne({ _id: req.params.cartId });
  if (!cart) return next(new ApiError("Cart not found", StatusCodes.NOT_FOUND));
  const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
  const totalPrice = cartPrice + taxPrice + shipmentPrice;
  const order = await Order.create({
    user: req.user._id,
    items: cart.items,
    shippingAddress: req.body.shippingAddress,
    totalPrice: totalPrice,
    taxPrice: taxPrice,
    shipmentPrice: shipmentPrice,
  });
  if (order) {
    const bulkOpts = cart.items.map((item) => ({
      updateOne: {
        filter: { product: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOpts, {});
    await Cart.findOneAndDelete({ _id: cart._id });
  }
  res.status(StatusCodes.CREATED).json({ status: "success", message: "order crated successfully" });
});

// @desc    create req.filter in case the user's role is 'user'
exports.createFilterObjForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filterObj = { user: req.user._id };
  next();
});

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Privet (Admin)
exports.getAllOrdersHandler = factory.findAllService(Order);

// @desc    Get specific order
// @route   GET /api/v1/orders/:id
// @access  Privet (Admin)
exports.getSpecificOrderHandler = factory.findOneService(Order);

// @desc    Get specific order from logged user orders
// @route   GET  /api/v1/orders/:id
// @access  Privet (User)
exports.getSpecificOrderForLoggedUserHandler = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ user: req.user._id, _id: req.params.id });
  if (!order) return next(new ApiError("Order not found", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.OK).json({ status: "success", data: order });
});

// @desc    Update order status to is paid
// @route   PUT /api/v1/orders/:id
// @access  Privet (Admin)
exports.updateOrderStatusPaidHandler = asyncHandler(async (req, res, next) => {
  const { isPaid } = req.body;
  const order = await Order.findOneAndUpdate({ _id: req.params.id }, { isPaid, paidAt: Date.now() }, { new: true });
  if (!order) return next(new ApiError("Order not found", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.OK).json({ status: "success", message: "Order updated successfully", data: order });
});

// @desc    Update order status to is delivered
// @route   PUT /api/v1/orders/:id
// @access  Privet (Admin)
exports.updateOrderStatusDeliveredHandler = asyncHandler(async (req, res, next) => {
  const { isDelivered } = req.body;
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    { isDelivered, deliveredAt: Date.now() },
    { new: true }
  );
  if (!order) return next(new ApiError("Order not found", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.OK).json({ status: "success", message: "Order updated successfully", data: order });
});

// @desc    Get checkout session from stripe and send it as a response
// @route   POST /api/v1/orders/checkout-session/:cartId
// @access  Privet (User)
exports.checkoutSessionHandler = asyncHandler(async (req, res, next) => {
  const taxAndShipmenPrices = await TaxAndShipmentPrices.find({});
  const taxPrice = taxAndShipmenPrices[0].taxPrice;
  const shipmentPrice = taxAndShipmenPrices[0].shipmentPrice;
  const cart = await Cart.findOne({ _id: req.params.cartId });
  if (!cart) return next(new ApiError("No cart found", StatusCodes.NOT_FOUND));
  const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
  const totalPrice = cartPrice + taxPrice + shipmentPrice;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "egp",
          product_data: {
            name: `${req.user.name}'s cart`,
          },
          unit_amount: totalPrice * 100,
        },
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    shipping_address: req.body.shippingAddress,
  });
  res.status(StatusCodes.OK).json({ status: "success", session });
});

const createOnlineOrder = async (session) => {
  const cartId = session.client_reference_id;
  const shippingAddress = session.shipping_address;
  const orderPrice = session.amount_total / 100;
  const cart = await Cart.findOne({ _id: cartId });
  const user = await User.findOne({ email: session.customer_email });
  const taxAndShipmenPrices = await TaxAndShipmentPrices.find({});
  const taxPrice = taxAndShipmenPrices[0].taxPrice || 0;
  const shipmentPrice = taxAndShipmenPrices[0].shipmentPrice || 0;
  const order = await Order.create({
    user: user._id,
    items: cart.items,
    taxPrice: taxPrice,
    shipmentPrice: shipmentPrice,
    shippingAddress,
    totalPrice: orderPrice,
    isPaid: true,
    paidAt: Date.now(),
    paymentMethod: "online",
  });
  if (order) {
    const bulkOpts = cart.items.map((item) => ({
      updateOne: {
        filter: { product: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOpts, {});
    await Cart.findOneAndDelete({ _id: cartId });
  }
};

// @desc    Strip webhook
// @route   POST /webhook-checkout
// @access  Privet (user)
exports.checkoutWebhookHandler = asyncHandler(async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_KEY);
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type == "checkout.session.completed") {
    createOnlineOrder(event.data.object);
  }
  res.status(StatusCodes.OK).json({ received: true });
});
