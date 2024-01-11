const { default: mongoose, Schema } = require("mongoose");
const Orders = require("./Orders");

const UserSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  address: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    default: 0,
  },
  Orders: [
    {
      type: Schema.Types.ObjectId,
      ref: Orders,
    },
  ],
});

const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

module.exports = User;
