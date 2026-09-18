"use client";
import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#hero"
      aria-label="Voltar ao início"
      className="back-top-float"
      data-visible={visible}
    >
      <Rocket size={20} />
    </a>
  );
}
