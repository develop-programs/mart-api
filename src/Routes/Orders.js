const express = require("express");
const {
  GetAllOrder,
  AddOrder,
  DeleteOrder,
} = require("../../controller/Orders");
const path = express.Router();

path.get("/", GetAllOrder);
path.post("/add", AddOrder);
path.delete("/remove/:id", DeleteOrder);

module.exports = path;
