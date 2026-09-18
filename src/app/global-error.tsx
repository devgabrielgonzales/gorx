"use client";

import { useEffect } from "react";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import ErrorScreen from "@/components/ErrorScreen";
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

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
};

export default function GlobalError({ error, reset, unstable_retry }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${mono.variable}`}
    >
      <body>
        <ErrorScreen code={500} onRetry={unstable_retry ?? reset} />
      </body>
    </html>
  );
}
