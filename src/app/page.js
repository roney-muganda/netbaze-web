'use client';

import { useEffect, useState } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { Wifi } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Connects to /api/products/ on your Django backend
      const response = await api.get('/products/');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load bundles. Please check your connection.');
      setLoading(false);
    }
  };

  const handleBuy = (product) => {
    // We will implement Phase 3 (Checkout Logic) here next!
    alert(`You selected: ${product.name} @ KES ${product.price}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      
      {/* Hero Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Instant Data Bundles
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Get connected instantly. Fast delivery, secure payments, and zero hassle.
        </p>
      </div>

      {/* The Shop Grid */}
      {error ? (
        <div className="text-center p-8 border border-red-900/50 bg-red-900/10 rounded-xl text-red-400">
          <Wifi className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 text-sm underline hover:text-white"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // Show 6 skeletons while loading
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : // Show actual products when loaded
              products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onBuy={handleBuy} 
                />
              ))}
        </div>
      )}
    </div>
  );
}