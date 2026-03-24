import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   BRICE LIGHT + GOOGLE TYPE
   Warm Gray · Ice Blue · Black Contrast
   ═══════════════════════════════════════════ */

const T = {
  bg: "#EEECEC",        // warm gray canvas (Brice bg)
  surface: "#FFFFFF",
  card: "#FFFFFF",
  glass: "rgba(255,255,255,0.8)",

  // Ice blue from Brice right panel
  ice: "#B8CCE0",
  iceLight: "#D4E3F0",
  iceMid: "#9CB8D0",
  iceBg: "#E8EFF5",

  // Chrome / dark accents (Brice dark pills)
  dark: "#1A1A1A",
  darkSoft: "#2A2A2A",
  darkPill: "#1A1A1A",

  // Text
  black: "#0D0D0D",
  text: "#1A1A1A",
  text2: "#6B6B6B",
  text3: "#9E9E9E",
  textLight: "#B0B0B0",

  border: "rgba(0,0,0,0.06)",
  borderDark: "rgba(0,0,0,0.1)",

  // Muted accents
  good: "#5A9E7C",
  goodBg: "#EDF5F0",
  warn: "#C49A4A",
  warnBg: "#FAF3E8",
  alert: "#C46B6B",
  alertBg: "#FAF0F0",
  info: "#6B8EB0",
  infoBg: "#EDF2F8",
};

const F = "'Plus Jakarta Sans', sans-serif";

// ═══ COMPONENTS ═══

const Nav = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "8px 6px", color: active ? T.dark : T.text3, fontSize: 10, fontFamily: F, fontWeight: active ? 600 : 400, transition: "all 0.3s", position: "relative", letterSpacing: 0.2 }}>
    <div style={{ fontSize: 18, transition: "all 0.3s", opacity: active ? 1 : 0.45 }}>{icon}</div>
    <span>{label}</span>
    {active && <div style={{ position: "absolute", top: 0, width: 16, height: 2, borderRadius: 1, background: T.dark }} />}
  </button>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{
    background: T.card, borderRadius: 22, padding: 22,
    boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.02)",
    transition: "all 0.3s", cursor: onClick ? "pointer" : "default", ...style,
  }}>{children}</div>
);

const DarkPill = ({ text }) => (
  <span style={{ fontSize: 12, fontWeight: 600, padding: "8px 18px", borderRadius: 24, background: T.darkPill, color: "#fff", fontFamily: F, letterSpacing: 0.2 }}>{text}</span>
);

const LightPill = ({ text, color = T.text2 }) => (
  <span style={{ fontSize: 11, fontWeight: 500, padding: "5px 14px", borderRadius: 20, background: "rgba(0,0,0,0.04)", color, fontFamily: F, letterSpacing: 0.2 }}>{text}</span>
);

const IcePill = ({ text }) => (
  <span style={{ fontSize: 11, fontWeight: 500, padding: "5px 14px", borderRadius: 20, background: T.iceBg, color: T.iceMid, fontFamily: F, letterSpacing: 0.2 }}>{text}</span>
);

