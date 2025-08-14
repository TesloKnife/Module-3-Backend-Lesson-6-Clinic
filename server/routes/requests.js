const express = require("express");
const Request = require("../models/Request.js");
const authMiddleware = require("../middleware/auth");

const requestsRouter = express.Router();

// Создание новой заявки
requestsRouter.post("/", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

requestsRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = requestsRouter;
