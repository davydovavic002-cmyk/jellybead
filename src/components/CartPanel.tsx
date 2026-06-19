"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionary";
import { formatPrice } from "@/lib/currency";
import { useState } from "react";
import { CheckoutModal } from "./CheckoutModal";

export function CartPanel() {
  const {
    state,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useApp();
  const dict = getDictionary(state.language);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {state.cart.isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-purple-900/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/60 bg-white/50 shadow-[-12px_0_40px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              <div className="flex items-center justify-between border-b border-white/40 p-5">
                <h2
                  className="text-xl font-black text-purple-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dict.cart}
                </h2>
                <motion.button
                  onClick={closeCart}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/40 backdrop-blur-md"
                  whileTap={{ scale: 0.9 }}
                  aria-label={dict.close}
                >
                  <X className="h-5 w-5 text-purple-700" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {state.cart.items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <motion.div
                      className="h-20 w-20 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-60"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-lg font-bold text-purple-800">
                      {dict.cartEmpty}
                    </p>
                    <p className="text-sm text-purple-600/70">
                      {dict.cartEmptyHint}
                    </p>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {state.cart.items.map((item) => {
                      const info = dict.products[item.product.id];
                      return (
                        <motion.li
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex gap-3 rounded-2xl border border-white/60 bg-white/40 p-3 shadow-[inset_0_2px_8px_rgba(255,255,255,0.5)] backdrop-blur-md"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                            <img
                              src={item.product.image}
                              alt={info.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col gap-1">
                            <h4 className="text-sm font-bold text-purple-900">
                              {info.name}
                            </h4>
                            <span
                              className="text-sm font-bold text-pink-600"
                              style={{ fontFamily: "var(--font-mono)" }}
                            >
                              {formatPrice(
                                item.product.basePrice,
                                state.language
                              )}
                            </span>
                            <div className="mt-1 flex items-center gap-2">
                              <motion.button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/60 bg-white/50"
                                whileTap={{ scale: 0.85 }}
                              >
                                <Minus className="h-3 w-3 text-purple-700" />
                              </motion.button>
                              <span className="w-6 text-center text-sm font-bold text-purple-800">
                                {item.quantity}
                              </span>
                              <motion.button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/60 bg-white/50"
                                whileTap={{ scale: 0.85 }}
                              >
                                <Plus className="h-3 w-3 text-purple-700" />
                              </motion.button>
                              <motion.button
                                onClick={() =>
                                  removeFromCart(item.product.id)
                                }
                                className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-red-400 hover:bg-red-50"
                                whileTap={{ scale: 0.85 }}
                                aria-label={dict.remove}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {state.cart.items.length > 0 && (
                <div className="border-t border-white/40 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-bold text-purple-800">
                      {dict.total}
                    </span>
                    <span
                      className="text-xl font-black text-pink-600"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {formatPrice(cartTotal, state.language)}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full rounded-2xl border border-white/60 bg-gradient-to-r from-pink-400 to-purple-400 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(236,72,153,0.3)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {dict.checkout}
                  </motion.button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}
