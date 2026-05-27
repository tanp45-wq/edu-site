import { useState, useEffect, useRef } from "react";
import { X, Utensils, Clock, Compass, Settings, Users, Flame, Coffee, Sunrise, Sun, Moon } from "lucide-react";

interface Meal {
  type: number; // 1 = Breakfast, 2 = Lunch, 3 = Snacks, 4 = Dinner
  menu: string;
}

interface DailyMenu {
  date: string;
  menu: Meal[];
}

interface MenuData {
  hostel: number;
  mess: number;
  menu: DailyMenu[];
}

interface MessMenuProps {
  onClose: () => void;
}

export default function MessMenu({ onClose }: MessMenuProps) {
  // Onboarding Selection State
  const [hostelType, setHostelType] = useState<"men" | "women" | null>(() => {
    return (localStorage.getItem("selectedHostelType") as "men" | "women") || null;
  });
  const [messType, setMessType] = useState<"special" | "veg" | "nonveg" | null>(() => {
    return (localStorage.getItem("selectedMessType") as "special" | "veg" | "nonveg") || null;
  });

  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Date Selection States
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Refs for auto-centering horizontal dates container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch menu data whenever preferences are set
  useEffect(() => {
    if (!hostelType || !messType) return;

    const hostelNum = hostelType === "men" ? 1 : 2;
    const messNum = messType === "special" ? 1 : messType === "veg" ? 2 : 3;

    const fetchMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/menu-data/hostel-${hostelNum}-mess-${messNum}.json`);
        if (!response.ok) {
          throw new Error("Failed to load mess menu data file.");
        }
        const data = (await response.json()) as MenuData;
        setMenuData(data);

        // Extract dates
        const extractedDates = data.menu.map((item) => item.date);
        setDates(extractedDates);

        // Pre-select today's date if it exists in the data, else select the first date
        const todayStr = new Date().toISOString().split("T")[0];
        // For testing/fallback in case current date is outside the menu range, check if today is inside
        const preSelected = extractedDates.includes(todayStr) 
          ? todayStr 
          : (extractedDates.includes("2026-05-27") ? "2026-05-27" : extractedDates[0] || "");
        
        setSelectedDate(preSelected);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Unable to retrieve the mess menu data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [hostelType, messType]);

  // Centering active date circle inside the scrollable calendar strip
  useEffect(() => {
    if (!selectedDate || !scrollContainerRef.current) return;
    
    // Smoothly scroll the active date button into view inside the strip
    const activeBtn = scrollContainerRef.current.querySelector(`.date-day-button[data-date="${selectedDate}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedDate]);

  // Saves onboarding preferences
  const handleSavePreferences = (hostel: "men" | "women", mess: "special" | "veg" | "nonveg") => {
    localStorage.setItem("selectedHostelType", hostel);
    localStorage.setItem("selectedMessType", mess);
    setHostelType(hostel);
    setMessType(mess);
  };

  // Reset preferences to go back to onboarding setup
  const handleResetPreferences = () => {
    localStorage.removeItem("selectedHostelType");
    localStorage.removeItem("selectedMessType");
    setHostelType(null);
    setMessType(null);
    setMenuData(null);
    setDates([]);
    setSelectedDate("");
  };

  // UI Setup: Render Onboarding Screen if no preferences set
  if (!hostelType || !messType) {
    return <OnboardingSetup onSave={handleSavePreferences} onClose={onClose} />;
  }

  // Get active menu details for selected date
  const activeDayMenu = menuData?.menu.find((item) => item.date === selectedDate);

  // Helper to determine day of the week abbreviation
  const getDayName = (dateStr: string) => {
    const d = new Date(dateStr);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[d.getDay()];
  };

  // Helper to format date display (e.g. "May 27")
  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleString("default", { month: "long", year: "numeric" });
  };

  // Parse comma-separated list of items into an array of clean strings
  const parseFoodItems = (itemsStr: string): string[] => {
    if (!itemsStr) return [];
    return itemsStr
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) => {
        // Capitalize first letter of each item
        return item.charAt(0).toUpperCase() + item.slice(1);
      });
  };

  // Get specific meal timings based on weekday vs. weekend
  const getMealTiming = (type: number, dateStr: string) => {
    const isWeekend = selectedDate ? [0, 6].includes(new Date(dateStr).getDay()) : false;
    switch (type) {
      case 1: // Breakfast
        return isWeekend ? "07:30 AM - 09:30 AM" : "07:00 AM - 09:00 AM";
      case 2: // Lunch
        return "12:30 PM - 02:30 PM";
      case 3: // Snacks
        return "04:30 PM - 06:15 PM";
      case 4: // Dinner
        return "07:00 PM - 09:00 PM";
      default:
        return "";
    }
  };

  // Set visual color scheme theme based on Mess Type
  const themeAccentColor = messType === "special" ? "var(--accent-cyan)" : messType === "veg" ? "#10b981" : "var(--accent-purple)";

  return (
    <div 
      className="glass-panel interactive" 
      style={{
        width: "95%",
        maxWidth: "800px",
        maxHeight: "85vh",
        overflowY: "auto",
        padding: "24px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
        "--active-theme-color": themeAccentColor,
      } as React.CSSProperties}
    >
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: themeAccentColor, display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
            <Utensils size={24} /> 
            {hostelType === "men" ? "MH" : "LH"} - {messType.toUpperCase()} MESS
          </h2>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
            {selectedDate ? formatDateLabel(selectedDate) : "Mess Menu Portal"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Settings / Reset Preferences Icon */}
          <button 
            onClick={handleResetPreferences}
            className="glass-card"
            title="Reset Mess Selections"
            style={{ 
              background: "rgba(255,255,255,0.04)", 
              color: "var(--color-text-muted)", 
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = themeAccentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-muted)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <Settings size={16} />
          </button>
          <button 
            onClick={onClose}
            style={{ background: "none", color: "var(--color-text-muted)", cursor: "pointer", display: "flex", alignItems: "center" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "300px", gap: "16px" }}>
          <div className="onboarding-illustration animate-pulse">
            <Utensils size={48} />
          </div>
          <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "1px" }}>
            SYNCHRONIZING DYNAMIC MESS MENU DATA...
          </p>
        </div>
      ) : error ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "250px", gap: "16px", color: "#ef4444" }}>
          <Compass size={48} />
          <p style={{ fontSize: "14px", fontWeight: 600 }}>{error}</p>
          <button onClick={handleResetPreferences} className="btn-primary" style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "12px" }}>
            Select Another Mess Option
          </button>
        </div>
      ) : (
        <>
          {/* Circular Date Selector Scroll Strip */}
          {dates.length > 0 && (
            <div className="dates-scroll-container" ref={scrollContainerRef}>
              {dates.map((dateStr) => {
                const dayNum = dateStr.split("-")[2];
                const dayName = getDayName(dateStr);
                const isActive = selectedDate === dateStr;

                return (
                  <button
                    key={dateStr}
                    data-date={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`date-day-button ${isActive ? "active" : ""}`}
                  >
                    <span className="day-name">{dayName}</span>
                    <span className="day-num">{dayNum}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Meals Grid */}
          <div className="meal-cards-grid">
            {[1, 2, 3, 4].map((mealType) => {
              const mealObj = activeDayMenu?.menu.find((m) => m.type === mealType);
              const items = mealObj ? parseFoodItems(mealObj.menu) : [];
              const timing = getMealTiming(mealType, selectedDate);
              
              // Set icon and colors dynamically per meal category
              let title = "";
              let MealIcon = Sunrise;
              let accentColor = "";

              if (mealType === 1) {
                title = "Breakfast";
                MealIcon = Sunrise;
                accentColor = "var(--accent-cyan)";
              } else if (mealType === 2) {
                title = "Lunch";
                MealIcon = Sun;
                accentColor = "var(--accent-purple)";
              } else if (mealType === 3) {
                title = "High Tea";
                MealIcon = Coffee;
                accentColor = "#f59e0b"; // Gold
              } else {
                title = "Dinner";
                MealIcon = Moon;
                accentColor = "var(--accent-pink)";
              }

              return (
                <div 
                  key={mealType} 
                  className="meal-glass-card" 
                  style={{ "--meal-accent-color": accentColor } as React.CSSProperties}
                >
                  <div className="meal-card-header">
                    <h3 className="meal-card-title">
                      <MealIcon size={18} />
                      {title}
                    </h3>
                    <span className="meal-card-time">
                      <Clock size={10} style={{ marginRight: "4px", display: "inline-block", verticalAlign: "middle" }} />
                      <span style={{ verticalAlign: "middle" }}>{timing}</span>
                    </span>
                  </div>
                  
                  {items.length > 0 ? (
                    <ul className="meal-items-list">
                      {items.map((item, index) => (
                        <li key={index} className="meal-item">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)", fontSize: "12px", fontStyle: "italic" }}>
                      No items listed for this meal
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// ONBOARDING SETUP COMPONENT
// ═══════════════════════════════════════════
interface OnboardingSetupProps {
  onSave: (hostel: "men" | "women", mess: "special" | "veg" | "nonveg") => void;
  onClose: () => void;
}

function OnboardingSetup({ onSave, onClose }: OnboardingSetupProps) {
  const [selectedHostel, setSelectedHostel] = useState<"men" | "women" | null>(null);
  const [selectedMess, setSelectedMess] = useState<"special" | "veg" | "nonveg" | null>(null);

  const handleSubmit = () => {
    if (selectedHostel && selectedMess) {
      onSave(selectedHostel, selectedMess);
    }
  };

  return (
    <div className="onboarding-card">
      {/* Upper header */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ background: "none", color: "var(--color-text-muted)", cursor: "pointer" }}>
          <X size={20} />
        </button>
      </div>

      {/* Floating Graphic Mascot Icon */}
      <div className="onboarding-illustration">
        <Utensils size={44} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2 className="onboarding-title">See your Mess Menu on the go</h2>
        <p className="onboarding-desc">
          Configure your operational sector preferences. Unmess your dining plan with absolute ease and micro-details.
        </p>
      </div>

      <div className="setup-options-container">
        {/* Step 1: Select Hostel Sector */}
        <div>
          <h4 className="setup-section-title">01 / SELECT HOSTEL SECTOR</h4>
          <div className="onboarding-grid">
            <div 
              className={`setup-option-card ${selectedHostel === "men" ? "active-men" : ""}`}
              onClick={() => setSelectedHostel("men")}
            >
              <Users className="option-icon" />
              <span className="option-label">Men's Hostel</span>
              <span className="option-desc">MH Blocks (A - R)</span>
            </div>
            <div 
              className={`setup-option-card ${selectedHostel === "women" ? "active-women" : ""}`}
              onClick={() => setSelectedHostel("women")}
            >
              <Users className="option-icon" />
              <span className="option-label">Ladies' Hostel</span>
              <span className="option-desc">LH Blocks (A - G)</span>
            </div>
          </div>
        </div>

        {/* Step 2: Select Mess Category */}
        <div>
          <h4 className="setup-section-title">02 / SELECT DINING SCHEME</h4>
          <div className="onboarding-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))" }}>
            <div 
              className={`setup-option-card ${selectedMess === "special" ? "active-special" : ""}`}
              onClick={() => setSelectedMess("special")}
            >
              <Flame className="option-icon" />
              <span className="option-label">Special Mess</span>
              <span className="option-desc">Juices, daily egg & Sunday Biryani</span>
            </div>
            <div 
              className={`setup-option-card ${selectedMess === "veg" ? "active-veg" : ""}`}
              onClick={() => setSelectedMess("veg")}
            >
              <Utensils className="option-icon" />
              <span className="option-label">Veg Mess</span>
              <span className="option-desc">Clean and balanced pure veg meals</span>
            </div>
            <div 
              className={`setup-option-card ${selectedMess === "nonveg" ? "active-nonveg" : ""}`}
              onClick={() => setSelectedMess("nonveg")}
            >
              <Flame className="option-icon" />
              <span className="option-label">Non-Veg</span>
              <span className="option-desc">Standard veg with egg/chicken days</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        className="onboarding-btn"
        disabled={!selectedHostel || !selectedMess}
        onClick={handleSubmit}
      >
        Initialize Menu Connection →
      </button>
    </div>
  );
}
