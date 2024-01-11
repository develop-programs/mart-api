const Product = require("../models/Products");

async function GetAllProduct(req, res) {
  try {
    const products = await Product.find(req.query());
    if (!products) {
      res.status(404).send({ msg: "Data not found" });
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function GetProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!products) {
      res.status(404).send({ msg: "Data not found" });
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function AddProduct(req, res) {
  try {
    if (!req.body) {
      res.status(404).send({ msg: "Data not found" });
    }
    await Product.create(req.body)
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

async function UpdateProduct(req, res) {
  const id = req.params.id;
  try {
    const data = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!data) {
      res.status(404).send({ msg: "Data not found" });
    } else {
      res.status(200).send({ msg: "Data updated successfully", data });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function DeleteProduct(req, res) {
  const id = req.params.id;
  try {
    const response = await Product.findByIdAndDelete({ _id: id });
    if (!response) {
      res.status(404).send({ msg: "Data not found" });
    }
    res.status(200).send({ msg: "Data deleted successfully", response });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
module.exports = {
  GetAllProduct,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};
