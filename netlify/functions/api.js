import express from "express";
import serverless from "serverless-http";
import userController from "../../backend/controllers/user.controller";
import authController from "../../backend/controllers/auth.controller";
import giftcardController from "../../backend/controllers/giftcard.controller";
import dbConnect from "../../backend/db/db.connect";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../../backend/middlewares/verifySignUp";
import { authJwt } from "../../backend/middlewares";

dbConnect();

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  userController.allAccess(req, res);
});
router.get("/user", (req, res) => {
  userController.userBoard(req, res);
});

router.post("/auth/signin", (req, res) => {
  authController.signin(req, res);
});

router.post(
  "/auth/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  (req, res) => {
    authController.signup(req, res);
  }
);

router.get("/auth/dashboard", [authJwt.verifyToken], (req, res) => {
  giftcardController.listGiftcards(req, res);
});

router.put("/user/sell", [authJwt.verifyToken], (req, res) => {
  giftcardController.registerGiftcard(req, res);
});

router.delete(
  "/user/delete",
  [authJwt.verifyToken],
  giftcardController.deleteGiftcard
);

app.use(express.json());
app.use("/.netlify/functions/api", router);

export const handler = serverless(app);
