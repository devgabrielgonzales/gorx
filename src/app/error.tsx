"use client";

import { useEffect } from "react";
import ErrorScreen from "@/components/ErrorScreen";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
};

export default function Error({ error, reset, unstable_retry }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorScreen code={500} onRetry={unstable_retry ?? reset} />;
}
