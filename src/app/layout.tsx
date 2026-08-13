import type { Metadata } from "next";
import { Chakra_Petch, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AnimatedBg from "@/components/ui/AnimatedBg";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const display = Chakra_Petch({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Gorx — Desenvolvedor Frontend & Fullstack",
  description:
    "Desenvolvedor frontend & fullstack. Interfaces rápidas, código limpo, resultado real.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={cn(display.variable, mono.variable, "font-sans", geist.variable)}>
      <body className="relative">
        <AnimatedBg />
        <div className="relative z-10">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </div>
      </body>
    </html>
  );
}
