const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();

const warehouseRoutes = require("./routes/warehouse");

const inventoryRoutes = require("./routes/inventory");

app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: CORS_ORIGIN }));

app.use("/warehouses", warehouseRoutes);

app.use("/inventories", inventoryRoutes);

////////
// WAREHOUSES ENDPOINTS

// GET list of all warehouses
app.get("/api/warehouses", (req, res) => {});

// GET single warehouse
app.get("/api/warehouses/:id", (req, res) => {});

// POST to create new warehouse
app.post("/api/warehouses", (req, res) => {});

// PUT to edit single warehouse
app.put("/api/warehouses/:id", (req, res) => {});

// DELETE a single warehouse
app.delete("/api/warehouses/:id", (req, res) => {});

////////
// INVENTORY ENDPOINTS

// GET all inventory items
app.get("/api/inventories", (req, res) => {});

// GET single inventory item
app.get("/api/inventories/:id", (req, res) => {});

// GET inventory for specific warehouse
app.get("/api/warehouses/:id/inventories", (req, res) => {});

// POST to create new inventory item
app.post("/api/inventories", (req, res) => {});

// PUT to edit inventory item
app.put("/api/inventories/:id", (req, res) => {});

// DELETE single inventory item
app.delete("/api/inventories/:id", (req, res) => {});

// Start server
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}...`);
});
