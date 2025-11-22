const Leave = require("../models/Leave");
const Subject = require("../models/Subject");
const mongoose = require("mongoose");

/**
 * Student applies for leave.
 * - Validates fields
 * - Validates dates (fromDate <= toDate)
 * - Finds subject -> finds assigned teacher and sets it on leave
 * - Prevents exact overlapping pending/approved leaves for the same student+subject range
 * - Adds initial statusHistory entry (pending)
 */
exports.applyLeave = async (req, res) => {
  try {
    const { student, subject, fromDate, toDate, type, reason, medicalFile } = req.body;

    if (!student || !subject || !fromDate || !toDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(student) || !mongoose.Types.ObjectId.isValid(subject)) {
      return res.status(400).json({ message: "Invalid student or subject id" });
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (isNaN(from) || isNaN(to) || from > to) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // get subject to know assigned teacher
    const subjectDoc = await Subject.findById(subject).populate("teacher", "name email").lean();
    if (!subjectDoc) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // CRITICAL: Teacher must be assigned to subject before leave can be applied
    if (!subjectDoc.teacher) {
      return res.status(400).json({ 
        message: "No teacher assigned to this subject. Please contact admin to assign a teacher first." 
      });
    }

    // prevent overlapping leaves for same subject & student (approved or pending)
    // Two date ranges overlap if: start1 <= end2 AND start2 <= end1
    const overlapping = await Leave.findOne({
      student,
      subject,
      status: { $in: ["pending", "approved"] },
      fromDate: { $lte: to },
      toDate: { $gte: from }
    });

    if (overlapping) {
      return res.status(409).json({ message: "You already have an active/pending leave for this subject overlapping these dates." });
    }

    // Build leave payload - teacher is REQUIRED
    const payload = {
      student,
      subject,
      teacher: subjectDoc.teacher._id, // Always set teacher from subject
      type: type || "normal",
      fromDate: from,
      toDate: to,
      reason: reason || "",
      medicalFile: medicalFile || undefined,
      status: "pending",
      statusHistory: [{
        status: "pending",
        by: null, // student initiated (no teacher)
        note: "Applied by student",
        at: new Date()
      }]
    };

    const leave = await Leave.create(payload);

    console.log(`✅ Leave created: ${leave._id} for student ${student}, assigned to teacher ${payload.teacher}`);

    // Return full populated leave for frontend convenience
    const saved = await Leave.findById(leave._id)
      .populate("student", "name email")
      .populate("teacher", "name email")
      .populate("subject", "name code");

    return res.status(201).json({ message: "Leave applied successfully", leave: saved });
  } catch (err) {
    console.error("applyLeave error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
