const mongoose = require("mongoose");

const GiftCard = mongoose.model(
  "GiftCard",
  new mongoose.Schema(
    {
      barcode: String,
      amount: Number,

      //phone: String,
      //email: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = GiftCard;
