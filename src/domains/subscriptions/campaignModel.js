const mongoose = require("mongoose");

const emailCampaignSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    totalSubscribers: {
      type: Number,
      default: 0,
    },
    totalBatches: {
      type: Number,
      default: 0,
    },
    sentCount: {
      type: Number,
      default: 0,
    },
    failedCount: {
      type: Number,
      default: 0,
    },
    pendingCount: {
      type: Number,
      default: 0,
    },
    completedBatches: {
      type: Number,
      default: 0,
    },
    failedBatches: {
      type: Number,
      default: 0,
    },
    startedAt: Date,
    completedAt: Date,
    errorMessage: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("EmailCampaign", emailCampaignSchema);
