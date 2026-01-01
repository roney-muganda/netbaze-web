'use client';

import { useState } from 'react';
import { Search, History, CheckCircle, XCircle, Clock } from 'lucide-react';
import api from '../../utils/api';

export default function CheckBalance() {
  const [phone, setPhone] = useState('');
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (phone.length < 9) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setError('');
    setTransactions(null);

    try {
      const res = await api.get(`/history/${phone}/`);
      setTransactions(res.data);
    } catch (err) {
      setError("Could not find any transactions for this number.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Track Your Orders</h1>
        <p className="text-gray-400">Enter your M-Pesa number to see your recent purchases.</p>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="mb-10 relative">
        <Search className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
        <input
          type="tel"
          placeholder="e.g. 0712 345 678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-hidden focus:border-green-500 transition-colors shadow-lg"
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {loading ? 'Searching...' : 'Check'}
        </button>
        {error && <p className="text-red-500 text-sm mt-3 ml-2">{error}</p>}
      </form>

      {/* Results List */}
      <div className="space-y-4">
        {transactions && transactions.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No transactions found for this number.</p>
          </div>
        )}

        {transactions && transactions.map((tx) => (
          <div key={tx.id} className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl flex items-center justify-between hover:bg-gray-900 transition-colors">
            
            <div className="flex items-center gap-4">
              {/* Status Icon */}
              <div className={`p-3 rounded-full ${
                tx.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : 
                tx.status === 'FAILED' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {tx.status === 'COMPLETED' ? <CheckCircle className="w-5 h-5" /> : 
                 tx.status === 'FAILED' ? <XCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              
              {/* Details */}
              <div>
                <h3 className="font-bold text-white">{tx.product_name}</h3>
                <p className="text-xs text-gray-400">
                  {new Date(tx.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right">
              <span className="block text-white font-mono font-medium">KES {tx.amount}</span>
              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                 tx.status === 'COMPLETED' ? 'text-green-500' : 'text-gray-500'
              }`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}