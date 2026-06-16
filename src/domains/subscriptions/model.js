const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    unsubscribeToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

subscriberSchema.index({ isActive: 1, _id: 1 });

module.exports = mongoose.model("Subscriber", subscriberSchema);
