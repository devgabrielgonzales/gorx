"use client";

import { useEffect, useState } from "react";

const tabs = [
  { id: 0, label: "Interfaces" },
  { id: 1, label: "Design System" },
  { id: 2, label: "Performance" },
  { id: 3, label: "Fullstack" },
  { id: 4, label: "Integração" },
];

const tabIcon = (i: number) => {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  };
  switch (i) {
    case 0:
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case 1:
      return (
        <svg {...props}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 2:
      return (
        <svg {...props}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 3:
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      );
  }
};

export default function FeatureTabs() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % tabs.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div id="feat-tabs">
      <div className="flex border-b border-[#1f1f1f]" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={`flex-1 relative flex flex-col items-center justify-center gap-2 py-5 ${
              i < tabs.length - 1 ? "border-r border-[#1f1f1f]" : ""
            } cursor-pointer transition-colors ${
              active === i
                ? "bg-[#141414] text-white"
                : "text-[#666] hover:text-white hover:bg-[#141414]"
            }`}
            role="tab"
          >
            {active === i && (
              <span
                className="absolute top-0 left-0 h-[2px] bg-[#bff549] transition-[width] duration-[5000ms] ease-linear"
                style={{ width: "100%" }}
              />
            )}
            <span className={active === i ? "text-[#bff549]" : ""}>{tabIcon(i)}</span>
            <span
              className={`font-mono text-[10px] uppercase tracking-widest ${
                active === i ? "text-[#bff549]" : ""
              }`}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>

      <div className="relative" style={{ height: 500, overflow: "hidden" }}>
        {active === 0 && <Panel0 />}
        {active === 1 && <Panel1 />}
        {active === 2 && <Panel2 />}
        {active === 3 && <Panel3 />}
        {active === 4 && <Panel4 />}
      </div>
    </div>
  );
}

const ms = "JetBrains Mono, monospace";
const cs = "Chakra Petch, sans-serif";

