import { useState } from "react";
import { X, Calendar, AlertCircle, Trash2, Download } from "lucide-react";

interface ScheduledSlot {
  id: string;
  courseName: string;
  slot: string; // e.g. A1, B2, L13
  color: string;
}

// Map VIT slot names to specific grid cells [DayIndex (0-4), PeriodIndex (0-9)]
// Monday-Friday, 10 periods per day (5 morning, 5 afternoon)
const SLOT_MAP: Record<string, [number, number][]> = {
  A1: [[0, 0], [2, 1]],
  B1: [[1, 0], [3, 1]],
  C1: [[2, 0], [4, 1]],
  D1: [[3, 0], [0, 1]],
  E1: [[4, 0], [1, 1]],
  F1: [[0, 2], [2, 3]],
  G1: [[1, 2], [3, 3]],
  
  A2: [[0, 5], [2, 6]],
  B2: [[1, 5], [3, 6]],
  C2: [[2, 5], [4, 6]],
  D2: [[3, 5], [0, 6]],
  E2: [[4, 5], [1, 6]],
  F2: [[0, 7], [2, 8]],
  G2: [[1, 7], [3, 8]],
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const PERIODS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", // Morning (Theory 1)
  "14:00", "15:00", "16:00", "17:00", "18:00"  // Afternoon (Theory 2)
];

const SLOT_COLORS = [
  "#a855f7", // Purple
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#10b981", // Green
  "#f59e0b", // Yellow
  "#3b82f6", // Blue
  "#ef4444"  // Red
];

interface FFCSPlannerProps {
  onClose: () => void;
}

