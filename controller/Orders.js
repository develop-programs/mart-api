const { default: mongoose } = require("mongoose");
const Orders = require("../models/Orders");
const User = require("../models/User");

async function GetAllOrder(req, res) {
  try {
    const order = await Orders.find(req.query);
    if (!order) {
      res.status(404).send({ msg: "Data not found" });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function AddOrder(req, res) {
  try {
    if (!req.body) {
      res.status(404).send({ msg: "Data not found" });
    }
    const data = await Orders.create(req.body);

    const id = new mongoose.Types.ObjectId(data._id);

    const update = await User.updateOne(
      { email: req.body.email },
      { $push: { Orders: id } },
      {
        new: true,
        upsert: false,
      }
    );

    res.status(201).send({ msg: data, update: update });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function DeleteOrder(req, res) {
  try {
    const id = req.params.id;
    const data = await Orders.findByIdAndDelete({ _id: id });

    const OrderId = new mongoose.Types.ObjectId(data._id);

    const update = await User.findOneAndDelete(
      { email: req.body.email },
      { $push: { Orders: OrderId } },
      {
        new: true,
        upsert: false,
      }
    );

    res.status(201).send({ msg: data, update: update });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  GetAllOrder,
  AddOrder,
  DeleteOrder,
};
