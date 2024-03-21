import express from "express";
import serverless from "serverless-http";
import controller from "../../backend/controllers/user.controller";

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  controller.allAccess(req, res);
});
app.use(express.json());
app.use("/.netlify/functions/api", router);

export const handler = serverless(app);
