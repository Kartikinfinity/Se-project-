import { useEffect, useState } from "react";

export default function ViewSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/subjects");
        const data = await res.json();
        setSubjects(data.subjects || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="page-center">
      <div className="main-card">
        <header className="dashboard-header">
          <div>
            <div className="page-title">All Subjects</div>
            <p className="text-muted" style={{ marginTop: 8 }}>
              Monitor subject inventory, codes, leave quotas, and assigned teachers.
            </p>
          </div>
          <button className="ghost-btn" onClick={() => (window.location.href = "/admin-dashboard")}>
            Back to Dashboard
          </button>
        </header>

        {loading ? (
          <div className="empty-state">Loading subjects...</div>
        ) : subjects.length === 0 ? (
          <div className="empty-state">No subjects found. Add your first subject!</div>
        ) : (
          <div className="table-box" style={{ marginTop: 24 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Max Leaves</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s) => (
                  <tr key={s._id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.code}</td>
                    <td>{s.maxLeaves || 3}</td>
                    <td>
                      <span className={`status-pill ${s.teacher ? "approved" : "pending"}`}>
                        {s.teacher ? s.teacher.name : "Not assigned"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <button className="main-btn" onClick={() => (window.location.href = "/admin/add-subject")}>
            Add New Subject
          </button>
          <button className="ghost-btn" onClick={() => (window.location.href = "/admin/assign-teacher")}>
            Assign Teacher
          </button>
        </div>
      </div>
    </div>
  );
}
