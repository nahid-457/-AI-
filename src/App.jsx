import { useState, useRef, useEffect } from "react";
GEMINI_KEY = "AIzaSyCZTNytS7na0U7AOVZ69RdJkQZyC1axny4";
const VALID_CODES = ["MEDHA2024", "NAHID123", "PREMIUM01", "MEDHA001"];

const MODES = [
  { id: "academic", name: "শিক্ষা সহায়ক", icon: "📚", desc: "পরীক্ষা, নোট, অ্যাসাইনমেন্ট", color: "#4ade80", system: "তুমি মেধা AI-র শিক্ষা সহায়ক। বাংলাদেশের ছাত্রছাত্রীদের পড়াশোনায় সাহায্য করো। বাংলায় সহজ ভাষায় উত্তর দাও।" },
  { id: "business", name: "ব্যবসা সহায়ক", icon: "💼", desc: "ব্যবসা, মার্কেটিং, পরিকল্পনা", color: "#facc15", system: "তুমি মেধা AI-র ব্যবসা সহায়ক। বাংলাদেশের উদ্যোক্তাদের সাহায্য করো। বাংলায় বাস্তবমুখী পরামর্শ দাও।" },
  { id: "creative", name: "সৃজনশীল", icon: "✨", desc: "লেখা, কবিতা, গল্প, কপিরাইটিং", color: "#f472b6", system: "তুমি মেধা AI-র সৃজনশীল মোড। বাংলা ও ইংরেজিতে সৃজনশীল লেখায় সাহায্য করো।" },
  { id: "general", name: "সাধারণ সহায়ক", icon: "🤖", desc: "যেকোনো প্রশ্ন, যেকোনো বিষয়", color: "#818cf8", system: "তুমি মেধা AI। যেকোনো বিষয়ে সাহায্য করো। ব্যবহারকারী যে ভাষায় কথা বলবে সেই ভাষায় উত্তর দাও।" },
];

