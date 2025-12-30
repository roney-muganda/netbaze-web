export default function SkeletonCard() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4 animate-pulse">
      {/* Icon Circle */}
      <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
      
      {/* Title & Price Lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-6 bg-gray-800 rounded w-1/2"></div>
      </div>
      
      {/* Button */}
      <div className="h-10 bg-gray-800 rounded mt-auto w-full"></div>
    </div>
  );
}