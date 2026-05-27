import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Load from localStorage
const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => loadFromStorage('cart', []));
  const [wishlist, setWishlist] = useState(() => loadFromStorage('wishlist', []));
  const [addresses, setAddresses] = useState(() => loadFromStorage('addresses', []));
  const [selectedAddress, setSelectedAddress] = useState(() => loadFromStorage('selectedAddress', null));
  const [orders, setOrders] = useState(() => loadFromStorage('orders', []));

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('addresses', JSON.stringify(addresses)); }, [addresses]);
  useEffect(() => { localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress)); }, [selectedAddress]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);

  const addToCart = (product, size = 'M', quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item =>
      item.id === id && item.size === size ? { ...item, quantity } : item
    ));
  };

  const updateSize = (id, oldSize, newSize) => {
    setCart(prev => {
      // If new size already exists, merge quantities
      const existingNew = prev.find(item => item.id === id && item.size === newSize);
      const oldItem = prev.find(item => item.id === id && item.size === oldSize);
      if (!oldItem) return prev;
      if (existingNew) {
        return prev
          .filter(item => !(item.id === id && item.size === oldSize))
          .map(item =>
            item.id === id && item.size === newSize
              ? { ...item, quantity: item.quantity + oldItem.quantity }
              : item
          );
      }
      return prev.map(item =>
        item.id === id && item.size === oldSize ? { ...item, size: newSize } : item
      );
    });
  };

  const clearCart = () => setCart([]);

  const moveToWishlist = (id, size) => {
    const item = cart.find(i => i.id === id && i.size === size);
    if (item) {
      toggleWishlist(item);
      removeFromCart(id, size);
    }
  };

  const moveToCart = (product) => {
    addToCart(product, 'M', 1);
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  const addAddress = (address) => {
    const newAddr = { ...address, id: Date.now() };
    setAddresses(prev => [...prev, newAddr]);
    if (!selectedAddress) setSelectedAddress(newAddr);
    return newAddr;
  };

  const removeAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    if (selectedAddress?.id === id) setSelectedAddress(null);
  };

  const updateAddress = (id, updates) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    if (selectedAddress?.id === id) {
      setSelectedAddress(prev => ({ ...prev, ...updates }));
    }
  };

  const placeOrder = (paymentMethod) => {
    const orderId = 'TS' + Date.now();
    const order = {
      id: orderId,
      items: [...cart],
      total: cartTotal,
      address: selectedAddress,
      paymentMethod,
      status: 'Confirmed',
      placedOn: new Date().toISOString(),
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return orderId;
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, wishlist, addresses, selectedAddress, orders,
      addToCart, removeFromCart, updateQuantity, updateSize, clearCart,
      moveToWishlist, moveToCart, toggleWishlist, isInWishlist,
      addAddress, removeAddress, updateAddress, setSelectedAddress,
      placeOrder,
      cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
