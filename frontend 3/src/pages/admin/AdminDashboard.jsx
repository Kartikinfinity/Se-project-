import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    subjects: 0,
    teachers: 0,
    assigned: 0,
    unassigned: 0,
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user?.id || user?.role !== "admin") {
      window.location.href = "/";
      return;
    }
    const fetchStats = async () => {
      try {
        const [subjectsRes, teachersRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/subjects"),
          fetch("http://localhost:5000/api/admin/teachers"),
        ]);
        const subjectsData = await subjectsRes.json();
        const teachersData = await teachersRes.json();

        const subjects = subjectsData.subjects || [];
        const assigned = subjects.filter((s) => s.teacher).length;

        setStats({
          subjects: subjects.length,
          teachers: (teachersData.teachers || []).length,
          assigned,
          unassigned: subjects.length - assigned,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user?.id]);

  const actions = [
    {
      title: "Add Subject",
      description: "Create new subjects and configure maximum allowed leaves.",
      cta: "CREATE SUBJECT",
      href: "/admin/add-subject",
      icon: "📚",
    },
    {
      title: "Assign Teacher",
      description: "Map available teachers to specific subjects or batches.",
      cta: "ASSIGN NOW",
      href: "/admin/assign-teacher",
      icon: "👨‍🏫",
    },
    {
      title: "View Subjects",
      description: "Review the full catalog with current ownership at a glance.",
      cta: "OPEN DIRECTORY",
      href: "/admin/view-subjects",
      icon: "📋",
    },
    {
      title: "Add Teacher",
      description: "Onboard new faculty members with secure credentials.",
      cta: "ADD TEACHER",
      href: "/admin/add-teacher",
      icon: "➕",
    },
  ];

  const handleNavigation = (href) => {
    window.location.href = href;
  };

  return (
    <div className="page-center">
      <div className="main-card">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Admin Console</p>
            <h1 className="page-title">Control Center</h1>
            <p className="text-muted">Manage subjects, teachers, and assignments in one place.</p>
          </div>
          <button className="ghost-btn" onClick={() => (window.location.href = "/")}>
            Logout
          </button>
        </header>

        {!loading && (
          <div className="summary-grid" style={{ marginTop: 32, marginBottom: 32 }}>
            <div className="summary-card">
              <p className="text-muted">Total Subjects</p>
              <h3>{stats.subjects}</h3>
            </div>
            <div className="summary-card">
              <p className="text-muted">Total Teachers</p>
              <h3>{stats.teachers}</h3>
            </div>
            <div className="summary-card">
              <p className="text-muted">Assigned Subjects</p>
              <h3>{stats.assigned}</h3>
            </div>
            <div className="summary-card">
              <p className="text-muted">Unassigned</p>
              <h3>{stats.unassigned}</h3>
            </div>
          </div>
        )}

        <div className="grid admin-action-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {actions.map((action) => (
            <div className="widget" key={action.title} style={{ cursor: "pointer" }} onClick={() => handleNavigation(action.href)}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{action.icon}</div>
              <h3 style={{ marginBottom: 8 }}>{action.title}</h3>
              <p className="text-muted" style={{ margin: "0 0 20px", fontSize: 14 }}>
                {action.description}
              </p>
              <button className="main-btn" style={{ width: "100%" }} onClick={(e) => { e.stopPropagation(); handleNavigation(action.href); }}>
                {action.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
