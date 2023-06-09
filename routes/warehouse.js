const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");

router.route("/")
    .get(warehouseController.index) // get all warehouses
    // POST/ CREATE a new warehouse
    .post(warehouseController.addWarehouse);

router
    .route("/:id")
    .get(warehouseController.singleWarehouse)
    .put(warehouseController.updateWarehouse)
    .delete(warehouseController.deleteWarehouse);

router.route(`/:id/inventories`).get(warehouseController.warehouseInventories);

module.exports = router;
