"use client";

import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionary";
import { formatPrice } from "@/lib/currency";
import { getBadgeLabel, getBadgeStyle } from "@/lib/product-utils";
import type { Product } from "@/types";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const {
    state,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    addToast,
  } = useApp();
  const dict = getDictionary(state.language);
  const productInfo = dict.products[product.id];
  const [justAdded, setJustAdded] = useState(false);
  const [burst, setBurst] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setBurst(true);
    setTimeout(() => setJustAdded(false), 1500);
    setTimeout(() => setBurst(false), 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(
      inWishlist ? dict.wishlistRemoved : dict.wishlistAdded,
      "info"
    );
  };

  return (
    <motion.article
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-[inset_0_4px_12px_rgba(255,255,255,0.6),0_12px_24px_rgba(0,0,0,0.05)] backdrop-blur-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        y: -5,
        rotate: [0, -1, 1, 0],
        transition: { rotate: { duration: 0.4 } },
      }}
      onClick={() => openQuickView(product)}
      layout
    >
      <div className="relative aspect-square overflow-hidden">
        <ProductImage
          src={product.image}
          alt={productInfo.name}
          className="h-full w-full"
        />

        <div className={`absolute inset-0 bg-gradient-to-br ${product.pulseColors} mix-blend-overlay opacity-30`} />

        {product.badge && (
          <motion.span
            className={`absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r ${getBadgeStyle(product.badge)} px-2.5 py-0.5 text-[10px] font-black text-white shadow-md`}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getBadgeLabel(dict, product.badge)}
          </motion.span>
        )}

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <motion.button
            onClick={handleWishlist}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 backdrop-blur-md ${
              inWishlist
                ? "bg-pink-100 text-pink-500"
                : "bg-white/50 text-purple-600"
            }`}
            whileTap={{ scale: 0.85 }}
            aria-label={dict.wishlist}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 bg-white/50 text-purple-600 backdrop-blur-md"
            whileTap={{ scale: 0.85 }}
            aria-label={dict.quickView}
          >
            <Eye className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-purple-900/70 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <p className="text-center text-xs font-bold text-white/90">
            {dict.quickView} →
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          className="text-lg font-black leading-tight text-purple-900 sm:text-xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {productInfo.name}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-purple-700/80">
          {productInfo.description}
        </p>
        <div className="flex items-center justify-between gap-3">
          <span
            className="text-xl font-bold text-pink-600 sm:text-2xl"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {formatPrice(product.basePrice, state.language)}
          </span>
          <motion.button
            onClick={handleAdd}
            className="relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-r from-pink-400 to-purple-400 px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(236,72,153,0.3)]"
            whileTap={{ scale: 0.92 }}
          >
            {burst && (
              <motion.span
                className="absolute inset-0 rounded-2xl bg-white"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
            {justAdded ? dict.added : dict.addToCart}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
