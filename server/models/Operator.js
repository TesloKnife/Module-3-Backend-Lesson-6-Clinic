const mongoose = require("mongoose");

const OperatorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Operator = mongoose.model("Operator", OperatorSchema);

module.exports = Operator;
