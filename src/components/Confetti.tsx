"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = [
  "#FF6B9D",
  "#C084FC",
  "#34D399",
  "#FBBF24",
  "#60A5FA",
  "#F472B6",
  "#A78BFA",
  "#4ADE80",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
}

export function Confetti({ active }: { active: boolean }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 600,
      y: -(Math.random() * 400 + 100),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 4,
      rotation: Math.random() * 720 - 360,
      delay: Math.random() * 0.3,
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-sm"
          style={{
            width: p.size,
            height: p.size * 1.5,
            backgroundColor: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [1, 1, 0],
            rotate: p.rotation,
            scale: [0, 1.2, 0.8],
          }}
          transition={{
            duration: 1.8,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
