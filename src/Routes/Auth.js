const express = require("express");
const {
  GetAllUser,
  AddUser,
  DeleteUser,
  UpdateUser,
  GetAllUserbyId,
} = require("../../controller/User");
const path = express.Router();

path.get("/", GetAllUser);
path.get("/:id", GetAllUserbyId);
path.post("/add", AddUser);
path.patch("/update/:id", UpdateUser);
path.delete("/remove", DeleteUser);

module.exports = path;
