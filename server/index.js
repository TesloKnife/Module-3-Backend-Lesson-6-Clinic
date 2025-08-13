const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const router = require("./routes/requests.js");

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

// Подключаем роуты
app.use("/requests", router);

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
