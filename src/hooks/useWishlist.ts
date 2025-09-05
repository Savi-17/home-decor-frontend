
export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const addItem = (product: WishlistItem) => {
    setItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev;
      
      const newItems = [...prev, product];
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const newItems = prev.filter(item => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return newItems;
    });
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  const toggleItem = (product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return {
    items,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    count: items.length
  };
}
