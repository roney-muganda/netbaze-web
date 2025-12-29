import Link from 'next/link';
import { Smartphone } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-800 bg-gray-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Smartphone className="w-6 h-6 text-green-500" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Net<span className="text-green-500">Baze</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex gap-4">
          <Link 
            href="/check-balance" 
            className="text-sm font-medium text-gray-400 hover:text-white transition py-2"
          >
            Check Balance
          </Link>
        </div>
      </div>
    </nav>
  );
}