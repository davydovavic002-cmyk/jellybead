"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionary";
import { formatPrice } from "@/lib/currency";
import { Confetti } from "./Confetti";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function generateOrderId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `#JELLY-${num}`;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { state, cartTotal, clearCart } = useApp();
  const dict = getDictionary(state.language);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setOrderId(generateOrderId());
      setSubmitted(true);
      setLoading(false);
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setSubmitted(false);
    setOrderId("");
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-purple-900/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/50 shadow-[inset_0_4px_12px_rgba(255,255,255,0.6),0_24px_48px_rgba(0,0,0,0.1)] backdrop-blur-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Confetti active={submitted} />

              <div className="flex items-center justify-between border-b border-white/40 p-5">
                <h2
                  className="text-lg font-black text-purple-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {submitted ? dict.orderSuccess : dict.checkoutTitle}
                </h2>
                <motion.button
                  onClick={handleClose}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 bg-white/40"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4 text-purple-700" />
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center gap-4 p-8 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        damping: 12,
                        delay: 0.2,
                      }}
                    >
                      <CheckCircle className="h-16 w-16 text-emerald-500" />
                    </motion.div>
                    <p className="text-lg font-bold text-purple-900">
                      {dict.orderSuccess}
                    </p>
                    <motion.p
                      className="rounded-2xl border border-white/60 bg-white/40 px-6 py-3 text-xl font-black text-pink-600"
                      style={{ fontFamily: "var(--font-mono)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {dict.orderId}: {orderId}
                    </motion.p>
                    <motion.button
                      onClick={handleClose}
                      className="mt-2 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 px-8 py-3 text-sm font-bold text-white"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {dict.continueShopping}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 p-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <p className="text-sm text-purple-600/80">
                      {dict.checkoutSubtitle}
                    </p>

                    <div className="rounded-2xl border border-white/60 bg-white/30 px-4 py-3">
                      <span className="text-sm text-purple-700">{dict.total}: </span>
                      <span
                        className="font-bold text-pink-600"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {formatPrice(cartTotal, state.language)}
                      </span>
                    </div>

                    {(
                      [
                        { name: "name", type: "text" },
                        { name: "email", type: "email" },
                        { name: "phone", type: "tel" },
                        { name: "address", type: "text" },
                      ] as const
                    ).map((field) => (
                      <div key={field.name}>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-purple-600">
                          {dict[field.name]}
                        </label>
                        <input
                          type={field.type}
                          required
                          className="w-full rounded-xl border border-white/60 bg-white/40 px-4 py-2.5 text-sm text-purple-900 outline-none backdrop-blur-sm transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200/50"
                        />
                      </div>
                    ))}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="mt-2 w-full rounded-2xl border border-white/60 bg-gradient-to-r from-pink-400 to-purple-400 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(236,72,153,0.3)] disabled:opacity-70"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                    >
                      {loading ? (
                        <motion.span
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ...
                        </motion.span>
                      ) : (
                        dict.submitOrder
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
