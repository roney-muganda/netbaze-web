export default function Footer() {
    return (
      <footer className="w-full border-t border-gray-800 bg-gray-950 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} NetBaze. All rights reserved.</p>
          <p className="mt-2">Powered by M-PESA & Africa's Talking</p>
        </div>
      </footer>
    );
  }