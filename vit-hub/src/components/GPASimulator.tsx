import { useState } from "react";
import { X, Plus, Trash2, Award } from "lucide-react";
import confetti from "canvas-confetti";

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const GRADE_POINTS: Record<string, number> = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0,
};

interface GPASimulatorProps {
  onClose: () => void;
}

export default function GPASimulator({ onClose }: GPASimulatorProps) {
  // Current Academic Details
  const [currentCGPA, setCurrentCGPA] = useState<string>("8.5");
  const [completedCredits, setCompletedCredits] = useState<string>("60");

  // Courses in the current simulator
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Software Engineering", credits: 4, grade: "S" },
    { id: "2", name: "Compiler Design", credits: 4, grade: "A" },
    { id: "3", name: "Database Management Systems", credits: 3, grade: "B" },
    { id: "4", name: "Web Development Lab", credits: 2, grade: "S" },
  ]);

  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCredits, setNewCourseCredits] = useState(3);
  const [newCourseGrade, setNewCourseGrade] = useState("S");

  const addCourse = () => {
    if (!newCourseName.trim()) return;
    const newCourse: Course = {
      id: Date.now().toString(),
      name: newCourseName,
      credits: newCourseCredits,
      grade: newCourseGrade,
    };
    setCourses([...courses, newCourse]);
    setNewCourseName("");
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  // SGPA Calculation
  const totalSemCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalSemPoints = courses.reduce((sum, c) => sum + c.credits * GRADE_POINTS[c.grade], 0);
  const sgpa = totalSemCredits > 0 ? totalSemPoints / totalSemCredits : 0;

  // CGPA Calculation
  const prevCredits = parseFloat(completedCredits) || 0;
  const prevCGPA = parseFloat(currentCGPA) || 0;
  const prevPoints = prevCGPA * prevCredits;

  const newTotalCredits = prevCredits + totalSemCredits;
  const newCGPA = newTotalCredits > 0 ? (prevPoints + totalSemPoints) / newTotalCredits : 0;

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#06b6d4", "#ec4899"],
    });
  };

  return (
    <div className="glass-panel interactive" style={{
      width: "90%",
      maxWidth: "750px",
      maxHeight: "85vh",
      overflowY: "auto",
      padding: "24px",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-cyan)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Award size={28} /> GPA Simulator
        </h2>
        <button 
          onClick={onClose}
          style={{ background: "none", color: "var(--color-text-muted)", cursor: "pointer" }}
        >
          <X size={24} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        {/* Top summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px" }}>
            <span style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Current CGPA</span>
            <input
              type="number"
              step="0.01"
              max="10"
              value={currentCGPA}
              onChange={(e) => setCurrentCGPA(e.target.value)}
              style={{ width: "90px", fontSize: "24px", textAlign: "center", fontWeight: "bold", border: "none", borderBottom: "2px solid #3b82f6", background: "none", color: "#fff", marginTop: "8px" }}
            />
          </div>
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px" }}>
            <span style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Completed Credits</span>
            <input
              type="number"
              value={completedCredits}
              onChange={(e) => setCompletedCredits(e.target.value)}
              style={{ width: "90px", fontSize: "24px", textAlign: "center", fontWeight: "bold", border: "none", borderBottom: "2px solid #3b82f6", background: "none", color: "#fff", marginTop: "8px" }}
            />
          </div>
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px", border: "1px solid rgba(6, 182, 212, 0.4)" }}>
            <span style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Predicted CGPA</span>
            <span style={{ fontSize: "32px", fontWeight: "bold", color: "var(--accent-cyan)", fontFamily: "var(--font-display)", marginTop: "8px" }}>
              {newCGPA.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Core SGPA Simulator Grid */}
        <div>
          <h3 style={{ fontSize: "16px", color: "#fff", marginBottom: "12px", fontFamily: "var(--font-display)" }}>Semester Course Simulator</h3>
          
          {/* Add Course inputs */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
            <input
              placeholder="Course Name (e.g. Operating Systems)"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              style={{ flex: 2, minWidth: "200px" }}
            />
            <select
              value={newCourseCredits}
              onChange={(e) => setNewCourseCredits(parseInt(e.target.value))}
              style={{ width: "100px" }}
            >
              <option value={4}>4 Credits</option>
              <option value={3}>3 Credits</option>
              <option value={2}>2 Credits</option>
              <option value={1}>1 Credit</option>
            </select>
            <select
              value={newCourseGrade}
              onChange={(e) => setNewCourseGrade(e.target.value)}
              style={{ width: "100px" }}
            >
              {Object.keys(GRADE_POINTS).map((g) => (
                <option key={g} value={g}>Grade {g}</option>
              ))}
            </select>
            <button 
              className="btn-primary" 
              onClick={addCourse}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px" }}
            >
              <Plus size={18} /> Add
            </button>
          </div>

          {/* List of Simulated Courses */}
          <div style={{ maxHeight: "250px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", paddingRight: "4px" }}>
            {courses.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "20px" }}>No courses added. Add some above to compute!</div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px" }}>
                  <div>
                    <h4 style={{ color: "#fff", fontSize: "15px" }}>{course.name}</h4>
                    <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{course.credits} Credits</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <select
                      value={course.grade}
                      onChange={(e) => {
                        const updated = courses.map((c) => c.id === course.id ? { ...c, grade: e.target.value } : c);
                        setCourses(updated);
                      }}
                      style={{ padding: "4px 8px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px" }}
                    >
                      {Object.keys(GRADE_POINTS).map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => removeCourse(course.id)}
                      style={{ background: "none", color: "rgba(239, 68, 68, 0.7)", cursor: "pointer" }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Calculation Result Summary */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <div style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>Simulated SGPA ({totalSemCredits} Credits)</div>
            <div style={{ fontSize: "28px", fontWeight: "900", fontFamily: "var(--font-display)", color: "var(--accent-purple)", marginTop: "4px" }}>
              {sgpa.toFixed(2)}
            </div>
          </div>
          {sgpa >= 9.0 && (
            <button 
              className="btn-primary" 
              onClick={triggerCelebration}
              style={{ padding: "8px 16px", fontSize: "13px" }}
            >
              🎉 Celebrate 9+ SGPA
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
