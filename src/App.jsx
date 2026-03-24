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
// (Property context is now dynamic — see buildPropertyContext() below)

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
  // Editable property facts — the living brain
  getProperty() {
    return this._get("property", {
      address: "34 Moultrie St", neighborhood: "North Central", city: "Charleston, SC 29403",
      type: "Single Family Traditional", stories: "2", yearBuilt: "1935", yearRenovated: "2012",
      sqft: "1,890", lotSqft: "4,356", bedrooms: "3", bathrooms: "3.5",
      kitchen: "Open floor plan, large island, SS appliances, eat-in, pantry",
      flooring: "Hardwood throughout + ceramic tile in wet areas",
      ceilings: "Smooth, high ceilings (9-10ft est.)",
      fireplaces: "Removed (March 2026, floors patched, ~40 sq ft reclaimed)",
      hvac: "Heat pump + central air", laundry: "Dedicated laundry room",
      exterior: "Wood siding", foundation: "Crawl space",
      roof: "Asphalt shingle (installed 2012, ~14 yrs old)",
      parking: "Off-street", fencing: "Perimeter",
      porches: "Double front porches, upper and lower",
      backyard: "Charleston brick patio, gas fire pit, entertainer's layout",
      utilities: "Charleston Water, Dominion Energy, public sewer",
      purchasePrice: "$1,045,000 (Feb 2025)", propertyTax: "$1,685/yr (2024)",
    });
  },
  setProperty(props) { this._set("property", props); },
  updateProperty(key, value) { const p = this.getProperty(); p[key] = value; this._set("property", p); return p; },
  getCorrections() { return this._get("corrections", []); },
  addCorrection(what, newVal) { const c = this.getCorrections(); c.push({ what, newVal, date: new Date().toISOString() }); this._set("corrections", c); },
  // Care tasks — persistent, editable, with history
  getTasks() {
    return this._get("tasks", [
      { id: 1, n: "Termite inspection", timing: "Ideal for this week", done: false, e: "🐛", note: "Crawl space — swarm season", details: "", lastDone: null, log: [] },
      { id: 2, n: "Clean double porches", timing: "Good for weekend", done: false, e: "🧹", note: "Pollen on both levels", details: "", lastDone: null, log: [] },
      { id: 3, n: "HVAC filter swap", timing: "Every 60–90 days", done: true, e: "❄️", note: "3 filters total", details: "Filter 1: 20×25×1 (main return, 1st floor)\nFilter 2: 16×20×1 (upstairs return)\nFilter 3: 14×20×1 (laundry room)", lastDone: "2026-02-12", log: [{ date: "2026-02-12", action: "Changed all 3 filters" }] },
      { id: 4, n: "Inspect asphalt roof", timing: "Before hurricane season", done: false, e: "🏠", note: "2-story — hire a pro", details: "", lastDone: null, log: [] },
      { id: 5, n: "Reseal brick patio", timing: "When temps >60°", done: false, e: "🧱", note: "Check moisture damage", details: "", lastDone: null, log: [] },
      { id: 6, n: "Smoke detectors", timing: "Good to check soon", done: false, e: "🔔", note: "Both stories", details: "", lastDone: null, log: [] },
      { id: 7, n: "Fire pit gas line", timing: "Before entertaining", done: true, e: "🔥", note: "Annual check", details: "Gas line to backyard fire pit", lastDone: "2026-01-28", log: [{ date: "2026-01-28", action: "Serviced by LowCountry Gas — $95" }] },
    ]);
  },
  setTasks(tasks) { this._set("tasks", tasks); },
  // Active Projects
  getProjects() {
    return this._get("projects", []);
  },
  setProjects(projects) { this._set("projects", projects); },
  // Expenses — replaces hardcoded maintenance tracker
  getExpenses() {
    return this._get("expenses", [
      { id: 1, name: "Gutter Cleaning (2 stories)", vendor: "Palmetto Gutters", date: "2026-01-15", cost: 140, cat: "General", e: "🏠" },
      { id: 2, name: "Fire Pit Gas Line Check", vendor: "LowCountry Gas & Grill", date: "2026-01-28", cost: 95, cat: "Outdoor", e: "🔥" },
      { id: 3, name: "Heat Pump Service", vendor: "CoolAir Charleston", date: "2026-02-12", cost: 175, cat: "HVAC", e: "❄️" },
      { id: 4, name: "Crawl Space Inspection", vendor: "Charleston Foundation Pros", date: "2026-02-20", cost: 150, cat: "General", e: "🔍" },
      { id: 5, name: "Brick Patio Power Wash", vendor: "Lowcountry Clean Co.", date: "2026-03-08", cost: 185, cat: "Outdoor", e: "🧹" },
    ]);
  },
  setExpenses(e) { this._set("expenses", e); },
  addExpense(exp) { const e = this.getExpenses(); e.push({ id: Date.now(), ...exp }); this._set("expenses", e); return e; },
  // Vendors — replaces hardcoded vendor list
  getVendors() {
    return this._get("vendors", [
      { id: 1, n: "GreenPro Landscaping", cat: "Lawn", r: 4.9, tr: true, ph: "(843) 555-0123", note: "" },
      { id: 2, n: "Charleston Plumbing Co.", cat: "Plumber", r: 4.8, tr: true, ph: "(843) 555-0456", note: "" },
      { id: 3, n: "CoolAir Charleston", cat: "HVAC", r: 4.7, tr: false, ph: "(843) 555-0789", note: "" },
      { id: 4, n: "Lowcountry Electric", cat: "Electrician", r: 4.6, tr: true, ph: "(843) 555-0321", note: "" },
      { id: 5, n: "Palmetto Gutters", cat: "General", r: 4.5, tr: false, ph: "(843) 555-0654", note: "" },
    ]);
  },
  setVendors(v) { this._set("vendors", v); },
  // Clear all data
  clearAll() { ["knowledge", "chats", "uploads", "upgrades", "property", "corrections", "tasks", "projects", "expenses", "vendors"].forEach(k => localStorage.removeItem(`myhome_${k}`)); },
};

// Initialize runtime knowledge from storage on load
uploadedFilesKnowledge = DB.getKnowledge().map(i => i.text);

