"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import type { Language } from "@/types";

const languages: { code: Language; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "am", label: "AM" },
];

export function LanguageSwitcher() {
  const { state, setLanguage } = useApp();

  return (
    <div className="flex gap-1 rounded-full border border-white/60 bg-white/30 p-1 backdrop-blur-md">
      {languages.map(({ code, label }) => (
        <motion.button
          key={code}
          onClick={() => setLanguage(code)}
          className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider transition-colors ${
            state.language === code
              ? "bg-white/70 text-pink-600 shadow-sm"
              : "text-purple-600/70 hover:text-purple-800"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
