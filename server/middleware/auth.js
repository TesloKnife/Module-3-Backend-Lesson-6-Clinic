const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");
const Operator = require("../models/Operator.js");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Читаем из cookies вместо headers

    if (!token) {
      return res.status(401).json({ message: "Требуется авторизация" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const operator = await Operator.findById(decoded.id);

    if (!operator) {
      return res.status(401).json({
        success: false,
        message: "Пользователь не найден",
      });
    }

    // Добавляем оператора и токен в запрос
    req.operator = operator;
    req.token = token;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Неверный токен",
    });
  }
};

module.exports = authMiddleware;
