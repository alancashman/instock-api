const knex = require("knex")(require("../knexfile"));

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
