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
    transactions: [
      {
        barcode: String,
        transactions_type: String,
        createdAt: Date,
        initialAmount: Number,
        afterAmount: Number,
      },
    ],
    otp: {
      type: String,
      default: "",
    },
    otpExpires: {
      type: Date,
    },
  })
);

module.exports = User;
