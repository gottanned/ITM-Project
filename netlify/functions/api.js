import express from "express";
import serverless from "serverless-http";
import userController from "../../backend/controllers/user.controller";
import authController from "../../backend/controllers/auth.controller";
import authJwt from "../../backend/middlewares/authJwt";
import dbConnect from "../../backend/db/db.connect";

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  userController.allAccess(req, res);
});
router.get("/user", (req, res) => {
  userController.userBoard(req, res);
});

router.post("/auth/signin", (req, res) => {
  console.log("signin");
  dbConnect();
  authController.signin(req, res);
});

app.use(express.json());
app.use("/.netlify/functions/api", router);

export const handler = serverless(app);
