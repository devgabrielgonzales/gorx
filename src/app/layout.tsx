import type { Metadata } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Preloader from "@/components/Preloader";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import "overlayscrollbars/overlayscrollbars.css";
import "./globals.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gorx | Gabriel Gonzales",
  description:
    "Gabriel Gonzales, desenvolvedor frontend & fullstack. Design, desenvolvimento e experiências digitais com atenção a cada detalhe.",
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${mono.variable}`}
      data-overlayscrollbars-initialize
    >
      {/* Extensions write attributes onto body before React hydrates
          (ColorZilla's cz-shortcut-listen, for one), which React reports as a
          mismatch. This only suppresses body's own attributes, not children. */}
      <body data-overlayscrollbars-initialize suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo
        </a>
        <Preloader />
        <SmoothCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
