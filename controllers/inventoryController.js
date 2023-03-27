const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

// GET all inventory items
exports.index = (_req, res) => {
  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .select("inventories.*", "warehouses.warehouse_name")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};

// GET single inventory item
exports.singleItem = (req, res) => {
  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .select("inventories.*", "warehouses.warehouse_name")
    .where("inventories.id", req.params.id)
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Item with id: ${req.params.id} cannot be found`);
      }

      res.status(200).json(data[0]);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving item ${req.params.id} ${err}`);
    });
};

// DELETE single inventory item
exports.deleteItem = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .delete()
    .then(() => {
      res
        .status(204)
        .send(`Inventory item with id: ${req.params.id} has been deleted`);
    })
    .catch((err) => {
      res
        .status(404)
        .send(`Could not delete inventory item ${req.params.id}.  ${err}`);
    });
};

// PUT/UPDATE existing warehouse
exports.updateInventory = (req, res) => {
  knex("inventories")
    .update(req.body)
    .where({ id: req.params.id })
    .then(() => {
      res
        .status(200)
        .send(`Inventory with id: ${req.params.id} has been updated`);
    })
    .catch((err) =>
      res.status(400).send(`Error updating Inventory ${req.params.id} ${err}`)
    );
};

//POST single inventory item
exports.addItem = (req, res) => {
  console.log("addItem", req.body);
  let id = uuid();
  // Validate the request body for required data
  if (
    !req.body.warehouse ||
    !req.body.itemName ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    console.log("not working");
    return res
      .status(400)
      .send(
        `Please make sure to provide , warehouse ID, name, description,category,status and quantity`
      );
  }

  const newItem = {
    id: id,
    warehouse_id: req.body.warehouse,
    item_name: req.body.itemName,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    quantity: req.body.quantity,
  };

  // Check if the warehouse_id exists in the warehouses table
  knex("warehouses")
    .where("id", req.body.warehouse)
    .first()
    .then((warehouse) => {
      console.log("warehouse exist: ", warehouse);
      if (!warehouse) {
        return res
          .status(400)
          .send(
            `The warehouse_id '${req.body.warehouse_id}' does not exist in the warehouses table.`
          );
      }

      // Check if quantity is a number
      if (isNaN(req.body.quantity)) {
        return res.status(400).send("The quantity value must be a number.");
      }

      console.log("before insert:", newItem);
      // Insert new inventory item into the database
      knex("inventories")
        .insert(newItem)
        .then((data) => {
          // For POST requests we need to respond with 201 and the newly created record
          const newItemUrl = `/inventories/${data[0]}`;
          res.status(201).json(newItemUrl);
        })
        .catch((err) => {
          res.status(400).send(`Error creating inventory item: ${err}`);
        });
    });
};
