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

//POST/ CREATE a new warehouse
exports.addWarehouse = (req, res) => {
  let id = uuidv4();
  // Validate the request body for required data

  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide warehouse name, address, city, country, contact name, position, phone and email fields in a request"
      );
  }
  const newWarehouse = {
    id: id,
    warehouse_name: req.body.warehouse_name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact_name: req.body.contact_name,
    contact_position: req.body.contact_position,
    contact_phone: req.body.contact_phone,
    contact_email: req.body.contact_email,
  };

  knex("warehouses")
    .insert(newWarehouse)
    .then((data) => {
      const newWarehouseURL = `/warehouses/${data[0]}`;
      res.status(201).location(newWarehouseURL).send(newWarehouseURL);
    })
    .catch((error) =>
      res.status(400).send(`Error creating Warehouse: ${error}`)
    );
};

// PUT/UPDATE existing warehouse
exports.updateWarehouse = (req, res) => {
  knex("warehouses")
    .update(req.body)
    .where({ id: req.params.id })
    .then(() => {
      res
        .status(200)
        .send(`Warehouse with id: ${req.params.id} has been updated`);
    })
    .catch((err) =>
      res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)
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
