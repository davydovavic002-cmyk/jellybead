import type { Dictionary, ProductBadge, ProductCategory } from "@/types";

export function getCategoryLabel(
  dict: Dictionary,
  category: ProductCategory | "all"
): string {
  const map: Record<ProductCategory | "all", keyof Dictionary> = {
    all: "allCategories",
    ring: "categoryRing",
    necklace: "categoryNecklace",
    earring: "categoryEarring",
    bracelet: "categoryBracelet",
    choker: "categoryChoker",
    cuff: "categoryCuff",
  };
  return dict[map[category]] as string;
}

export function getBadgeLabel(dict: Dictionary, badge: ProductBadge): string {
  const map: Record<ProductBadge, keyof Dictionary> = {
    new: "badgeNew",
    hot: "badgeHot",
    limited: "badgeLimited",
  };
  return dict[map[badge]] as string;
}

export function getBadgeStyle(badge: ProductBadge): string {
  const styles: Record<ProductBadge, string> = {
    new: "from-cyan-400 to-blue-500",
    hot: "from-orange-400 to-pink-500",
    limited: "from-purple-500 to-fuchsia-600",
  };
  return styles[badge];
}
