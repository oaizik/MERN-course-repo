const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    mail: { type: String, required: true, unique: true },
    address: String,
    startDate: Date,
    period: {
      type: String,
      required: true,
      enum: ["month", "half-year", "year"]
    },
    price: { type: Number, required: true }
  },
  { collection: "users" }
);

// validations
userSchema.path("age").validate(obj => obj > 18, "Age must be above 18!");

const Model = model("Model", userSchema);
module.exports = Model;
