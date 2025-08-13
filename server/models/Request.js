const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  problem: String, // Необязательное поле
  createdAt: { type: Date, default: Date.now },
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
