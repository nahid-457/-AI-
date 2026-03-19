import { useState, useRef, useEffect } from "react";

// ============================================================
//  🔑 ACCESS CODES — add/remove codes here for each customer
//  Give each paying user one unique code via bKash/Nagad
// ============================================================
const VALID_CODES = [
  "MEDHA-2025",   // default demo code
  "NAHID-OWNER",  // your personal code (never share this)
  // add more like: "USER-A1B2", "USER-C3D4", etc.
];

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Hind Siliguri',sans-serif;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:#0d1a0f;}
::-webkit-scrollbar-thumb{background:rgba(212,175,55,0.25);border-radius:3px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
@keyframes shimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}  }
@keyframes glow{0%,100%{box-shadow:0 0 12px rgba(212,175,55,0.2);}50%{box-shadow:0 0 24px rgba(212,175,55,0.45);}}
.mode-card{transition:all 0.2s;cursor:pointer;}
.mode-card:hover{transform:translateY(-2px);}
.send-btn:hover:not(:disabled){background:rgba(212,175,55,0.22)!important;box-shadow:0 0 20px rgba(212,175,55,0.25)!important;}
textarea:focus{outline:none!important;border-color:rgba(212,175,55,0.4)!important;}
@keyframes floatIn{from{opacity:0;transform:translateY(30px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes shake{0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-7px);}40%,80%{transform:translateX(7px);}}
.shake{animation:shake 0.4s ease;}
.gate-input:focus{outline:none;border-color:rgba(212,175,55,0.6)!important;box-shadow:0 0 20px rgba(212,175,55,0.12)!important;}
.unlock-btn:hover:not(:disabled){background:rgba(212,175,55,0.25)!important;transform:translateY(-1px);box-shadow:0 4px 20px rgba(212,175,55,0.2)!important;}
`;

const MODES = {
  business: {
    id: "business",
    icon: "💼",
    label: "ব্যবসা পরিকল্পনা",
    labelEn: "Business Plan",
    color: "#f59e0b",
    desc: "যেকোনো আইডিয়া থেকে সম্পূর্ণ ব্যবসায়িক পরিকল্পনা",
    descEn: "Complete business plan from any idea",
    starters: [
      "আমি ঢাকায় একটি হোম ডেলিভারি রেস্টুরেন্ট খুলতে চাই",
      "অনলাইনে হ্যান্ডমেড গহনার ব্যবসা করতে চাই",
      "গ্রামে পোল্ট্রি ফার্ম করার পরিকল্পনা দাও",
    ],
    systemBn: `তুমি একজন বিশেষজ্ঞ ব্যবসায়িক পরামর্শদাতা যিনি বাংলাদেশের বাজার সম্পর্কে গভীর জ্ঞান রাখেন। যখন কেউ একটি ব্যবসার আইডিয়া দেয়, তুমি একটি সম্পূর্ণ পেশাদার ব্যবসায়িক পরিকল্পনা তৈরি করবে যা বাস্তবসম্মত এবং বাংলাদেশের প্রেক্ষাপটে প্রযোজ্য।

পরিকল্পনায় অবশ্যই থাকবে:
১. ব্যবসার সারসংক্ষেপ ও ভিশন
২. বাজার বিশ্লেষণ (বাংলাদেশের প্রেক্ষাপটে)
৩. লক্ষ্য গ্রাহক ও তাদের চাহিদা
৪. আয়ের মডেল ও মূল্য নির্ধারণ কৌশল
৫. প্রাথমিক বিনিয়োগ ও খরচের হিসাব (টাকায়)
৬. প্রতিযোগী বিশ্লেষণ
৭. মার্কেটিং কৌশল (ফেসবুক, অনলাইন, অফলাইন)
৮. ৬ মাস ও ১ বছরের আয়ের পূর্বাভাস
৯. ঝুঁকি ও সমাধান
১০. শুরু করার ধাপসমূহ

ওয়েব সার্চ করে বর্তমান বাজারের তথ্য, প্রতিযোগী, এবং সুযোগ খুঁজে বের করো। বাস্তব তথ্য ও সংখ্যা দাও।`,
    systemEn: `You are an expert business consultant with deep knowledge of Bangladesh's market. When someone gives a business idea, create a complete professional business plan realistic for Bangladesh.

Include: Executive summary, market analysis (Bangladesh context), target customers, revenue model with pricing, startup costs in BDT, competitor analysis, marketing strategy (Facebook, online, offline), 6-month and 1-year revenue projections, risks & solutions, step-by-step launch guide.

Use web search to find current market data, competitors, and opportunities. Provide real numbers and actionable steps.`,
  },
  viral: {
    id: "viral",
    icon: "🔥",
    label: "ভাইরাল কন্টেন্ট",
    labelEn: "Viral Content Engine",
    color: "#ef4444",
    desc: "ভাইরাল হুক, স্ক্রিপ্ট ও ক্যাপশন তৈরি করো",
    descEn: "Viral hooks, scripts & captions that people click",
    starters: [
      "আমার ফুড পেজের জন্য ভাইরাল ফেসবুক পোস্ট বানাও",
      "ইউটিউব ভিডিওর জন্য আকর্ষণীয় স্ক্রিপ্ট লিখে দাও",
      "আমার অনলাইন বিজনেসের বিজ্ঞাপন কপি দরকার",
    ],
    systemBn: `তুমি একজন বিশেষজ্ঞ ভাইরাল কন্টেন্ট স্ট্র্যাটেজিস্ট যিনি বাংলাদেশের সোশ্যাল মিডিয়া ট্রেন্ড সম্পর্কে গভীরভাবে জানেন। বাংলাদেশী দর্শকদের জন্য অত্যন্ত আকর্ষণীয় কন্টেন্ট তৈরি করো।

তোমার কাজ:
- ক্লিকবেইট নয়, কিন্তু অপ্রতিরোধ্য হুক তৈরি করা
- ফেসবুক, ইউটিউব, টিকটকের জন্য আলাদা কৌশল
- বাংলাদেশী মানুষের আবেগ, স্বপ্ন ও সমস্যা স্পর্শ করে এমন কন্টেন্ট
- ট্রেন্ডিং টপিক সার্চ করে কন্টেন্টে যুক্ত করা
- ৫টি ভিন্ন হুক অপশন দাও
- ক্যাপশন, হ্যাশট্যাগ, পোস্টের সেরা সময় বলো
- ভাইরাল হওয়ার কারণ ব্যাখ্যা করো

মনে রেখো: বাংলাদেশী দর্শক কী পছন্দ করে, কোন কথায় শেয়ার করে, কোন কন্টেন্টে কমেন্ট করে।`,
    systemEn: `You are an expert viral content strategist specializing in Bangladeshi social media trends. Create compelling content for Bangladeshi audiences on Facebook, YouTube, and TikTok.

Provide: 5 different hook variations, full script/caption, hashtag strategy, best posting time, engagement triggers, and explain WHY it will go viral. Use web search for current trending topics in Bangladesh.`,
  },
  decision: {
    id: "decision",
    icon: "🧭",
    label: "জীবন সিদ্ধান্ত",
    labelEn: "Life Decision Analyzer",
    color: "#8b5cf6",
    desc: "বড় সিদ্ধান্তের গভীর বিশ্লেষণ ও পরিণতি",
    descEn: "Deep analysis & simulation of big life choices",
    starters: [
      "বিদেশে যাবো নাকি দেশেই ক্যারিয়ার গড়বো?",
      "সরকারি চাকরি নাকি নিজের ব্যবসা — কোনটা ভালো?",
      "এই বয়সে বিয়ে করা উচিত হবে কিনা ভাবছি",
    ],
    systemBn: `তুমি একজন জীবন কোচ ও সিদ্ধান্ত বিশ্লেষক যিনি বাংলাদেশের সামাজিক ও অর্থনৈতিক বাস্তবতা ভালো বোঝেন। যখন কেউ একটি বড় সিদ্ধান্তের কথা বলে, তুমি গভীর বিশ্লেষণ করো।

বিশ্লেষণে থাকবে:
১. সিদ্ধান্তের সব দিক (প্রতিটি অপশনের সুবিধা-অসুবিধা)
২. ৩টি সম্ভাব্য ভবিষ্যৎ পরিস্থিতি (সেরা, গড়, সবচেয়ে খারাপ)
৩. ৫ বছর পর কোথায় থাকতে পারে
৪. আর্থিক প্রভাব বিশ্লেষণ
৫. মানসিক ও সামাজিক প্রভাব
৬. বাংলাদেশের প্রেক্ষাপটে বাস্তবতা
৭. সিদ্ধান্ত নেওয়ার আগে যে প্রশ্নগুলো নিজেকে করতে হবে
৮. চূড়ান্ত সুপারিশ (কারণসহ)

সৎভাবে বলো, মিষ্টি কথা নয়। বাস্তব তথ্য দিয়ে সাহায্য করো।`,
    systemEn: `You are a life coach and decision analyst who understands Bangladesh's social and economic realities. Provide deep analysis of major life decisions including: pros/cons of all options, 3 future scenarios (best/average/worst), 5-year projection, financial impact, psychological/social effects, and honest final recommendation.`,
  },
  research: {
    id: "research",
    icon: "📚",
    label: "গভীর গবেষণা",
    labelEn: "Deep Research",
    color: "#06b6d4",
    desc: "যেকোনো বিষয়ে থিসিস-মানের বিশ্লেষণ",
    descEn: "Thesis-level breakdown on any topic with sources",
    starters: [
      "বাংলাদেশের গার্মেন্টস শিল্পের বর্তমান অবস্থা বিশ্লেষণ করো",
      "জলবায়ু পরিবর্তন বাংলাদেশের কৃষিতে কী প্রভাব ফেলছে?",
      "বাংলাদেশে ডিজিটাল মার্কেটিং ক্যারিয়ারের সম্ভাবনা কতটুকু?",
    ],
    systemBn: `তুমি একজন বিশেষজ্ঞ গবেষক ও বিশ্লেষক। যেকোনো বিষয়ে থিসিস-মানের গভীর গবেষণা করো। ওয়েব সার্চ করে সর্বশেষ তথ্য, পরিসংখ্যান ও উৎস খুঁজে বের করো।

গবেষণায় থাকবে:
১. বিষয়ের পটভূমি ও ইতিহাস
২. বর্তমান অবস্থার বিস্তারিত বিশ্লেষণ (তথ্য ও পরিসংখ্যান সহ)
৩. প্রধান কারণ ও প্রভাব
৪. বিভিন্ন দৃষ্টিভঙ্গি ও বিতর্ক
৫. বাংলাদেশের প্রেক্ষাপটে প্রাসঙ্গিকতা
৬. ভবিষ্যৎ পূর্বাভাস ও প্রবণতা
৭. উৎস ও তথ্যসূত্র
৮. উপসংহার ও সুপারিশ

একাডেমিক মানের লেখা দাও কিন্তু সহজ ভাষায়।`,
    systemEn: `You are an expert researcher and analyst. Conduct thesis-level research on any topic. Use web search extensively for latest data, statistics and sources. Include: background, current state analysis with data, cause-effect analysis, multiple perspectives, Bangladesh context, future trends, sources, and conclusion.`,
  },
};

