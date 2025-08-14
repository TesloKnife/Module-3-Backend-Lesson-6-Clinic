const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requestsRouter = require("./routes/requests.js");
const authRouter = require("./routes/auth.js");

const port = 3000;
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Точный адрес фронтенда
    credentials: true, // Разрешаем передачу кук
    methods: ["GET", "POST", "PUT", "DELETE"], // Разрешенные методы
    allowedHeaders: ["Content-Type", "Authorization"], // Разрешенные заголовки
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Подключаем роуты
app.use("/requests", requestsRouter);
app.use("/auth", authRouter);

// Подключение к БД и запуск сервера
mongoose
  .connect("mongodb://user:mongopass@localhost:27017/clinicdb?authSource=admin")
  .then(() => {
    console.log(chalk.green("MongoDB connected"));

    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  })
  .catch((err) => console.error(chalk.red("MongoDB connection error:"), err));
