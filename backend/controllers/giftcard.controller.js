const db = require("../models");
const User = db.user;
const Giftcard = db.giftcard;

exports.verifyGiftcard = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const giftCard = user.giftCards.find(
      (giftCard) => giftCard.barcode === req.body.barcode
    );
    if (!giftCard) {
      res.status(403).send({ message: "Gitfcard has not yet registered!" });
      return;
    }
    res.status(200).send(JSON.stringify(giftCard));
  });
};

exports.registerGiftcard = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (
      user.giftCards.find((giftCard) => giftCard.barcode === req.body.barcode)
    ) {
      res.status(400).send({ message: "Barcode already exists in giftCards" });
      return;
    }
    User.updateOne(
      { _id: req.userId },
      {
        $push: {
          giftCards: {
            barcode: req.body.barcode,
            amount: req.body.amount,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        },
      },
      (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({ message: "Giftcard registered successfully!" });
      }
    );
  });
};

exports.listGiftcards = (req, res) => {
  User.findById(req.userId)
    .populate("giftCards")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(JSON.stringify(user.giftCards));
    });
};

exports.redeemGiftcard = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const giftCard = user.giftCards.find(
      (giftCard) => giftCard.barcode === req.body.barcode
    );
    if (!giftCard) {
      res.status(403).send({ message: "Invalid Giftcard!" });
      return;
    }
    if (giftCard.amount < req.body.redeemAmount) {
      res.status(403).send({ message: "Insufficient Balance!" });
      return;
    }
    User.findOneAndUpdate(
      { _id: req.userId, "giftCards.barcode": req.body.barcode },

      {
        $inc: { "giftCards.$.amount": -req.body.redeemAmount },
        $set: { "giftCards.$.updatedAt": Date.now() },
      },

      (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({
          message: "Giftcard redeemed successfully!",
        });
      }
    );
  });
};

exports.editGiftcard = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const giftCard = user.giftCards.find(
      (giftCard) => giftCard.barcode === req.body.barcode
    );
    if (!giftCard) {
      res.status(403).send({ message: "Invalid Giftcard!" });
      return;
    }
    User.updateOne(
      { _id: req.userId, "giftCards.barcode": req.body.barcode },
      {
        $set: {
          "giftCards.$.amount": req.body.amount,
          "giftCards.$.updatedAt": Date.now(),
        },
      },
      (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({
          message: "Giftcard updated successfully!",
        });
      }
    );
  });
};

exports.deleteGiftcard = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const giftCard = user.giftCards.find(
      (giftCard) => giftCard.barcode === req.body.barcode
    );
    if (!giftCard) {
      res.status(403).send({ message: "Giftcard not found!" });
      return;
    }
    User.updateOne(
      { _id: req.userId },
      { $pull: { giftCards: { barcode: req.body.barcode } } },
      (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({ message: "Giftcard deleted successfully!" });
      }
    );
  });
};