function MsgText({ text }) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height: 7 }} />;
    if (line.match(/^#{1,3} /)) {
      const lvl = line.match(/^(#+)/)[1].length;
      const content = line.replace(/^#+\s/, "");
      return <div key={i} style={{ color: "#f0c040", fontWeight: 700, fontSize: lvl === 1 ? 17 : lvl === 2 ? 15 : 13, marginTop: 16, marginBottom: 6 }}>{content}</div>;
    }
    if (line.match(/^[-•*] /))
      return <div key={i} style={{ paddingLeft: 14, color: "#d4d4aa", marginBottom: 4 }}><span style={{ color: "#f0c04088", marginRight: 8 }}>◆</span>{line.slice(2)}</div>;
    if (line.match(/^\d+\. /))
      return <div key={i} style={{ paddingLeft: 14, color: "#d4d4aa", marginBottom: 4 }}><span style={{ color: "#f0c04099", marginRight: 7 }}>{line.match(/^\d+/)[0]}.</span>{line.replace(/^\d+\.\s/, "")}</div>;
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <div key={i} style={{ color: "#d4d4aa", lineHeight: 1.85, marginBottom: 1 }}>
        {parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**")
            ? <strong key={j} style={{ color: "#f5f0d0", fontWeight: 600 }}>{p.slice(2, -2)}</strong>
            : p
        )}
      </div>
    );
  });
}

