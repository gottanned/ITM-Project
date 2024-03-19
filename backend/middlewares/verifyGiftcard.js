const { model } = require("mongoose");
const db = require("../models");
const User = db.user;

const getUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.user = user;
    next();
  });
};

const checkIfGiftcardValid = (req, res, next) => {
  req.user
    .find({ giftcards: { $elemMatch: { barcode: req.body.barcode } } })
    .exec((err, giftcard) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (giftcard) {
        req.giftcard = giftcard;
        next();
        return;
      }
      res.status(403).send({ message: "Invalid Giftcard!" });
      return;
    });
};

const checkDuplicateCode = (req, res, next) => {
  req.user
    .find({ giftCards: { $elemMatch: { barcode: req.body.barcode } } })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res
          .status(400)
          .send({ message: "Failed! Giftcard is already in use!" });
        return;
      }
      next();
    });
};

const checkSufficentBalance = (req, res, next) => {
  if (req.giftcard.amount >= req.body.redeemAmount) {
    next();
    return;
  }
  res.status(403).send({ message: "Insufficient Balance!" });
};

const verifyGiftcard = {
  getUser,
  checkIfGiftcardValid,
  checkDuplicateCode,
  checkSufficentBalance,
};
module.exports = verifyGiftcard;
