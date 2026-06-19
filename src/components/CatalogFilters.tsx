"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import type { ProductCategory, SortOption } from "@/types";
import { getDictionary } from "@/i18n/dictionary";
import { useApp } from "@/context/AppContext";
import { getCategoryLabel } from "@/lib/product-utils";

const categories: (ProductCategory | "all")[] = [
  "all",
  "ring",
  "necklace",
  "earring",
  "bracelet",
  "choker",
  "cuff",
];

interface CatalogFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: ProductCategory | "all";
  onCategoryChange: (value: ProductCategory | "all") => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function CatalogFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: CatalogFiltersProps) {
  const { state } = useApp();
  const dict = getDictionary(state.language);

  return (
    <div className="mb-8 flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={dict.searchPlaceholder}
            className="w-full rounded-2xl border border-white/60 bg-white/40 py-2.5 pl-10 pr-4 text-sm text-purple-900 outline-none backdrop-blur-md transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-purple-500" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-2xl border border-white/60 bg-white/40 px-4 py-2.5 text-sm font-medium text-purple-800 outline-none backdrop-blur-md"
          >
            <option value="default">{dict.sortDefault}</option>
            <option value="price-asc">{dict.sortPriceAsc}</option>
            <option value="price-desc">{dict.sortPriceDesc}</option>
            <option value="name">{dict.sortName}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide transition ${
              category === cat
                ? "border-white/60 bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md"
                : "border-white/50 bg-white/30 text-purple-700 hover:bg-white/50"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {getCategoryLabel(dict, cat)}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
