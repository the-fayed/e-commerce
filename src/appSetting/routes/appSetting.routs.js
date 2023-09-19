const router = require("express").Router();

const { isAuthorized } = require("../../../common/middleware/authorization.middleware");
const {
  addTaxAndShipmentPricesHandler,
  updateTaxAndShipmentPricesHandler,
  getTaxAndShipmentPricesHandler,
  deleteTaxAndShipmentPricesHandler,
} = require("../controller/appSetting.controller");

const {
  addTaxAndShipmentPricesValidator,
  updateTaxAndShipmentPricesValidator
} = require('../validator/appSetting.validator');

const { CONFIG_APP_SETTING } = require("../endpoints");

router.use(isAuthorized(CONFIG_APP_SETTING));

router
  .route("/taxAndShipmentPrices")
  .post(addTaxAndShipmentPricesValidator, addTaxAndShipmentPricesHandler)
  .put(updateTaxAndShipmentPricesValidator, updateTaxAndShipmentPricesHandler)
  .get(getTaxAndShipmentPricesHandler)
  .delete(deleteTaxAndShipmentPricesHandler);

module.exports = router;
