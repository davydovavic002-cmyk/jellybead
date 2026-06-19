"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function JellyCursor() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    let id = 0;
    const handleMove = (e: MouseEvent) => {
      const bubble: Bubble = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 6,
      };
      setBubbles((prev) => [...prev.slice(-12), bubble]);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      setBubbles((prev) => prev.slice(1));
    }, 80);
    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full border border-white/40 bg-gradient-to-br from-pink-300/50 to-purple-300/50 backdrop-blur-sm"
          style={{
            width: b.size,
            height: b.size,
            left: b.x - b.size / 2,
            top: b.y - b.size / 2,
          }}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </div>
  );
}