function GateScreen({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(false);

  const tryUnlock = () => {
    if (!code.trim()) return;
    setChecking(true);
    setTimeout(() => {
      if (VALID_CODES.includes(code.trim().toUpperCase())) {
        onUnlock(code.trim().toUpperCase());
      } else {
        setError("কোডটি সঠিক নয়। বৈধ একটি অ্যাক্সেস কোড ব্যবহার করুন।");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      setChecking(false);
    }, 600);
  };

  return (
    <div style={{ background: "#0b1a0d", minHeight: "100vh", fontFamily: "'Hind Siliguri',sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: 20 }}>
      <style>{STYLE}</style>
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.08), transparent), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(34,80,30,0.18), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(212,175,55,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

      <div className={shake ? "shake" : ""} style={{ animation: "floatIn 0.6s ease both", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 20, padding: "44px 40px", maxWidth: 420, width: "100%", textAlign: "center", backdropFilter: "blur(20px)", position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontFamily: "Playfair Display,serif", color: "#d4af37", fontSize: 42, fontWeight: 900, letterSpacing: 1, textShadow: "0 0 30px rgba(212,175,55,0.3)" }}>মেধা</span>
        </div>
        <div style={{ color: "rgba(212,175,55,0.5)", fontSize: 11, letterSpacing: 3, marginBottom: 32 }}>PREMIUM AI · বাংলাদেশ</div>

        {/* Features teaser */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32, textAlign: "left" }}>
          {[["💼","ব্যবসা পরিকল্পনা","বাংলাদেশের বাজার বিশ্লেষণ সহ"],["🔥","ভাইরাল কন্টেন্ট","ফেসবুক ও ইউটিউবের জন্য"],["🧭","জীবন সিদ্ধান্ত","৫ বছরের সিমুলেশন"],["📚","গভীর গবেষণা","থিসিস-মানের বিশ্লেষণ"]].map(([icon,title,sub]) => (
            <div key={title} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "rgba(212,175,55,0.04)", borderRadius: 8, border: "1px solid rgba(212,175,55,0.08)" }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>{title}</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{sub}</div>
              </div>
              <div style={{ marginLeft: "auto", color: "rgba(212,175,55,0.3)", fontSize: 16 }}>🔒</div>
            </div>
          ))}
        </div>

        {/* Access code input */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>অ্যাক্সেস কোড দিন</div>
          <input
            className="gate-input"
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
            placeholder="যেমন: MEDHA-XXXX"
            style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 10, color: "#f0e8c0", fontSize: 15, fontFamily: "'Hind Siliguri',sans-serif", padding: "13px 18px", textAlign: "center", letterSpacing: 2, transition: "all 0.2s" }}
          />
        </div>

        {error && <div style={{ color: "#f87171", fontSize: 12, marginBottom: 12, animation: "fadeUp 0.2s ease" }}>{error}</div>}

        <button className="unlock-btn" onClick={tryUnlock} disabled={checking || !code.trim()}
          style={{ width: "100%", background: checking || !code.trim() ? "rgba(212,175,55,0.05)" : "rgba(212,175,55,0.15)", border: `1px solid ${checking || !code.trim() ? "rgba(212,175,55,0.1)" : "rgba(212,175,55,0.5)"}`, color: checking || !code.trim() ? "rgba(212,175,55,0.3)" : "#d4af37", fontSize: 15, fontWeight: 700, fontFamily: "'Hind Siliguri',sans-serif", padding: "13px", borderRadius: 10, cursor: checking || !code.trim() ? "not-allowed" : "pointer", transition: "all 0.2s", letterSpacing: 1 }}>
          {checking ? "যাচাই করছি..." : "🔓 প্রবেশ করুন"}
        </button>

        <div style={{ marginTop: 24, padding: "14px", background: "rgba(0,0,0,0.2)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginBottom: 6 }}>অ্যাক্সেস কোড কিনতে</div>
          <div style={{ color: "#d4af37", fontSize: 13, fontWeight: 600 }}>📱 bKash / Nagad</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>পেমেন্টের পর কোড পাবেন</div>
        </div>
      </div>
    </div>
  );
}

export default function Medha() {
  const [unlocked, setUnlocked] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeMode, setActiveMode] = useState("business");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const historyRef = useRef([]);
  const bottomRef = useRef(null);
  const taRef = useRef(null);
  const mode = MODES[activeMode];

  const isBn = lang === "bn";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const switchMode = (id) => {
    setActiveMode(id);
    setMessages([]);
    historyRef.current = [];
  };

  const resizeTa = (el) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const send = async (text) => {
    const txt = (text || input).trim();
    if (!txt || loading) return;
    setInput("");
    setTimeout(() => taRef.current && resizeTa(taRef.current), 0);
    setLoading(true);
    setStatusMsg(isBn ? "চিন্তা করছি..." : "Thinking...");

    setMessages((p) => [...p, { role: "user", content: txt }]);
    historyRef.current = [...historyRef.current, { role: "user", content: txt }];

    const system = isBn ? mode.systemBn : mode.systemEn;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: historyRef.current,
        }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const content = data.content || [];
      const searches = content.filter((b) => b.type === "tool_use" && b.name === "web_search").map((b) => b.input?.query || "");
      if (searches.length) setStatusMsg((isBn ? "খুঁজছি: " : "Searching: ") + searches[0]);
      const reply = content.filter((b) => b.type === "text").map((b) => b.text).join("") || (isBn ? "কোনো উত্তর পাওয়া যায়নি।" : "No response.");
      historyRef.current = [...historyRef.current, { role: "assistant", content: reply }];
      setMessages((p) => [...p, { role: "assistant", content: reply, searches }]);
    } catch (e) {
      setMessages((p) => [...p, { role: "assistant", content: `❌ ${e.message}`, error: true }]);
    }
    setStatusMsg("");
    setLoading(false);
    taRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  if (!unlocked) return <GateScreen onUnlock={() => setUnlocked(true)} />;

  return (
    <div style={{ background: "#0b1a0d", minHeight: "100vh", fontFamily: "'Hind Siliguri',sans-serif", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <style>{STYLE}</style>

      {/* BG texture */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.07), transparent), radial-gradient(ellipse 60% 60% at 90% 80%, rgba(34,80,30,0.15), transparent)" }} />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "radial-gradient(rgba(212,175,55,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(11,26,13,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(212,175,55,0.15)", padding: "12px 22px", display: "flex", alignItems: "center", gap: 14 }}>
        <div>
          <span style={{ fontFamily: "Playfair Display,serif", color: "#d4af37", fontSize: 24, fontWeight: 900, letterSpacing: 1 }}>মেধা</span>
          <span style={{ fontFamily: "Playfair Display,serif", color: "rgba(212,175,55,0.4)", fontSize: 13, marginLeft: 8, fontStyle: "italic" }}>AI</span>
        </div>
        <div style={{ width: 1, height: 28, background: "rgba(212,175,55,0.15)" }} />
        <span style={{ color: "rgba(212,175,55,0.5)", fontSize: 11, letterSpacing: 2 }}>{isBn ? "বাংলাদেশের প্রথম প্রিমিয়াম বাংলা AI" : "Bangladesh's First Premium Bangla AI"}</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setLang("bn")} style={{ padding: "5px 13px", borderRadius: 20, border: `1px solid ${isBn ? "#d4af37" : "rgba(212,175,55,0.2)"}`, background: isBn ? "rgba(212,175,55,0.15)" : "transparent", color: isBn ? "#d4af37" : "rgba(212,175,55,0.4)", fontSize: 12, cursor: "pointer", transition: "all 0.2s", fontFamily: "'Hind Siliguri',sans-serif" }}>বাংলা</button>
          <button onClick={() => setLang("en")} style={{ padding: "5px 13px", borderRadius: 20, border: `1px solid ${!isBn ? "#d4af37" : "rgba(212,175,55,0.2)"}`, background: !isBn ? "rgba(212,175,55,0.15)" : "transparent", color: !isBn ? "#d4af37" : "rgba(212,175,55,0.4)", fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}>EN</button>
        </div>
      </header>

      {/* Mode Selector */}
      <div style={{
