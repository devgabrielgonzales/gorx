import { brand } from "@/data/content";

export { brand };

export const siteTitle = `${brand.name} | ${brand.owner}`;
export const siteDescription =
  "Gabriel Gonzales, desenvolvedor frontend & fullstack. Design, desenvolvimento e experiências digitais com atenção a cada detalhe.";

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  if (
    process.env.VERCEL_ENV === "production" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "https://gorx.com.br";
}
