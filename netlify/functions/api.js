const express = require("express");
const serverless = require("serverless-http");
const controller = require("../../backend/controllers/user.controller");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  controller.allAccess(req, res);
});
app.use(express.json());
app.use("/.netlify/functions/api", router);

export const handler = serverless(app);
