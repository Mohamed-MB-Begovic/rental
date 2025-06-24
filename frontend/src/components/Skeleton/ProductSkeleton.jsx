import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded-xl w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 md:w-1/2 mx-auto animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Image placeholder */}
              <div className="relative h-64 bg-gray-200 animate-pulse">
                <div className="absolute top-4 right-4 w-20 h-6 bg-blue-500 rounded-full"></div>
              </div>
              
              <div className="p-6">
                {/* Title and price row */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-3/4">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-4/5 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </div>
                
                {/* Property details */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gray-200 rounded mr-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-10 animate-pulse"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gray-200 rounded mr-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-10 animate-pulse"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gray-200 rounded mr-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Button */}
                <div className="mt-6">
                  <div className="h-10 bg-blue-600 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="h-12 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;