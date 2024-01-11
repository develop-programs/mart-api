const { default: mongoose, Schema } = require("mongoose");

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  gst: {
    type: Number,
    default: 0,
  },
});

const Orders = mongoose.models.Orders || mongoose.model("Orders", OrderSchema);

module.exports = Orders;
