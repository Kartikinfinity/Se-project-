import { useState } from "react";

export default function AddTeacher() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);

  const addTeacher = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      setMessage("❌ Name, email, and password are required.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus("loading");
    setMessage("Creating teacher...");
    try {
      const res = await fetch("http://localhost:5000/api/admin/add-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, department }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message || "Teacher created successfully"}`);
        setStatus("success");
        setName("");
        setEmail("");
        setPassword("");
        setDepartment("");
        setTimeout(() => {
          window.location.href = "/admin-dashboard";
        }, 1500);
      } else {
        setMessage(`❌ ${data.message || "Unable to create teacher"}`);
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error - please try again");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="main-card">
        <header className="dashboard-header">
          <div>
            <div className="page-title">Add Teacher</div>
            <p className="text-muted" style={{ marginTop: 8 }}>
              Onboard faculty members with instant access credentials.
            </p>
          </div>
          <button className="ghost-btn" onClick={() => (window.location.href = "/admin-dashboard")}>
            Back to Dashboard
          </button>
        </header>

        <form className="form-grid" onSubmit={addTeacher}>
          <div className="form-field">
            <label className="section-title">Name</label>
        <input
          className="input-field"
          type="text"
          placeholder="Teacher Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          </div>

          <div className="form-field">
            <label className="section-title">Email</label>
        <input
          className="input-field"
          type="email"
              placeholder="teacher@college.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
          </div>

          <div className="form-field">
            <label className="section-title">Temporary Password</label>
        <input
          className="input-field"
          type="password"
              placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          </div>

          <div className="form-field">
            <label className="section-title">Department (optional)</label>
            <input
              className="input-field"
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button className="main-btn" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Teacher"}
            </button>
            <button className="ghost-btn" type="button" onClick={() => (window.location.href = "/admin-dashboard")}>
              Cancel
        </button>
          </div>
        </form>

        {message && (
          <div className={`alert ${status === "success" || message.startsWith("✅") ? "success" : "error"}`} style={{ marginTop: 20 }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
