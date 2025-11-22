import { useEffect, useMemo, useState } from "react";

export default function TeacherPending() {
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      window.location.href = "/";
      return;
    }
    const fetchLeaves = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/teacher/pending/${user.id}`);
        const data = await res.json();
        setLeaves(data.leaves || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, [user?.id]);

  const updateStatus = async (leaveId, action) => {
    const url =
      action === "approve"
        ? `http://localhost:5000/api/teacher/approve/${leaveId}`
        : `http://localhost:5000/api/teacher/reject/${leaveId}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId: user.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setLeaves((prev) => prev.filter((leave) => leave._id !== leaveId));
      } else {
        setMessage(data.message || "Unable to update status");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error - please try again");
    }
  };

  return (
    <div className="page-center">
      <div className="main-card">
        <div className="page-title">Pending Leaves</div>
        <p className="text-muted" style={{ marginBottom: 24 }}>
          Review student submissions and take action instantly.
        </p>

        {message && <div className="alert success">{message}</div>}

        {loading ? (
          <div className="empty-state">Loading pending leaves...</div>
        ) : leaves.length === 0 ? (
          <div className="empty-state">No pending leaves assigned to you.</div>
        ) : (
          <div className="table-box">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id}>
                    <td>
                      <div>{leave.student?.name}</div>
                      <small className="text-muted">{leave.student?.email}</small>
                    </td>
                    <td>{leave.subject?.name}</td>
                    <td className="text-capitalize">{leave.type}</td>
                    <td>
                      {new Date(leave.fromDate).toLocaleDateString()} –{" "}
                      {new Date(leave.toDate).toLocaleDateString()}
                    </td>
                    <td>{leave.reason || "Not provided"}</td>
                    <td>
                      <div className="table-actions">
                        <button className="main-btn" onClick={() => updateStatus(leave._id, "approve")}>
                          Approve
                        </button>
                        <button className="ghost-btn" onClick={() => updateStatus(leave._id, "reject")}>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}





