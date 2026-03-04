import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   WAVING GEORGIAN FLAG (Canvas 2D Shader-like)
   ═══════════════════════════════════════════ */
function WavingFlag({ width = 200, height = 130 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const flagCanvas = document.createElement("canvas");
    flagCanvas.width = 600;
    flagCanvas.height = 400;
    const fctx = flagCanvas.getContext("2d");

    fctx.fillStyle = "#FFFFFF";
    fctx.fillRect(0, 0, 600, 400);
    fctx.fillStyle = "#FF0000";
    fctx.fillRect(255, 0, 90, 400);
    fctx.fillRect(0, 155, 600, 90);

    const drawBolnisi = (cx, cy, s) => {
      fctx.fillStyle = "#FF0000";
      fctx.fillRect(cx - s * 0.12, cy - s * 0.5, s * 0.24, s);
      fctx.fillRect(cx - s * 0.5, cy - s * 0.12, s, s * 0.24);
      const f = s * 0.18;
      fctx.fillRect(cx - f, cy - s * 0.5, f * 2, s * 0.08);
      fctx.fillRect(cx - f, cy + s * 0.42, f * 2, s * 0.08);
      fctx.fillRect(cx - s * 0.5, cy - f, s * 0.08, f * 2);
      fctx.fillRect(cx + s * 0.42, cy - f, s * 0.08, f * 2);
    };
    drawBolnisi(127, 77, 70);
    drawBolnisi(427, 77, 70);
    drawBolnisi(127, 322, 70);
    drawBolnisi(427, 322, 70);

    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    let time = 0;
    const animate = () => {
      time += 0.022;
      ctx.clearRect(0, 0, width, height);

      const cols = 100;
      const sliceW = width / cols;
      const flagSliceW = flagCanvas.width / cols;

      for (let i = 0; i < cols; i++) {
        const x = i / cols;
        const wave = Math.sin(x * 4.5 + time * 2.8) * (4 + x * 12);
        const wave2 = Math.cos(x * 2.8 + time * 1.6) * (2 + x * 5);
        const yOff = wave + wave2;

        const nextW = Math.sin(((i + 1) / cols) * 4.5 + time * 2.8) * (4 + ((i + 1) / cols) * 12);
        const slope = nextW - wave;
        const bright = Math.max(0.7, Math.min(1.2, 1 + slope * 0.035));

        ctx.save();
        ctx.translate(i * sliceW, yOff);

        ctx.drawImage(
          flagCanvas,
          i * flagSliceW, 0, flagSliceW + 1.5, flagCanvas.height,
          0, 0, sliceW + 0.8, height
        );

        if (bright < 1) {
          ctx.fillStyle = `rgba(0,0,0,${(1 - bright) * 0.45})`;
          ctx.fillRect(0, 0, sliceW + 1, height);
        } else if (bright > 1) {
          ctx.fillStyle = `rgba(255,255,255,${(bright - 1) * 0.5})`;
          ctx.fillRect(0, 0, sliceW + 1, height);
        }
        ctx.restore();
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: 8,
        boxShadow: "0 12px 40px rgba(180,40,40,0.2), 0 2px 8px rgba(0,0,0,0.15)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   TRIP DATA (ALL MERGED RESEARCH)
   ═══════════════════════════════════════════ */
const destinations = [
  {
    id: "kutaisi", name: "Kutaisi", sub: "Ancient Colchis · Imeretian Culture",
    dates: "Mar 5", nights: 1, emoji: "🏛️",
    accent: "#C44536", light: "#FEF1EF", grad: "linear-gradient(135deg,#C44536,#9B2C1F)",
    status: "researched",
    sections: [
      { title: "Culture & Sights", icon: "🗿", items: [
        { n: "Colchis Fountain & Central Square", d: "Tribute to ancient Colchian civilization. Popular local meeting point — start here.", p: "must" },
        { n: "Green Bazaar", d: "Covered market: produce, spices, cheese, churchkhela, honey. Tastings offered. Try Laghidze Water (tarragon or chocolate) — invented here in 1887.", p: "must" },
        { n: "Bagrati Cathedral", d: "11th-century on Ukimerioni Hill. Panoramic views. Free, open daily.", p: "must" },
        { n: "White Bridge & Soviet Cable Car", d: "Bridge over Rioni with glass floor. Cable car retains Soviet feel — 3 GEL cash.", p: "rec" },
        { n: "Gelati Monastery (UNESCO)", d: "⚠️ Sunday-only as of summer 2025 (renovations). Mar 5 = Thursday — check status!", p: "check" },
        { n: "Historical Museum", d: "19th-c bank building. Prehistory to WWII, Colchian gold. ~3 GEL.", p: "rec" },
        { n: "Drama Theatre", d: "One of Georgia's top theatres. 10–30 GEL. Check schedule.", p: "opt" },
      ]},
      { title: "Food & Drink", icon: "🍷", items: [
        { n: "Imeretian Cuisine Tips", d: "Less red meat, more veg & herbs than east. Must-try: pkhali, Imeretian khachapuri, clay-pot mushrooms, lobiani.", p: "info" },
        { n: "Magnolia", d: "On the Rioni. Buffalo khinkali, cheesy lobiani. Enclosed balcony with river views.", p: "must" },
        { n: "Sisters", d: "Pink building, vintage décor. Folk music evenings — great for a supra feast.", p: "rec" },
        { n: "Baraqa", d: "Central, near fountain. Good khinkali, excellent eggplant w/ walnuts.", p: "rec" },
        { n: "Hacker-Pschorr", d: "German-themed, Georgian food. Locals rate the khinkali. Open 24hrs.", p: "opt" },
      ]},
      { title: "Gear & Shopping", icon: "🛍️", items: [
        { n: "Ecolo (Second-hand)", d: "⭐ 5.0 · 123 reviews. Old villa + bar in yard. Boots ~90 GEL, jackets ~40 GEL. Likely ski pants. Closed Mon, opens noon.", p: "must" },
        { n: "Megahand", d: "⭐ 4.9 · 254 reviews. Big, organized. Huge selection, very cheap on sale days. 9am–9pm daily.", p: "rec" },
        { n: "Humana", d: "Chain, smaller. Maps pin may be off — reportedly next to OnePrice, ~100m from shown.", p: "opt" },
      ]},
      { title: "Practical", icon: "💡", items: [
        { n: "ATMs", d: "BasisBank = no fees, 2000 GEL max. Avoid Liberty (20 GEL!) & BoG (3 GEL). Decline DCC → choose GEL.", p: "must" },
        { n: "Revolut", d: "Works fine. Free within plan limits (Std: £200/mo or 5 withdrawals). Cards widely accepted.", p: "info" },
        { n: "Transport", d: "Download Bolt. Center is walkable.", p: "info" },
        { n: "Weather", d: "Early March = cold. Layer up.", p: "info" },
      ]},
    ],
  },
  {
    id: "gudauri", name: "Gudauri", sub: "Ski Resort · Greater Caucasus",
    dates: "Mar 6–12", nights: 7, emoji: "⛷️",
    accent: "#2563EB", light: "#EFF4FF", grad: "linear-gradient(135deg,#2563EB,#1E40AF)",
    status: "not-started",
    sections: [
      { title: "To Research", icon: "📋", items: [
        { n: "Ski passes & pricing", d: "", p: "tbd" },
        { n: "Equipment rental", d: "", p: "tbd" },
        { n: "Accommodation", d: "", p: "tbd" },
        { n: "Restaurants & après-ski", d: "", p: "tbd" },
        { n: "Transport from Kutaisi", d: "", p: "tbd" },
        { n: "Off-piste / freeride options", d: "", p: "tbd" },
      ]},
    ],
  },
  {
    id: "tbilisi", name: "Tbilisi", sub: "Capital · Sulphur Baths · Nightlife",
    dates: "Mar 12–15", nights: 3, emoji: "🌆",
    accent: "#7C3AED", light: "#F5F0FF", grad: "linear-gradient(135deg,#7C3AED,#5B21B6)",
    status: "not-started",
    sections: [
      { title: "Climbing & Gear", icon: "🧗", items: [
        { n: "S.K.Lucky Gym", d: "Biggest in Caucasus. Boulder/top-rope/lead + Kilter board. 40 GEL/day, 230 GEL/mo. 9–23h. Shoes included but worn — bring own.", p: "rec" },
        { n: "Vake Climbing Gym", d: "Chavchavadze Ave 49. Speed & sport. Cheaper. Harnesses provided, BYO shoes. Boulder section removed.", p: "opt" },
        { n: "OUTDOORS.GE", d: "⭐ 4.8 · 275 reviews. Kazbegi Ave. Amazing staff, good brands, fair prices. Top pick for climbing shoes.", p: "must" },
        { n: "MPlus", d: "⭐ 4.7 · 180 reviews. Vaja Pshavela 25. Salewa brand. Premium but quality. Also rents gear.", p: "rec" },
        { n: "DV Sport", d: "La Sportiva dealer. Check for specific models.", p: "opt" },
        { n: "Magelani", d: "Has gear but reported inflated prices (up to 3× EU retail). Compare first.", p: "check" },
        { n: "@tbilisiclimbingshop", d: "Instagram — DM about stock & prices.", p: "info" },
      ]},
      { title: "Ski Gear (Budget)", icon: "🎿", items: [
        { n: "Freestyler", d: "Cheap used skis, rentals, helmets.", p: "rec" },
        { n: "Xtreme", d: "Biggest shop, basic gear, cheap. Boot molding available.", p: "rec" },
        { n: "Dinamo Stadium area", d: "Search 'Snowy Mountains' on Maps. Multiple affordable shops clustered.", p: "rec" },
        { n: "Facebook groups", d: "Used gear from individuals. Gems possible, watch for fraud.", p: "opt" },
      ]},
      { title: "To Research", icon: "📋", items: [
        { n: "Neighborhoods", d: "", p: "tbd" },
        { n: "Food & restaurants", d: "", p: "tbd" },
        { n: "Nightlife & bars", d: "", p: "tbd" },
        { n: "Day trips", d: "", p: "tbd" },
        { n: "Cultural sites", d: "", p: "tbd" },
        { n: "Transport from Gudauri", d: "", p: "tbd" },
      ]},
    ],
  },
];

/* Priority config */
const PC = {
  must: { l: "MUST DO", bg: "#DC2626", c: "#fff" },
  rec: { l: "REC'D", bg: "#EA580C", c: "#fff" },
  opt: { l: "OPTIONAL", bg: "#52525B", c: "#D4D4D8" },
  check: { l: "⚠ CHECK", bg: "#991B1B", c: "#FCA5A5" },
  info: { l: "INFO", bg: "#0369A1", c: "#BAE6FD" },
  tbd: { l: "TBD", bg: "#3F3F46", c: "#71717A" },
};

const SL = {
  researched: { l: "Researched", c: "#4ADE80" },
  "not-started": { l: "Not Started", c: "#71717A" },
};

/* ═══════════════════════════════════════════ */
function Badge({ p }) {
  const s = PC[p];
  if (!s) return null;
  return (
    <span style={{
      fontSize: 8, fontWeight: 700, letterSpacing: "0.1em",
      padding: "2px 6px", borderRadius: 3,
      background: s.bg, color: s.c,
      fontFamily: "'Space Mono',monospace", whiteSpace: "nowrap",
    }}>
      {s.l}
    </span>
  );
}

function Item({ item, accent }) {
  return (
    <div style={{
      padding: "10px 12px", background: "rgba(255,255,255,0.03)",
      borderRadius: 8, borderLeft: `3px solid ${item.p === "must" ? accent : item.p === "check" ? "#DC2626" : "rgba(255,255,255,0.06)"}`,
      transition: "background 0.15s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: item.d ? 3 : 0 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#E7E5E4", fontFamily: "'DM Sans',sans-serif" }}>{item.n}</span>
        <Badge p={item.p} />
      </div>
      {item.d && (
        <p style={{ margin: 0, fontSize: 12, color: "#78716C", lineHeight: 1.5, fontFamily: "'DM Sans',sans-serif" }}>{item.d}</p>
      )}
    </div>
  );
}

function Section({ section, accent }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 14 }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 7,
        background: "none", border: "none", cursor: "pointer", padding: "5px 0", width: "100%",
      }}>
        <span style={{ fontSize: 14 }}>{section.icon}</span>
        <span style={{
          fontWeight: 700, fontSize: 10, color: accent, textTransform: "uppercase",
          letterSpacing: "0.12em", fontFamily: "'Space Mono',monospace",
        }}>{section.title}</span>
        <span style={{ fontSize: 9, color: "#57534E", fontFamily: "'Space Mono',monospace" }}>
          {section.items.length}
        </span>
        <span style={{
          marginLeft: "auto", fontSize: 11, color: "#57534E",
          transform: open ? "rotate(0)" : "rotate(-90deg)", transition: "transform 0.2s",
        }}>▾</span>
      </button>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 5 }}>
          {section.items.map((it, i) => <Item key={i} item={it} accent={accent} />)}
        </div>
      )}
    </div>
  );
}

