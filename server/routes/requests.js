const express = require("express");
const Request = require("../models/Request.js");

const router = express.Router();

// Создание новой заявки
router.post("/", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
