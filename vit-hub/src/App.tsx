import { useState, useEffect } from "react";
import GPASimulator from "./components/GPASimulator";
import FFCSPlanner from "./components/FFCSPlanner";
import MessMenu from "./components/MessMenu";
import ResourcesHub from "./components/ResourcesHub";
import NPTELHub from "./components/NPTELHub";
import ChatPanel from "./components/ChatPanel";
import { Sparkles, GraduationCap, Calculator, CalendarDays, UtensilsCrossed, BookOpen, ArrowLeft, Activity, Cpu } from "lucide-react";

const TOOLS = [
  {
    id: "GPA",
    title: "GPA Simulator",
    description: "Predict your grades, compute CGPA/SGPA dynamically & simulate relative boundaries.",
    icon: Calculator,
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    emoji: "📊",
  },
  {
    id: "FFCS",
    title: "FFCS Planner",
    description: "Map your academic slots, prevent class clashes & draft your timetable like a pro.",
    icon: CalendarDays,
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
    emoji: "🗓️",
  },
  {
    id: "NPTEL",
    title: "NPTEL Companion",
    description: "Track course assignments, submission milestones & assignment score averages.",
    icon: GraduationCap,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    emoji: "🎓",
  },
  {
    id: "Mess",
    title: "Mess Menu",
    description: "Unmess your daily dining. Real-time food schedules for MH & LH messes.",
    icon: UtensilsCrossed,
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899, #db2777)",
    emoji: "🍽️",
  },
  {
    id: "Resources",
    title: "Notes & PYQs",
    description: "Instant repository access for shared drives, slides & prior-year exams.",
    icon: BookOpen,
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    emoji: "📚",
  },
];

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // Live ticking Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: true }));
      setCurrentDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderActiveTool = () => {
    switch (activeTool) {
      case "GPA":
        return <GPASimulator onClose={() => setActiveTool(null)} />;
      case "FFCS":
        return <FFCSPlanner onClose={() => setActiveTool(null)} />;
      case "Mess":
        return <MessMenu onClose={() => setActiveTool(null)} />;
      case "Resources":
        return <ResourcesHub onClose={() => setActiveTool(null)} />;
      case "NPTEL":
        return <NPTELHub onClose={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-root">
      {/* Animated background particles */}
      <div className="bg-particles">
        <div className="particle p1" />
        <div className="particle p2" />
        <div className="particle p3" />
        <div className="particle p4" />
        <div className="particle p5" />
      </div>

      {/* Grid overlay effect */}
      <div className="grid-overlay" />

      {/* Main content */}
      <div className="main-content">
        {/* HUD System Console Header */}
        <header className="site-header">
          {/* Top Operational Status Bar */}
          <div className="hud-status-bar">
            <div className="hud-metric">
              <span className="pulse-dot green" />
              <span className="hud-label">SYSTEM_CORE:</span>
              <span className="hud-val text-green">ONLINE</span>
            </div>
            <div className="hud-divider" />
            <div className="hud-metric">
              <Activity size={12} className="hud-icon animate-pulse" />
              <span className="hud-label">LATENCY:</span>
              <span className="hud-val">14ms</span>
            </div>
            <div className="hud-divider" />
            <div className="hud-metric">
              <Cpu size={12} className="hud-icon" />
              <span className="hud-label">ENGINE:</span>
              <span className="hud-val text-cyan">ACTIVE</span>
            </div>
            <div className="hud-divider" />
            <div className="hud-metric select-none">
              <span className="hud-label">TERM:</span>
              <span className="hud-val text-purple">WINTER_2026</span>
            </div>
            <div className="hud-divider hidden-mobile" />
            <div className="hud-metric live-clock ml-auto">
              <span className="clock-date">{currentDate}</span>
              <span className="clock-time">{currentTime}</span>
            </div>
          </div>

          <div className="header-left">
            <div className="logo-badge">
              <span className="version-tag">CORE v1.2.0</span>
              <h1 className="site-title">VIT HUB</h1>
            </div>
            <p className="site-subtitle">
              <Sparkles size={14} className="sparkle-icon" />
              Futuristic Multi-Module Operational Command Center
            </p>
          </div>
        </header>

        {/* Tool Cards Grid */}
        <div className="tools-grid">
          {TOOLS.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <button
                key={tool.id}
                className="tool-card"
                onClick={() => setActiveTool(tool.id)}
                style={{
                  "--card-color": tool.color,
                  "--card-gradient": tool.gradient,
                  "--card-delay": `${index * 0.08}s`,
                } as React.CSSProperties}
              >
                <div className="card-glow" />
                <div className="card-icon-wrapper">
                  <span className="card-emoji">{tool.emoji}</span>
                  <IconComponent size={26} className="card-icon" />
                </div>
                <h3 className="card-title">{tool.title}</h3>
                <p className="card-desc">{tool.description}</p>
                <div className="card-action">
                  Initialize Module →
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer tips */}
        <div className="footer-tips">
          <Sparkles size={12} className="sparkle-icon" />
          <span>Click any holographic terminal above to mount its interface • Tweak preferences in settings</span>
        </div>
      </div>

      {/* Tool overlay */}
      {activeTool && (
        <div className="tool-overlay" onClick={() => setActiveTool(null)}>
          <div className="tool-overlay-content" onClick={(e) => e.stopPropagation()}>
            <button className="back-button" onClick={() => setActiveTool(null)}>
              <ArrowLeft size={18} />
              Return to Console
            </button>
            {renderActiveTool()}
          </div>
        </div>
      )}

      {/* Chat */}
      <ChatPanel />
    </div>
  );
}

