import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
}

const KNOWLEDGE_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["gpa", "grade", "cgpa", "sgpa", "calculate"],
    response: "You can calculate your GPA using our GPA Simulator! Select the 'GPA Calculator' card on the 3D screen. Remember: VIT grading is relative, where S=10, A=9, B=8, C=7, D=6, E=5, F=0 points.",
  },
  {
    keywords: ["ffcs", "timetable", "schedule", "slot", "clash"],
    response: "FFCS planning can be stressful! Use our 'FFCS Planner' card on the 3D screen to select slots (like A1, B1, etc.) and check for timetable conflicts before official bidding goes live.",
  },
  {
    keywords: ["mess", "food", "menu", "lunch", "dinner", "breakfast"],
    response: "Check out the 'Mess Menu' card on the 3D dashboard. It shows daily menus for Veg and Special mess (including Paneer, Butter Chicken, and Sunday Biryani!).",
  },
  {
    keywords: ["notes", "pyq", "drive", "study", "materials", "exam"],
    response: "Looking for materials? Click the 'Notes & PYQs' card in the 3D view. We index shared drives, lecture slides, and question papers for courses like DSA, Java, and Maths.",
  },
  {
    keywords: ["vtop", "v-top", "captcha", "attendance"],
    response: "V-TOP attendance keeping you down? Make sure you stay above 75% to avoid getting debarred! Tip: There are chrome extensions available to autofill those pesky V-TOP CAPTCHAs.",
  },
  {
    keywords: ["hello", "hi", "hey", "who are you"],
    response: "Hey there! I am the V-Portal AI mascot. Ask me anything about VIT rules, exams, messes, or select a 3D card to open a tool!",
  },
];

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "Hey! I'm your VIT AI assistant. Ask me anything about FFCS, GPA calculation, notes, or mess menus." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const lowerText = textToSend.toLowerCase();
      let matchedResponse = "I'm not sure about that one! Try asking about 'GPA', 'FFCS Planner', 'Mess Menu', or 'study drives'.";

      for (const entry of KNOWLEDGE_RESPONSES) {
        if (entry.keywords.some((keyword) => lowerText.includes(keyword))) {
          matchedResponse = entry.response;
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: matchedResponse,
        },
      ]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 100 }}>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="pulse-cyan btn-primary"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(6, 182, 212, 0.4)",
          }}
        >
          <MessageSquare size={26} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="glass-panel interactive"
          style={{
            width: "360px",
            height: "460px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(0,0,0,0.2)",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Bot size={22} style={{ color: "var(--accent-cyan)" }} />
              <span style={{ fontWeight: "bold", fontFamily: "var(--font-display)", fontSize: "14px", color: "#fff" }}>
                VIT Mascot AI
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", color: "var(--color-text-muted)", cursor: "pointer" }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  gap: "8px",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  maxWidth: "85%",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: msg.sender === "user" ? "var(--accent-purple)" : "var(--accent-cyan)",
                    flexShrink: 0,
                  }}
                >
                  {msg.sender === "user" ? <User size={14} color="#fff" /> : <Bot size={14} color="#fff" />}
                </div>
                <div
                  style={{
                    background: msg.sender === "user" ? "rgba(168, 85, 247, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${msg.sender === "user" ? "rgba(168, 85, 247, 0.3)" : "rgba(255, 255, 255, 0.06)"}`,
                    padding: "10px 14px",
                    borderRadius: "12px",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    color: "#fff",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: "flex", gap: "8px", alignSelf: "flex-start" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--accent-cyan)" }}>
                  <Bot size={14} color="#fff" />
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "10px 14px", borderRadius: "12px", fontSize: "13px", color: "var(--color-text-muted)" }}>
                  Mascot is typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div style={{ display: "flex", gap: "6px", padding: "8px 16px", overflowX: "auto", background: "rgba(0,0,0,0.1)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            {["GPA", "FFCS", "Mess Menu", "Notes Drive"].map((label) => (
              <button
                key={label}
                onClick={() => handleSend(label)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "var(--color-text-muted)",
                  fontSize: "11px",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              placeholder="Ask me about VIT..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ flex: 1, padding: "8px 12px" }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
