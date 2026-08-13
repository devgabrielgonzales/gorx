export const brand = {
  name: "Gorx",
  owner: "Gabriel Gonzales",
  role: "Desenvolvedor Frontend & Fullstack",
  city: "São Paulo, SP — Brasil",
  email: "contato@gorx.com.br",
  phone: "+55 (xx) xxxxx-xxxx",
  tagline: "Desenvolvedor frontend & fullstack. Interfaces rápidas, código limpo, resultado real.",
  badge: "Disponível para novos projetos em 2026",
};

export const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  thumbA?: string;
  thumbB?: string;
};

export const projects: Project[] = [
  {
    id: "lavoro",
    index: "01",
    name: "Lavoro Equipamentos",
    category: "E-commerce",
    description:
      "Catálogo digital de máquinas florestais com foco em performance e conversão.",
    url: "https://lavoro-beta.vercel.app",
    image: "/images/706shots_so.png",
  },
  {
    id: "dens",
    index: "02",
    name: "Dens Odontologia",
    category: "Landing Page",
    description:
      "Landing page para clínica odontológica com foco em agendamento e conversão.",
    url: "https://www.dens.com.br",
    image: "/images/560shots_so.png",
  },
  {
    id: "ideal",
    index: "03",
    name: "Ideal Seguros",
    category: "Landing Page",
    description:
      "Plataforma de cotação de seguros com as melhores condições do mercado.",
    url: "https://idealinsurance.com.br",
    image: "/images/747shots_so.png",
  },
  {
    id: "brasil-legends",
    index: "04",
    name: "Brasil Legends Motorsport",
    category: "Plataforma",
    description:
      "Plataforma de simulação de corridas com ranking e comunidade para pilotos de ACC.",
    url: "https://www.brasillegendsmotorsport.com.br",
    image: "/images/193shots_so.png",
  },
  {
    id: "fortnari",
    index: "05",
    name: "Fortnari Contabilidade",
    category: "Landing Page",
    description:
      "Site institucional para escritório contábil com foco em captação de clientes.",
    url: "https://fortnari.com.br",
    image: "/images/462shots_so.png",
  },
  {
    id: "oiana",
    index: "06",
    name: "OiAna",
    category: "Landing Page",
    description:
      "Plataforma de agendamentos direto da Dental Uni para beneficiários.",
    url: "https://oiana-lp.vercel.app",
    image: "/images/689shots_so.png",
  },
];

export const stats = [
  { value: "+30", label: "Projetos entregues" },
  { value: "3+", label: "Anos programando" },
  { value: "12+", label: "Tecnologias no stack" },
];

export const techStack = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "Git",
  "Figma",
  "Docker",
  "Vercel",
  "Cursor",
  "Claude",
  "Codex",
];

export const skills = [
  {
    n: "01",
    title: "Interfaces & Frontend",
    subtitle: "Sites, apps e sistemas com foco em experiência e performance",
    body:
      "Desenvolvimento de interfaces modernas com React e Next.js, desde a prototipação até o deploy. Atenção ao detalhe, performance e acessibilidade em cada componente.",
    bullets: [
      "React & Next.js (App Router)",
      "TypeScript em todo o projeto",
      "Tailwind CSS & design systems",
      "Animações com Framer Motion",
      "Performance & Web Vitals",
      "Responsivo & acessível",
    ],
  },
  {
    n: "02",
    title: "Backend & APIs",
    subtitle: "Aplicações web, APIs REST e integrações entre plataformas",
    body:
      "Construção de APIs e sistemas que sustentam o frontend. Foco em arquitetura limpa, banco de dados bem modelado e integrações confiáveis.",
    bullets: [
      "Node.js & Express / Fastify",
      "PostgreSQL & Prisma ORM",
      "APIs REST bem documentadas",
      "Autenticação JWT & OAuth",
      "Docker & deploy em cloud",
      "Testes automatizados",
    ],
  },
  {
    n: "03",
    title: "UI/UX & Prototipação",
    subtitle: "Do wireframe ao componente final, com consistência e identidade",
    body:
      "Criação de interfaces com foco na experiência do usuário. Uso o Figma para prototipar antes de codar — o que reduz retrabalho e mantém consistência visual.",
    bullets: [
      "Prototipação no Figma",
      "Design systems & tokens",
      "Componentização reutilizável",
      "Microinterações & animações",
      "Dark mode & temas",
      "Acessibilidade (WCAG)",
    ],
  },
];

export const processSteps = [
  {
    n: "01",
    label: "Descobrir",
    title: "Entender & Planejar",
    body:
      "Entendo o problema antes de escrever qualquer linha. Defino arquitetura, stack e escopo.",
    output: "Output: arquitetura definida + stack escolhida + escopo fechado.",
  },
  {
    n: "02",
    label: "Construir",
    title: "Codar & Iterar",
    body:
      "Escrevo código limpo, com commits organizados e progresso visível. Feedback é bem-vindo em qualquer etapa.",
    output: "Output: PRs revisáveis + código testado + documentação inline.",
  },
  {
    n: "03",
    label: "Escalar",
    title: "Deploy & Refinar",
    body:
      "Entrego com CI/CD configurado, monitoramento ativo e disponível para ajustes após o lançamento.",
    output: "Output: aplicação em produção + pipeline configurado + suporte pós-deploy.",
  },
];

export const flow = {
  input: {
    role: "Você / Colaborador",
    quote:
      "Preciso de uma aplicação responsiva, com boa performance e código organizado que eu consiga evoluir depois.",
    label: "INPUT / IDEIA",
  },
  output: {
    role: "Gorx entrega",
    quote:
      "Código limpo, componentizado, com testes, documentação e deploy configurado — pronto para escalar.",
    label: "OUTPUT / CÓDIGO",
  },
  attributes: ["Código limpo", "Bem documentado", "Performático", "Escalável"],
};

export const social = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "GitHub", href: "#" },
];
