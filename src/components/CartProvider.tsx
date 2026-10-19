'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type CartProduct = {
  id: number
  slug: string
  name: string
  price: number
  image_url: string
}

export type CartItem = CartProduct & {
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (product: CartProduct) => void
  setQuantity: (slug: string, quantity: number) => void
  removeItem: (slug: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const storageKey = 'luxeline-cart'

const isCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== 'object') return false

  const item = value as Partial<CartItem>
  return typeof item.id === 'number'
    && typeof item.slug === 'string'
    && typeof item.name === 'string'
    && typeof item.price === 'number'
    && typeof item.image_url === 'string'
    && Number.isInteger(item.quantity)
    && (item.quantity ?? 0) > 0
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(storageKey)
      const parsedCart: unknown = savedCart ? JSON.parse(savedCart) : []
      if (Array.isArray(parsedCart)) {
        setItems(parsedCart.filter(isCartItem))
      }
    } catch {
      localStorage.removeItem(storageKey)
    } finally {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (isReady) {
      localStorage.setItem(storageKey, JSON.stringify(items))
    }
  }, [isReady, items])

  const addItem = (product: CartProduct) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === product.slug)
      if (existingItem) {
        return currentItems.map((item) => item.slug === product.slug
          ? { ...item, quantity: item.quantity + 1 }
          : item)
      }
      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const setQuantity = (slug: string, quantity: number) => {
    if (quantity < 1) {
      setItems((currentItems) => currentItems.filter((item) => item.slug !== slug))
      return
    }
    setItems((currentItems) => currentItems.map((item) => item.slug === slug
      ? { ...item, quantity }
      : item))
  }

  const removeItem = (slug: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.slug !== slug))
  }

  const clearCart = () => setItems([])
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addItem, setQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}