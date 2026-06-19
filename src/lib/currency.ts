import type { Language } from "@/types";

const RATES: Record<Language, number> = {
  ru: 1,
  en: 0.011,
  am: 4.2,
};

const CURRENCY: Record<Language, { symbol: string; locale: string; code: string }> = {
  ru: { symbol: "₽", locale: "ru-RU", code: "RUB" },
  en: { symbol: "$", locale: "en-US", code: "USD" },
  am: { symbol: "֏", locale: "hy-AM", code: "AMD" },
};

export function convertPrice(basePriceRub: number, language: Language): number {
  return Math.round(basePriceRub * RATES[language]);
}

export function formatPrice(basePriceRub: number, language: Language): string {
  const converted = convertPrice(basePriceRub, language);
  const { symbol, locale } = CURRENCY[language];

  if (language === "en") {
    return `${symbol}${converted.toLocaleString(locale)}`;
  }

  return `${converted.toLocaleString(locale)} ${symbol}`;
}

export function formatTotal(items: { product: { basePrice: number }; quantity: number }[], language: Language): string {
  const total = items.reduce((sum, item) => sum + item.product.basePrice * item.quantity, 0);
  return formatPrice(total, language);
}
