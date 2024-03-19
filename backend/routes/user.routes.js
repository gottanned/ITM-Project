const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const giftcardController = require("../controllers/giftcard.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.put(
    "/api/test/user/add-giftcard",
    [authJwt.verifyToken],
    giftcardController.registerGiftcard
  );

  app.get(
    "/api/test/user/list-giftcard",
    [authJwt.verifyToken],
    giftcardController.listGiftcards
  );

  app.patch(
    "/api/test/user/redeem-giftcard",
    [authJwt.verifyToken],
    giftcardController.redeemGiftcard
  );

  app.patch(
    "/api/test/user/update-giftcard",
    [authJwt.verifyToken],
    giftcardController.updateGiftcard
  );

  app.delete(
    "/api/test/user/delete-giftcard",
    [authJwt.verifyToken],
    giftcardController.deleteGiftcard
  );

  /*
  * Add timestamp for date created/modified
  * Add LastName, FirstName, Email, Phone

  * Find giftcard by barcode
  * Find giftcard by name/phone/email
  
  * Add transtaction history
  
  */
};
