export type Language = "ru" | "en" | "am";

export type ProductCategory =
  | "ring"
  | "necklace"
  | "earring"
  | "bracelet"
  | "choker"
  | "cuff";

export type ProductBadge = "new" | "hot" | "limited";

export type SortOption = "default" | "price-asc" | "price-desc" | "name";

export interface Product {
  id: string;
  basePrice: number;
  image: string;
  category: ProductCategory;
  badge?: ProductBadge;
  gradient: string;
  pulseColors: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  badgePulse: boolean;
}

export type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "CLEAR_CART" }
  | { type: "PULSE_BADGE" }
  | { type: "RESET_BADGE_PULSE" };

export interface Toast {
  id: string;
  message: string;
  type: "success" | "info";
}

export interface AppState {
  language: Language;
  cart: CartState;
  wishlist: string[];
  quickViewProduct: Product | null;
  toasts: Toast[];
}

export type AppAction =
  | { type: "SET_LANGUAGE"; language: Language }
  | { type: "CART"; action: CartAction }
  | { type: "TOGGLE_WISHLIST"; productId: string }
  | { type: "OPEN_QUICK_VIEW"; product: Product }
  | { type: "CLOSE_QUICK_VIEW" }
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string };

export interface Dictionary {
  brand: string;
  tagline: string;
  catalog: string;
  addToCart: string;
  added: string;
  cart: string;
  cartEmpty: string;
  cartEmptyHint: string;
  checkout: string;
  total: string;
  quantity: string;
  remove: string;
  close: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  submitOrder: string;
  orderSuccess: string;
  orderId: string;
  continueShopping: string;
  wishlist: string;
  wishlistEmpty: string;
  wishlistAdded: string;
  wishlistRemoved: string;
  quickView: string;
  search: string;
  searchPlaceholder: string;
  sortBy: string;
  sortDefault: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortName: string;
  allCategories: string;
  categoryRing: string;
  categoryNecklace: string;
  categoryEarring: string;
  categoryBracelet: string;
  categoryChoker: string;
  categoryCuff: string;
  badgeNew: string;
  badgeHot: string;
  badgeLimited: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  featured: string;
  noResults: string;
  addedToCart: string;
  products: Record<
    string,
    {
      name: string;
      description: string;
    }
  >;
}