function Panel0() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0f0f0f" }}>
      <div
        style={{
          background: "#0D0D0D",
          borderBottom: "1px solid #1F1F1F",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 10, height: 10, background: "#2a2a2a" }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "#141414",
            border: "1px solid #1F1F1F",
            padding: "4px 10px",
            fontFamily: ms,
            fontSize: 9,
            color: "#444",
          }}
        >
          localhost:6006 — Storybook
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "190px 1fr", height: "calc(100% - 41px)" }}>
        <div style={{ borderRight: "1px solid #1F1F1F", padding: "14px 12px" }}>
          <p
            style={{
              fontFamily: ms,
              fontSize: 9,
              color: "#BFF549",
              textTransform: "uppercase",
              letterSpacing: ".1em",
              marginBottom: 10,
            }}
          >
            Components
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[
              ["Button", true],
              ["Input", false],
              ["Card", false],
              ["Badge", false],
              ["Modal", false],
              ["Table", false],
              ["Select", false],
              ["Tooltip", false],
              ["Tabs", false],
              ["Dropdown", false],
            ].map(([name, sel]) => (
              <div
                key={name as string}
                style={{
                  padding: "5px 8px",
                  fontSize: 11,
                  color: sel ? "#BFF549" : "#555",
                  background: sel ? "rgba(191,245,73,.07)" : "transparent",
                  borderLeft: `1px solid ${sel ? "#BFF549" : "transparent"}`,
                }}
              >
                {name as string}
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p
              style={{
                fontFamily: ms,
                fontSize: 9,
                color: "#444",
                textTransform: "uppercase",
                letterSpacing: ".08em",
                marginBottom: 10,
              }}
            >
              Variants
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <div
                style={{
                  background: "#BFF549",
                  color: "#0D0D0D",
                  fontFamily: cs,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "8px 18px",
                }}
              >
                Primary
              </div>
              <div
                style={{
                  border: "1px solid #1F1F1F",
                  color: "#fff",
                  fontFamily: cs,
                  fontSize: 11,
                  padding: "8px 18px",
                }}
              >
                Secondary
              </div>
              <div
                style={{
                  border: "1px solid #BFF549",
                  color: "#BFF549",
                  fontFamily: cs,
                  fontSize: 11,
                  padding: "8px 18px",
                }}
              >
                Outline
              </div>
              <div style={{ color: "#555", fontFamily: cs, fontSize: 11, padding: "8px 18px" }}>Ghost</div>
            </div>
          </div>
          <div style={{ height: 1, background: "#1F1F1F" }} />
          <div>
            <p
              style={{
                fontFamily: ms,
                fontSize: 9,
                color: "#444",
                textTransform: "uppercase",
                letterSpacing: ".08em",
                marginBottom: 10,
              }}
            >
              Sizes
            </p>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              {[
                ["XS", 9, "4px 10px"],
                ["SM", 10, "6px 14px"],
                ["MD", 11, "8px 18px"],
                ["LG", 13, "10px 22px"],
              ].map(([t, fs, p]) => (
                <div
                  key={t as string}
                  style={{
                    background: "#BFF549",
                    color: "#0D0D0D",
                    fontFamily: cs,
                    fontSize: fs as number,
                    fontWeight: 700,
                    padding: p as string,
                  }}
                >
                  {t as string}
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: "#1F1F1F" }} />
          <div style={{ fontFamily: ms, fontSize: 10, lineHeight: 1.7, color: "#555" }}>
            <span style={{ color: "#BFF549" }}>const</span>{" "}
            <span style={{ color: "#fff" }}>Button</span>{" "}
            <span style={{ color: "#555" }}>{"= ({"}</span>{" "}
            <span style={{ color: "#BFF549" }}>variant</span>
            <span style={{ color: "#555" }}>{", "}</span>
            <span style={{ color: "#BFF549" }}>size</span>
            <span style={{ color: "#555" }}>{", "}</span>
            <span style={{ color: "#BFF549" }}>children</span>{" "}
            <span style={{ color: "#555" }}>{"}) =>"}(</span>
            <br />
            &nbsp;&nbsp;
            <span style={{ color: "#555" }}>{"<"}</span>
            <span style={{ color: "#BFF549" }}>button</span>{" "}
            <span style={{ color: "#fff" }}>className</span>
            <span style={{ color: "#555" }}>{"={cn("}</span>
            <span style={{ color: "#BFF549" }}>base</span>
            <span style={{ color: "#555" }}>{", "}</span>
            <span style={{ color: "#BFF549" }}>variants</span>
            <span style={{ color: "#555" }}>{"[variant], "}</span>
            <span style={{ color: "#BFF549" }}>sizes</span>
            <span style={{ color: "#555" }}>{"[size])}>"}</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#555" }}>{"{children}"}</span>
            <br />
            &nbsp;&nbsp;
            <span style={{ color: "#555" }}>{"</"}</span>
            <span style={{ color: "#BFF549" }}>button</span>
            <span style={{ color: "#555" }}>{">"}</span>
            <br />
            <span style={{ color: "#555" }}>)</span>
          </div>
        </div>
      </div>
      <BottomFade />
    </div>
  );
}

function Panel1() {
  const colors = [
    ["#BFF549", "primary", false],
    ["#0D0D0D", "bg", true],
    ["#141414", "surface", true],
    ["#1F1F1F", "border", false],
    ["#666666", "muted", false],
    ["#ffffff", "white", false],
    ["linear-gradient(135deg,#BFF549,#a8e040)", "gradient", false],
    ["rgba(191,245,73,.12)", "ghost", false],
  ] as const;
  const types = [
    ["4xl", "Gorx", { fontSize: 28, fontWeight: 700, color: "#fff" }, "700 · 36px"],
    ["2xl", "Section Title", { fontSize: 20, fontWeight: 600, color: "#fff" }, "600 · 24px"],
    ["base", "Body text — legível e direto", { fontSize: 14, color: "#999" }, "400 · 14px"],
    [
      "mono",
      'const gorx = "code"',
      { fontFamily: ms, fontSize: 11, color: "#BFF549" },
      "JetBrains Mono · 11px",
    ],
  ] as const;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#0f0f0f", padding: "32px 40px", display: "flex", flexDirection: "column", gap: 24 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p
          style={{
            fontFamily: ms,
            fontSize: 10,
            color: "#BFF549",
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          Design Tokens
        </p>
        <p style={{ fontFamily: ms, fontSize: 9, color: "#444" }}>v2.4.0 — 128 tokens</p>
      </div>
      <div>
        <p
          style={{
            fontFamily: ms,
            fontSize: 9,
            color: "#444",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            marginBottom: 10,
          }}
        >
          Colors
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 6 }}>
          {colors.map(([bg, label, border]) => (
            <div key={label}>
              <div style={{ height: 36, background: bg, border: border ? "1px solid #1F1F1F" : "none" }} />
              <p style={{ fontFamily: ms, fontSize: 8, color: "#555", marginTop: 4 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 1, background: "#1F1F1F" }} />
      <div>
        <p
          style={{
            fontFamily: ms,
            fontSize: 9,
            color: "#444",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            marginBottom: 14,
          }}
        >
          Typography Scale
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {types.map(([key, sample, sty, size]) => (
            <div key={key} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={{ fontFamily: ms, fontSize: 9, color: "#444", minWidth: 40 }}>{key}</span>
              <span style={{ fontFamily: cs, lineHeight: 1, ...(sty as React.CSSProperties) }}>
                {sample}
              </span>
              <span style={{ fontFamily: ms, fontSize: 9, color: "#333" }}>{size}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomFade />
    </div>
  );
}

function Panel2() {
  const scores = [
    ["Performance", 98],
    ["Accessibility", 100],
    ["Best Practices", 96],
    ["SEO", 100],
  ] as const;
  const vitals = [
    ["LCP — Largest Contentful Paint", "0.8s", "Good < 2.5s"],
    ["FID — First Input Delay", "4ms", "Good < 100ms"],
    ["CLS — Cumulative Layout Shift", "0.02", "Good < 0.1"],
  ] as const;
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#0f0f0f", padding: "32px 40px", display: "flex", flexDirection: "column", gap: 24 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p
          style={{
            fontFamily: ms,
            fontSize: 10,
            color: "#BFF549",
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          Core Web Vitals
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, background: "#BFF549" }} />
          <p style={{ fontFamily: ms, fontSize: 9, color: "#BFF549" }}>Live — gorx.dev</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {scores.map(([label, score]) => (
          <div
            key={label}
            style={{
              background: "#141414",
              border: "1px solid #1F1F1F",
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <p style={{ fontFamily: ms, fontSize: 8, color: "#444", textTransform: "uppercase" }}>{label}</p>
            <p
              style={{
                fontFamily: cs,
                fontSize: 32,
                fontWeight: 700,
                color: "#BFF549",
                lineHeight: 1,
              }}
            >
              {score}
            </p>
            <div style={{ height: 2, background: "#1F1F1F" }}>
              <div style={{ height: "100%", width: `${score}%`, background: "#BFF549" }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 1, background: "#1F1F1F" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p
          style={{
            fontFamily: ms,
            fontSize: 9,
            color: "#444",
            textTransform: "uppercase",
            letterSpacing: ".08em",
          }}
        >
          Vitals Breakdown
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: 0,
            border: "1px solid #1F1F1F",
          }}
        >
          {vitals.map(([m, v, g], i) => (
            <div key={m} style={{ display: "contents" }}>
              <div
                style={{
                  padding: "8px 14px",
                  fontFamily: ms,
                  fontSize: 10,
                  color: "#fff",
                  borderBottom: i < vitals.length - 1 ? "1px solid #1F1F1F" : "none",
                }}
              >
                {m}
              </div>
              <div
                style={{
                  padding: "8px 14px",
                  fontFamily: ms,
                  fontSize: 10,
                  color: "#BFF549",
                  borderBottom: i < vitals.length - 1 ? "1px solid #1F1F1F" : "none",
                  borderLeft: "1px solid #1F1F1F",
                }}
              >
                {v}
              </div>
              <div
                style={{
                  padding: "8px 14px",
                  fontFamily: ms,
                  fontSize: 9,
                  color: "#444",
                  borderBottom: i < vitals.length - 1 ? "1px solid #1F1F1F" : "none",
                  borderLeft: "1px solid #1F1F1F",
                }}
              >
                {g}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomFade />
    </div>
  );
}

function Panel3() {
  const routes = [
    ["GET", "/api/projects", "200 · 12ms", "rgba(191,245,73,.15)", "#BFF549"],
    ["POST", "/api/contact", "201 · 88ms", "rgba(100,180,255,.1)", "#64b4ff"],
    ["GET", "/api/stack", "200 · 6ms", "rgba(191,245,73,.15)", "#BFF549"],
    ["PUT", "/api/projects/:id", "200 · 34ms", "rgba(255,180,50,.1)", "#ffb432"],
    ["DEL", "/api/projects/:id", "204 · 18ms", "rgba(255,80,80,.1)", "#ff5050"],
  ] as const;
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0f0f0f" }}>
      <div
        style={{
          background: "#0D0D0D",
          borderBottom: "1px solid #1F1F1F",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 10, height: 10, background: "#2a2a2a" }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "#141414",
            border: "1px solid #1F1F1F",
            padding: "4px 10px",
            fontFamily: ms,
            fontSize: 9,
            color: "#444",
          }}
        >
          gorx-api.vercel.app/docs
        </div>
        <div
          style={{
            background: "rgba(191,245,73,.1)",
            border: "1px solid rgba(191,245,73,.2)",
            padding: "2px 8px",
            fontFamily: ms,
            fontSize: 8,
            color: "#BFF549",
          }}
        >
          ● Online
        </div>
      </div>
      <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
        <p
          style={{
            fontFamily: ms,
            fontSize: 10,
            color: "#BFF549",
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          API Routes
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {routes.map(([method, route, time, bg, color]) => (
            <div
              key={`${method}-${route}`}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr auto",
                alignItems: "center",
                gap: 12,
                background: "#141414",
                border: "1px solid #1F1F1F",
                padding: "10px 14px",
              }}
            >
              <span
                style={{
                  background: bg,
                  color,
                  fontFamily: ms,
                  fontSize: 8,
                  fontWeight: 700,
                  padding: "2px 6px",
                  textAlign: "center",
                }}
              >
                {method}
              </span>
              <span style={{ fontFamily: ms, fontSize: 10, color: "#fff" }}>{route}</span>
              <span style={{ fontFamily: ms, fontSize: 9, color: "#444" }}>{time}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: "#1F1F1F" }} />
        <div style={{ display: "flex", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontFamily: ms, fontSize: 9, color: "#444", textTransform: "uppercase" }}>Stack</p>
            <p style={{ fontFamily: cs, fontSize: 12, color: "#fff" }}>Next.js · Prisma · PostgreSQL</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontFamily: ms, fontSize: 9, color: "#444", textTransform: "uppercase" }}>Deploy</p>
            <p style={{ fontFamily: cs, fontSize: 12, color: "#fff" }}>Vercel · Edge Runtime</p>
          </div>
        </div>
      </div>
      <BottomFade />
    </div>
  );
}

function Panel4() {
  const wfs = [
    ["Deploy to Production", "Push to main → Build → Test → Deploy", "Active", "2m 14s", "#BFF549"],
    ["Lighthouse CI Check", "PR open → Score audit → Fail if < 90", "Active", "38s", "#BFF549"],
    ["Email via Resend", "Form submit → Validate → Send notification", "Active", "88ms", "#BFF549"],
    ["Storybook Publish", "Merge → Build Storybook → Chromatic sync", "Paused", "—", "#666"],
  ] as const;
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#0f0f0f", padding: "32px 40px", display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p
          style={{
            fontFamily: ms,
            fontSize: 10,
            color: "#BFF549",
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          Automações Ativas
        </p>
        <p style={{ fontFamily: ms, fontSize: 9, color: "#444" }}>4 workflows · 12 triggers</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {wfs.map(([name, desc, status, time, dot]) => (
          <div
            key={name}
            style={{
              background: "#141414",
              border: "1px solid #1F1F1F",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ width: 8, height: 8, background: dot, flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <p style={{ fontFamily: cs, fontSize: 12, fontWeight: 600, color: "#fff" }}>{name}</p>
              <p style={{ fontFamily: ms, fontSize: 9, color: "#555" }}>{desc}</p>
            </div>
            <span
              style={{
                fontFamily: ms,
                fontSize: 9,
                color: status === "Active" ? "#BFF549" : "#666",
                textTransform: "uppercase",
                letterSpacing: ".08em",
              }}
            >
              {status}
            </span>
            <span style={{ fontFamily: ms, fontSize: 10, color: "#888", minWidth: 50, textAlign: "right" }}>
              {time}
            </span>
          </div>
        ))}
      </div>
      <BottomFade />
    </div>
  );
}

function BottomFade() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{ height: 130, background: "linear-gradient(to top,#0D0D0D,transparent)" }}
    />
  );
}
