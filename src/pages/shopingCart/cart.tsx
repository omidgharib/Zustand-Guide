import React from 'react';
import { useCartStore } from '@/store/cart';

const Cart: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> — ${item.price} ×{' '}
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  style={{ width: 50 }}
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ marginLeft: 10 }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
