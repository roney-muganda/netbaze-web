import { useState, useEffect } from 'react';
import { X, Smartphone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../utils/api';

export default function PaymentModal({ isOpen, onClose, product }) {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, waiting_for_pin, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // Clear state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  // POLL FOR SUCCESS
  useEffect(() => {
    let interval;
    if (status === 'waiting_for_pin') {
      interval = setInterval(async () => {
        try {
          const res = await api.get(`/check-status/${phone}/`);
          if (res.data.status === 'COMPLETED') {
            setStatus('success');
            clearInterval(interval);
          }
        } catch (err) {
          console.error("Polling error", err);
        }
      }, 3000); // Check every 3 seconds
    }
    return () => clearInterval(interval);
  }, [status, phone]);

  if (!isOpen || !product) return null;

  const handlePay = async () => {
    if (!phone || phone.length < 9) {
      setErrorMessage("Please enter a valid M-Pesa number");
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await api.post('/buy/', {
        phone_number: phone,
        product_id: product.id
      });
      // Instead of just success, we move to "waiting" state
      setStatus('waiting_for_pin');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Failed to trigger M-Pesa. Try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        {/* 1. INPUT STAGE */}
        {status === 'idle' && (
          <>
            <h2 className="text-xl font-bold mb-1 text-white">Complete Purchase</h2>
            <p className="text-gray-400 text-sm mb-6">
              Buying <span className="text-green-400 font-bold">{product.name}</span> for KES {product.price}
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-500 uppercase mb-1">M-Pesa Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input 
                    id="phone"
                    type="tel" 
                    placeholder="254712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-lg py-3 pl-10 focus:outline-hidden focus:border-green-500 transition-colors"
                  />
                </div>
                {errorMessage && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errorMessage}</p>}
              </div>
              <button onClick={handlePay} className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all active:scale-95">
                Pay KES {product.price}
              </button>
            </div>
          </>
        )}

        {/* 2. LOADING STAGE */}
        {status === 'loading' && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Contacting M-Pesa...</p>
          </div>
        )}

        {/* 3. WAITING FOR PIN (POLLING) */}
        {status === 'waiting_for_pin' && (
          <div className="text-center py-8 animate-pulse">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Check your phone!</h3>
            <p className="text-gray-400 text-sm mb-4">Enter your M-Pesa PIN to complete payment.</p>
            <p className="text-xs text-gray-600">Waiting for confirmation...</p>
          </div>
        )}

        {/* 4. SUCCESS STAGE */}
        {status === 'success' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Payment Received!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Your <b>{product.name}</b> has been sent to {phone}.
            </p>
            <button onClick={onClose} className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg">
              Close
            </button>
          </div>
        )}

        {/* 5. ERROR STAGE */}
        {status === 'error' && (
          <div className="text-center py-6">
            <h3 className="text-red-500 font-bold mb-2">Error</h3>
            <p className="text-gray-400 text-sm mb-4">{errorMessage}</p>
            <button onClick={() => setStatus('idle')} className="text-sm underline text-gray-500">Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}