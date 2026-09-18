"use client";

import FadeIn from "@/components/ui/FadeIn";

export default function Contact() {
  return (
    <section id="contato">
      <div className="max-w-container mx-auto border-x border-[#1f1f1f] border-t">
        <div className="grid md:grid-cols-2">
          {/* Left: info */}
          <div className="px-8 py-12 border-r border-[#1f1f1f]">
            <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-8">/ contato</p>
            <FadeIn>
              <h2 className="text-3xl font-bold mb-10">
                Vamos construir
                <br />
                <span className="text-[#bff549]">algo juntos.</span>
              </h2>
            </FadeIn>

            <div className="flex flex-col gap-6">
              <FadeIn delay={0.1} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BFF549" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.74 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.65 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.06z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#666] font-mono mb-1">Telefone / WhatsApp</p>
                  <p className="text-sm font-medium">+55 (xx) xxxxx-xxxx</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.15} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BFF549" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#666] font-mono mb-1">E-mail</p>
                  <p className="text-sm font-medium">contato@gorx.com.br</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BFF549" strokeWidth="1.5">
                    <path d="M12 2L3 10v1c0 6 5 10 9 11 4-1 9-5 9-11v-1L12 2z" />
                    <rect x="10" y="8" width="4" height="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#666] font-mono mb-1">Localização</p>
                  <p className="text-sm font-medium">São Paulo, SP — Brasil</p>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.3} className="flex gap-4 mt-10">
              {[
                <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="4" height="4" />
                  <rect x="2" y="9" width="4" height="12" />
                  <path d="M10 9h4v3c1-2 3-3 4-3 3 0 4 2 4 5v8h-4v-7c0-2-1-2-2-2s-2 0-2 2v7h-4V9z" />
                </svg>,
                <svg key="ig" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" />
                  <rect x="8" y="8" width="8" height="8" />
                  <rect x="15" y="5" width="3" height="3" />
                </svg>,
                <svg key="x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>,
                <svg key="gh" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="18" />
                  <path d="M7 8l4 4-4 4M14 16h4" />
                </svg>,
              ].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-[#1f1f1f] flex items-center justify-center hover:border-[#bff549] hover:text-[#bff549] transition-colors text-[#666]"
                >
                  {Icon}
                </a>
              ))}
            </FadeIn>
          </div>

          {/* Right: form */}
          <div className="px-8 py-12">
            <FadeIn delay={0.1}>
              <form className="flex flex-col gap-4">
                <Field label="Nome completo" name="nome" placeholder="Seu nome" required />
                <Field label="Telefone / WhatsApp" name="telefone" type="tel" placeholder="+55 (xx) xxxxx-xxxx" />
                <Field label="E-mail" name="email" type="email" placeholder="seu@email.com" required />
                <div>
                  <label className="block text-xs font-mono text-[#666] uppercase tracking-wider mb-2">
                    Assunto
                  </label>
                  <select
                    name="assunto"
                    className="w-full bg-[#141414] border border-[#1f1f1f] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#bff549] transition-colors"
                  >
                    <option value="">Selecione...</option>
                    <option value="projeto">Novo projeto</option>
                    <option value="freela">Freela / Colaboração</option>
                    <option value="emprego">Oportunidade de emprego</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#666] uppercase tracking-wider mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="mensagem"
                    rows={4}
                    placeholder="Conte sobre o projeto, objetivo e prazo..."
                    className="w-full bg-[#141414] border border-[#1f1f1f] px-4 py-3 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#bff549] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#bff549] text-[#0d0d0d] px-8 py-4 font-bold text-sm hover:bg-white transition-colors mt-2 flex items-center justify-center gap-2"
                >
                  Enviar mensagem
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-mono text-[#666] uppercase tracking-wider mb-2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#141414] border border-[#1f1f1f] px-4 py-3 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#bff549] transition-colors"
      />
    </div>
  );
}
