import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const CartContext = createContext(null)

const CART_KEY = 'zyvenormc_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY)
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        setItems([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = useCallback((pkg) => {
    const normalizedPkg = { ...pkg, id: pkg.id || pkg._id, _id: pkg._id || pkg.id };
    setItems((prev) => {
      const existing = prev.find((i) => (i.id || i._id) === (normalizedPkg.id || normalizedPkg._id));
      if (existing) {
        return prev.map((i) =>
          (i.id || i._id) === (normalizedPkg.id || normalizedPkg._id) ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...normalizedPkg, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((i) => (i.id || i._id) !== id && i.id !== id && i._id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => (i.id || i._id) !== id && i.id !== id && i._id !== id))
      return
    }
    setItems((prev) =>
      prev.map((i) => ((i.id || i._id) === id || i.id === id || i._id === id ? { ...i, quantity: qty } : i))
    )
  }, [])

  const clear = useCallback(() => {
    setItems([])
  }, [])

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  )

  const discount = useMemo(
    () =>
      items.reduce(
        (sum, i) =>
          sum + ((i.originalPrice || i.price) - i.price) * i.quantity,
        0
      ),
    [items]
  )

  const total = subtotal
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clear,
        subtotal,
        discount,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
