'use client';

import { useEffect, useState } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import PaymentModal from '../components/PaymentModal';
import { Wifi } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // We define the function INSIDE the effect to satisfy the linter
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/');
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load bundles. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      
      {/* Hero Header */}
      <div className="text-center mb-12">
        {/* Updated gradient class to bg-linear-to-r */}
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
            onClick={() => window.location.reload()}
            className="mt-4 text-sm underline hover:text-white"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onBuy={handleBuy} 
                />
              ))}
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />
      
    </div>
  );
}