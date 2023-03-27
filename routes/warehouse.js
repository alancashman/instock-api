const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");

router.route("/").get(warehouseController.index); // get all warehouses

router
  .route("/:id")
  .get(warehouseController.singleWarehouse)
  .delete(warehouseController.deleteWarehouse);

router.route(`/:id/inventories`).get(warehouseController.warehouseInventories);

module.exports = router;
