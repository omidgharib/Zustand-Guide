import React from 'react';
import { useCartStore } from '@/store/cart';

const Cart: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const totalPrice = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Shopping Cart
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex-1">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-gray-500 ml-2">${item.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <span className="font-semibold text-gray-700">Total Items:</span>
            <span className="text-lg font-bold text-gray-900">
              {totalItems}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold text-gray-700">Total Price:</span>
            <span className="text-lg font-bold text-blue-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
