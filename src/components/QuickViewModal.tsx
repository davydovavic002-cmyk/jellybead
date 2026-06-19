"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionary";
import { formatPrice } from "@/lib/currency";
import { getBadgeLabel, getBadgeStyle } from "@/lib/product-utils";

export function QuickViewModal() {
  const {
    state,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToast,
  } = useApp();
  const dict = getDictionary(state.language);
  const product = state.quickViewProduct;
  const [justAdded, setJustAdded] = useState(false);

  const info = product ? dict.products[product.id] : null;
  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleAdd = () => {
    if (!product) return;
    addToCart(product, false);
    addToast(`✨ ${product.id}`);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = () => {
    if (!product) return;
    toggleWishlist(product.id);
    addToast(
      inWishlist ? dict.wishlistRemoved : dict.wishlistAdded,
      "info"
    );
  };

  return (
    <AnimatePresence>
      {product && info && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-purple-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
          />
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/50 shadow-[0_32px_64px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:flex-row"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeQuickView}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 bg-white/60 backdrop-blur-md"
              >
                <X className="h-4 w-4 text-purple-700" />
              </button>

              <div className="relative aspect-square w-full sm:w-1/2">
                <Image
                  src={product.image}
                  alt={info.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {product.badge && (
                  <span
                    className={`absolute left-4 top-4 rounded-full bg-gradient-to-r ${getBadgeStyle(product.badge)} px-3 py-1 text-xs font-black text-white`}
                  >
                    {getBadgeLabel(dict, product.badge)}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <div>
                  <h3
                    className="mb-2 text-2xl font-black text-purple-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {info.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-purple-700/80">
                    {info.description}
                  </p>
                </div>

                <p
                  className="text-3xl font-black text-pink-600"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {formatPrice(product.basePrice, state.language)}
                </p>

                <div className="mt-auto flex gap-3">
                  <motion.button
                    onClick={handleAdd}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 py-3.5 text-sm font-bold text-white shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {justAdded ? dict.added : dict.addToCart}
                  </motion.button>
                  <motion.button
                    onClick={handleWishlist}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 backdrop-blur-md ${
                      inWishlist
                        ? "bg-pink-100 text-pink-500"
                        : "bg-white/40 text-purple-600"
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
