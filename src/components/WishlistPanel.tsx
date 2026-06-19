"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { products } from "@/data/products";
import { getDictionary } from "@/i18n/dictionary";
import { formatPrice } from "@/lib/currency";

interface WishlistPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistPanel({ isOpen, onClose }: WishlistPanelProps) {
  const { state, addToCart, toggleWishlist, addToast } = useApp();
  const dict = getDictionary(state.language);

  const wishlistProducts = products.filter((p) =>
    state.wishlist.includes(p.id)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-purple-900/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed left-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-r border-white/60 bg-white/50 shadow-[12px_0_40px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-white/40 p-5">
              <h2
                className="flex items-center gap-2 text-xl font-black text-purple-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Heart className="h-5 w-5 fill-pink-400 text-pink-400" />
                {dict.wishlist}
              </h2>
              <motion.button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/40"
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5 text-purple-700" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {wishlistProducts.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="h-16 w-16 text-pink-300" />
                  </motion.div>
                  <p className="text-purple-700">{dict.wishlistEmpty}</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {wishlistProducts.map((product) => {
                    const info = dict.products[product.id];
                    return (
                      <motion.li
                        key={product.id}
                        layout
                        className="flex gap-3 rounded-2xl border border-white/60 bg-white/40 p-3 backdrop-blur-md"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={product.image}
                            alt={info.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                          <h4 className="text-sm font-bold text-purple-900">
                            {info.name}
                          </h4>
                          <span
                            className="text-sm font-bold text-pink-600"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            {formatPrice(product.basePrice, state.language)}
                          </span>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <motion.button
                            onClick={() => {
                              addToCart(product);
                              addToast(`✨ ${product.id}`);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                            whileTap={{ scale: 0.85 }}
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                          </motion.button>
                          <motion.button
                            onClick={() => toggleWishlist(product.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-pink-400"
                            whileTap={{ scale: 0.85 }}
                          >
                            <Heart className="h-3.5 w-3.5 fill-current" />
                          </motion.button>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
