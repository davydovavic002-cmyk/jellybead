"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionary";
import { products } from "@/data/products";

export function ToastContainer() {
  const { state } = useApp();
  const dict = getDictionary(state.language);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence>
        {state.toasts.map((toast) => {
          const product = products.find((p) => p.id === toast.message.replace("✨ ", ""));
          const message = product
            ? `${dict.products[product.id].name} ${dict.addedToCart}`
            : toast.message;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-5 py-3 shadow-[0_8px_32px_rgba(236,72,153,0.2)] backdrop-blur-xl"
            >
              {product && (
                <div
                  className="h-10 w-10 shrink-0 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
              )}
              <span className="text-sm font-bold text-purple-900">{message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
