"use client";

const stack = [
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/ffffff" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/ffffff" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/ffffff" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/ffffff" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/ffffff" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/ffffff" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/ffffff" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/ffffff" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/ffffff" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/ffffff" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/ffffff" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/ffffff" },
  { name: "Cursor", icon: null as string | null },
  { name: "Claude", icon: "https://cdn.simpleicons.org/anthropic/ffffff" },
  { name: "Codex", icon: "https://cdn.simpleicons.org/openai/ffffff" },
];

const items = [...stack, ...stack];

export default function StackMarquee() {
  return (
    <section id="stack">
      <div className="max-w-container mx-auto border-x border-t border-[#1f1f1f]">
        <div className="px-6 py-4 border-b border-[#1f1f1f]">
          <p className="text-xs font-mono text-[#666] uppercase tracking-widest">Stack & Tecnologias</p>
        </div>
        <div className="marquee-container overflow-hidden py-8">
          <div className="marquee-track">
            {items.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="flex flex-col items-center gap-2 px-10 flex-shrink-0 group cursor-default"
              >
                {t.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.icon}
                    alt={t.name}
                    className="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                      <path d="M7 3L7 24L12.5 18.5L16.5 28L20 26.5L16 17L23.5 17Z" />
                    </svg>
                  </div>
                )}
                <span className="text-xs font-mono text-[#666] group-hover:text-white transition-colors">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
