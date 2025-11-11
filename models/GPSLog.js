const mongoose = require("mongoose");

const gpsSchema = new mongoose.Schema(
  {
    raw: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      sparse: true,
    },
    longitude: {
      type: Number,
      sparse: true,
    },
    accuracy: {
      type: Number,
      sparse: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

// Create index for faster queries
gpsSchema.index({ timestamp: -1 });
gpsSchema.index({ latitude: 1, longitude: 1 });

const GPSLog = mongoose.model("GPSLog", gpsSchema);

module.exports = GPSLog;
