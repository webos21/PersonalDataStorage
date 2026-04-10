import React from 'react';

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <form>
            <h1 className="text-3xl font-bold mb-2">Register</h1>
            <p className="text-gray-500 mb-6">Create your account</p>
            
            <div className="mb-4">
              <input type="text" placeholder="Username" className="w-full p-3 border border-gray-300 rounded" autoComplete="username" />
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Email" className="w-full p-3 border border-gray-300 rounded" autoComplete="email" />
            </div>
            <div className="mb-4">
              <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded" autoComplete="new-password" />
            </div>
            <div className="mb-6">
              <input type="password" placeholder="Repeat password" className="w-full p-3 border border-gray-300 rounded" autoComplete="new-password" />
            </div>
            
            <button type="button" className="w-full py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700">Create Account</button>
          </form>
        </div>
        <div className="p-6 bg-gray-50 border-t">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="py-2 bg-blue-600 text-white rounded hover:bg-blue-700">facebook</button>
            <button className="py-2 bg-sky-400 text-white rounded hover:bg-sky-500">twitter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;