export default function FFCSPlanner({ onClose }: FFCSPlannerProps) {
  const [courses, setCourses] = useState<ScheduledSlot[]>([
    { id: "1", courseName: "Computer Networks", slot: "A1", color: "#06b6d4" },
    { id: "2", courseName: "AI & Neural Networks", slot: "B1", color: "#a855f7" },
    { id: "3", courseName: "Object Oriented Analysis", slot: "C2", color: "#ec4899" },
  ]);

  const [courseName, setCourseName] = useState("");
  const [slotText, setSlotText] = useState("A1");
  const [errorMsg, setErrorMsg] = useState("");

  const addSlot = () => {
    setErrorMsg("");
    if (!courseName.trim()) {
      setErrorMsg("Course name is required");
      return;
    }
    const cleanSlot = slotText.trim().toUpperCase();

    // Check if slot exists in our map
    if (!SLOT_MAP[cleanSlot]) {
      setErrorMsg(`Slot ${cleanSlot} is not configured. Try A1, A2, B1, B2, C1, C2, etc.`);
      return;
    }

    // Check for conflicts
    const conflict = courses.find((c) => c.slot === cleanSlot);
    if (conflict) {
      setErrorMsg(`Conflict! Slot ${cleanSlot} is already booked by '${conflict.courseName}'`);
      return;
    }

    const randomColor = SLOT_COLORS[courses.length % SLOT_COLORS.length];
    const newCourse: ScheduledSlot = {
      id: Date.now().toString(),
      courseName,
      slot: cleanSlot,
      color: randomColor,
    };

    setCourses([...courses, newCourse]);
    setCourseName("");
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  // Build grid data for rendering
  const grid: (ScheduledSlot | null)[][] = Array(5).fill(null).map(() => Array(10).fill(null));
  
  courses.forEach((c) => {
    const coordinates = SLOT_MAP[c.slot];
    if (coordinates) {
      coordinates.forEach(([day, period]) => {
        grid[day][period] = c;
      });
    }
  });

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(courses, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ffcs-timetable.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="glass-panel interactive" style={{
      width: "95%",
      maxWidth: "1000px",
      maxHeight: "90vh",
      overflowY: "auto",
      padding: "24px",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-purple)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Calendar size={28} /> FFCS Timetable Planner
        </h2>
        <button 
          onClick={onClose}
          style={{ background: "none", color: "var(--color-text-muted)", cursor: "pointer" }}
        >
          <X size={24} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        {/* Input Form & Current Courses */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          
          <div className="glass-card" style={{ padding: "16px" }}>
            <h3 style={{ fontSize: "15px", color: "#fff", marginBottom: "12px", fontFamily: "var(--font-display)" }}>Add Course Slot</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                placeholder="Course Name (e.g. Operating Systems)"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
              
              <div style={{ display: "flex", gap: "10px" }}>
                <select
                  value={slotText}
                  onChange={(e) => setSlotText(e.target.value)}
                  style={{ flex: 1 }}
                >
                  {Object.keys(SLOT_MAP).map((slot) => (
                    <option key={slot} value={slot}>Slot {slot}</option>
                  ))}
                </select>
                <button className="btn-primary" onClick={addSlot} style={{ flex: 1 }}>
                  Schedule Course
                </button>
              </div>

              {errorMsg && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ef4444", fontSize: "13px", marginTop: "4px" }}>
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}
            </div>
          </div>

          <div className="glass-card" style={{ padding: "16px", maxHeight: "200px", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h3 style={{ fontSize: "14px", color: "#fff", fontFamily: "var(--font-display)" }}>Scheduled Slots</h3>
              {courses.length > 0 && (
                <button 
                  onClick={downloadJSON}
                  style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", background: "none", color: "var(--accent-cyan)", cursor: "pointer" }}
                >
                  <Download size={14} /> Export
                </button>
              )}
            </div>
            
            {courses.length === 0 ? (
              <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>No slots scheduled yet.</span>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {courses.map((c) => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", background: "rgba(0,0,0,0.2)", borderRadius: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: c.color }}></span>
                      <span style={{ fontSize: "13px", fontWeight: "bold" }}>{c.slot}</span>
                      <span style={{ fontSize: "13px", color: "var(--color-text-muted)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "150px" }}>{c.courseName}</span>
                    </div>
                    <button 
                      onClick={() => removeCourse(c.id)}
                      style={{ background: "none", color: "rgba(239, 68, 68, 0.7)", cursor: "pointer" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Timetable Grid View */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff", minWidth: "750px" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)", width: "80px" }}>Day</th>
                {PERIODS.map((p, idx) => (
                  <th key={idx} style={{ padding: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)" }}>
                    {p}
                    <div style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>P{idx+1}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((dayName, dayIdx) => (
                <tr key={dayIdx}>
                  <td style={{ padding: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)", fontWeight: "bold", textAlign: "center" }}>
                    {dayName}
                  </td>
                  {Array(10).fill(null).map((_, periodIdx) => {
                    const scheduled = grid[dayIdx][periodIdx];
                    
                    // Match cell slots to names for placeholder display
                    let cellSlotName = "";
                    Object.entries(SLOT_MAP).forEach(([slot, coords]) => {
                      const match = coords.find(([d, p]) => d === dayIdx && p === periodIdx);
                      if (match) cellSlotName = slot;
                    });

                    return (
                      <td 
                        key={periodIdx} 
                        style={{ 
                          padding: "8px", 
                          border: "1px solid rgba(255,255,255,0.1)", 
                          textAlign: "center",
                          fontSize: "12px",
                          height: "60px",
                          backgroundColor: scheduled ? `${scheduled.color}25` : "rgba(0,0,0,0.1)",
                          color: scheduled ? scheduled.color : "rgba(255,255,255,0.25)",
                          fontWeight: scheduled ? "bold" : "normal",
                          transition: "all 0.2s ease"
                        }}
                      >
                        {scheduled ? (
                          <div>
                            <div style={{ fontSize: "10px", opacity: 0.8 }}>{scheduled.slot}</div>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80px", color: "#fff" }}>
                              {scheduled.courseName}
                            </div>
                          </div>
                        ) : (
                          cellSlotName || "-"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
