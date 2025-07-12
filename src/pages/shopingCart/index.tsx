import React from 'react';
import { useCartStore } from '@/store/cart';
import Cart from './cart';

const products = [
  { id: '1', name: 'T-Shirt', price: 19.99 },
  { id: '2', name: 'Sneakers', price: 49.99 },
  { id: '3', name: 'Hat', price: 14.99 },
];

export const ShopingCart: React.FC = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div style={{ padding: 20 }}>
      <h1>React Zustand Cart with Computed State</h1>

      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> — ${product.price}
            <button
              onClick={() => addToCart(product)}
              style={{ marginLeft: 10 }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <Cart />
    </div>
  );
};
