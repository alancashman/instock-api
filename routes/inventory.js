const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.route("/").get(inventoryController.index); // get all inventory items

router
  .route("/:id")
  .get(inventoryController.singleItem)
  .delete(inventoryController.deleteItem); // get a single item(inventory)

module.exports = router;
