"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { featuredProductId, products } from "@/data/products";
import { getDictionary } from "@/i18n/dictionary";
import { formatPrice } from "@/lib/currency";

const marqueeItems = [
  "CYBER CANDY",
  "BUBBLEGUM PEARL",
  "ACID GUMMY",
  "LIQUID NEON",
  "HYPER POP",
  "GLITCH HOLO",
  "JELLY BEAD",
  "Y2K DROP",
];

export function HeroSection() {
  const { state, openQuickView } = useApp();
  const dict = getDictionary(state.language);
  const featured = products.find((p) => p.id === featuredProductId)!;
  const featuredInfo = dict.products[featured.id];

  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-10">
      <div className="mx-auto max-w-7xl">
        {/* Marquee */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/40 bg-white/20 py-3 backdrop-blur-md">
          <motion.div
            className="flex w-max gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-sm font-black tracking-widest text-purple-600/70"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Sparkles className="h-4 w-4 text-pink-400" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              className="mb-4 inline-block rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-4 py-1 text-xs font-bold text-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ {dict.featured}
            </motion.span>
            <h2
              className="mb-4 text-5xl font-black leading-none tracking-tight text-purple-900 sm:text-6xl md:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.heroTitle}
            </h2>
            <p className="mb-8 max-w-md text-lg text-purple-700/80">
              {dict.heroSubtitle}
            </p>
            <motion.button
              onClick={scrollToCatalog}
              className="rounded-2xl border border-white/60 bg-gradient-to-r from-pink-400 to-purple-400 px-8 py-4 text-sm font-bold text-white shadow-[0_8px_32px_rgba(236,72,153,0.35)]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {dict.heroCta} →
            </motion.button>
          </motion.div>

          <motion.button
            onClick={() => openQuickView(featured)}
            className="group relative mx-auto w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 shadow-[inset_0_4px_12px_rgba(255,255,255,0.6),0_24px_48px_rgba(236,72,153,0.15)] backdrop-blur-md">
              <Image
                src={featured.image}
                alt={featuredInfo.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-purple-500/20"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/60 to-transparent p-6 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-pink-200">
                  {dict.featured}
                </p>
                <p
                  className="text-xl font-black text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {featuredInfo.name}
                </p>
                <p
                  className="text-lg font-bold text-pink-200"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {formatPrice(featured.basePrice, state.language)}
                </p>
              </div>
            </div>
            <motion.div
              className="absolute -right-3 -top-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-1 text-xs font-black text-white shadow-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              HOT
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
