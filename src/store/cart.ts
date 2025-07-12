import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;

  // Computed
  totalItems: number;
  totalPrice: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  // Computed values using `get`
  get totalItems() {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },

  get totalPrice() {
    return get().items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  },
}));
