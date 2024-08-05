import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = 'user-id-here'; // Replace with actual user ID
      const { data } = await axios.get(`/api/cart/${userId}`);
      setCart(data);
    };
    fetchCart();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="border rounded-lg p-4">
        {cart.items && cart.items.map(item => (
          <div key={item.product._id} className="flex justify-between mb-4">
            <div>{item.product.name} - {item.quantity}</div>
            <div>${item.product.price * item.quantity}</div>
          </div>
        ))}
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