export default function App() {
  const [screen, setScreen] = useState("lock");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [selectedMode, setSelectedMode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleCodeSubmit = () => {
    if (VALID_CODES.includes(code.trim().toUpperCase())) { setScreen("mode"); setCodeError(""); }
    else setCodeError("ভুল কোড! সঠিক এক্সেস কোড দিন।");
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setMessages([{ role: "assistant", content: `স্বাগতম! আমি মেধা AI-র **${mode.name}** মোড। আপনাকে কীভাবে সাহায্য করতে পারি?` }]);
    setScreen("chat");
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: selectedMode.system, messages: newMessages }),
      });
      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.content?.[0]?.text || "দুঃখিত, সমস্যা হয়েছে।" }]);
    } catch { setMessages([...newMessages, { role: "assistant", content: "নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।" }]); }
    setLoading(false);
  };

  const R = (t) => t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");

  const s = {
    root: { minHeight: "100vh", background: "#050810", fontFamily: "sans-serif", color: "#e2e8f0" },
    center: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
    card: { background: "#0d1424", border: "1px solid #1e2d4a", borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 420, textAlign: "center" },
    logo: { fontSize: 52, fontWeight: 700, background: "linear-gradient(135deg,#4ade80,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 },
    sub: { fontSize: 13, color: "#64748b", marginBottom: 36 },
    input: { width: "100%", padding: "14px 18px", background: "#0a0f1e", border: "1px solid #1e2d4a", borderRadius: 12, color: "#e2e8f0", fontSize: 16, outline: "none", marginBottom: 8, textAlign: "center", fontFamily: "sans-serif" },
    btn: { width: "100%", padding: 14, background: "linear-gradient(135deg,#4ade80,#22d3ee)", border: "none", borderRadius: 12, color: "#050810", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 8 },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32 },
    mcard: { background: "#0d1424", border: "1px solid #1e2d4a", borderRadius: 16, padding: "28px 20px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" },
    chatRoot: { height: "100vh", display: "flex", flexDirection: "column" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "#0d1424", borderBottom: "1px solid #1e2d4a" },
    msgs: { flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 },
    userRow: { display: "flex", justifyContent: "flex-end" },
    botRow: { display: "flex", alignItems: "flex-start", gap: 10 },
    userBubble: { background: "#1e2d4a", padding: "12px 16px", borderRadius: "16px 16px 4px 16px", maxWidth: "75%", fontSize: 15, lineHeight: 1.6 },
    inputRow: { display: "flex", gap: 10, padding: "14px 16px", background: "#0d1424", borderTop: "1px solid #1e2d4a" },
    chatInput: { flex: 1, padding: "13px 16px", background: "#0a0f1e", border: "1px solid #1e2d4a", borderRadius: 12, color: "#e2e8f0", fontSize: 15, outline: "none", fontFamily: "sans-serif" },
  };

  return (
    <div style={s.root}>
      {screen === "lock" && (
        <div style={s.center}>
          <div style={s.card}>
            <div style={s.logo}>মেধা</div>
            <div style={s.sub}>Medha AI • বাংলাদেশের নিজের AI</div>
            <div style={{ fontSize: 15, color: "#94a3b8", marginBottom: 12 }}>এক্সেস কোড দিন</div>
            <input style={s.input} type="text" placeholder="কোড লিখুন..." value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === "Enter" && handleCodeSubmit()} />
            {codeError && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 8 }}>{codeError}</div>}
            <button style={s.btn} onClick={handleCodeSubmit}>প্রবেশ করুন →</button>
            <div style={{ marginTop: 24, fontSize: 12, color: "#334155" }}>কোড পেতে bKash/Nagad-এ যোগাযোগ করুন</div>
          </div>
        </div>
      )}
      {screen === "mode" && (
        <div style={s.center}>
          <div style={{ width: "100%", maxWidth: 560, textAlign: "center" }}>
            <div style={s.logo}>মেধা</div>
            <div style={s.sub}>আপনার মোড বেছে নিন</div>
            <div style={s.grid}>
              {MODES.map(mode => (
                <div key={mode.id} style={s.mcard} onClick={() => handleModeSelect(mode)}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{mode.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: mode.color, marginBottom: 6 }}>{mode.name}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{mode.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {screen === "chat" && selectedMode && (
        <div style={s.chatRoot}>
          <div style={s.header}>
            <button onClick={() => setScreen("mode")} style={{ background: "transparent", border: "1px solid #1e2d4a", color: "#94a3b8", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>← মোড</button>
            <div style={{ fontSize: 16, fontWeight: 700 }}><span style={{ marginRight: 8 }}>{selectedMode.icon}</span><span style={{ color: selectedMode.color }}>{selectedMode.name}</span></div>
            <div style={{ fontSize: 12, color: "#334155", background: "#0a0f1e", padding: "4px 10px", borderRadius: 20, border: "1px solid #1e2d4a" }}>মেধা AI</div>
          </div>
          <div style={s.msgs}>
            {messages.map((msg, i) => (
              <div key={i} style={msg.role === "user" ? s.userRow : s.botRow}>
                {msg.role === "assistant" && <div style={{ width: 36, height: 36, borderRadius: "50%", background: selectedMode.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{selectedMode.icon}</div>}
                <div style={msg.role === "user" ? s.userBubble : { background: "#0d1424", border: `1px solid ${selectedMode.color}44`, padding: "12px 16px", borderRadius: "16px 16px 16px 4px", maxWidth: "80%", fontSize: 15, lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: R(msg.content) }} />
              </div>
            ))}
            {loading && <div style={s.botRow}><div style={{ width: 36, height: 36, borderRadius: "50%", background: selectedMode.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{selectedMode.icon}</div><div style={{ background: "#0d1424", border: "1px solid #1e2d4a", padding: "14px 20px", borderRadius: 16 }}>⏳</div></div>}
            <div ref={messagesEndRef} />
          </div>
          <div style={s.inputRow}>
            <input style={s.chatInput} placeholder="আপনার প্রশ্ন লিখুন..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} disabled={loading} />
            <button onClick={sendMessage} disabled={loading} style={{ width: 48, height: 48, borderRadius: 12, border: "none", background: selectedMode.color, fontSize: 20, fontWeight: 700, cursor: "pointer", color: "#050810", opacity: loading ? 0.5 : 1 }}>→</button>
          </div>
        </div>
      )}
    </div>
  );
    }
