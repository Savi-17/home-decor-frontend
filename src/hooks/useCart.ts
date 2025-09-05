import { useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addItem = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && item.variant === product.variant
      );
      
      let newItems;
      if (existingItem) {
        newItems = prev.map(item =>
          item.id === product.id && item.variant === product.variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev, { ...product, quantity }];
      }
      
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const updateQuantity = (id: string, variant: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, variant);
      return;
    }
    
    setItems(prev => {
      const newItems = prev.map(item =>
        item.id === id && item.variant === variant
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeItem = (id: string, variant?: string) => {
    setItems(prev => {
      const newItems = prev.filter(item => 
        !(item.id === id && item.variant === variant)
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    itemCount
  };
}