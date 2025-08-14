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
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
      search = "",
    } = req.query;
    const skip = (page - 1) * limit;

    // Поиск
    const query = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const [requests, total] = await Promise.all([
      Request.find(query)
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      Request.countDocuments(query),
    ]);

    res.json({
      requests,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = requestsRouter;
