const express = require("express");
const router = express.Router();
const inventoryController = require("../controller/inventoryController");

router.route("/:id").get(inventoryController.singleItem); // get a single item(inventory)

module.exports = router;
