import React from 'react';

const Page500 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <h1 className="text-6xl font-bold text-gray-800">500</h1>
              <div>
                <h4 className="text-xl font-semibold pt-3">Houston, we have a problem!</h4>
                <p className="text-gray-500">The page you are looking for is temporarily unavailable.</p>
              </div>
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="p-3 bg-gray-200">🔍</span>
              <input type="text" className="flex-grow p-3 outline-none" placeholder="What are you looking for?" />
              <button className="px-4 py-3 bg-blue-500 text-white hover:bg-blue-600">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page500;
