"use client";
import { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";

const LABEL = "E-mail";

/** The address as selectable text, with a button that copies it. */
export default function CopyEmail({ email }: { email: string }) {
  const address = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState(LABEL);

  useEffect(() => {
    if (label === LABEL) return;
    const timer = setTimeout(() => setLabel(LABEL), 1800);
    return () => clearTimeout(timer);
  }, [label]);

  const select = () => {
    // Clipboard access can be refused; selecting the text leaves Ctrl+C one step away.
    const node = address.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    setLabel("Selecionado, use Ctrl+C");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("Copiado");
    } catch {
      select();
    }
  };

  return (
    <div className="gx-mail-b" data-reveal>
      <span className="gx-b-tab" aria-live="polite">
        {label}
      </span>
      <div className="gx-b-box">
        <div className="gx-b-in">
          <span className="gx-mail" ref={address}>
            {email}
          </span>
          <button
            className="gx-b-icon"
            type="button"
            aria-label="Copiar e-mail"
            onClick={copy}
          >
            <Copy size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
