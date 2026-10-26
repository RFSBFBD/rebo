import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductAttributeOption } from '../types';

export interface StoreCartGroup {
  storeId: string;
  storeSlug: string;
  storeNameAr: string;
  storeLogo: string;
  storeDeliveryFee: number;
  items: CartItem[];
  subtotal: number;
}

interface CartContextType {
  items: CartItem[];
  groupedByStore: StoreCartGroup[];
  totalItemCount: number;
  subtotal: number;
  totalDeliveryFee: number;
  grandTotal: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  addToCart: (
    product: Product,
    quantity: number,
    selectedAttributes?: Record<string, string>,
    attributePriceModifier?: number
  ) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  clearStoreItems: (storeId: string) => void;
}

const CART_STORAGE_KEY = 'bayaak_cart_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart items to localStorage', e);
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedAttributes?: Record<string, string>,
    attributePriceModifier: number = 0
  ) => {
    // Generate unique composite key based on product ID and selected attribute options
    const attrKey = selectedAttributes
      ? Object.entries(selectedAttributes)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => `${k}:${v}`)
          .join('|')
      : '';
    const cartItemId = `${product.id}${attrKey ? `_${attrKey}` : ''}`;
    const unitPrice = product.price + attributePriceModifier;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          product,
          storeId: product.storeId,
          storeSlug: product.storeSlug,
          storeNameAr: product.storeNameAr,
          storeLogo: '',
          storeDeliveryFee: 0,
          quantity,
          selectedAttributes,
          unitPrice,
        };
        return [...prevItems, newItem];
      }
    });

    // Auto open cart drawer to give immediate interactive feedback
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const clearStoreItems = (storeId: string) => {
    setItems(prev => prev.filter(item => item.storeId !== storeId));
  };

  // Group items by store for multi-vendor distinction
  const groupedByStore: StoreCartGroup[] = React.useMemo(() => {
    const storeMap = new Map<string, StoreCartGroup>();

    items.forEach(item => {
      if (!storeMap.has(item.storeId)) {
        storeMap.set(item.storeId, {
          storeId: item.storeId,
          storeSlug: item.storeSlug,
          storeNameAr: item.storeNameAr,
          storeLogo: item.product.image,
          storeDeliveryFee: 15, // standard default delivery fee
          items: [],
          subtotal: 0,
        });
      }
      const group = storeMap.get(item.storeId)!;
      group.items.push(item);
      group.subtotal += item.unitPrice * item.quantity;
    });

    return Array.from(storeMap.values());
  }, [items]);

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  // Delivery fee per unique store in cart
  const totalDeliveryFee = groupedByStore.length > 0 ? groupedByStore.length * 15 : 0;
  const grandTotal = subtotal + totalDeliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        groupedByStore,
        totalItemCount,
        subtotal,
        totalDeliveryFee,
        grandTotal,
        isCartOpen,
        isCheckoutOpen,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        clearStoreItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
