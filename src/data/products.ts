import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "cyber-candy-ring",
    basePrice: 12490,
    image: "/products/cyber-candy-ring.png",
    category: "ring",
    badge: "hot",
    gradient: "bg-gradient-to-br from-emerald-300 via-cyan-400 to-green-500",
    pulseColors: "from-emerald-400/60 via-cyan-300/40 to-green-400/60",
  },
  {
    id: "bubblegum-pearl-chain",
    basePrice: 18900,
    image: "/products/bubblegum-pearl-chain.png",
    category: "necklace",
    badge: "new",
    gradient: "bg-gradient-to-tr from-pink-300 via-rose-200 to-fuchsia-400",
    pulseColors: "from-pink-400/60 via-rose-300/40 to-fuchsia-400/60",
  },
  {
    id: "acid-gummy-bear-earring",
    basePrice: 8750,
    image: "/products/acid-gummy-bear-earring.png",
    category: "earring",
    badge: "hot",
    gradient: "bg-gradient-to-bl from-lime-300 via-yellow-300 to-green-400",
    pulseColors: "from-lime-400/60 via-yellow-300/40 to-green-400/60",
  },
  {
    id: "liquid-neon-bracelet",
    basePrice: 15200,
    image: "/products/liquid-neon-bracelet.png",
    category: "bracelet",
    gradient: "bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-500",
    pulseColors: "from-violet-400/60 via-purple-300/40 to-indigo-400/60",
  },
  {
    id: "hyper-pop-choker",
    basePrice: 22100,
    image: "/products/hyper-pop-choker.png",
    category: "choker",
    badge: "limited",
    gradient: "bg-gradient-to-tl from-red-400 via-pink-400 to-rose-300",
    pulseColors: "from-red-400/60 via-pink-400/40 to-rose-300/60",
  },
  {
    id: "glitch-hologram-ear-cuff",
    basePrice: 11300,
    image: "/products/glitch-hologram-ear-cuff.png",
    category: "cuff",
    badge: "new",
    gradient: "bg-gradient-to-br from-sky-300 via-teal-200 to-violet-400",
    pulseColors: "from-sky-400/60 via-teal-300/40 to-violet-400/60",
  },
];

export const featuredProductId = "hyper-pop-choker";
