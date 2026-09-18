import type { Metadata } from "next";
import ErrorScreen from "@/components/ErrorScreen";

export const metadata: Metadata = {
  title: "503 · Indisponível | Gorx",
  robots: { index: false, follow: false },
};

export default function ServiceUnavailable() {
  return <ErrorScreen code={503} />;
}