function DestCard({ dest }) {
  const [exp, setExp] = useState(dest.status === "researched");
  const st = SL[dest.status];
  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      background: exp ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${exp ? dest.accent + "35" : "rgba(255,255,255,0.06)"}`,
      transition: "all 0.25s",
      boxShadow: exp ? `0 8px 32px ${dest.accent}12` : "none",
    }}>
      <div style={{ height: 2, background: dest.grad }} />
      <button onClick={() => setExp(!exp)} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "16px 18px",
        width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, background: dest.grad,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0, boxShadow: `0 4px 16px ${dest.accent}25`,
        }}>{dest.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 800, fontSize: 19, color: "#FAFAF9", fontFamily: "'Playfair Display',serif" }}>
              {dest.name}
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 8, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.1em", color: st.c, fontFamily: "'Space Mono',monospace",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.c }} />
              {st.l}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#78716C", marginTop: 2, fontFamily: "'DM Sans',sans-serif" }}>
            {dest.sub} · {dest.dates} · {dest.nights}n
          </div>
        </div>
        <span style={{
          fontSize: 14, color: "#57534E", flexShrink: 0,
          transform: exp ? "rotate(0)" : "rotate(-90deg)", transition: "transform 0.2s",
        }}>▾</span>
      </button>
      {exp && (
        <div style={{ padding: "2px 18px 18px" }}>
          {dest.sections.map((s, i) => <Section key={i} section={s} accent={dest.accent} />)}
        </div>
      )}
    </div>
  );
}

function RouteBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, margin: "24px auto 0", maxWidth: 360 }}>
      {destinations.map((d, i) => (
        <div key={d.id} style={{ display: "flex", alignItems: "center", flex: i < destinations.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: d.grad,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, boxShadow: `0 3px 12px ${d.accent}30`,
            }}>{d.emoji}</div>
            <span style={{ fontSize: 9, fontWeight: 700, color: d.accent, fontFamily: "'Space Mono',monospace" }}>
              {d.nights}n
            </span>
          </div>
          {i < destinations.length - 1 && (
            <div style={{
              flex: 1, height: 1, margin: "0 8px", marginBottom: 20,
              background: `linear-gradient(90deg,${d.accent}50,${destinations[i + 1].accent}50)`,
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#57534E", margin: "-2px auto 0",
              }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
export default function App() {
  const researched = destinations.filter(d => d.status === "researched").length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(175deg,#0C0A09 0%,#1C1917 35%,#171412 100%)",
      padding: "0 0 48px",
      fontFamily: "'DM Sans',sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: -200, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(196,69,54,0.08) 0%,transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "44px 16px 28px" }}>
        <WavingFlag width={190} height={120} />

        <div style={{
          marginTop: 24, fontSize: 9, fontWeight: 700, letterSpacing: "0.3em",
          textTransform: "uppercase", color: "#C44536",
          fontFamily: "'Space Mono',monospace",
        }}>
          ── Trip Planner ──
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display',serif", fontSize: 52, fontWeight: 900,
          color: "#FAFAF9", margin: "8px 0 2px", lineHeight: 1, letterSpacing: "-0.02em",
        }}>
          Georgia
        </h1>
        <p style={{
          fontFamily: "'Playfair Display',serif", fontSize: 18,
          color: "#57534E", margin: "2px 0 0", fontStyle: "italic",
        }}>
          საქართველო
        </p>
        <p style={{
          color: "#57534E", fontSize: 11, margin: "14px 0 0",
          fontFamily: "'Space Mono',monospace", letterSpacing: "0.05em",
        }}>
          Mar 5–15, 2026 · 10 nights · 3 destinations
        </p>

        <RouteBar />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginTop: 20, padding: "5px 14px",
          background: "rgba(255,255,255,0.04)", borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{
            width: 64, height: 3, borderRadius: 2,
            background: "rgba(255,255,255,0.08)", overflow: "hidden",
          }}>
            <div style={{
              width: `${(researched / destinations.length) * 100}%`,
              height: "100%", borderRadius: 2,
              background: "linear-gradient(90deg,#C44536,#4ADE80)",
            }} />
          </div>
          <span style={{
            fontSize: 9, fontWeight: 700, color: "#57534E",
            fontFamily: "'Space Mono',monospace",
          }}>
            {researched}/{destinations.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 580, margin: "0 auto", padding: "0 14px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {destinations.map(d => <DestCard key={d.id} dest={d} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <span style={{ fontSize: 9, color: "#3F3F46", fontFamily: "'Space Mono',monospace", letterSpacing: "0.05em" }}>
            Living doc · ask me to add anything
          </span>
        </div>
      </div>
    </div>
  );
}
