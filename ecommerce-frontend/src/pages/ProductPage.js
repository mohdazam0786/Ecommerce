import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="border rounded-lg p-4">
        <img src={product.image} alt={product.name} className="w-full h-80 object-cover mb-4" />
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-bold mb-4">${product.price}</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;
