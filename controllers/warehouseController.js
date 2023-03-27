const knex = require("knex")(require("../knexfile"));

// GET all warehouses
exports.index = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

// GET single warehouse details
exports.singleWarehouse = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }

      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`)
    );
};

// DELETE warehouse
exports.deleteWarehouse = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .delete()
    .then(() => {
      res
        .status(204)
        .send(`Warehouse with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res.status(404).send(`Warehouse with id: ${req.params.id} ${err}`)
    );
};

//GET inventories for a given warehouse

exports.warehouseInventories = (req, res) => {
  knex("inventories")
    .where({ warehouse_id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    .catch((err) => {
      res
        .status(400)
        .send(
          `Error retrieving inventories for warehouse ${req.params.id} ${err}`
        );
    });
};
