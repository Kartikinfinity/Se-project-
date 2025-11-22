import { useState } from "react";

export default function AddSubject() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [maxLeaves, setMaxLeaves] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!name || !code) {
      setMessage("Name and code are required.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/admin/add-subject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code, maxLeaves: maxLeaves || 3 }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        setName("");
        setCode("");
        setMaxLeaves("");
        setTimeout(() => {
          window.location.href = "/admin-dashboard";
        }, 1500);
      } else {
        setMessage(`❌ ${data.message || "Unable to add subject"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error - please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="main-card">
        <header className="dashboard-header">
          <div>
            <div className="page-title">Add Subject</div>
            <p className="text-muted" style={{ marginTop: 8 }}>
              Define new subjects and configure their leave policies.
            </p>
          </div>
          <button className="ghost-btn" onClick={() => (window.location.href = "/admin-dashboard")}>
            Back to Dashboard
          </button>
        </header>

        <form className="form-grid" onSubmit={submit}>
          <div className="form-field">
            <label className="section-title">Subject Name</label>
        <input
          className="input-field"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          </div>

          <div className="form-field">
            <label className="section-title">Subject Code</label>
        <input className="input-field" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
          </div>

          <div className="form-field">
            <label className="section-title">Max Leaves</label>
        <input
          className="input-field"
              placeholder="Default 3"
          value={maxLeaves}
          onChange={(e) => setMaxLeaves(e.target.value)}
        />
          </div>

          <div className="form-actions">
            <button className="main-btn" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Subject"}
            </button>
            <button className="ghost-btn" type="button" onClick={() => (window.location.href = "/admin-dashboard")}>
              Cancel
        </button>
          </div>
        </form>

        {message && (
          <div className={`alert ${message.startsWith("✅") ? "success" : "error"}`} style={{ marginTop: 20 }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
