import { useState } from "react";
import { X, BookOpen, Search, ExternalLink, AlertTriangle, Check } from "lucide-react";

interface Resource {
  id: string;
  courseCode: string;
  courseName: string;
  category: "PYQ" | "Slides" | "Lab" | "Full Drive";
  url: string;
  views: number;
}

const INITIAL_RESOURCES: Resource[] = [
  { id: "1", courseCode: "CSE2003", courseName: "Data Structures and Algorithms", category: "Full Drive", url: "https://drive.google.com/drive/folders/mock-dsa-vit-notes", views: 2450 },
  { id: "2", courseCode: "CSE3001", courseName: "Software Engineering", category: "Slides", url: "https://drive.google.com/drive/folders/mock-se-slides", views: 1820 },
  { id: "3", courseCode: "CSE2001", courseName: "Computer Organization and Architecture", category: "PYQ", url: "https://drive.google.com/drive/folders/mock-coa-pyqs", views: 3200 },
  { id: "4", courseCode: "CSE1007", courseName: "Java Programming", category: "Lab", url: "https://drive.google.com/drive/folders/mock-java-lab", views: 1200 },
  { id: "5", courseCode: "MAT2001", courseName: "Double Integration & Statistics", category: "Full Drive", url: "https://drive.google.com/drive/folders/mock-maths-drive", views: 4120 },
  { id: "6", courseCode: "CSE3002", courseName: "Compiler Design", category: "PYQ", url: "https://drive.google.com/drive/folders/mock-cd-pyqs", views: 1540 },
  { id: "7", courseCode: "EEE1001", courseName: "Basic Electrical & Electronics", category: "Slides", url: "https://drive.google.com/drive/folders/mock-bee-slides", views: 980 },
];

interface ResourcesHubProps {
  onClose: () => void;
}

export default function ResourcesHub({ onClose }: ResourcesHubProps) {
  const [resources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [reportedIds, setReportedIds] = useState<Record<string, boolean>>({});

  const handleReportDeadLink = (id: string) => {
    setReportedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      alert("Thank you! A report has been filed. Our student admins will update this link shortly.");
    }, 100);
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch = 
      res.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="glass-panel interactive" style={{
      width: "90%",
      maxWidth: "800px",
      maxHeight: "85vh",
      overflowY: "auto",
      padding: "24px",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-cyan)", display: "flex", alignItems: "center", gap: "10px" }}>
          <BookOpen size={28} /> Notes & PYQs Hub
        </h2>
        <button 
          onClick={onClose}
          style={{ background: "none", color: "var(--color-text-muted)", cursor: "pointer" }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Search and Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
          <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
          <input
            type="text"
            placeholder="Search by Course Code or Subject (e.g. CSE2003, DSA)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", paddingLeft: "38px" }}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: "160px" }}
        >
          <option value="All">All Formats</option>
          <option value="Full Drive">Google Drives</option>
          <option value="PYQ">Question Papers</option>
          <option value="Slides">Slides / PPTs</option>
          <option value="Lab">Lab Manuals</option>
        </select>
      </div>

      {/* Resources Table/List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredResources.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--color-text-muted)" }}>
            No study material found for "{searchTerm}". 
            <div style={{ fontSize: "12px", marginTop: "8px" }}>Try searching "CSE" or "MAT".</div>
          </div>
        ) : (
          filteredResources.map((res) => (
            <div 
              key={res.id} 
              className="glass-card" 
              style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: "16px",
                flexWrap: "wrap",
                gap: "12px"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "bold", background: "rgba(6, 182, 212, 0.15)", color: "var(--accent-cyan)", padding: "2px 6px", borderRadius: "4px" }}>
                    {res.courseCode}
                  </span>
                  <span style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px", color: "var(--color-text-muted)" }}>
                    {res.category}
                  </span>
                </div>
                <h4 style={{ color: "#fff", fontSize: "16px", marginTop: "6px" }}>{res.courseName}</h4>
                <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{res.views} student visits this semester</span>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleReportDeadLink(res.id)}
                  disabled={reportedIds[res.id]}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    background: reportedIds[res.id] ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.05)",
                    border: `1px solid ${reportedIds[res.id] ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                    color: reportedIds[res.id] ? "#10b981" : "#ef4444",
                    padding: "8px 12px",
                    borderRadius: "6px"
                  }}
                >
                  {reportedIds[res.id] ? (
                    <>
                      <Check size={14} /> Reported
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={14} /> Dead Link?
                    </>
                  )}
                </button>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button
                    className="btn-primary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      padding: "8px 14px",
                    }}
                  >
                    Open Drive <ExternalLink size={14} />
                  </button>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
