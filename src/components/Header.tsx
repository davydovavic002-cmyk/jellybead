"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WishlistPanel } from "./WishlistPanel";

export function Header() {
  const { state, toggleCart, cartCount, wishlistCount, resetBadgePulse } =
    useApp();
  const dict = getDictionary(state.language);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    if (state.cart.badgePulse) {
      const timer = setTimeout(resetBadgePulse, 600);
      return () => clearTimeout(timer);
    }
  }, [state.cart.badgePulse, resetBadgePulse]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/40 bg-white/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.h1
              className="text-2xl font-black tracking-tight text-pink-600 sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.brand}
            </motion.h1>
            <p className="text-xs font-medium text-purple-500/80 sm:text-sm">
              {dict.tagline}
            </p>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            <motion.button
              onClick={() => setWishlistOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/40 shadow-[inset_0_4px_12px_rgba(255,255,255,0.6),0_8px_16px_rgba(0,0,0,0.05)] backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={dict.wishlist}
            >
              <Heart className="h-5 w-5 text-pink-500" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-pink-500 px-1 text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </motion.button>

            <motion.button
              onClick={toggleCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/40 shadow-[inset_0_4px_12px_rgba(255,255,255,0.6),0_8px_16px_rgba(0,0,0,0.05)] backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={dict.cart}
            >
              <ShoppingBag className="h-5 w-5 text-purple-700" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-1 text-[10px] font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={
                    state.cart.badgePulse
                      ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.4 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      <WishlistPanel
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </>
  );
}
