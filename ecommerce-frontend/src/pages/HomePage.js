import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
