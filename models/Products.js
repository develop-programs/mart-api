const { default: mongoose, Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  image: [{ type: String }],
  discount: {
    type: Number,
    default: 0,
  },
  gst: {
    type: Number,
    default: 0,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
