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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        React Zustand Cart with Computed State
      </h1>

      <h2 className="text-xl font-semibold mb-4 text-gray-700">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <div className="font-semibold text-lg text-gray-800 mb-2">
              {product.name}
            </div>
            <div className="text-gray-600 mb-4">${product.price}</div>
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <hr className="my-8" />
      <Cart />
    </div>
  );
};
