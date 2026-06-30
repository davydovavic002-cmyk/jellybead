"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { CartPanel } from "@/components/CartPanel";
import { ProductCard } from "@/components/ProductCard";
import { HeroSection } from "@/components/HeroSection";
import { CatalogFilters } from "@/components/CatalogFilters";
import { QuickViewModal } from "@/components/QuickViewModal";
import { ToastContainer } from "@/components/ToastContainer";
import { JellyCursor } from "@/components/JellyCursor";
import { products } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionary";
import type { ProductCategory, SortOption } from "@/types";

export default function Home() {
  const { state } = useApp();
  const dict = getDictionary(state.language);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<SortOption>("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const info = dict.products[p.id];
        return (
          info.name.toLowerCase().includes(q) ||
          info.description.toLowerCase().includes(q)
        );
      });
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-desc":
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "name":
        result.sort((a, b) =>
          dict.products[a.id].name.localeCompare(dict.products[b.id].name)
        );
        break;
    }

    return result;
  }, [category, search, sort, dict]);

  return (
    <div id="app-root" className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="neon-blob absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-400/40" />
        <div
          className="neon-blob absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-purple-400/35"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="neon-blob absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-fuchsia-300/30"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="neon-blob absolute right-1/4 top-2/3 h-64 w-64 rounded-full bg-cyan-300/25"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <JellyCursor />

      <div className="relative z-10">
        <Header />
        <HeroSection />

        <main id="catalog" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-3 text-4xl font-black tracking-tight text-purple-900 sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.catalog}
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
          </motion.div>

          <CatalogFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
          />

          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center text-lg font-medium text-purple-600/70"
              >
                {dict.noResults}
              </motion.p>
            ) : (
              <motion.div
                key={`${category}-${sort}-${search}`}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="border-t border-white/30 bg-white/10 py-8 text-center backdrop-blur-sm">
          <p
            className="text-sm font-bold text-purple-600/60"
            style={{ fontFamily: "var(--font-display)" }}
          >
            JELLY BEAD © 2026
          </p>
        </footer>
        <div
          id="embed-height-sentinel"
          aria-hidden="true"
          style={{ height: 0, width: "100%" }}
        />
      </div>

      <CartPanel />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
}
