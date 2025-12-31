import { useState } from 'react';
import { X, Smartphone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../utils/api';

export default function PaymentModal({ isOpen, onClose, product }) {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !product) return null;

  const handlePay = async () => {
    // Basic Validation
    if (!phone || phone.length < 10) {
      setErrorMessage("Please enter a valid M-Pesa number");
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Call the backend endpoint
      await api.post('/buy/', {
        phone_number: phone,
        product_id: product.id
      });

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Payment failed. Check your connection.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* --- CONTENT BASED ON STATUS --- */}
        
        {status === 'idle' && (
          <>
            <h2 className="text-xl font-bold mb-1 text-white">Complete Purchase</h2>
            <p className="text-gray-400 text-sm mb-6">
              You are buying <span className="text-green-400 font-bold">{product.name}</span> for <span className="text-white">KES {product.price}</span>.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">M-Pesa Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    id="phone"           
                    name="phone"
                    type="tel" 
                    autoComplete="tel"
                    placeholder="0712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-lg py-3 pl-10 focus:outline-hidden focus:border-green-500 transition-colors"
                  />
                </div>
                {errorMessage && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errorMessage}</p>}
              </div>

              {/* FIX IS HERE: Correct closing tag </button> */}
              <button 
                onClick={handlePay}
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all active:scale-95"
              >
                Pay KES {product.price}
              </button>
            </div>
          </>
        )}

        {status === 'loading' && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">Sending Request...</h3>
            <p className="text-gray-400 text-sm">Please wait while we contact M-Pesa.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Check Your Phone!</h3>
            <p className="text-gray-400 text-sm mb-6">
              We&apos;ve sent an M-Pesa prompt to <b>{phone}</b>.<br/>
              Enter your PIN to complete the payment.
            </p>
            <button 
              onClick={onClose}
              className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
            <p className="text-gray-400 text-sm mb-6">
              {errorMessage || "We couldn't initiate the payment."}
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}