const Tog = ({ on, flip }) => (
  <div onClick={flip} style={{ width: 48, height: 26, borderRadius: 13, cursor: "pointer", background: on ? T.dark : "rgba(0,0,0,0.08)", transition: "all 0.35s", position: "relative", flexShrink: 0 }}>
    <div style={{ width: 22, height: 22, borderRadius: 11, background: "#fff", position: "absolute", top: 2, left: on ? 24 : 2, transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
  </div>
);

const Bar = ({ value }) => (
  <div style={{ height: 48, display: "flex", gap: 6, alignItems: "flex-end" }}>
    {[65, 82, 45, value, 70].map((v, i) => (
      <div key={i} style={{ flex: 1, height: `${v}%`, borderRadius: 10, background: i === 3 ? T.dark : `linear-gradient(180deg, ${T.iceLight}, ${T.ice}80)`, transition: "height 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
    ))}
  </div>
);

const Progress = ({ value }) => (
  <div style={{ height: 6, borderRadius: 3, background: "rgba(0,0,0,0.05)", overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${value}%`, borderRadius: 3, background: T.dark, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
  </div>
);

const Sec = ({ children, sub }) => (
  <div style={{ marginBottom: 14 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: T.black, margin: 0, fontFamily: F, letterSpacing: -0.3 }}>{children}</h2>
    {sub && <p style={{ fontSize: 13, color: T.text2, margin: "5px 0 0", fontFamily: F, fontWeight: 400 }}>{sub}</p>}
  </div>
);

const Bk = ({ onClick }) => <button onClick={onClick} style={{ background: T.surface, border: "none", borderRadius: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: T.text2, fontSize: 13, fontWeight: 500, fontFamily: F, padding: "9px 16px", marginBottom: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>← Back</button>;

const Chips = ({ items, active, onSelect }) => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
    {items.map(c => <button key={c} onClick={() => onSelect(c)} style={{ padding: "8px 18px", borderRadius: 22, border: "none", fontSize: 12, fontWeight: active === c ? 600 : 400, cursor: "pointer", background: active === c ? T.dark : T.surface, color: active === c ? "#fff" : T.text2, fontFamily: F, transition: "all 0.25s", boxShadow: active === c ? "0 2px 8px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.04)" }}>{c}</button>)}
  </div>
);

const Ico = ({ emoji, sz = 40 }) => <div style={{ width: sz, height: sz, borderRadius: sz * 0.35, background: "rgba(0,0,0,0.03)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: sz * 0.45, flexShrink: 0 }}>{emoji}</div>;

const Arr = () => <div style={{ width: 28, height: 28, borderRadius: 14, background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: T.text3 }}>→</div>;

// ═══ AI BRAIN — SELF-LEARNING HOME INTELLIGENCE ═══

const PROPERTY_CONTEXT = `You are the AI brain of MyHome — a deeply intelligent home companion for Adrian's property at 34 Moultrie Street, Charleston, SC 29403.

You are THREE experts in one:
1. INTERIOR DESIGNER — You have an expert eye for spatial design, light optimization, color theory, furniture scale, curtain sizing, window treatments, rug placement, and how to make every room feel intentional. You understand how ceiling height, floor material, and natural light direction affect design choices.
2. GENERAL CONTRACTOR — You know how homes work mechanically: plumbing runs, electrical systems, HVAC ductwork, outdoor water lines, shower installations, crawl space concerns, roof systems, drainage, and structural considerations. You give practical, code-aware advice.
3. CHARLESTON HOME SPECIALIST — You understand Lowcountry architecture, the humidity/heat/hurricane climate, termite pressure, pollen seasons, historic home quirks (1935 build), and how to blend modern living with traditional Charleston character. You know double-porch living, brick patio care, and coastal property maintenance.

PROPERTY FACTS:
- Address: 34 Moultrie St, North Central neighborhood, Charleston, SC 29403
- Type: Single Family Traditional, 2 stories, built 1935, fully renovated ground-up 2012
- Size: 1,890 sq ft livable, 4,356 sq ft lot (0.1 acre)
- Bedrooms: 3 (all with en-suite bathrooms). Primary suite has porch access, dual vanities, walk-in shower with multiple shower heads, walk-in closet.
- Bathrooms: 4 (3 full en-suite + 1 half bath on first floor)
- Kitchen: Open floor plan, large island, stainless steel appliances, eat-in, pantry
- Flooring: Hardwood throughout + ceramic tile in wet areas
- Ceilings: Smooth, high ceilings throughout (important for curtain/blind sizing — likely 9-10ft)
- Fireplaces: REMOVED (both original 1935 fireplaces removed March 2026, hardwood floors patched and refinished seamlessly, ~40 sq ft usable space reclaimed)
- HVAC: Heat pump + central air (serviced Feb 2026)
- Laundry: Dedicated laundry room
- Closets: Walk-in closet(s)
- Exterior: Wood siding (needs periodic painting/sealing in coastal climate)
- Foundation: Crawl space (critical to monitor for moisture in Charleston humidity)
- Roof: Asphalt shingle (installed 2012 renovation, ~14 years old, 6-16 years remaining)
- Parking: Off-street
- Fencing: Perimeter
- Porches: Double front porches — upper and lower, classic Charleston style (signature feature)
- Backyard: Old Charleston brick patio, gas fire pit (line serviced Jan 2026), perimeter fencing, entertainer's layout
- Utilities: Charleston Water Service, Dominion Energy, public sewer
- Location: Near Hampton Park, restaurants, coffee shops in North Central
- Purchase: $1,045,000 (Feb 2025) | Zestimate: ~$1,064,700 | Tax: $1,685/yr

UPGRADES LOG:
- March 2026: Removed both fireplaces, patched hardwood floors. Space gained: ~40 sq ft. Chimney caps sealed.

MAINTENANCE HISTORY (2026):
- Jan 15: Gutter cleaning (2 stories) — $140 — Palmetto Gutters
- Jan 28: Fire pit gas line check — $95 — LowCountry Gas & Grill
- Feb 12: Heat pump service — $175 — CoolAir Charleston
- Feb 20: Crawl space inspection — $150 — Charleston Foundation Pros
- Mar 8: Brick patio power wash — $185 — Lowcountry Clean Co.
- Total YTD: $1,420

INTERIOR DESIGN INTELLIGENCE — When analyzing rooms or answering design questions:
- WINDOW TREATMENTS: Calculate curtain/blind sizes from window dimensions AND ceiling height. For high ceilings, always recommend hanging curtains 4-6" above the frame or at ceiling height to elongate the room. Specify rod width (extend 8-12" beyond frame on each side). Recommend inside vs outside mount based on window depth.
- LIGHT OPTIMIZATION: Consider which direction windows face (south = bright, north = soft), time of day, and how furniture placement, mirror positioning, and light-colored surfaces can maximize or control natural light. Charleston gets intense afternoon sun from the west.
- SPATIAL FLOW: Understand how removing the fireplaces changed room dynamics. Advise on furniture arrangement that creates clear traffic paths, conversation zones, and visual balance. Consider the open floor plan's sight lines.
- SCALE & PROPORTION: With high ceilings, recommend appropriately scaled furniture, art hanging heights (center at 57-60"), and area rug sizing (front legs of furniture on rug minimum).
- COLOR & MATERIAL: Understand how Charleston's light (bright, warm, humid atmosphere) affects paint colors, fabric choices, and material durability. Recommend moisture-resistant options where appropriate.
- OUTDOOR LIVING: The double porches and brick patio are extensions of the living space. Advise on outdoor furniture, lighting, ceiling fans for porches, planters, and seasonal decor appropriate to the Charleston climate.

PRACTICAL / MECHANICAL INTELLIGENCE — When answering handyman or contractor questions:
- PLUMBING: Understand residential plumbing basics — supply lines, drain lines, shut-off valves, outdoor hose bibs, and how to connect outdoor showers. For Charleston, advise on freeze protection for outdoor water lines (rare but possible), proper drainage on the brick patio, and crawl space moisture management.
- ELECTRICAL: Understand basic residential circuits, GFCI requirements for wet areas and outdoor outlets, and ceiling fan installation considerations for the porches.
- HVAC: The heat pump + central air system serves 1,890 sq ft across 2 stories. Advise on filter schedules, duct cleaning, humidity control, and seasonal prep.
- STRUCTURAL: The 1935 build with 2012 renovation means modern framing inside historic bones. The crawl space foundation needs annual moisture checks. Wood siding needs regular maintenance in coastal air.

YOUR COMMUNICATION STYLE:
- Warm, direct, no fluff — like a knowledgeable friend who happens to be a designer and contractor
- When you can give a specific measurement, material, or product recommendation, DO IT
- When you need more info (like a photo of the specific room), ask for it specifically
- Always factor in Charleston's climate: humidity, heat, coastal salt air, hurricanes, termites, pollen
- Use **bold** for key numbers, measurements, and recommendations
- Keep responses concise for mobile — 3-4 paragraphs max unless the question requires more detail
- If someone uploads a photo, reference specific things you see in it — don't be generic
- Use common sense and practical experience, not just textbook answers`;

// Shared state for uploaded files knowledge
let uploadedFilesKnowledge = [];

// ═══ PERSISTENT STORAGE — survives app closes ═══
const DB = {
  _get(key, fallback = []) {
    try { const v = localStorage.getItem(`myhome_${key}`); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  _set(key, val) {
    try { localStorage.setItem(`myhome_${key}`, JSON.stringify(val)); } catch {}
  },
  // Knowledge base — AI learns from every upload
  getKnowledge() { return this._get("knowledge", []); },
  addKnowledge(entry) {
    const k = this.getKnowledge();
    k.push({ text: entry, date: new Date().toISOString() });
    this._set("knowledge", k);
    uploadedFilesKnowledge = k.map(i => i.text); // sync to runtime
  },
  // Chat history
  getChats() { return this._get("chats", []); },
  addChat(q, a) {
    const c = this.getChats();
    c.push({ q, a, date: new Date().toISOString() });
    if (c.length > 50) c.shift(); // keep last 50
    this._set("chats", c);
  },
  // Uploaded files registry (name, date, analysis preview — not the full image)
  getUploads() { return this._get("uploads", []); },
  addUpload(name, analysis) {
    const u = this.getUploads();
    u.push({ name, analysis: analysis.substring(0, 300), date: new Date().toISOString() });
    this._set("uploads", u);
  },
  // Upgrades
  getUpgrades() { return this._get("upgrades", [{ id: 1, title: "Removed Both Fireplaces & Patched Floors", date: "Mar 2026", cat: "Structural", desc: "Removed both original 1935 fireplaces to reclaim usable square footage. Hardwood floors patched and refinished to match.", impact: [{ l: "Space Gained", v: "~40 sq ft" }, { l: "Floors", v: "Patched & refinished" }, { l: "Chimney", v: "Caps sealed" }], cost: null, cn: "Add cost", before: "2 original fireplaces", after: "Seamless hardwood", tags: ["Structural", "Flooring", "Space"], e: "🔥" }]); },
  setUpgrades(ups) { this._set("upgrades", ups); },
  // Clear all data
  clearAll() { ["knowledge", "chats", "uploads", "upgrades"].forEach(k => localStorage.removeItem(`myhome_${k}`)); },
};

// Initialize runtime knowledge from storage on load
uploadedFilesKnowledge = DB.getKnowledge().map(i => i.text);

async function askAI(question, images = []) {
  try {
    const messages = [];
    const userContent = [];

    // Add any images first
    for (const img of images) {
      userContent.push({
        type: "image",
        source: { type: "base64", media_type: img.type, data: img.data }
      });
    }

    // Build the question with uploaded knowledge context
    let fullQuestion = question;
    if (uploadedFilesKnowledge.length > 0) {
      fullQuestion += "\n\nADDITIONAL CONTEXT FROM UPLOADED DOCUMENTS:\n" +
        uploadedFilesKnowledge.map(k => `- ${k}`).join("\n");
    }

    userContent.push({ type: "text", text: fullQuestion });
    messages.push({ role: "user", content: userContent });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: PROPERTY_CONTEXT + "\n\nIMPORTANT: Keep responses concise and scannable for a mobile app. Use **bold** for key numbers/facts. No more than 3-4 short paragraphs. If listing items, keep each under 10 words.",
        messages,
      })
    });

    const data = await response.json();
    const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "I couldn't process that. Try rephrasing your question.";
    return text;
  } catch (err) {
    console.error("AI Error:", err);
    return "Having trouble connecting right now. Please try again in a moment.";
  }
}

async function analyzeImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];
      const mediaType = file.type || "image/jpeg";
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: PROPERTY_CONTEXT + `\n\nYou are performing a DEEP SCAN of an image uploaded by the homeowner for 34 Moultrie St. This analysis becomes permanent knowledge about the home — be exhaustive and precise.

VISUAL ANALYSIS CHECKLIST — extract EVERY detail you can:

IF IT'S A ROOM INTERIOR:
- Room identification (which room, what floor)
- Window count, estimated sizes, direction they face if determinable
- Ceiling height estimate, ceiling type (smooth, beamed, etc.)
- Flooring material and condition
- Wall color/finish, trim style, baseboards
- Light fixtures (type, count, style)
- Furniture present (identify pieces, estimate scale)
- Natural light quality and direction
- Current window treatments (or lack thereof)
- Outlets, switches, vents visible
- Design style/aesthetic of the space
- Potential issues (water stains, wear, dated elements)
- Opportunities (empty walls, underutilized corners, light optimization)

IF IT'S AN EXTERIOR/OUTDOOR:
- Area identification (front, back, side, porch, patio)
- Materials (brick type, wood species if identifiable, stone)
- Condition assessment
- Plumbing fixtures visible (hose bibs, outdoor shower, spigots)
- Electrical (outdoor outlets, lighting)
- Drainage patterns, grading
- Landscaping details
- Fencing condition and material
- Dimensions estimates where possible

IF IT'S A DOCUMENT/INVOICE/BLUEPRINT:
- Extract ALL text, numbers, dates, names
- Vendor info, costs, service details
- Measurements, dimensions, specifications
- Any warranty or model number info

Format as a structured summary. Start with WHAT THIS IS, then list every extractable detail. Be specific enough that future questions about this room/area can be answered from your analysis alone.`,
            messages: [{
              role: "user",
              content: [
                { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
                { type: "text", text: "Analyze this image of my home in detail. Extract every useful fact, measurement, material, count, and condition note." }
              ]
            }]
          })
        });
        const data = await response.json();
        const analysis = data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "Couldn't analyze this image.";
        // Store knowledge from this image
        DB.addKnowledge(`[Image: ${file.name}] ${analysis.substring(0, 500)}`);
        DB.addUpload(file.name, analysis);
        resolve({ analysis, base64, mediaType });
      } catch (err) {
        resolve({ analysis: "Error analyzing image. Please try again.", base64, mediaType });
      }
    };
    reader.readAsDataURL(file);
  });
}

// ═══ SCREENS ═══

const Dashboard = ({ go }) => {
  const [q, setQ] = useState(""); const [res, setRes] = useState(null); const [ld, setLd] = useState(false);
  const [history, setHistory] = useState(() => DB.getChats());
  const ask = async () => {
    if (!q.trim()) return;
    setLd(true); setRes(null);
    const answer = await askAI(q);
    setRes(answer);
    DB.addChat(q, answer);
    setHistory(DB.getChats());
    setLd(false);
  };
  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Late night" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : hour < 21 ? "Good evening" : "Good night";
  const emoji = hour < 5 ? "🌙" : hour < 12 ? "☀️" : hour < 17 ? "⛅" : hour < 21 ? "🌆" : "🌙";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "6px 0 0" }}>
        <p style={{ fontSize: 13, color: T.text3, margin: 0, fontFamily: F, fontWeight: 400, letterSpacing: 0.3 }}>{greeting}, Adrian</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "4px 0 0", fontFamily: F, color: T.black, letterSpacing: -0.5 }}>34 Moultrie St {emoji}</h1>
      </div>

      {/* Ask — ice blue panel like Brice right card */}
      <div style={{ borderRadius: 24, padding: 22, position: "relative", overflow: "hidden", background: `linear-gradient(160deg, ${T.iceLight}, ${T.ice} 70%, ${T.iceMid})` }}>
        {/* Chrome wave decoration inspired by Brice */}
        <div style={{ position: "absolute", top: -50, right: -40, width: 160, height: 160, borderRadius: 80, background: "rgba(255,255,255,0.25)", filter: "blur(2px)" }} />
        <div style={{ position: "absolute", bottom: -30, left: -30, width: 100, height: 100, borderRadius: 50, background: "rgba(255,255,255,0.15)" }} />

        <p style={{ fontSize: 12, color: "rgba(26,26,26,0.5)", margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", position: "relative" }}>Ask about your home</p>
        <div style={{ display: "flex", gap: 8, position: "relative" }}>
          <input value={q} onChange={e => { setQ(e.target.value); setRes(null); }} onKeyDown={e => e.key === "Enter" && ask()} placeholder="Ask anything about your home..." style={{ flex: 1, padding: "13px 18px", borderRadius: 16, border: "none", fontSize: 14, fontFamily: F, background: "rgba(255,255,255,0.5)", color: T.dark, outline: "none", fontWeight: 500, backdropFilter: "blur(10px)" }} />
          <button onClick={ask} disabled={ld} style={{ background: T.dark, border: "none", borderRadius: 16, padding: "13px 22px", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: F, color: "#fff", letterSpacing: 0.2, opacity: ld ? 0.6 : 1 }}>Ask</button>
        </div>
        {!res && !ld && <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap", position: "relative" }}>
          {["How many blinds?", "Paint estimate?", "Roof condition?", "What should I do before summer?", "Patio reseal?"].map((s, i) => <button key={i} onClick={() => { setQ(s); }} style={{ padding: "5px 14px", borderRadius: 20, border: "none", background: "rgba(255,255,255,0.4)", color: "rgba(26,26,26,0.6)", fontSize: 11, cursor: "pointer", fontFamily: F, fontWeight: 500 }}>{s}</button>)}
        </div>}
        {ld && (
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, border: "2px solid rgba(26,26,26,0.15)", borderTopColor: "rgba(26,26,26,0.5)", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: "rgba(26,26,26,0.5)", fontSize: 13, fontFamily: F, margin: 0 }}>Thinking about your home...</p>
          </div>
        )}
        {res && <div style={{ marginTop: 16, background: "rgba(255,255,255,0.45)", borderRadius: 18, padding: 18, position: "relative", backdropFilter: "blur(20px)" }}>
          <div style={{ fontSize: 14, color: T.dark, margin: 0, lineHeight: 1.8, fontFamily: F, whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
          <button onClick={() => { setRes(null); setQ(""); }} style={{ marginTop: 14, padding: "8px 18px", borderRadius: 12, border: "none", background: "rgba(255,255,255,0.5)", color: T.text2, fontSize: 12, cursor: "pointer", fontFamily: F, fontWeight: 500 }}>Ask another question</button>
        </div>}
      </div>

      {/* Weather */}
      <Card onClick={() => go("happenings")} style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Ico emoji="⛅" sz={44} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 18, fontWeight: 700, margin: 0, color: T.black, fontFamily: F }}>43°F</p>
            <p style={{ fontSize: 12, color: T.text2, margin: "2px 0 0", fontFamily: F }}>Partly sunny · High 56° · 78° by Sunday</p>
          </div>
          <Arr />
        </div>
      </Card>

      {/* Stats — Brice-style data cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card onClick={() => go("property")}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 6px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Property</p>
          <p style={{ fontSize: 32, fontWeight: 800, margin: "0 0 4px", fontFamily: F, color: T.black, letterSpacing: -1 }}>1,890</p>
          <p style={{ fontSize: 11, color: T.text2, margin: 0, fontFamily: F }}>sq ft · 3 bed · 4 bath</p>
        </Card>
        <Card onClick={() => go("maintenance")}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 6px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>This Year</p>
          <p style={{ fontSize: 32, fontWeight: 800, margin: "0 0 4px", fontFamily: F, color: T.black, letterSpacing: -1 }}>$1,420</p>
          <p style={{ fontSize: 11, color: T.text2, margin: 0, fontFamily: F }}>maintenance</p>
        </Card>
      </div>

      {/* Vitality — Brice bar chart style */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, color: T.text3, margin: "0 0 4px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Home Vitality</p>
            <p style={{ fontSize: 28, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>72<span style={{ fontSize: 16, fontWeight: 400, color: T.text3 }}>/100</span></p>
          </div>
          <DarkPill text="Good Shape" />
        </div>
        <Bar value={72} />
        <p style={{ fontSize: 12, color: T.text2, margin: "12px 0 0", fontFamily: F }}>4 things to tend to this spring</p>
      </Card>

      {/* Home Story */}
      <Card onClick={() => go("upgrades")}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Ico emoji="🏗️" sz={44} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>Home Story</p>
            <p style={{ fontSize: 12, color: T.text2, margin: "3px 0 0", fontFamily: F }}>1 upgrade logged · Fireplace removal</p>
          </div>
          <Arr />
        </div>
      </Card>

      {/* Recent Uploads */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: 0, fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Recent Uploads</p>
          <button onClick={() => go("upload")} style={{ background: T.dark, border: "none", borderRadius: 12, padding: "7px 16px", fontSize: 11, color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: F }}>+ Add</button>
        </div>
        {[{ n: "Floor Plan — 1st & 2nd Floor.pdf", d: "Mar 14", e: "📐" }, { n: "Backyard & Patio Photos (8)", d: "Mar 10", e: "📷" }, { n: "Lawn Care Invoice — Feb.pdf", d: "Mar 1", e: "🧾" }].map((f, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}><Ico emoji={f.e} sz={36} /><div style={{ flex: 1 }}><p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: T.text, fontFamily: F }}>{f.n}</p><p style={{ fontSize: 11, color: T.text3, margin: "2px 0 0", fontFamily: F }}>{f.d}</p></div></div>)}
      </Card>
    </div>
  );
};

const Property = ({ go }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Bk onClick={() => go("dashboard")} /><Sec sub="Your property at a glance">Property Details</Sec>
    {/* Ice blue hero like Brice right panel */}
    <div style={{ borderRadius: 24, overflow: "hidden", height: 180, background: `linear-gradient(160deg, ${T.iceLight}, ${T.ice} 60%, ${T.iceMid})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: -30, right: -20, width: 120, height: 120, borderRadius: 60, background: "rgba(255,255,255,0.2)" }} />
      <div style={{ textAlign: "center", position: "relative" }}>
        <p style={{ fontSize: 22, fontWeight: 800, color: T.dark, margin: 0, fontFamily: F }}>34 Moultrie Street</p>
        <p style={{ fontSize: 12, color: "rgba(26,26,26,0.5)", margin: "6px 0 0", fontFamily: F, fontWeight: 500 }}>North Central · Charleston, SC 29403</p>
        <p style={{ fontSize: 11, color: "rgba(26,26,26,0.35)", margin: "2px 0 0", fontFamily: F }}>Built 1935 · Renovated 2012 · Traditional</p>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
      {[{ l: "Sq Ft", v: "1,890" }, { l: "Beds", v: "3" }, { l: "Baths", v: "4" }, { l: "Lot", v: "4,356ft²" }, { l: "Stories", v: "2" }, { l: "Parking", v: "Off-St" }].map((s, i) => <Card key={i} style={{ padding: 14, textAlign: "center" }}><p style={{ fontSize: 20, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>{s.v}</p><p style={{ fontSize: 10, color: T.text3, margin: "4px 0 0", fontFamily: F, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.l}</p></Card>)}
    </div>
    <Sec>Interior</Sec>
    <Card style={{ padding: 18 }}>{[{ l: "Flooring", v: "Hardwood & Ceramic Tile" }, { l: "Ceilings", v: "Smooth, High" }, { l: "Kitchen", v: "Island, Eat-in, Pantry, SS Appliances" }, { l: "Fireplaces", v: "Removed (see Upgrades)" }, { l: "Heating", v: "Heat Pump" }, { l: "Cooling", v: "Central Air" }].map((f, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}><span style={{ fontSize: 12, color: T.text3, fontFamily: F }}>{f.l}</span><span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: F, textAlign: "right", maxWidth: "55%" }}>{f.v}</span></div>)}</Card>
    <Sec>Bedrooms</Sec>
    {[{ n: "Primary Suite", d: "En-suite · Dual vanities · Walk-in shower · Porch access" }, { n: "Bedroom 2", d: "En-suite bathroom" }, { n: "Bedroom 3", d: "En-suite bathroom" }, { n: "Half Bath", d: "First floor powder room" }].map((r, i) => <Card key={i} style={{ padding: 16 }}><p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{r.n}</p><p style={{ fontSize: 12, color: T.text2, margin: "4px 0 0", fontFamily: F }}>{r.d}</p></Card>)}
    <Sec>Outdoor</Sec>
    <Card style={{ padding: 16 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>Double Front Porches</p><DarkPill text="Signature" /></div><p style={{ fontSize: 12, color: T.text2, margin: "4px 0 0", fontFamily: F }}>Upper & lower · Classic Charleston</p></Card>
    <Card style={{ padding: 16 }}><p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px", fontFamily: F, color: T.black }}>Backyard</p><p style={{ fontSize: 12, color: T.text2, margin: 0, fontFamily: F }}>Charleston brick patio · Fire pit · Perimeter fencing</p></Card>
  </div>
);

const Maintenance = ({ go }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Bk onClick={() => go("dashboard")} /><Sec sub="Track spending and services">Spending Tracker</Sec>
    <Card>
      <p style={{ fontSize: 10, color: T.text3, margin: "0 0 6px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>2026 Total</p>
      <p style={{ fontSize: 42, fontWeight: 800, margin: 0, fontFamily: F, color: T.black, letterSpacing: -1.5 }}>$1,420</p>
      {/* Brice-style rounded bar chart */}
      <div style={{ display: "flex", gap: 8, marginTop: 20, alignItems: "flex-end", height: 90 }}>
        {[{ m: "J", v: 380 }, { m: "F", v: 520 }, { m: "M", v: 520 }, { m: "A", v: 0 }, { m: "M", v: 0 }, { m: "J", v: 0 }].map((d, i) => <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "100%", borderRadius: 12, height: d.v ? `${(d.v / 550) * 90}px` : 4, background: i === 2 ? T.dark : `linear-gradient(180deg, ${T.iceLight}, ${T.ice}90)`, transition: "height 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
            {i === 2 && <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 6 }}><span style={{ fontSize: 10, color: "#fff", fontFamily: F, fontWeight: 600 }}>$520</span></div>}
          </div>
          <p style={{ fontSize: 10, color: T.text3, margin: "8px 0 0", fontFamily: F, fontWeight: 500 }}>{d.m}</p>
        </div>)}
      </div>
    </Card>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {[{ c: "Lawn & Patio", a: "$520", p: "37%", e: "🌿" }, { c: "Plumbing", a: "$380", p: "27%", e: "🔧" }, { c: "HVAC", a: "$320", p: "22%", e: "❄️" }, { c: "General", a: "$200", p: "14%", e: "🏠" }].map((c, i) => <Card key={i} style={{ padding: 16 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontSize: 18 }}>{c.e}</span><span style={{ fontSize: 11, color: T.text3, fontFamily: F }}>{c.p}</span></div><p style={{ fontSize: 20, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>{c.a}</p><p style={{ fontSize: 11, color: T.text2, margin: "4px 0 0", fontFamily: F }}>{c.c}</p></Card>)}
    </div>
    <Sec>Recent</Sec>
    {[{ n: "Brick Patio Power Wash", v: "Lowcountry Clean", d: "Mar 8", cost: "$185", e: "🧹" }, { n: "Crawl Space Inspection", v: "Charleston Foundation", d: "Feb 20", cost: "$150", e: "🔍" }, { n: "Heat Pump Service", v: "CoolAir", d: "Feb 12", cost: "$175", e: "❄️" }, { n: "Fire Pit Gas Line", v: "LowCountry Gas", d: "Jan 28", cost: "$95", e: "🔥" }].map((s, i) => <Card key={i} style={{ padding: 16 }}><div style={{ display: "flex", gap: 12, alignItems: "center" }}><Ico emoji={s.e} /><div style={{ flex: 1 }}><p style={{ fontSize: 13, fontWeight: 600, margin: 0, fontFamily: F, color: T.text }}>{s.n}</p><p style={{ fontSize: 11, color: T.text3, margin: "3px 0 0", fontFamily: F }}>{s.v} · {s.d}</p></div><p style={{ fontSize: 16, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>{s.cost}</p></div></Card>)}
  </div>
);

const Upload = ({ go }) => {
  const [files, setFiles] = useState([]);
  const [analyzing, setAnalyzing] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const fileRef = useRef(null);

  const handleFiles = async (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    // Auto-analyze images
    for (const file of newFiles) {
      if (file.type.startsWith("image/")) {
        setAnalyzing(file.name);
        const result = await analyzeImage(file);
        setAnalyses(prev => [...prev, { name: file.name, ...result }]);
        setAnalyzing(null);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} />
      <Sec sub="Upload photos and documents — AI scans everything">Upload & Scan</Sec>

      {/* Upload zone */}
      <div onClick={() => fileRef.current?.click()} style={{ border: "2px dashed rgba(0,0,0,0.08)", borderRadius: 24, padding: 48, textAlign: "center", background: "rgba(0,0,0,0.01)", cursor: "pointer" }}>
        <input ref={fileRef} type="file" accept="image/*,.pdf" multiple onChange={handleFiles} style={{ display: "none" }} />
        <span style={{ fontSize: 44 }}>📸</span>
        <p style={{ fontSize: 16, fontWeight: 700, margin: "14px 0 4px", fontFamily: F, color: T.black }}>Tap to upload photos</p>
        <p style={{ fontSize: 12, color: T.text2, margin: 0, fontFamily: F }}>AI will scan and learn from every image</p>
      </div>

      {/* Quick upload categories */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["📐 Blueprints", "📷 Rooms", "🧾 Invoices", "🌿 Outdoor", "📄 Documents"].map((c, i) => (
          <button key={i} onClick={() => fileRef.current?.click()} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: T.surface, color: T.text2, fontSize: 12, cursor: "pointer", fontFamily: F, fontWeight: 500, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>{c}</button>
        ))}
      </div>

      {/* Analyzing indicator */}
      {analyzing && (
        <Card style={{ background: `linear-gradient(160deg, ${T.iceLight}, ${T.ice}40)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: 12, border: "2px solid rgba(26,26,26,0.15)", borderTopColor: "rgba(26,26,26,0.5)", animation: "spin 0.8s linear infinite" }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, margin: 0, fontFamily: F, color: T.text }}>Scanning {analyzing}...</p>
              <p style={{ fontSize: 11, color: T.text2, margin: "2px 0 0", fontFamily: F }}>AI is extracting details from your image</p>
            </div>
          </div>
        </Card>
      )}

      {/* Analysis results */}
      {analyses.map((a, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Ico emoji="🔍" sz={36} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, margin: 0, fontFamily: F, color: T.text }}>{a.name}</p>
                <p style={{ fontSize: 11, color: T.good, margin: "2px 0 0", fontFamily: F, fontWeight: 500 }}>✓ Scanned & learned</p>
              </div>
            </div>
            <DarkPill text="Analyzed" />
          </div>
          <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.8, fontFamily: F, whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.02)", borderRadius: 14, padding: 14 }} dangerouslySetInnerHTML={{ __html: a.analysis.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#1A1A1A">$1</strong>').replace(/\n/g, '<br/>') }} />
        </Card>
      ))}

      {/* Uploaded files list */}
      {files.length > 0 && !analyses.length && (
        <Card>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 14px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Uploaded Files</p>
          {files.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}>
              <Ico emoji={f.type.startsWith("image/") ? "📷" : "📄"} sz={32} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500, margin: 0, fontFamily: F, color: T.text }}>{f.name}</p>
                <p style={{ fontSize: 11, color: T.text3, margin: 0, fontFamily: F }}>{(f.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Knowledge base count */}
      {DB.getKnowledge().length > 0 && (
        <Card style={{ background: `linear-gradient(160deg, ${T.iceLight}40, ${T.surface})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Ico emoji="🧠" sz={40} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>Home Knowledge Base</p>
              <p style={{ fontSize: 12, color: T.text2, margin: "2px 0 0", fontFamily: F }}>{DB.getKnowledge().length} document{DB.getKnowledge().length !== 1 ? 's' : ''} scanned · {DB.getChats().length} questions answered</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const Happenings = ({ go }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Bk onClick={() => go("dashboard")} /><Sec sub="North Central · Charleston, SC 29403">Local Happenings</Sec>
    <Card style={{ background: `linear-gradient(160deg, ${T.iceLight}80, ${T.surface})` }}>
      <p style={{ fontSize: 10, color: T.text3, margin: "0 0 14px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>This Week</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>{[{ d: "W", e: "⛅", h: "56°", l: "36°" }, { d: "T", e: "🌤️", h: "62°", l: "42°" }, { d: "F", e: "☀️", h: "67°", l: "48°" }, { d: "S", e: "☀️", h: "75°", l: "55°" }, { d: "S", e: "☀️", h: "78°", l: "58°" }].map((w, i) => <div key={i} style={{ textAlign: "center", flex: 1 }}><p style={{ fontSize: 11, color: i === 0 ? T.black : T.text3, margin: 0, fontFamily: F, fontWeight: i === 0 ? 700 : 400 }}>{w.d}</p><span style={{ fontSize: 22, display: "block", margin: "4px 0" }}>{w.e}</span><p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: T.black, fontFamily: F }}>{w.h}</p><p style={{ fontSize: 10, color: T.text3, margin: "2px 0 0", fontFamily: F }}>{w.l}</p></div>)}</div>
    </Card>
    <Sec>Property Impact</Sec>
    {[{ e: "🥶", t: "Cool Night — 36°F", d: "Cover tender spring plantings.", imp: "Low", c: T.info, bg: T.infoBg }, { e: "🌿", t: "Pollen Season", d: "Hose down porches, swap HVAC filters.", imp: "Medium", c: T.warn, bg: T.warnBg }, { e: "🐛", t: "Termite Swarm", d: "Crawl space home — schedule inspection.", imp: "High", c: T.alert, bg: T.alertBg }, { e: "🌊", t: "Hurricane Prep", d: "Inspect roof, clean gutters, check siding.", imp: "Plan Ahead", c: T.info, bg: T.infoBg }].map((it, i) => <Card key={i} style={{ padding: 16 }}><div style={{ display: "flex", gap: 12 }}><Ico emoji={it.e} /><div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 4 }}><p style={{ fontSize: 14, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{it.t}</p><LightPill text={it.imp} color={it.c} /></div><p style={{ fontSize: 12, color: T.text2, margin: 0, lineHeight: 1.5, fontFamily: F }}>{it.d}</p></div></div></Card>)}
    <Sec>Seasonal</Sec>
    {[{ e: "🌳", t: "Hampton Park Bloom", dt: "Now–April", d: "Right around the corner." }, { e: "🌸", t: "Home & Garden Show", dt: "Mar 22–23", d: "Patio furniture and landscaping." }, { e: "🚛", t: "Bulk Waste Pickup", dt: "Mar 25", d: "North Central. Out by 6am." }].map((h, i) => <Card key={i} style={{ padding: 16 }}><div style={{ display: "flex", gap: 12, alignItems: "center" }}><Ico emoji={h.e} /><div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{h.t}</p><p style={{ fontSize: 11, color: T.iceMid, margin: "3px 0", fontFamily: F, fontWeight: 600 }}>{h.dt}</p><p style={{ fontSize: 12, color: T.text2, margin: 0, fontFamily: F }}>{h.d}</p></div></div></Card>)}
  </div>
);

const Notifs = ({ go }) => {
  const [s, setS] = useState({ a:true,b:true,c:true,d:true,e:true,f:false,g:true,h:true,i:false,j:true });
  const fl = k => setS(p => ({ ...p, [k]: !p[k] }));
  const G = ({ title, items }) => <Card><p style={{ fontSize: 10, color: T.text3, margin: "0 0 14px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>{title}</p>{items.map((it, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}><div style={{ paddingRight: 14 }}><p style={{ fontSize: 13, fontWeight: 600, margin: 0, fontFamily: F, color: T.text }}>{it.l}</p><p style={{ fontSize: 11, color: T.text3, margin: "3px 0 0", fontFamily: F }}>{it.d}</p></div><Tog on={s[it.k]} flip={() => fl(it.k)} /></div>)}</Card>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} /><Sec sub="Control what reaches you">Notifications</Sec>
      <G title="Weather" items={[{ k:"a",l:"Frost & Freeze",d:"Protect patio plantings" },{ k:"b",l:"Heavy Rain",d:"Crawl space moisture" },{ k:"c",l:"Hurricane Season",d:"Tropical tracking" },{ k:"d",l:"Severe Weather",d:"Always on" }]} />
      <G title="Home Care" items={[{ k:"e",l:"Task Reminders",d:"Gentle nudges" },{ k:"f",l:"Vitality Drops",d:"Score dip alerts" }]} />
      <G title="Recurring" items={[{ k:"g",l:"Sunday Home Log",d:"Weekly check-in" },{ k:"h",l:"Monthly Summary",d:"Spend overview" }]} />
      <G title="Community" items={[{ k:"i",l:"Vendor Promos",d:"Deals from pros" },{ k:"j",l:"North Central",d:"Local events" }]} />
      {/* Sunday preview */}
      <div style={{ borderRadius: 22, padding: 16, background: `linear-gradient(160deg, ${T.iceLight}60, ${T.surface})` }}>
        <p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Sunday Log Preview</p>
        <Card style={{ padding: 14, margin: 0 }}><div style={{ display: "flex", gap: 12, alignItems: "center" }}><Ico emoji="🏡" /><div><p style={{ fontSize: 14, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>Sunday Check-in</p><p style={{ fontSize: 12, color: T.text2, margin: "3px 0 0", fontFamily: F }}>Hey Adrian! Anything happen at Moultrie this week?</p></div></div></Card>
      </div>
    </div>
  );
};

const Profile = ({ go }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Bk onClick={() => go("dashboard")} /><Sec sub="Manage your account">Profile</Sec>
    <Card style={{ textAlign: "center", padding: 30 }}>
      <div style={{ width: 80, height: 80, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 32, fontWeight: 800, fontFamily: F, background: `linear-gradient(160deg, ${T.iceLight}, ${T.ice})`, color: T.dark }}>A</div>
      <p style={{ fontSize: 22, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>Adrian</p><p style={{ fontSize: 13, color: T.text2, margin: "4px 0 0", fontFamily: F }}>Charleston, SC</p>
      <button style={{ marginTop: 16, padding: "10px 24px", borderRadius: 14, border: "none", background: T.dark, fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: F }}>Edit Profile</button>
    </Card>
    <Card><p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Home Address</p><div style={{ display: "flex", gap: 12, alignItems: "center" }}><Ico emoji="📍" /><div><p style={{ fontSize: 14, fontWeight: 600, margin: 0, fontFamily: F, color: T.text }}>34 Moultrie Street</p><p style={{ fontSize: 12, color: T.text2, margin: "2px 0 0", fontFamily: F }}>North Central · Charleston, SC 29403</p></div></div></Card>
    <Card><p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Security</p>{[{ l:"Password",d:"Changed 3 months ago",a:"Change" },{ l:"Two-Factor",d:"Enabled",a:"Manage" }].map((s,i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}><div><p style={{ fontSize: 13, fontWeight: 600, margin: 0, fontFamily: F, color: T.text }}>{s.l}</p><p style={{ fontSize: 11, color: T.text3, margin: "2px 0 0", fontFamily: F }}>{s.d}</p></div><button style={{ padding: "7px 16px", borderRadius: 12, border: "none", background: "rgba(0,0,0,0.04)", fontSize: 12, fontWeight: 600, color: T.text2, cursor: "pointer", fontFamily: F }}>{s.a}</button></div>)}</Card>
    <Card><p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Storage</p>{[{ n:"Google Drive",on:true,e:"📁" },{ n:"Dropbox",on:false,e:"📦" }].map((s,i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}><div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontSize: 16 }}>{s.e}</span><p style={{ fontSize: 13, fontWeight: 500, margin: 0, fontFamily: F, color: T.text }}>{s.n}</p></div><DarkPill text={s.on ? "Connected" : "Connect"} /></div>)}</Card>
  </div>
);

const Vendors = ({ go }) => {
  const [f, setF] = useState("All");
  const vs = [{ n:"GreenPro Landscaping",cat:"Lawn",r:4.9,tr:true,ph:"(843) 555-0123" },{ n:"Charleston Plumbing",cat:"Plumber",r:4.8,tr:true,ph:"(843) 555-0456" },{ n:"CoolAir Charleston",cat:"HVAC",r:4.7,tr:false,ph:"(843) 555-0789" },{ n:"Lowcountry Electric",cat:"Electrician",r:4.6,tr:true,ph:"(843) 555-0321" },{ n:"Palmetto Gutters",cat:"General",r:4.5,tr:false,ph:"(843) 555-0654" }];
  const sh = f === "All" ? vs : vs.filter(v => v.cat === f);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} /><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><Sec sub="Your trusted team">Vendors</Sec><button style={{ background: T.dark, color: "#fff", border: "none", borderRadius: 12, padding: "8px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F, marginTop: 4 }}>+ Add</button></div>
      <Chips items={["All","Plumber","Electrician","HVAC","Lawn","General"]} active={f} onSelect={setF} />
      {sh.map((v,i) => <Card key={i} style={{ padding: 18 }}><div style={{ marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><p style={{ fontSize: 16, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{v.n}</p>{v.tr && <DarkPill text="Trusted" />}</div><p style={{ fontSize: 12, color: T.text2, margin: "4px 0 0", fontFamily: F }}>{v.cat} · ⭐ {v.r} · {v.ph}</p></div><div style={{ display: "flex", gap: 8 }}><button style={{ flex: 1, padding: "11px 0", borderRadius: 14, border: "none", background: "rgba(0,0,0,0.04)", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Call</button><button style={{ flex: 1, padding: "11px 0", borderRadius: 14, border: "none", background: T.dark, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Message</button></div></Card>)}
    </div>
  );
};

const Planner = ({ go }) => {
  const [tasks, setTasks] = useState([
    { n:"Termite inspection",t:"Ideal for this week",done:false,e:"🐛",note:"Crawl space — swarm season" },
    { n:"Clean double porches",t:"Good for weekend",done:false,e:"🧹",note:"Pollen on both levels" },
    { n:"HVAC filter swap",t:"Every 60–90 days",done:true,e:"❄️",note:"Last changed Feb 12" },
    { n:"Inspect asphalt roof",t:"Before hurricane season",done:false,e:"🏠",note:"2-story — hire a pro" },
    { n:"Reseal brick patio",t:"When temps >60°",done:false,e:"🧱",note:"Check moisture" },
    { n:"Smoke detectors",t:"Good to check soon",done:false,e:"🔔",note:"Both stories" },
    { n:"Fire pit gas line",t:"Before entertaining",done:true,e:"🔥",note:"Done Jan 28" },
  ]);
  const dc = tasks.filter(t => t.done).length;
  const fl = i => setTasks(p => p.map((t,j) => j===i ? {...t,done:!t.done} : t));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} /><Sec sub="Gentle guidance for your home">Things to Tend To</Sec>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, color: T.text3, margin: "0 0 4px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Home Vitality</p>
            <p style={{ fontSize: 30, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>{dc}<span style={{ fontSize: 16, fontWeight: 400, color: T.text3 }}>/{tasks.length}</span></p>
          </div>
          <DarkPill text={dc >= tasks.length-1 ? "Thriving" : "Needs Care"} />
        </div>
        <Progress value={(dc/tasks.length)*100} />
      </Card>
      {tasks.map((t,i) => <Card key={i} style={{ padding: 16, opacity: t.done ? 0.45 : 1, transition: "opacity 0.3s" }}><div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><div onClick={() => fl(i)} style={{ width: 24, height: 24, borderRadius: 8, flexShrink: 0, marginTop: 2, border: t.done ? "none" : "2px solid rgba(0,0,0,0.12)", background: t.done ? T.dark : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>{t.done && "✓"}</div><span style={{ fontSize: 18, marginTop: 1 }}>{t.e}</span><div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, margin: 0, fontFamily: F, color: t.done ? T.text3 : T.text, textDecoration: t.done ? "line-through" : "none" }}>{t.n}</p><p style={{ fontSize: 12, color: T.iceMid, margin: "3px 0", fontFamily: F, fontWeight: 600 }}>{t.t}</p><p style={{ fontSize: 11, color: T.text3, margin: 0, fontFamily: F }}>{t.note}</p></div></div></Card>)}
      <button style={{ width: "100%", padding: "14px 0", borderRadius: 16, border: "2px dashed rgba(0,0,0,0.08)", background: "transparent", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}>+ Add Care Suggestion</button>
    </div>
  );
};

const Upgrades = ({ go }) => {
  const [sf, setSf] = useState(false);
  const [ups, setUps] = useState(() => DB.getUpgrades());
  const [nw, setNw] = useState({ t:"",d:"",cat:"Interior",desc:"" });
  const [flt, setFlt] = useState("All");
  const sh = flt === "All" ? ups : ups.filter(u => u.cat === flt);
  const add = () => { if (!nw.t.trim()) return; const updated = [{ id:Date.now(),title:nw.t,date:nw.d||"Mar 2026",cat:nw.cat,desc:nw.desc,impact:[],cost:null,cn:"Add later",before:"",after:"",tags:[nw.cat],e:"🏗️" },...ups]; setUps(updated); DB.setUpgrades(updated); setNw({t:"",d:"",cat:"Interior",desc:""}); setSf(false); };
  const inp = { padding: "13px 18px", borderRadius: 14, border: "none", fontSize: 14, fontFamily: F, outline: "none", background: "rgba(0,0,0,0.03)", color: T.dark, fontWeight: 500 };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} /><Sec sub="Your home's evolution">Upgrades</Sec>
      {/* Ice blue summary like Brice */}
      <div style={{ borderRadius: 22, padding: 22, background: `linear-gradient(160deg, ${T.iceLight}, ${T.ice} 70%, ${T.iceMid})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -20, width: 100, height: 100, borderRadius: 50, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", position: "relative" }}>
          <div><p style={{ fontSize: 34, fontWeight: 800, margin: 0, fontFamily: F, color: T.dark }}>{ups.length}</p><p style={{ fontSize: 10, color: "rgba(26,26,26,0.45)", margin: "4px 0 0", fontFamily: F, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>Logged</p></div>
          <div style={{ width: 1, background: "rgba(26,26,26,0.08)" }} />
          <div><p style={{ fontSize: 34, fontWeight: 800, margin: 0, fontFamily: F, color: T.dark }}>2026</p><p style={{ fontSize: 10, color: "rgba(26,26,26,0.45)", margin: "4px 0 0", fontFamily: F, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>Recent</p></div>
          <div style={{ width: 1, background: "rgba(26,26,26,0.08)" }} />
          <div><p style={{ fontSize: 34, fontWeight: 800, margin: 0, fontFamily: F, color: T.dark }}>—</p><p style={{ fontSize: 10, color: "rgba(26,26,26,0.45)", margin: "4px 0 0", fontFamily: F, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>Invested</p></div>
        </div>
      </div>
      <button onClick={() => setSf(!sf)} style={{ width: "100%", padding: "14px 0", borderRadius: 16, background: sf ? "rgba(0,0,0,0.04)" : T.dark, color: sf ? T.text2 : "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>{sf ? "Cancel" : "+ Log an Upgrade"}</button>
      {sf && <Card style={{ animation: "fadeIn 0.3s ease" }}><p style={{ fontSize: 10, color: T.text3, margin: "0 0 14px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>New Upgrade</p><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><input value={nw.t} onChange={e=>setNw(p=>({...p,t:e.target.value}))} placeholder="What did you do?" style={inp} /><div style={{ display: "flex", gap: 8 }}><input value={nw.d} onChange={e=>setNw(p=>({...p,d:e.target.value}))} placeholder="When?" style={{...inp,flex:1,fontSize:13}} /><select value={nw.cat} onChange={e=>setNw(p=>({...p,cat:e.target.value}))} style={{...inp,flex:1,fontSize:13}}>{["Structural","Interior","Exterior","Systems","Outdoor"].map(c=><option key={c} value={c}>{c}</option>)}</select></div><textarea value={nw.desc} onChange={e=>setNw(p=>({...p,desc:e.target.value}))} placeholder="Describe it..." rows={3} style={{...inp,fontSize:13,resize:"vertical"}} /><button onClick={add} style={{ width: "100%", padding: "14px 0", borderRadius: 14, background: T.dark, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Save Upgrade</button></div></Card>}
      <Chips items={["All","Structural","Interior","Exterior","Systems","Outdoor"]} active={flt} onSelect={setFlt} />
      {sh.map(u => <Card key={u.id} style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${T.border}` }}><div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><Ico emoji={u.e} sz={44} /><div style={{ flex: 1 }}><p style={{ fontSize: 16, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{u.title}</p><div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8 }}><DarkPill text={u.cat} /><span style={{ fontSize: 12, color: T.text3, fontFamily: F }}>{u.date}</span></div></div></div></div>
        <div style={{ padding: "16px 20px 20px" }}>
          {u.desc && <p style={{ fontSize: 13, color: T.text2, margin: "0 0 16px", lineHeight: 1.7, fontFamily: F }}>{u.desc}</p>}
          {(u.before||u.after) && <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>{u.before && <div style={{ flex: 1, padding: "14px", borderRadius: 16, background: T.alertBg }}><p style={{ fontSize: 10, fontWeight: 700, color: T.alert, margin: "0 0 4px", fontFamily: F, textTransform: "uppercase", letterSpacing: 0.8 }}>Before</p><p style={{ fontSize: 12, color: T.text, margin: 0, fontFamily: F }}>{u.before}</p></div>}{u.after && <div style={{ flex: 1, padding: "14px", borderRadius: 16, background: T.goodBg }}><p style={{ fontSize: 10, fontWeight: 700, color: T.good, margin: "0 0 4px", fontFamily: F, textTransform: "uppercase", letterSpacing: 0.8 }}>After</p><p style={{ fontSize: 12, color: T.text, margin: 0, fontFamily: F }}>{u.after}</p></div>}</div>}
          {u.impact.map((imp,j) => <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: j > 0 ? `1px solid ${T.border}` : "none" }}><span style={{ fontSize: 12, color: T.text3, fontFamily: F }}>{imp.l}</span><span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: F }}>{imp.v}</span></div>)}
          <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 14, background: "rgba(0,0,0,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 12, color: T.text3, fontFamily: F }}>Cost</span><span style={{ fontSize: 13, fontWeight: 600, color: u.cost ? T.text : T.iceMid, fontFamily: F, cursor: "pointer" }}>{u.cost ? `$${u.cost.toLocaleString()}` : `+ ${u.cn}`}</span></div>
          {u.tags.length > 0 && <div style={{ display: "flex", gap: 4, marginTop: 12, flexWrap: "wrap" }}>{u.tags.map((tag,j) => <span key={j} style={{ fontSize: 10, padding: "4px 12px", borderRadius: 12, background: "rgba(0,0,0,0.03)", color: T.text3, fontFamily: F, fontWeight: 500 }}>{tag}</span>)}</div>}
        </div>
      </Card>)}
      {sh.length === 0 && <Card style={{ textAlign: "center", padding: 36 }}><span style={{ fontSize: 32 }}>🏗️</span><p style={{ fontSize: 13, color: T.text3, margin: "10px 0 0", fontFamily: F }}>None in this category yet</p></Card>}
    </div>
  );
};

// ═══ MAIN ═══
export default function MyHomeApp() {
  const [screen, setScreen] = useState("dashboard");
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [screen]);
  const go = setScreen;
  const nav = [{e:"🏠",l:"Home",s:"dashboard"},{e:"📋",l:"Property",s:"property"},{e:"🌱",l:"Tend",s:"planner"},{e:"📁",l:"Upload",s:"upload"},{e:"⚙️",l:"More",s:"more"}];
  const more = [{e:"🏗️",l:"Upgrades",s:"upgrades"},{e:"🌤️",l:"Local Happenings",s:"happenings"},{e:"🔔",l:"Notifications",s:"notifications"},{e:"👤",l:"Profile",s:"profile"},{e:"⭐",l:"Vendors",s:"vendors"},{e:"💰",l:"Spending",s:"maintenance"}];
  const sub = ["happenings","notifications","profile","vendors","maintenance","upgrades"];
  const R = () => { switch(screen) {
    case "dashboard": return <Dashboard go={go}/>; case "property": return <Property go={go}/>; case "maintenance": return <Maintenance go={go}/>;
    case "upload": return <Upload go={go}/>; case "happenings": return <Happenings go={go}/>; case "notifications": return <Notifs go={go}/>;
    case "profile": return <Profile go={go}/>; case "vendors": return <Vendors go={go}/>; case "planner": return <Planner go={go}/>;
    case "upgrades": return <Upgrades go={go}/>;
    case "more": return <div style={{ display: "flex", flexDirection: "column", gap: 12 }}><Sec sub="Settings and extras">More</Sec>{more.map((m,i) => <Card key={i} onClick={() => go(m.s)} style={{ cursor: "pointer", padding: 16 }}><div style={{ display: "flex", alignItems: "center", gap: 14 }}><Ico emoji={m.e} /><p style={{ fontSize: 14, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{m.l}</p><div style={{ marginLeft: "auto" }}><Arr /></div></div></Card>)}</div>;
    default: return <Dashboard go={go}/>;
  }};
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 0; }
        input::placeholder, textarea::placeholder { color: ${T.text3}; }
        select { appearance: none; }
        option { background: #fff; }
      `}</style>
      <div style={{ width: "100%", maxWidth: 420, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", background: T.bg, fontFamily: F, position: "relative" }}>
        {/* Header */}
        <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: T.bg, position: "sticky", top: 0, zIndex: 10 }}>
          <p style={{ fontSize: 22, fontWeight: 800, margin: 0, fontFamily: F, color: T.black, letterSpacing: -0.5 }}>MyHome.</p>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div onClick={() => go("notifications")} style={{ cursor: "pointer", width: 38, height: 38, borderRadius: 14, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, position: "relative", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>🔔<div style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: 3, background: T.dark }} /></div>
            <div onClick={() => go("profile")} style={{ cursor: "pointer", width: 38, height: 38, borderRadius: 14, background: T.dark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: F }}>A</div>
          </div>
        </div>
        {/* Content */}
        <div ref={ref} style={{ flex: 1, overflowY: "auto", padding: "4px 16px 100px" }}><div style={{ animation: "fadeIn 0.4s ease" }} key={screen}>{R()}</div></div>
        {/* Bottom Nav */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(238,236,236,0.88)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-around", padding: "6px 8px 24px" }}>
          {nav.map(n => <Nav key={n.s} icon={n.e} label={n.l} active={screen===n.s||(n.s==="more"&&sub.includes(screen))} onClick={() => go(n.s)} />)}
        </div>
      </div>
    </>
  );
}
