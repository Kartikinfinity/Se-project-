const Leave = require("../models/Leave");
const Subject = require("../models/Subject");
const mongoose = require("mongoose");

const getTeacherSubjectIds = async (teacherId) => {
  const subjects = await Subject.find({ teacher: teacherId }).select("_id").lean();
  return subjects.map((s) => s._id);
};

exports.getPendingLeaves = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Invalid teacherId" });
    }

    // Find all leaves where teacher matches AND status is pending
    const leaves = await Leave.find({
      teacher: teacherId,
      status: "pending"
    })
      .populate("student", "name email className")
      .populate("subject", "name code")
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    console.log(`📋 Teacher ${teacherId} has ${leaves.length} pending leaves`);

    return res.json({ leaves });
  } catch (err) {
    console.error("getPendingLeaves error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getLeaveHistory = async (req, res) => {
  try {
    const { teacherId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(teacherId)) return res.status(400).json({ message: "Invalid teacherId" });

    const subjectIds = await getTeacherSubjectIds(teacherId);

    const leaves = await Leave.find({
      subject: { $in: subjectIds },
      status: { $ne: "pending" },
    })
      .populate("student", "name email className")
      .populate("subject", "name code")
      .sort({ createdAt: -1 });

    return res.json({ leaves });
  } catch (err) {
    console.error("getLeaveHistory error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Approve a leave
 * - Validates leave id
 * - Ensures teacher is authorized (optional check implemented: teacher must match leave.teacher or subject.teacher)
 * - Updates status + pushes statusHistory
 * - Returns the updated populated leave
 */
exports.approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { teacherId, note } = req.body;

    if (!mongoose.Types.ObjectId.isValid(leaveId)) {
      return res.status(400).json({ message: "Invalid leaveId" });
    }

    if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    const leave = await Leave.findById(leaveId).populate("subject", "teacher").populate("teacher", "name email");
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Authorization: Ensure teacherId matches the leave's assigned teacher
    if (leave.teacher && String(leave.teacher._id) !== String(teacherId)) {
      return res.status(403).json({ message: "Not authorized to approve this leave" });
    }

    // Update leave: set status, add to history
    const updated = await Leave.findByIdAndUpdate(
      leaveId,
      {
        $set: { status: "approved" },
        $push: {
          statusHistory: {
            status: "approved",
            by: teacherId,
            note: note || "Approved by teacher",
            at: new Date()
          }
        }
      },
      { new: true }
    )
      .populate("student", "name email className")
      .populate("teacher", "name email")
      .populate("subject", "name code");

    return res.json({ message: "Leave approved successfully", leave: updated });
  } catch (err) {
    console.error("approveLeave error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Reject a leave - symmetrical to approve
 */
exports.rejectLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { teacherId, note } = req.body;

    if (!mongoose.Types.ObjectId.isValid(leaveId)) {
      return res.status(400).json({ message: "Invalid leaveId" });
    }

    if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    const leave = await Leave.findById(leaveId).populate("subject", "teacher").populate("teacher", "name email");
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Authorization: Ensure teacherId matches the leave's assigned teacher
    if (leave.teacher && String(leave.teacher._id) !== String(teacherId)) {
      return res.status(403).json({ message: "Not authorized to reject this leave" });
    }

    const updated = await Leave.findByIdAndUpdate(
      leaveId,
      {
        $set: { status: "rejected" },
        $push: {
          statusHistory: {
            status: "rejected",
            by: teacherId,
            note: note || "Rejected by teacher",
            at: new Date()
          }
        }
      },
      { new: true }
    )
      .populate("student", "name email className")
      .populate("teacher", "name email")
      .populate("subject", "name code");

    return res.json({ message: "Leave rejected", leave: updated });
  } catch (err) {
    console.error("rejectLeave error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
