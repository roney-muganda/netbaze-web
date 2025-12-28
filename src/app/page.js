import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          NetBaze
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Instant Data Bundles. Zero Hassle.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/buy" 
            className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold transition-all shadow-lg shadow-green-500/20"
          >
            Buy Data
          </Link>
          <button className="px-8 py-3 border border-gray-700 hover:border-gray-500 rounded-lg transition-all">
            Check Balance
          </button>
        </div>
      </div>
    </main>
  );
}