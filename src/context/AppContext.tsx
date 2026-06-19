"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type {
  AppAction,
  AppState,
  CartAction,
  CartState,
  Language,
  Product,
  Toast,
} from "@/types";

const initialCartState: CartState = {
  items: [],
  isOpen: false,
  badgePulse: false,
};

const initialState: AppState = {
  language: "en",
  cart: initialCartState,
  wishlist: [],
  quickViewProduct: null,
  toasts: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.product.id === action.product.id
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          badgePulse: true,
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
        badgePulse: true,
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.productId
        ),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product.id !== action.productId
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "CLEAR_CART":
      return { ...state, items: [], isOpen: false };
    case "PULSE_BADGE":
      return { ...state, badgePulse: true };
    case "RESET_BADGE_PULSE":
      return { ...state, badgePulse: false };
    default:
      return state;
  }
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.language };
    case "CART":
      return { ...state, cart: cartReducer(state.cart, action.action) };
    case "TOGGLE_WISHLIST": {
      const has = state.wishlist.includes(action.productId);
      return {
        ...state,
        wishlist: has
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    }
    case "OPEN_QUICK_VIEW":
      return { ...state, quickViewProduct: action.product };
    case "CLOSE_QUICK_VIEW":
      return { ...state, quickViewProduct: null };
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.toast] };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  setLanguage: (language: Language) => void;
  addToCart: (product: Product, showToast?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  resetBadgePulse: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addToast: (message: string, type?: Toast["type"]) => void;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
}

const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  children: ReactNode;
  externalLanguage?: Language;
}

export function AppProvider({ children, externalLanguage }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (externalLanguage) {
      dispatch({ type: "SET_LANGUAGE", language: externalLanguage });
    }
  }, [externalLanguage]);

  const setLanguage = useCallback(
    (language: Language) => {
      if (!externalLanguage) {
        dispatch({ type: "SET_LANGUAGE", language });
      }
    },
    [externalLanguage],
  );

  const addToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    dispatch({ type: "ADD_TOAST", toast: { id, message, type } });
    setTimeout(() => dispatch({ type: "REMOVE_TOAST", id }), 3000);
  }, []);

  const addToCart = useCallback(
    (product: Product, showToast = true) => {
      dispatch({ type: "CART", action: { type: "ADD_ITEM", product } });
      if (showToast) {
        const id = `${Date.now()}-${Math.random()}`;
        dispatch({
          type: "ADD_TOAST",
          toast: { id, message: `✨ ${product.id}`, type: "success" },
        });
        setTimeout(() => dispatch({ type: "REMOVE_TOAST", id }), 3000);
      }
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: "CART", action: { type: "REMOVE_ITEM", productId } });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      dispatch({
        type: "CART",
        action: { type: "UPDATE_QUANTITY", productId, quantity },
      });
    },
    []
  );

  const toggleCart = useCallback(() => {
    dispatch({ type: "CART", action: { type: "TOGGLE_CART" } });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: "CART", action: { type: "OPEN_CART" } });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: "CART", action: { type: "CLOSE_CART" } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CART", action: { type: "CLEAR_CART" } });
  }, []);

  const resetBadgePulse = useCallback(() => {
    dispatch({ type: "CART", action: { type: "RESET_BADGE_PULSE" } });
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    dispatch({ type: "TOGGLE_WISHLIST", productId });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => state.wishlist.includes(productId),
    [state.wishlist]
  );

  const openQuickView = useCallback((product: Product) => {
    dispatch({ type: "OPEN_QUICK_VIEW", product });
  }, []);

  const closeQuickView = useCallback(() => {
    dispatch({ type: "CLOSE_QUICK_VIEW" });
  }, []);

  const cartTotal = state.cart.items.reduce(
    (sum, item) => sum + item.product.basePrice * item.quantity,
    0
  );

  const cartCount = state.cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const wishlistCount = state.wishlist.length;

  return (
    <AppContext.Provider
      value={{
        state,
        setLanguage,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        openCart,
        closeCart,
        clearCart,
        resetBadgePulse,
        toggleWishlist,
        isInWishlist,
        openQuickView,
        closeQuickView,
        addToast,
        cartTotal,
        cartCount,
        wishlistCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
