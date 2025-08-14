const express = require("express");
const Operator = require("../models/Operator.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");
const authMiddleware = require("../middleware/auth.js");

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const operator = await Operator.findOne({ email });

    if (!operator || operator.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Неверные учетные данные",
      });
    }

    const token = jwt.sign(
      { id: operator._id, email: operator.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true });

    res.json({
      success: true,
      operator: {
        id: operator._id,
        email: operator.email,
        fullName: operator.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
    });
  }
});

// Проверка авторизации
authRouter.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    operator: {
      id: req.operator._id,
      email: req.operator.email,
      fullName: req.operator.fullName,
    },
  });
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

module.exports = authRouter;
