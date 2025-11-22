import { useEffect, useState } from "react";

export default function AssignTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersRes, subjectsRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/teachers"),
          fetch("http://localhost:5000/api/admin/subjects"),
        ]);
        const teachersData = await teachersRes.json();
        const subjectsData = await subjectsRes.json();
        setTeachers(teachersData.teachers || []);
        setSubjects(subjectsData.subjects || []);
      } catch (err) {
        console.error(err);
        setMsg("❌ Error loading data");
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!teacherId || !subjectId) {
      setMsg("❌ Please select both subject and teacher.");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/admin/assign-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId, subjectId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(`✅ ${data.message}`);
        setTeacherId("");
        setSubjectId("");
        setTimeout(() => {
          window.location.href = "/admin-dashboard";
        }, 1500);
      } else {
        setMsg(`❌ ${data.message || "Unable to assign teacher"}`);
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ Network error - please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="main-card">
        <header className="dashboard-header">
          <div>
            <div className="page-title">Assign Teacher</div>
            <p className="text-muted" style={{ marginTop: 8 }}>
              Link subjects with available teachers for streamlined workflows.
            </p>
          </div>
          <button className="ghost-btn" onClick={() => (window.location.href = "/admin-dashboard")}>
            Back to Dashboard
          </button>
        </header>

        <form className="form-grid" onSubmit={submit}>
          <div className="form-field">
            <label className="section-title">Subject</label>
            <select className="input-field" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option value={s._id} key={s._id}>
                  {s.name} ({s.code})
            </option>
          ))}
        </select>
          </div>

          <div className="form-field">
            <label className="section-title">Teacher</label>
            <select className="input-field" value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option value={t._id} key={t._id}>
              {t.name}
            </option>
          ))}
        </select>
          </div>

          <div className="form-actions">
            <button className="main-btn" type="submit" disabled={loading || fetching}>
              {loading ? "Assigning..." : "Assign Teacher"}
            </button>
            <button className="ghost-btn" type="button" onClick={() => (window.location.href = "/admin-dashboard")}>
              Cancel
            </button>
          </div>
        </form>

        {msg && (
          <div className={`alert ${msg.startsWith("✅") ? "success" : "error"}`} style={{ marginTop: 20 }}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
