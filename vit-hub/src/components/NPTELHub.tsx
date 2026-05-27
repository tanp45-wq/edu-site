import { useState } from "react";
import { X, Award, Lock, Mail, CheckCircle2, Sparkles, HelpCircle } from "lucide-react";

interface NPTELCourse {
  name: string;
  code: string;
  weeks: number;
}

const NPTEL_COURSES: NPTELCourse[] = [
  { name: "Programming in Java", code: "noc26-cs01", weeks: 12 },
  { name: "Design and Analysis of Algorithms", code: "noc26-cs08", weeks: 8 },
  { name: "Cloud Computing", code: "noc26-cs14", weeks: 12 },
  { name: "Introduction to Machine Learning", code: "noc26-cs22", weeks: 12 },
];

interface NPTELHubProps {
  onClose: () => void;
}

export default function NPTELHub({ onClose }: NPTELHubProps) {
  const [selectedCourse, setSelectedCourse] = useState(NPTEL_COURSES[0]);
  const [activeTab, setActiveTab] = useState<"quizzes" | "flashcards">("quizzes");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="glass-panel interactive" style={{
      width: "90%",
      maxWidth: "680px",
      maxHeight: "85vh",
      overflowY: "auto",
      padding: "24px",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-cyan)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Award size={28} /> NPTEL Academic Companion
        </h2>
        <button 
          onClick={onClose}
          style={{ background: "none", color: "var(--color-text-muted)", cursor: "pointer" }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Select Course */}
      <div style={{ marginBottom: "24px" }}>
        <label style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
          Select NPTEL Course
        </label>
        <select
          value={selectedCourse.name}
          onChange={(e) => {
            const course = NPTEL_COURSES.find((c) => c.name === e.target.value);
            if (course) setSelectedCourse(course);
          }}
          style={{ width: "100%" }}
        >
          {NPTEL_COURSES.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "24px", gap: "16px" }}>
        <button
          onClick={() => setActiveTab("quizzes")}
          style={{
            padding: "8px 16px",
            background: "none",
            color: activeTab === "quizzes" ? "var(--accent-cyan)" : "var(--color-text-muted)",
            borderBottom: `2px solid ${activeTab === "quizzes" ? "var(--accent-cyan)" : "transparent"}`,
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          Weekly Quizzes
        </button>
        <button
          onClick={() => setActiveTab("flashcards")}
          style={{
            padding: "8px 16px",
            background: "none",
            color: activeTab === "flashcards" ? "var(--accent-cyan)" : "var(--color-text-muted)",
            borderBottom: `2px solid ${activeTab === "flashcards" ? "var(--accent-cyan)" : "transparent"}`,
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          Active Recall Flashcards
        </button>
      </div>

      {/* Locked Core Area */}
      <div className="glass-card" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        border: "1px dashed rgba(6, 182, 212, 0.25)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle decorative glow in background */}
        <div style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 60%)",
          pointerEvents: "none"
        }} />

        <div className="pulse-cyan" style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "rgba(6, 182, 212, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent-cyan)",
          marginBottom: "20px"
        }}>
          <Lock size={28} />
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: "#fff", marginBottom: "10px" }}>
          {activeTab === "quizzes" ? "NPTEL Quiz Solutions" : "Active Recall Flashcards"}
        </h3>
        
        <div style={{
          background: "rgba(236, 72, 153, 0.15)",
          color: "var(--accent-pink)",
          fontSize: "11px",
          fontWeight: "bold",
          letterSpacing: "1px",
          textTransform: "uppercase",
          padding: "3px 10px",
          borderRadius: "12px",
          marginBottom: "16px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <Sparkles size={12} /> Coming Soon for Summer Semester
        </div>

        <p style={{ color: "var(--color-text-muted)", fontSize: "14px", maxWidth: "420px", lineHeight: "1.6", marginBottom: "24px" }}>
          We are consolidating quiz archives and generating AI flashcards to help you easily score 90%+ in NPTEL exams for credit transfers.
        </p>

        {/* Subscribe form */}
        {!subscribed ? (
          <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "400px" }}>
            <input
              type="email"
              required
              placeholder="Enter student email to get notified..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
              <Mail size={16} /> Notify Me
            </button>
          </form>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#10b981", fontSize: "14px", fontWeight: "bold" }}>
            <CheckCircle2 size={20} /> Subscription active! We will alert you on content releases.
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "24px", color: "var(--color-text-muted)", fontSize: "12px", alignItems: "center" }}>
        <HelpCircle size={16} />
        <span>NPTEL certificates allow credit substitution at VIT. A score of 75+ maps to an S grade!</span>
      </div>
    </div>
  );
}
