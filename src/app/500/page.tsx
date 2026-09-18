import type { Metadata } from "next";
import ErrorScreen from "@/components/ErrorScreen";

export const metadata: Metadata = {
  title: "500 · Erro interno | Gorx",
  robots: { index: false, follow: false },
};

export default function InternalError() {
  return <ErrorScreen code={500} />;
}