// Build dynamic property context from live storage
function buildPropertyContext() {
  const p = DB.getProperty();
  const corrections = DB.getCorrections();
  const corr = corrections.length > 0 ? "\n\nHOMEOWNER CORRECTIONS (these override any conflicting info above):\n" + corrections.map(c => `- ${c.what}: ${c.newVal} (updated ${new Date(c.date).toLocaleDateString()})`).join("\n") : "";

  return `You are the AI brain of MyHome — a deeply intelligent home companion for Adrian's property.

You are THREE experts in one:
1. INTERIOR DESIGNER — Expert eye for spatial design, light optimization, curtain sizing, furniture scale, color theory.
2. GENERAL CONTRACTOR — Plumbing, electrical, HVAC, outdoor water lines, structural, code-aware.
3. CHARLESTON HOME SPECIALIST — Lowcountry architecture, humidity/heat/hurricanes, termites, historic home care.

LIVE PROPERTY FACTS (these are the current truth — homeowner may update these at any time):
- Address: ${p.address}, ${p.neighborhood}, ${p.city}
- Type: ${p.type}, ${p.stories} stories
- Built: ${p.yearBuilt}, renovated: ${p.yearRenovated}
- Size: ${p.sqft} sq ft livable, ${p.lotSqft} sq ft lot
- Bedrooms: ${p.bedrooms}
- Bathrooms: ${p.bathrooms}
- Kitchen: ${p.kitchen}
- Flooring: ${p.flooring}
- Ceilings: ${p.ceilings}
- Fireplaces: ${p.fireplaces}
- HVAC: ${p.hvac}
- Laundry: ${p.laundry}
- Exterior: ${p.exterior}
- Foundation: ${p.foundation}
- Roof: ${p.roof}
- Parking: ${p.parking}
- Fencing: ${p.fencing}
- Porches: ${p.porches}
- Backyard: ${p.backyard}
- Utilities: ${p.utilities}
- Purchase: ${p.purchasePrice}
- Property Tax: ${p.propertyTax}
${corr}

INTERIOR DESIGN INTELLIGENCE:
- WINDOW TREATMENTS: Calculate sizes from window dims + ceiling height. Hang curtains 4-6" above frame or at ceiling. Rod width 8-12" beyond frame each side.
- LIGHT: South = bright, north = soft. Charleston gets intense west afternoon sun. Use mirrors, light surfaces strategically.
- SCALE: High ceilings need proportionate furniture. Art at 57-60" center. Rug sizing: front legs on rug minimum.
- COLOR: Charleston's bright humid light affects how colors read. Recommend moisture-resistant options.
- OUTDOOR: Porches and patio are living extensions. Advise on fans, lighting, furniture, planters.

MECHANICAL INTELLIGENCE:
- PLUMBING: Supply/drain lines, outdoor hose bibs, shower connections, freeze protection, crawl space moisture.
- ELECTRICAL: Circuits, GFCI for wet/outdoor areas, porch fan installation.
- HVAC: Heat pump + central air for ${p.sqft} sq ft, 2 stories. Filters every 60-90 days.
- STRUCTURAL: 1935 build + 2012 reno = modern framing in historic bones. Crawl space needs annual moisture checks.

CRITICAL BEHAVIOR — UPDATING PROPERTY FACTS:
When the homeowner tells you something that CORRECTS or UPDATES a property fact (like "I actually have 3.5 baths" or "we replaced the roof last month" or "the kitchen has quartz countertops now"), you MUST:
1. Acknowledge the correction naturally
2. Include this EXACT tag at the END of your response (the app parses this to update stored facts):

[UPDATE: field_name = new_value]

Examples:
- User says "I have 3.5 baths not 4" → include [UPDATE: bathrooms = 3.5]
- User says "we just got a new roof" → include [UPDATE: roof = New asphalt shingle (installed 2026)]
- User says "we painted the exterior gray" → include [UPDATE: exterior = Gray painted wood siding]
- User says "the ceilings are actually 10 feet" → include [UPDATE: ceilings = Smooth, 10ft ceilings throughout]

You can include MULTIPLE [UPDATE] tags if the user shares multiple facts. Always use the field names from the property facts above. If the correction doesn't map to an existing field, use a descriptive field name.

YOUR COMMUNICATION STYLE:
- Warm, direct, no fluff — like a knowledgeable friend who's also a designer and contractor
- Give specific measurements, materials, product recommendations when possible
- When you need more info, ask for a specific photo
- Factor in Charleston climate: humidity, heat, salt air, hurricanes, termites, pollen
- Use **bold** for key numbers and recommendations
- Keep responses concise for mobile — 3-4 paragraphs max
- Reference specific things from uploaded photos — don't be generic
- Common sense over textbook answers`;
}

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

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: buildPropertyContext() + "\n\nIMPORTANT: Keep responses concise and scannable for a mobile app. Use **bold** for key numbers/facts. No more than 3-4 short paragraphs. If listing items, keep each under 10 words.",
        messages,
      })
    });

    const data = await response.json();
    let text = data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "I couldn't process that. Try rephrasing your question.";

    // Parse and apply any [UPDATE] tags from the AI response
    const updatePattern = /\[UPDATE:\s*(\w+)\s*=\s*(.+?)\]/g;
    let match;
    const updates = [];
    while ((match = updatePattern.exec(text)) !== null) {
      const field = match[1].trim();
      const value = match[2].trim();
      DB.updateProperty(field, value);
      DB.addCorrection(field, value);
      updates.push({ field, value });
    }
    // Remove the [UPDATE] tags from the visible response
    text = text.replace(/\[UPDATE:\s*\w+\s*=\s*.+?\]/g, "").trim();
    // If updates happened, append a subtle confirmation
    if (updates.length > 0) {
      text += "\n\n✅ *Updated " + updates.map(u => u.field).join(", ") + " in your home profile.*";
    }

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
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: buildPropertyContext() + `\n\nYou are performing a DEEP SCAN of an image uploaded by the homeowner for 34 Moultrie St. This analysis becomes permanent knowledge about the home — be exhaustive and precise.

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

// ═══ LIVE WEATHER — Open-Meteo API (free, no key) ═══
// Charleston, SC coordinates: 32.7876, -79.9403
const WMO_CODES = { 0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌧️", 61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "🌨️", 73: "🌨️", 75: "🌨️", 80: "🌦️", 81: "🌧️", 82: "🌧️", 95: "⛈️", 96: "⛈️", 99: "⛈️" };
const WMO_LABELS = { 0: "Clear sky", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Foggy", 48: "Fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snow", 75: "Heavy snow", 80: "Light showers", 81: "Showers", 82: "Heavy showers", 95: "Thunderstorm", 96: "Thunderstorm w/ hail", 99: "Severe thunderstorm" };
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function useWeather() {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    // Check cache first (refresh every 30 min)
    const cached = localStorage.getItem("myhome_weather");
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < 30 * 60 * 1000) { setWeather(data); return; }
    }
    fetch("https://api.open-meteo.com/v1/forecast?latitude=32.7876&longitude=-79.9403&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=7")
      .then(r => r.json())
      .then(data => {
        const w = {
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          emoji: WMO_CODES[data.current.weather_code] || "🌤️",
          label: WMO_LABELS[data.current.weather_code] || "Clear",
          daily: data.daily.time.map((t, i) => ({
            day: DAYS[new Date(t + "T12:00:00").getDay()],
            hi: Math.round(data.daily.temperature_2m_max[i]),
            lo: Math.round(data.daily.temperature_2m_min[i]),
            emoji: WMO_CODES[data.daily.weather_code[i]] || "🌤️",
          })),
        };
        setWeather(w);
        localStorage.setItem("myhome_weather", JSON.stringify({ data: w, ts: Date.now() }));
      })
      .catch(() => {
        // Fallback if API fails
        setWeather({ temp: "--", emoji: "🌤️", label: "Unavailable", daily: [] });
      });
  }, []);
  return weather;
}

// ═══ SCREENS ═══

const Dashboard = ({ go }) => {
  const [q, setQ] = useState(""); const [res, setRes] = useState(null); const [ld, setLd] = useState(false);
  const [history, setHistory] = useState(() => DB.getChats());
  const wx = useWeather();
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

      {/* Weather — live from Open-Meteo */}
      <Card onClick={() => go("happenings")} style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Ico emoji={wx ? wx.emoji : "🌤️"} sz={44} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 18, fontWeight: 700, margin: 0, color: T.black, fontFamily: F }}>{wx ? `${wx.temp}°F` : "Loading..."}</p>
            <p style={{ fontSize: 12, color: T.text2, margin: "2px 0 0", fontFamily: F }}>{wx ? `${wx.label}${wx.daily.length > 0 ? ` · High ${wx.daily[0].hi}°` : ""}${wx.daily.length > 4 ? ` · ${wx.daily[4].hi}° by ${wx.daily[4].day}` : ""}` : "Fetching weather..."}</p>
          </div>
          <Arr />
        </div>
      </Card>

      {/* Stats — Brice-style data cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card onClick={() => go("property")}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 6px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Property</p>
          <p style={{ fontSize: 32, fontWeight: 800, margin: "0 0 4px", fontFamily: F, color: T.black, letterSpacing: -1 }}>{DB.getProperty().sqft}</p>
          <p style={{ fontSize: 11, color: T.text2, margin: 0, fontFamily: F }}>sq ft · {DB.getProperty().bedrooms} bed · {DB.getProperty().bathrooms} bath</p>
        </Card>
        <Card onClick={() => go("maintenance")}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 6px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>This Year</p>
          <p style={{ fontSize: 32, fontWeight: 800, margin: "0 0 4px", fontFamily: F, color: T.black, letterSpacing: -1 }}>${DB.getExpenses().reduce((s, e) => s + e.cost, 0).toLocaleString()}</p>
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
        <p style={{ fontSize: 12, color: T.text2, margin: "12px 0 0", fontFamily: F }}>{DB.getTasks().filter(t => !t.done).length} things to tend to</p>
      </Card>

      {/* Active Projects */}
      {DB.getProjects().filter(p => p.status !== "Complete").length > 0 && (
        <Card onClick={() => go("projects")}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Ico emoji="🔨" sz={44} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>Active Projects</p>
              {DB.getProjects().filter(p => p.status !== "Complete").slice(0, 1).map(p => (
                <div key={p.id}>
                  <p style={{ fontSize: 12, color: T.text2, margin: "3px 0 0", fontFamily: F }}>{p.title}</p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${p.budget > 0 ? Math.min((p.spent / p.budget) * 100, 100) : 0}%`, borderRadius: 2, background: T.dark }} />
                    </div>
                    <span style={{ fontSize: 11, color: T.text3, fontFamily: F, fontWeight: 500 }}>${p.spent.toLocaleString()} / ${p.budget.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <Arr />
          </div>
        </Card>
      )}

      {/* Home Story */}
      <Card onClick={() => go("upgrades")}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Ico emoji="🏗️" sz={44} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>Home Story</p>
            <p style={{ fontSize: 12, color: T.text2, margin: "3px 0 0", fontFamily: F }}>{DB.getUpgrades().length} upgrade{DB.getUpgrades().length !== 1 ? "s" : ""} logged{DB.getUpgrades().length > 0 ? ` · Latest: ${DB.getUpgrades()[0].title.substring(0, 30)}` : ""}</p>
          </div>
          <Arr />
        </div>
      </Card>

      {/* Recent Uploads — dynamic from DB */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: 0, fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Recent Uploads</p>
          <button onClick={() => go("upload")} style={{ background: T.dark, border: "none", borderRadius: 12, padding: "7px 16px", fontSize: 11, color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: F }}>+ Add</button>
        </div>
        {DB.getUploads().length > 0 ? (
          DB.getUploads().slice(-3).reverse().map((f, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}><Ico emoji="📄" sz={36} /><div style={{ flex: 1 }}><p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: T.text, fontFamily: F }}>{f.name}</p><p style={{ fontSize: 11, color: T.text3, margin: "2px 0 0", fontFamily: F }}>{new Date(f.date).toLocaleDateString()} · Scanned</p></div></div>)
        ) : (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <p style={{ fontSize: 13, color: T.text3, margin: 0, fontFamily: F }}>No uploads yet — add photos and docs to teach your home brain</p>
          </div>
        )}
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
        <p style={{ fontSize: 22, fontWeight: 800, color: T.dark, margin: 0, fontFamily: F }}>{DB.getProperty().address}</p>
        <p style={{ fontSize: 12, color: "rgba(26,26,26,0.5)", margin: "6px 0 0", fontFamily: F, fontWeight: 500 }}>{DB.getProperty().neighborhood} · {DB.getProperty().city}</p>
        <p style={{ fontSize: 11, color: "rgba(26,26,26,0.35)", margin: "2px 0 0", fontFamily: F }}>Built {DB.getProperty().yearBuilt} · Renovated {DB.getProperty().yearRenovated} · {DB.getProperty().type}</p>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
      {[{ l: "Sq Ft", v: DB.getProperty().sqft }, { l: "Beds", v: DB.getProperty().bedrooms }, { l: "Baths", v: DB.getProperty().bathrooms }, { l: "Lot", v: DB.getProperty().lotSqft + "ft²" }, { l: "Stories", v: DB.getProperty().stories }, { l: "Parking", v: DB.getProperty().parking }].map((s, i) => <Card key={i} style={{ padding: 14, textAlign: "center" }}><p style={{ fontSize: 20, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>{s.v}</p><p style={{ fontSize: 10, color: T.text3, margin: "4px 0 0", fontFamily: F, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.l}</p></Card>)}
    </div>
    <Sec>Interior</Sec>
    <Card style={{ padding: 18 }}>{[{ l: "Flooring", v: DB.getProperty().flooring }, { l: "Ceilings", v: DB.getProperty().ceilings }, { l: "Kitchen", v: DB.getProperty().kitchen }, { l: "Fireplaces", v: DB.getProperty().fireplaces }, { l: "Heating", v: DB.getProperty().hvac }, { l: "Cooling", v: "Central Air" }].map((f, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}><span style={{ fontSize: 12, color: T.text3, fontFamily: F }}>{f.l}</span><span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: F, textAlign: "right", maxWidth: "55%" }}>{f.v}</span></div>)}</Card>
    <Sec>Bedrooms</Sec>
    {[{ n: "Primary Suite", d: "En-suite · Dual vanities · Walk-in shower · Porch access" }, { n: "Bedroom 2", d: "En-suite bathroom" }, { n: "Bedroom 3", d: "En-suite bathroom" }, { n: "Half Bath", d: "First floor powder room" }].map((r, i) => <Card key={i} style={{ padding: 16 }}><p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{r.n}</p><p style={{ fontSize: 12, color: T.text2, margin: "4px 0 0", fontFamily: F }}>{r.d}</p></Card>)}
    <Sec>Outdoor</Sec>
    <Card style={{ padding: 16 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>Porches</p><DarkPill text="Signature" /></div><p style={{ fontSize: 12, color: T.text2, margin: "4px 0 0", fontFamily: F }}>{DB.getProperty().porches}</p></Card>
    <Card style={{ padding: 16 }}><p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px", fontFamily: F, color: T.black }}>Backyard</p><p style={{ fontSize: 12, color: T.text2, margin: 0, fontFamily: F }}>{DB.getProperty().backyard}</p></Card>
  </div>
);

const Maintenance = ({ go }) => {
  const [expenses, setExpenses] = useState(() => DB.getExpenses());
  const [showAdd, setShowAdd] = useState(false);
  const [nw, setNw] = useState({ name: "", vendor: "", cost: "", cat: "General", e: "🔧" });
  const save = (updated) => { setExpenses(updated); DB.setExpenses(updated); };
  const inp = { padding: "12px 16px", borderRadius: 14, border: "none", fontSize: 14, fontFamily: F, outline: "none", background: "rgba(0,0,0,0.03)", color: T.dark, fontWeight: 500, width: "100%" };
  const total = expenses.reduce((s, e) => s + e.cost, 0);
  const cats = {};
  expenses.forEach(e => { cats[e.cat] = (cats[e.cat] || 0) + e.cost; });
  const catList = Object.entries(cats).sort((a, b) => b[1] - a[1]);
  const catEmoji = { General: "🏠", HVAC: "❄️", Outdoor: "🌿", Plumbing: "🔧", Electrical: "⚡", Lawn: "🌿", Roofing: "🏠" };
  // Monthly totals for bar chart
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const monthly = Array(12).fill(0);
  expenses.forEach(e => { const m = new Date(e.date).getMonth(); if (!isNaN(m)) monthly[m] += e.cost; });
  const maxMonth = Math.max(...monthly, 1);
  const thisMonth = new Date().getMonth();

  const addExpense = () => {
    if (!nw.name.trim() || !nw.cost) return;
    const updated = [...expenses, { id: Date.now(), name: nw.name, vendor: nw.vendor, date: new Date().toISOString().split("T")[0], cost: Number(nw.cost), cat: nw.cat, e: nw.e }];
    save(updated);
    setNw({ name: "", vendor: "", cost: "", cat: "General", e: "🔧" });
    setShowAdd(false);
  };

  const deleteExpense = (id) => save(expenses.filter(e => e.id !== id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} /><Sec sub="Track spending and services">Spending Tracker</Sec>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: 10, color: T.text3, margin: "0 0 6px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>{new Date().getFullYear()} Total</p>
            <p style={{ fontSize: 42, fontWeight: 800, margin: 0, fontFamily: F, color: T.black, letterSpacing: -1.5 }}>${total.toLocaleString()}</p>
          </div>
          <button onClick={() => setShowAdd(!showAdd)} style={{ background: T.dark, color: "#fff", border: "none", borderRadius: 12, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F }}>{showAdd ? "Cancel" : "+ Add"}</button>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 20, alignItems: "flex-end", height: 90 }}>
          {monthly.slice(0, 12).map((v, i) => <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%", borderRadius: 10, height: v ? `${(v / maxMonth) * 85}px` : 4, background: i === thisMonth ? T.dark : v ? `linear-gradient(180deg, ${T.iceLight}, ${T.ice}90)` : "rgba(0,0,0,0.04)", transition: "height 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
            <p style={{ fontSize: 9, color: i === thisMonth ? T.black : T.text3, margin: "6px 0 0", fontFamily: F, fontWeight: i === thisMonth ? 700 : 400 }}>{months[i]}</p>
          </div>)}
        </div>
      </Card>

      {/* Add expense form */}
      {showAdd && (
        <Card>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>New Expense</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input value={nw.name} onChange={e => setNw(p => ({ ...p, name: e.target.value }))} placeholder="What was it? (e.g. HVAC filter change)" style={inp} />
            <div style={{ display: "flex", gap: 8 }}>
              <input value={nw.cost} onChange={e => setNw(p => ({ ...p, cost: e.target.value }))} placeholder="Cost ($)" type="number" style={{ ...inp, flex: 1, fontSize: 13 }} />
              <select value={nw.cat} onChange={e => setNw(p => ({ ...p, cat: e.target.value }))} style={{ ...inp, flex: 1, fontSize: 13, appearance: "none" }}>
                {["General", "HVAC", "Plumbing", "Electrical", "Outdoor", "Lawn", "Roofing"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <input value={nw.vendor} onChange={e => setNw(p => ({ ...p, vendor: e.target.value }))} placeholder="Vendor (optional)" style={{ ...inp, fontSize: 13 }} />
            <button onClick={addExpense} style={{ width: "100%", padding: "13px 0", borderRadius: 14, border: "none", background: T.dark, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Add Expense</button>
          </div>
        </Card>
      )}

      {/* Category breakdown */}
      {catList.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {catList.map(([cat, amt], i) => <Card key={i} style={{ padding: 16 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontSize: 18 }}>{catEmoji[cat] || "🔧"}</span><span style={{ fontSize: 11, color: T.text3, fontFamily: F }}>{total > 0 ? Math.round((amt / total) * 100) : 0}%</span></div><p style={{ fontSize: 20, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>${amt.toLocaleString()}</p><p style={{ fontSize: 11, color: T.text2, margin: "4px 0 0", fontFamily: F }}>{cat}</p></Card>)}
        </div>
      )}

      {/* Expense list */}
      <Sec>All Expenses</Sec>
      {expenses.slice().reverse().map((s) => <Card key={s.id} style={{ padding: 16 }}><div style={{ display: "flex", gap: 12, alignItems: "center" }}><Ico emoji={s.e || "🔧"} /><div style={{ flex: 1 }}><p style={{ fontSize: 13, fontWeight: 600, margin: 0, fontFamily: F, color: T.text }}>{s.name}</p><p style={{ fontSize: 11, color: T.text3, margin: "3px 0 0", fontFamily: F }}>{s.vendor ? `${s.vendor} · ` : ""}{s.date} · {s.cat}</p></div><div style={{ textAlign: "right" }}><p style={{ fontSize: 16, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>${s.cost}</p><button onClick={() => deleteExpense(s.id)} style={{ background: "none", border: "none", color: T.text3, fontSize: 11, cursor: "pointer", fontFamily: F, padding: "4px 0 0" }}>remove</button></div></div></Card>)}
      {expenses.length === 0 && <Card style={{ textAlign: "center", padding: 30 }}><p style={{ fontSize: 13, color: T.text3, fontFamily: F }}>No expenses yet — tap + Add to start tracking</p></Card>}
    </div>
  );
};

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

const Happenings = ({ go }) => {
  const wx = useWeather();
  return (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Bk onClick={() => go("dashboard")} /><Sec sub="North Central · Charleston, SC 29403">Local Happenings</Sec>
    <Card style={{ background: `linear-gradient(160deg, ${T.iceLight}80, ${T.surface})` }}>
      <p style={{ fontSize: 10, color: T.text3, margin: "0 0 14px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>7-Day Forecast</p>
      {wx && wx.daily.length > 0 ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>{wx.daily.slice(0, 7).map((w, i) => <div key={i} style={{ textAlign: "center", flex: 1 }}><p style={{ fontSize: 11, color: i === 0 ? T.black : T.text3, margin: 0, fontFamily: F, fontWeight: i === 0 ? 700 : 400 }}>{w.day}</p><span style={{ fontSize: 22, display: "block", margin: "4px 0" }}>{w.emoji}</span><p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: T.black, fontFamily: F }}>{w.hi}°</p><p style={{ fontSize: 10, color: T.text3, margin: "2px 0 0", fontFamily: F }}>{w.lo}°</p></div>)}</div>
      ) : <p style={{ fontSize: 13, color: T.text3, margin: 0, fontFamily: F }}>Loading forecast...</p>}
    </Card>
    <Sec>Property Impact</Sec>
    {[{ e: "🥶", t: "Cool Night — 36°F", d: "Cover tender spring plantings.", imp: "Low", c: T.info, bg: T.infoBg }, { e: "🌿", t: "Pollen Season", d: "Hose down porches, swap HVAC filters.", imp: "Medium", c: T.warn, bg: T.warnBg }, { e: "🐛", t: "Termite Swarm", d: "Crawl space home — schedule inspection.", imp: "High", c: T.alert, bg: T.alertBg }, { e: "🌊", t: "Hurricane Prep", d: "Inspect roof, clean gutters, check siding.", imp: "Plan Ahead", c: T.info, bg: T.infoBg }].map((it, i) => <Card key={i} style={{ padding: 16 }}><div style={{ display: "flex", gap: 12 }}><Ico emoji={it.e} /><div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 4 }}><p style={{ fontSize: 14, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{it.t}</p><LightPill text={it.imp} color={it.c} /></div><p style={{ fontSize: 12, color: T.text2, margin: 0, lineHeight: 1.5, fontFamily: F }}>{it.d}</p></div></div></Card>)}
    <Sec>Seasonal</Sec>
    {[{ e: "🌳", t: "Hampton Park Bloom", dt: "Now–April", d: "Right around the corner." }, { e: "🌸", t: "Home & Garden Show", dt: "Mar 22–23", d: "Patio furniture and landscaping." }, { e: "🚛", t: "Bulk Waste Pickup", dt: "Mar 25", d: "North Central. Out by 6am." }].map((h, i) => <Card key={i} style={{ padding: 16 }}><div style={{ display: "flex", gap: 12, alignItems: "center" }}><Ico emoji={h.e} /><div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{h.t}</p><p style={{ fontSize: 11, color: T.iceMid, margin: "3px 0", fontFamily: F, fontWeight: 600 }}>{h.dt}</p><p style={{ fontSize: 12, color: T.text2, margin: 0, fontFamily: F }}>{h.d}</p></div></div></Card>)}
  </div>
  );
};

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
  const [vendors, setVendors] = useState(() => DB.getVendors());
  const [f, setF] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [nw, setNw] = useState({ n: "", cat: "General", ph: "", note: "" });
  const save = (updated) => { setVendors(updated); DB.setVendors(updated); };
  const inp = { padding: "12px 16px", borderRadius: 14, border: "none", fontSize: 14, fontFamily: F, outline: "none", background: "rgba(0,0,0,0.03)", color: T.dark, fontWeight: 500, width: "100%" };
  const sh = f === "All" ? vendors : vendors.filter(v => v.cat === f);
  const allCats = ["All", ...new Set(vendors.map(v => v.cat))];
  const addVendor = () => {
    if (!nw.n.trim()) return;
    save([...vendors, { id: Date.now(), n: nw.n, cat: nw.cat, r: 0, tr: false, ph: nw.ph, note: nw.note }]);
    setNw({ n: "", cat: "General", ph: "", note: "" }); setShowAdd(false);
  };
  const toggleTrust = (id) => save(vendors.map(v => v.id === id ? { ...v, tr: !v.tr } : v));
  const deleteVendor = (id) => save(vendors.filter(v => v.id !== id));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} /><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><Sec sub="Your trusted team">Vendors</Sec><button onClick={() => setShowAdd(!showAdd)} style={{ background: T.dark, color: "#fff", border: "none", borderRadius: 12, padding: "8px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F, marginTop: 4 }}>{showAdd ? "Cancel" : "+ Add"}</button></div>
      {showAdd && <Card><p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>New Vendor</p><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><input value={nw.n} onChange={e => setNw(p => ({ ...p, n: e.target.value }))} placeholder="Vendor name" style={inp} /><div style={{ display: "flex", gap: 8 }}><input value={nw.ph} onChange={e => setNw(p => ({ ...p, ph: e.target.value }))} placeholder="Phone" style={{ ...inp, flex: 1, fontSize: 13 }} /><select value={nw.cat} onChange={e => setNw(p => ({ ...p, cat: e.target.value }))} style={{ ...inp, flex: 1, fontSize: 13, appearance: "none" }}>{["General","Plumber","Electrician","HVAC","Lawn","Roofing","Painting"].map(c => <option key={c} value={c}>{c}</option>)}</select></div><input value={nw.note} onChange={e => setNw(p => ({ ...p, note: e.target.value }))} placeholder="Notes (optional)" style={{ ...inp, fontSize: 13 }} /><button onClick={addVendor} style={{ width: "100%", padding: "13px 0", borderRadius: 14, border: "none", background: T.dark, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Add Vendor</button></div></Card>}
      <Chips items={allCats} active={f} onSelect={setF} />
      {sh.map((v) => <Card key={v.id} style={{ padding: 18 }}><div style={{ marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><p style={{ fontSize: 16, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{v.n}</p>{v.tr && <DarkPill text="Trusted" />}</div><p style={{ fontSize: 12, color: T.text2, margin: "4px 0 0", fontFamily: F }}>{v.cat}{v.ph ? ` · ${v.ph}` : ""}</p>{v.note && <p style={{ fontSize: 11, color: T.text3, margin: "4px 0 0", fontFamily: F, fontStyle: "italic" }}>{v.note}</p>}</div><div style={{ display: "flex", gap: 8 }}><button onClick={() => toggleTrust(v.id)} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "none", background: "rgba(0,0,0,0.04)", color: T.text2, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F }}>{v.tr ? "Remove Trust" : "Mark Trusted"}</button>{v.ph && <a href={`tel:${v.ph}`} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "none", background: T.dark, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F, textAlign: "center", textDecoration: "none", display: "block" }}>Call</a>}<button onClick={() => deleteVendor(v.id)} style={{ padding: "10px 14px", borderRadius: 12, border: "none", background: T.alertBg, color: T.alert, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F }}>✕</button></div></Card>)}
      {vendors.length === 0 && <Card style={{ textAlign: "center", padding: 30 }}><p style={{ fontSize: 13, color: T.text3, fontFamily: F }}>No vendors yet — tap + Add</p></Card>}
    </div>
  );
};

const Planner = ({ go }) => {
  const [tasks, setTasks] = useState(() => DB.getTasks());
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null); // task id being viewed/edited
  const [logText, setLogText] = useState("");
  const [nw, setNw] = useState({ n: "", timing: "", e: "🔧", note: "", details: "" });
  const save = (updated) => { setTasks(updated); DB.setTasks(updated); };

  const dc = tasks.filter(t => t.done).length;
  const inp = { padding: "12px 16px", borderRadius: 14, border: "none", fontSize: 14, fontFamily: F, outline: "none", background: "rgba(0,0,0,0.03)", color: T.dark, fontWeight: 500, width: "100%" };

  const toggleDone = (id) => {
    const updated = tasks.map(t => {
      if (t.id !== id) return t;
      const nowDone = !t.done;
      const newLog = nowDone ? [...(t.log || []), { date: new Date().toISOString().split("T")[0], action: "Marked complete" }] : t.log;
      return { ...t, done: nowDone, lastDone: nowDone ? new Date().toISOString().split("T")[0] : t.lastDone, log: newLog };
    });
    save(updated);
  };

  const addTask = () => {
    if (!nw.n.trim()) return;
    const updated = [...tasks, { id: Date.now(), n: nw.n, timing: nw.timing || "No schedule set", done: false, e: nw.e, note: nw.note, details: nw.details, lastDone: null, log: [] }];
    save(updated);
    setNw({ n: "", timing: "", e: "🔧", note: "", details: "" });
    setShowAdd(false);
  };

  const addLog = (id) => {
    if (!logText.trim()) return;
    const updated = tasks.map(t => t.id === id ? { ...t, log: [...(t.log || []), { date: new Date().toISOString().split("T")[0], action: logText }] } : t);
    save(updated);
    setLogText("");
  };

  const updateTask = (id, field, value) => {
    const updated = tasks.map(t => t.id === id ? { ...t, [field]: value } : t);
    save(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    save(updated);
    setEditing(null);
  };

  const editTask = tasks.find(t => t.id === editing);

  // Detail view for a single task
  if (editTask) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Bk onClick={() => setEditing(null)} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}>{editTask.e}</span>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{editTask.n}</h2>
            <p style={{ fontSize: 13, color: T.iceMid, margin: "3px 0 0", fontFamily: F, fontWeight: 600 }}>{editTask.timing}</p>
          </div>
        </div>

        {/* Status */}
        <Card style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 10, color: T.text3, margin: "0 0 4px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Status</p>
              <p style={{ fontSize: 16, fontWeight: 700, margin: 0, fontFamily: F, color: editTask.done ? T.good : T.text }}>{editTask.done ? "Complete" : "Needs Attention"}</p>
            </div>
            <div onClick={() => { toggleDone(editTask.id); setEditing(null); setTimeout(() => setEditing(editTask.id), 50); }} style={{ cursor: "pointer" }}>
              <DarkPill text={editTask.done ? "Mark Incomplete" : "Mark Done"} />
            </div>
          </div>
          {editTask.lastDone && <p style={{ fontSize: 12, color: T.text2, margin: "8px 0 0", fontFamily: F }}>Last completed: {editTask.lastDone}</p>}
        </Card>

        {/* Notes */}
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Quick Note</p>
          <input value={editTask.note} onChange={e => updateTask(editTask.id, "note", e.target.value)} style={{ ...inp, fontSize: 13 }} placeholder="Short note..." />
        </Card>

        {/* Details — the rich info field */}
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Details & Specs</p>
          <textarea value={editTask.details} onChange={e => updateTask(editTask.id, "details", e.target.value)} rows={4} placeholder="Add details here...&#10;&#10;Example for air filters:&#10;Filter 1: 20×25×1 (main return)&#10;Filter 2: 16×20×1 (upstairs)&#10;Last changed: March 2026" style={{ ...inp, fontSize: 13, resize: "vertical" }} />
          <p style={{ fontSize: 11, color: T.text3, margin: "8px 0 0", fontFamily: F }}>Add sizes, quantities, brands, locations — anything you want to remember.</p>
        </Card>

        {/* Schedule */}
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Schedule / Reminder</p>
          <input value={editTask.timing} onChange={e => updateTask(editTask.id, "timing", e.target.value)} style={{ ...inp, fontSize: 13 }} placeholder="e.g. Every 90 days, Before summer, Monthly..." />
        </Card>

        {/* Activity Log */}
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Activity Log</p>
          {(editTask.log || []).length > 0 ? (
            <div style={{ marginBottom: 14 }}>
              {editTask.log.slice().reverse().map((l, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: T.iceMid, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, margin: 0, fontFamily: F, color: T.text }}>{l.action}</p>
                    <p style={{ fontSize: 11, color: T.text3, margin: "2px 0 0", fontFamily: F }}>{l.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : <p style={{ fontSize: 13, color: T.text3, margin: "0 0 14px", fontFamily: F }}>No activity logged yet.</p>}
          <div style={{ display: "flex", gap: 8 }}>
            <input value={logText} onChange={e => setLogText(e.target.value)} onKeyDown={e => e.key === "Enter" && addLog(editTask.id)} placeholder="Log an action... (e.g. Changed all 3 filters)" style={{ ...inp, flex: 1, fontSize: 13 }} />
            <button onClick={() => addLog(editTask.id)} style={{ background: T.dark, color: "#fff", border: "none", borderRadius: 14, padding: "12px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F, flexShrink: 0 }}>Log</button>
          </div>
        </Card>

        {/* Emoji picker */}
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Icon</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["🔧", "❄️", "🌿", "🏠", "🔥", "🧹", "🐛", "🧱", "🔔", "💧", "⚡", "🪟", "🚿", "🎨", "🛠️", "📐"].map(em => (
              <button key={em} onClick={() => updateTask(editTask.id, "e", em)} style={{ width: 40, height: 40, borderRadius: 12, border: editTask.e === em ? `2px solid ${T.dark}` : "1px solid rgba(0,0,0,0.06)", background: editTask.e === em ? "rgba(0,0,0,0.04)" : "transparent", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{em}</button>
            ))}
          </div>
        </Card>

        {/* Delete */}
        <button onClick={() => deleteTask(editTask.id)} style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: T.alertBg, color: T.alert, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Delete This Item</button>
      </div>
    );
  }

  // Main task list view
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} /><Sec sub="Gentle guidance for your home">Things to Tend To</Sec>

      {/* Vitality */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, color: T.text3, margin: "0 0 4px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Home Vitality</p>
            <p style={{ fontSize: 30, fontWeight: 800, margin: 0, fontFamily: F, color: T.black }}>{dc}<span style={{ fontSize: 16, fontWeight: 400, color: T.text3 }}>/{tasks.length}</span></p>
          </div>
          <DarkPill text={tasks.length === 0 ? "Add Items" : dc >= tasks.length - 1 ? "Thriving" : "Needs Care"} />
        </div>
        <Progress value={tasks.length > 0 ? (dc / tasks.length) * 100 : 0} />
      </Card>

      {/* Task list */}
      {tasks.map((t) => (
        <Card key={t.id} style={{ padding: 16, opacity: t.done ? 0.45 : 1, transition: "opacity 0.3s" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div onClick={() => toggleDone(t.id)} style={{ width: 24, height: 24, borderRadius: 8, flexShrink: 0, marginTop: 2, border: t.done ? "none" : "2px solid rgba(0,0,0,0.12)", background: t.done ? T.dark : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>{t.done && "✓"}</div>
            <span style={{ fontSize: 18, marginTop: 1 }}>{t.e}</span>
            <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setEditing(t.id)}>
              <p style={{ fontSize: 14, fontWeight: 600, margin: 0, fontFamily: F, color: t.done ? T.text3 : T.text, textDecoration: t.done ? "line-through" : "none" }}>{t.n}</p>
              <p style={{ fontSize: 12, color: T.iceMid, margin: "3px 0", fontFamily: F, fontWeight: 600 }}>{t.timing}</p>
              {t.note && <p style={{ fontSize: 11, color: T.text3, margin: 0, fontFamily: F }}>{t.note}</p>}
              {t.details && <p style={{ fontSize: 11, color: T.iceMid, margin: "4px 0 0", fontFamily: F, fontStyle: "italic" }}>📋 Has details — tap to view</p>}
              {t.lastDone && <p style={{ fontSize: 10, color: T.text3, margin: "4px 0 0", fontFamily: F }}>Last done: {t.lastDone}</p>}
            </div>
            <div onClick={() => setEditing(t.id)} style={{ cursor: "pointer", padding: 4 }}><Arr /></div>
          </div>
        </Card>
      ))}

      {/* Add Care Suggestion */}
      {!showAdd ? (
        <button onClick={() => setShowAdd(true)} style={{ width: "100%", padding: "14px 0", borderRadius: 16, border: "2px dashed rgba(0,0,0,0.08)", background: "transparent", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}>+ Add Care Suggestion</button>
      ) : (
        <Card>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>New Care Item</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input value={nw.n} onChange={e => setNw(p => ({ ...p, n: e.target.value }))} placeholder="What needs care? (e.g. HVAC air filters)" style={inp} />
            <input value={nw.timing} onChange={e => setNw(p => ({ ...p, timing: e.target.value }))} placeholder="Schedule (e.g. Every 90 days, Before winter)" style={{ ...inp, fontSize: 13 }} />
            <input value={nw.note} onChange={e => setNw(p => ({ ...p, note: e.target.value }))} placeholder="Quick note (e.g. 3 filters, different sizes)" style={{ ...inp, fontSize: 13 }} />
            <textarea value={nw.details} onChange={e => setNw(p => ({ ...p, details: e.target.value }))} rows={3} placeholder="Details & specs...&#10;e.g. Filter 1: 20×25×1 (main return)&#10;Filter 2: 16×20×1 (upstairs)" style={{ ...inp, fontSize: 13, resize: "vertical" }} />
            <p style={{ fontSize: 10, color: T.text3, margin: 0, fontFamily: F, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>Pick an icon</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["🔧", "❄️", "🌿", "🏠", "🔥", "🧹", "🐛", "🧱", "🔔", "💧", "⚡", "🪟", "🚿", "🎨"].map(em => (
                <button key={em} onClick={() => setNw(p => ({ ...p, e: em }))} style={{ width: 36, height: 36, borderRadius: 10, border: nw.e === em ? `2px solid ${T.dark}` : "1px solid rgba(0,0,0,0.06)", background: nw.e === em ? "rgba(0,0,0,0.04)" : "transparent", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{em}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: "13px 0", borderRadius: 14, border: "none", background: "rgba(0,0,0,0.04)", color: T.text2, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Cancel</button>
              <button onClick={addTask} style={{ flex: 1, padding: "13px 0", borderRadius: 14, border: "none", background: T.dark, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Add Item</button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const Projects = ({ go }) => {
  const [projects, setProjects] = useState(() => DB.getProjects());
  const [showAdd, setShowAdd] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [logText, setLogText] = useState("");
  const [nw, setNw] = useState({ title: "", startDate: "", endDate: "", budget: "", description: "", contractor: "" });
  const save = (updated) => { setProjects(updated); DB.setProjects(updated); };
  const inp = { padding: "12px 16px", borderRadius: 14, border: "none", fontSize: 14, fontFamily: F, outline: "none", background: "rgba(0,0,0,0.03)", color: T.dark, fontWeight: 500, width: "100%" };

  const addProject = () => {
    if (!nw.title.trim()) return;
    const updated = [...projects, { id: Date.now(), title: nw.title, status: "In Progress", e: "🔨", startDate: nw.startDate, endDate: nw.endDate, budget: Number(nw.budget) || 0, spent: 0, description: nw.description, contractor: nw.contractor, notes: "", log: [{ date: new Date().toISOString().split("T")[0], action: "Project created" }] }];
    save(updated);
    setNw({ title: "", startDate: "", endDate: "", budget: "", description: "", contractor: "" });
    setShowAdd(false);
  };

  const addLog = (id) => {
    if (!logText.trim()) return;
    const updated = projects.map(p => p.id === id ? { ...p, log: [...(p.log || []), { date: new Date().toISOString().split("T")[0], action: logText }] } : p);
    save(updated);
    setLogText("");
  };

  const updateProject = (id, field, value) => {
    const updated = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    save(updated);
  };

  const proj = projects.find(p => p.id === viewing);

  // Detail view
  if (proj) {
    const pct = proj.budget > 0 ? Math.min((proj.spent / proj.budget) * 100, 100) : 0;
    const overBudget = proj.spent > proj.budget && proj.budget > 0;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Bk onClick={() => setViewing(null)} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}>{proj.e}</span>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{proj.title}</h2>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <DarkPill text={proj.status} />
            </div>
          </div>
        </div>

        {/* Budget */}
        <Card>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Budget</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
            <p style={{ fontSize: 28, fontWeight: 800, margin: 0, fontFamily: F, color: overBudget ? T.alert : T.black }}>${proj.spent.toLocaleString()}</p>
            <p style={{ fontSize: 14, color: T.text3, margin: 0, fontFamily: F }}>of ${proj.budget.toLocaleString()}</p>
          </div>
          <Progress value={pct} />
          <p style={{ fontSize: 11, color: overBudget ? T.alert : T.text3, margin: "8px 0 0", fontFamily: F }}>{overBudget ? "⚠️ Over budget" : `${Math.round(100 - pct)}% remaining`}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input value="" onChange={() => {}} placeholder="Add expense amount" id="expAmt" style={{ ...inp, flex: 1, fontSize: 13 }} />
            <button onClick={() => { const el = document.getElementById("expAmt"); const v = Number(el.value); if (v > 0) { updateProject(proj.id, "spent", proj.spent + v); el.value = ""; } }} style={{ background: T.dark, color: "#fff", border: "none", borderRadius: 14, padding: "12px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F, flexShrink: 0 }}>+ Add</button>
          </div>
        </Card>

        {/* Timeline */}
        <Card>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 10px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Timeline</p>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, color: T.text3, margin: "0 0 4px", fontFamily: F }}>Start</p>
              <input type="date" value={proj.startDate} onChange={e => updateProject(proj.id, "startDate", e.target.value)} style={{ ...inp, fontSize: 13 }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, color: T.text3, margin: "0 0 4px", fontFamily: F }}>Target End</p>
              <input type="date" value={proj.endDate} onChange={e => updateProject(proj.id, "endDate", e.target.value)} style={{ ...inp, fontSize: 13 }} />
            </div>
          </div>
        </Card>

        {/* Details */}
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Description</p>
          <textarea value={proj.description} onChange={e => updateProject(proj.id, "description", e.target.value)} rows={3} style={{ ...inp, fontSize: 13, resize: "vertical" }} placeholder="What's the project scope?" />
        </Card>

        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Contractor / Vendor</p>
          <input value={proj.contractor} onChange={e => updateProject(proj.id, "contractor", e.target.value)} style={{ ...inp, fontSize: 13 }} placeholder="Who's doing the work?" />
        </Card>

        {/* Status */}
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Status</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["Planning", "In Progress", "On Hold", "Complete"].map(s => (
              <button key={s} onClick={() => updateProject(proj.id, "status", s)} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "none", background: proj.status === s ? T.dark : "rgba(0,0,0,0.04)", color: proj.status === s ? "#fff" : T.text2, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: F }}>{s}</button>
            ))}
          </div>
        </Card>

        {/* Activity Log */}
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Project Log</p>
          {(proj.log || []).slice().reverse().map((l, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: T.iceMid, marginTop: 5, flexShrink: 0 }} />
              <div><p style={{ fontSize: 13, fontWeight: 500, margin: 0, fontFamily: F, color: T.text }}>{l.action}</p><p style={{ fontSize: 11, color: T.text3, margin: "2px 0 0", fontFamily: F }}>{l.date}</p></div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input value={logText} onChange={e => setLogText(e.target.value)} onKeyDown={e => e.key === "Enter" && addLog(proj.id)} placeholder="Log progress..." style={{ ...inp, flex: 1, fontSize: 13 }} />
            <button onClick={() => addLog(proj.id)} style={{ background: T.dark, color: "#fff", border: "none", borderRadius: 14, padding: "12px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F, flexShrink: 0 }}>Log</button>
          </div>
        </Card>

        <button onClick={() => { save(projects.filter(p => p.id !== proj.id)); setViewing(null); }} style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: T.alertBg, color: T.alert, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Delete Project</button>
      </div>
    );
  }

  // Project list view
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} /><Sec sub="Track renovations, builds, and improvements">Active Projects</Sec>

      {projects.map(p => {
        const pct = p.budget > 0 ? Math.min((p.spent / p.budget) * 100, 100) : 0;
        return (
          <Card key={p.id} onClick={() => setViewing(p.id)} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 24 }}>{p.e}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{p.title}</p>
                  <DarkPill text={p.status} />
                </div>
                {p.startDate && <p style={{ fontSize: 11, color: T.text3, margin: "4px 0", fontFamily: F }}>{p.startDate} → {p.endDate || "TBD"}</p>}
                {p.budget > 0 && (
                  <div style={{ marginTop: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, fontFamily: F, color: T.text }}>${p.spent.toLocaleString()}</span>
                      <span style={{ fontSize: 11, color: T.text3, fontFamily: F }}>${p.budget.toLocaleString()} budget</span>
                    </div>
                    <Progress value={pct} />
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}

      {!showAdd ? (
        <button onClick={() => setShowAdd(true)} style={{ width: "100%", padding: "14px 0", borderRadius: 16, border: "2px dashed rgba(0,0,0,0.08)", background: "transparent", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}>+ New Project</button>
      ) : (
        <Card>
          <p style={{ fontSize: 10, color: T.text3, margin: "0 0 12px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>New Project</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input value={nw.title} onChange={e => setNw(p => ({ ...p, title: e.target.value }))} placeholder="Project name (e.g. Back Porch Redo)" style={inp} />
            <textarea value={nw.description} onChange={e => setNw(p => ({ ...p, description: e.target.value }))} rows={2} placeholder="What's the scope?" style={{ ...inp, fontSize: 13, resize: "vertical" }} />
            <input value={nw.contractor} onChange={e => setNw(p => ({ ...p, contractor: e.target.value }))} placeholder="Contractor / vendor" style={{ ...inp, fontSize: 13 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}><p style={{ fontSize: 11, color: T.text3, margin: "0 0 4px", fontFamily: F }}>Start</p><input type="date" value={nw.startDate} onChange={e => setNw(p => ({ ...p, startDate: e.target.value }))} style={{ ...inp, fontSize: 13 }} /></div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 11, color: T.text3, margin: "0 0 4px", fontFamily: F }}>End</p><input type="date" value={nw.endDate} onChange={e => setNw(p => ({ ...p, endDate: e.target.value }))} style={{ ...inp, fontSize: 13 }} /></div>
            </div>
            <input value={nw.budget} onChange={e => setNw(p => ({ ...p, budget: e.target.value }))} placeholder="Total budget ($)" type="number" style={{ ...inp, fontSize: 13 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: "13px 0", borderRadius: 14, border: "none", background: "rgba(0,0,0,0.04)", color: T.text2, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Cancel</button>
              <button onClick={addProject} style={{ flex: 1, padding: "13px 0", borderRadius: 14, border: "none", background: T.dark, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Create</button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const Upgrades = ({ go }) => {
  const [sf, setSf] = useState(false);
  const [ups, setUps] = useState(() => DB.getUpgrades());
  const [viewing, setViewing] = useState(null);
  const [nw, setNw] = useState({ t:"",d:"",cat:"Interior",desc:"",cost:"",before:"",after:"" });
  const [flt, setFlt] = useState("All");
  const save = (updated) => { setUps(updated); DB.setUpgrades(updated); };
  const sh = flt === "All" ? ups : ups.filter(u => u.cat === flt);
  const totalInvested = ups.reduce((s, u) => s + (u.cost || 0), 0);
  const inp = { padding: "13px 18px", borderRadius: 14, border: "none", fontSize: 14, fontFamily: F, outline: "none", background: "rgba(0,0,0,0.03)", color: T.dark, fontWeight: 500, width: "100%" };

  const add = () => { if (!nw.t.trim()) return; const updated = [{ id:Date.now(),title:nw.t,date:nw.d||new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"}),cat:nw.cat,desc:nw.desc,impact:[],cost:Number(nw.cost)||null,cn:"Add cost",before:nw.before,after:nw.after,tags:[nw.cat],e:"🏗️" },...ups]; save(updated); setNw({t:"",d:"",cat:"Interior",desc:"",cost:"",before:"",after:""}); setSf(false); };
  const updateUpgrade = (id, field, value) => save(ups.map(u => u.id === id ? { ...u, [field]: value } : u));
  const deleteUpgrade = (id) => { save(ups.filter(u => u.id !== id)); setViewing(null); };

  const vu = ups.find(u => u.id === viewing);

  // Detail view
  if (vu) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Bk onClick={() => setViewing(null)} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}>{vu.e}</span>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{vu.title}</h2>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}><DarkPill text={vu.cat} /><span style={{ fontSize: 12, color: T.text3, fontFamily: F, lineHeight: "28px" }}>{vu.date}</span></div>
          </div>
        </div>
        <Card style={{ padding: 16 }}><p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Description</p><textarea value={vu.desc || ""} onChange={e => updateUpgrade(vu.id, "desc", e.target.value)} rows={3} style={{ ...inp, fontSize: 13, resize: "vertical" }} placeholder="Describe the upgrade..." /></Card>
        <Card style={{ padding: 16 }}><p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Cost</p><input type="number" value={vu.cost || ""} onChange={e => updateUpgrade(vu.id, "cost", Number(e.target.value) || null)} style={{ ...inp, fontSize: 18, fontWeight: 800 }} placeholder="Enter total cost ($)" /></Card>
        <div style={{ display: "flex", gap: 10 }}>
          <Card style={{ flex: 1, padding: 16, background: T.alertBg }}><p style={{ fontSize: 10, fontWeight: 700, color: T.alert, margin: "0 0 6px", fontFamily: F, textTransform: "uppercase", letterSpacing: 0.8 }}>Before</p><input value={vu.before || ""} onChange={e => updateUpgrade(vu.id, "before", e.target.value)} style={{ ...inp, fontSize: 12, background: "rgba(255,255,255,0.5)" }} placeholder="What was there?" /></Card>
          <Card style={{ flex: 1, padding: 16, background: T.goodBg }}><p style={{ fontSize: 10, fontWeight: 700, color: T.good, margin: "0 0 6px", fontFamily: F, textTransform: "uppercase", letterSpacing: 0.8 }}>After</p><input value={vu.after || ""} onChange={e => updateUpgrade(vu.id, "after", e.target.value)} style={{ ...inp, fontSize: 12, background: "rgba(255,255,255,0.5)" }} placeholder="What's there now?" /></Card>
        </div>
        <Card style={{ padding: 16 }}><p style={{ fontSize: 10, color: T.text3, margin: "0 0 8px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Category</p><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{["Structural","Interior","Exterior","Systems","Outdoor"].map(c => <button key={c} onClick={() => updateUpgrade(vu.id, "cat", c)} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: vu.cat === c ? T.dark : "rgba(0,0,0,0.04)", color: vu.cat === c ? "#fff" : T.text2, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F }}>{c}</button>)}</div></Card>
        <button onClick={() => deleteUpgrade(vu.id)} style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: T.alertBg, color: T.alert, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Delete Upgrade</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Bk onClick={() => go("dashboard")} /><Sec sub="Your home's evolution">Upgrades</Sec>
      <div style={{ borderRadius: 22, padding: 22, background: `linear-gradient(160deg, ${T.iceLight}, ${T.ice} 70%, ${T.iceMid})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -20, width: 100, height: 100, borderRadius: 50, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", position: "relative" }}>
          <div><p style={{ fontSize: 34, fontWeight: 800, margin: 0, fontFamily: F, color: T.dark }}>{ups.length}</p><p style={{ fontSize: 10, color: "rgba(26,26,26,0.45)", margin: "4px 0 0", fontFamily: F, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>Logged</p></div>
          <div style={{ width: 1, background: "rgba(26,26,26,0.08)" }} />
          <div><p style={{ fontSize: 34, fontWeight: 800, margin: 0, fontFamily: F, color: T.dark }}>{totalInvested > 0 ? `$${(totalInvested / 1000).toFixed(1)}k` : "—"}</p><p style={{ fontSize: 10, color: "rgba(26,26,26,0.45)", margin: "4px 0 0", fontFamily: F, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>Invested</p></div>
        </div>
      </div>
      <button onClick={() => setSf(!sf)} style={{ width: "100%", padding: "14px 0", borderRadius: 16, background: sf ? "rgba(0,0,0,0.04)" : T.dark, color: sf ? T.text2 : "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>{sf ? "Cancel" : "+ Log an Upgrade"}</button>
      {sf && <Card><p style={{ fontSize: 10, color: T.text3, margin: "0 0 14px", fontFamily: F, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>New Upgrade</p><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><input value={nw.t} onChange={e=>setNw(p=>({...p,t:e.target.value}))} placeholder="What did you do?" style={inp} /><div style={{ display: "flex", gap: 8 }}><input value={nw.d} onChange={e=>setNw(p=>({...p,d:e.target.value}))} placeholder="When?" style={{...inp,flex:1,fontSize:13}} /><input value={nw.cost} onChange={e=>setNw(p=>({...p,cost:e.target.value}))} placeholder="Cost ($)" type="number" style={{...inp,flex:1,fontSize:13}} /></div><select value={nw.cat} onChange={e=>setNw(p=>({...p,cat:e.target.value}))} style={{...inp,fontSize:13,appearance:"none"}}>{["Structural","Interior","Exterior","Systems","Outdoor"].map(c=><option key={c} value={c}>{c}</option>)}</select><textarea value={nw.desc} onChange={e=>setNw(p=>({...p,desc:e.target.value}))} placeholder="Describe it..." rows={2} style={{...inp,fontSize:13,resize:"vertical"}} /><div style={{ display: "flex", gap: 8 }}><input value={nw.before} onChange={e=>setNw(p=>({...p,before:e.target.value}))} placeholder="Before (optional)" style={{...inp,flex:1,fontSize:13}} /><input value={nw.after} onChange={e=>setNw(p=>({...p,after:e.target.value}))} placeholder="After (optional)" style={{...inp,flex:1,fontSize:13}} /></div><button onClick={add} style={{ width: "100%", padding: "14px 0", borderRadius: 14, background: T.dark, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Save Upgrade</button></div></Card>}
      <Chips items={["All","Structural","Interior","Exterior","Systems","Outdoor"]} active={flt} onSelect={setFlt} />
      {sh.map(u => <Card key={u.id} onClick={() => setViewing(u.id)} style={{ padding: 18, cursor: "pointer" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 24 }}>{u.e}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: F, color: T.black }}>{u.title}</p>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 6 }}><DarkPill text={u.cat} /><span style={{ fontSize: 12, color: T.text3, fontFamily: F }}>{u.date}</span>{u.cost && <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: F }}> · ${u.cost.toLocaleString()}</span>}</div>
            {u.desc && <p style={{ fontSize: 12, color: T.text2, margin: "8px 0 0", fontFamily: F, lineHeight: 1.5 }}>{u.desc.substring(0, 100)}{u.desc.length > 100 ? "..." : ""}</p>}
          </div>
          <Arr />
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
  const more = [{e:"🔨",l:"Active Projects",s:"projects"},{e:"🏗️",l:"Upgrades",s:"upgrades"},{e:"🌤️",l:"Local Happenings",s:"happenings"},{e:"🔔",l:"Notifications",s:"notifications"},{e:"👤",l:"Profile",s:"profile"},{e:"⭐",l:"Vendors",s:"vendors"},{e:"💰",l:"Spending",s:"maintenance"}];
  const sub = ["happenings","notifications","profile","vendors","maintenance","upgrades","projects"];
  const R = () => { switch(screen) {
    case "dashboard": return <Dashboard go={go}/>; case "property": return <Property go={go}/>; case "maintenance": return <Maintenance go={go}/>;
    case "upload": return <Upload go={go}/>; case "happenings": return <Happenings go={go}/>; case "notifications": return <Notifs go={go}/>;
    case "profile": return <Profile go={go}/>; case "vendors": return <Vendors go={go}/>; case "planner": return <Planner go={go}/>;
    case "upgrades": return <Upgrades go={go}/>;
    case "projects": return <Projects go={go}/>;
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
