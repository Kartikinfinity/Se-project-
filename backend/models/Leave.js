const mongoose = require("mongoose");

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, enum: ["pending", "approved", "rejected"], required: true },
  by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // teacher/admin who acted
  note: { type: String },
  at: { type: Date, default: Date.now },
});

const leaveSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // assigned at creation from Subject
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  type: { type: String, enum: ["normal", "medical", "od"], default: "normal" },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  reason: { type: String },
  medicalFile: { type: String }, // url to file (optional)
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  statusHistory: { type: [statusHistorySchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

// helper index for fast teacher/subject queries
leaveSchema.index({ teacher: 1, subject: 1, status: 1 });

module.exports = mongoose.model("Leave", leaveSchema);
