const express = require("express");
const {
  GetAllProduct,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../../controller/Products");
const path = express.Router();

path.get("/info", GetAllProduct);
path.get("/info/:id", GetProductById);
path.post("/info/add", AddProduct);
path.patch("/info/update", UpdateProduct);
path.delete("/info/delete", DeleteProduct);

module.exports = path;
