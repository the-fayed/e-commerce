const path = require(`path`);

const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const compression = require("compression");
const express = require("express");
const morgan = require(`morgan`);
const cors = require("cors");
const hpp = require('hpp');

const { unhandledRoutesHandler, globalErrorHandler } = require(`../shared/middlewares/error.handling.middleware`);
const limiter = require('../shared/middlewares/rate-limiter.middleware');
const DBConnection = require("./../config/db-connection");
const { mountRoutes } = require('../modules/routes');

// configure environment variables
require(`dotenv`).config();

// connecting to database
DBConnection();

const app = express();

// applying cors
app.use(cors());
app.options("*", cors());

// applying compression
app.use(compression());

// applying rate limiter
app.use(limiter);

// @desc    Stripe webhook configuration
const checkoutWebhookHandler = require("./../modules/orders/orders.controller").checkoutWebhookHandler;
app.post("/checkout-webhook", express.raw({ type: "application/json" }), checkoutWebhookHandler);

// public middleware
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));
app.use(express.static(path.join(__dirname, `uploads`)));

// applying hpp (http pollution protection)
app.use(hpp());

// applying mongo sanitize middleware
app.use(mongoSanitize());

// applying xss sanitizer middleware
app.use(xss());

// logging on development mode
if (process.env.NODE_ENV === `development`) {
  app.use(morgan(`dev`));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// mounting all app routes
mountRoutes(app);

// handle unhandled routes
app.all(`*`, unhandledRoutesHandler);

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
