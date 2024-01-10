const router = require("express").Router();

const { isAuthorized } = require("../../shared/middlewares/authorization.middleware");
const {
  addTaxAndShipmentPricesHandler,
  updateTaxAndShipmentPricesHandler,
  getTaxAndShipmentPricesHandler,
  deleteTaxAndShipmentPricesHandler,
} = require("./app-settings.controller");

const { addTaxAndShipmentPricesValidator, updateTaxAndShipmentPricesValidator } = require("./app-settings.validator");

const { CONFIG_APP_SETTING } = require("./endpoints");

router.use(isAuthorized(CONFIG_APP_SETTING));

router
  .route("/taxAndShipmentPrices")
  .post(addTaxAndShipmentPricesValidator, addTaxAndShipmentPricesHandler)
  .put(updateTaxAndShipmentPricesValidator, updateTaxAndShipmentPricesHandler)
  .get(getTaxAndShipmentPricesHandler)
  .delete(deleteTaxAndShipmentPricesHandler);

module.exports = router;
