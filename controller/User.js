const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/**
 * Retrieves all users from the database and sends them as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} - A promise that resolves to the response data.
 */
async function GetAllUser(req, res) {
  try {
    const user = await User.find({}).populate({
      path: "Orders",
      models: "Orders",
    });
    if (!user) {
      res.status(404).send({ msg: "Data not found" });
    }
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function GetAllUserbyId(req, res) {
  try {
    const user = await User.find({ _id: req.params.id });
    if (!user) {
      res.status(404).send({ msg: "Data not found" });
    }
    const token = jwt.sign({ user }, process.env.SECRET);
    res.status(200).send({ data: user, token: token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 * Adds a user to the system.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the result of the operation.
 */
async function AddUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!req.body) {
      res.status(404).send({ msg: "Data not found" });
    }
    const saltRounds = 10;
    const hashed = bcrypt.hashSync(password, saltRounds);
    await User.create({
      email: email,
      password: hashed,
    })
      .then((response) => {
        res.status(201).send({ msg: "Data added successfully", response });
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 * Retrieves all users from the database and sends them as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} - A promise that resolves to the response data.
 */
async function UpdateUser(req, res) {
  const id = req.params.id;
  try {
    await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    })
      .then((response) => {
        res.status(200).send({ msg: "Data updated successfully", response });
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 * Retrieves all users from the database and sends them as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} - A promise that resolves to the response data.
 */
async function DeleteUser(req, res) {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete({ _id: id })
      .then((response) => {
        res.status(200).send({ msg: "Data deleted successfully", response });
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  GetAllUser,
  GetAllUserbyId,
  AddUser,
  UpdateUser,
  DeleteUser,
};
