import { Zap, Clock, CheckCircle2 } from "lucide-react";

export default function ProductCard({ product, onBuy }) {
  return (
    <div className="group relative bg-gray-900 border border-gray-800 hover:border-green-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20 flex flex-col">
      
      {/* Header: Icon & Validity */}
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-green-500/10 transition-colors">
          <Zap className="w-6 h-6 text-green-500" />
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-gray-800 rounded-full text-gray-400 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {product.validity}
        </span>
      </div>

      {/* Product Details */}
      <h3 className="text-lg font-bold text-gray-100 mb-1">{product.name}</h3>
      <div className="text-3xl font-bold text-white mb-4">
        <span className="text-sm text-gray-400 font-normal align-top">KES</span>
        {Math.floor(product.price)}
      </div>

      {/* Features List (Marketing the "No Debt" aspect implicitly) */}
      <ul className="text-sm text-gray-400 mb-6 space-y-2">
        <li className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" /> Instant Delivery
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" /> No Hidden Fees
        </li>
      </ul>

      {/* Buy Button */}
      <button
        onClick={() => onBuy(product)}
        className="mt-auto w-full py-3 px-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-green-900/20"
      >
        Buy Now
      </button>
    </div>
  );
}