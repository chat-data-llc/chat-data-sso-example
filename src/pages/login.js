import { useRouter } from 'next/router';
import { useState } from 'react';
import { mockUser } from '@/data/UserDatabase';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    
    // Store mock user in sessionStorage
    sessionStorage.setItem('user', JSON.stringify(mockUser));
    
    // Redirect to main page
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Access your chatbot dashboard</p>
        </div>
        
        <div className="space-y-6">
          <div className="text-center text-sm text-gray-500">
            This is a demo application. Click below to sign in with a mock account.
          </div>
          
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`
              w-full py-4 px-6 rounded-lg font-medium text-white
              bg-gradient-to-r from-blue-500 to-indigo-600
              hover:from-blue-600 hover:to-indigo-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transform transition-all duration-200
              ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in without password'
            )}
          </button>
          
          <div className="text-center text-xs text-gray-400 mt-6">
            <p>Mock User: {mockUser.name}</p>
            <p>{mockUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}