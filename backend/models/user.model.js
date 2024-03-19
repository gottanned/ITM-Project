const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    giftCards: [
      {
        barcode: String,
        amount: Number,
        createdAt: Date,
        updatedAt: Date,
      },
    ],
  })
);

module.exports = User;
