import { Card, CardContent, CardHeader } from "@/components/card";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function ChatbotCard({ chatbot }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get user from sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleClick = async () => {
    if (isLoading || !user) return;
    
    try {
      setIsLoading(true);

      const response = await fetch('/api/get-sso-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            chatbotId: chatbot.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            permissions: user.permissions
        }),
      });

      const { ssoToken } = await response.json();

      router.push(`${process.env.NEXT_PUBLIC_CHAT_DATA_WEBSITE}/api/v1/auth/sso?companyid=` +
            process.env.NEXT_PUBLIC_COMPANY_ID +
            '&ssoToken=' +
            ssoToken +
            '&redirect=' +
            process.env.NEXT_PUBLIC_REDIRECT_URL)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`
        relative group
        w-[300px] h-[400px]
        cursor-pointer
        transition-all duration-300
        ${isLoading ? 'pointer-events-none' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`
        absolute inset-0
        bg-gradient-to-br from-blue-400 to-indigo-600
        rounded-2xl
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        blur-xl
      `} />
      
      <Card className={`
        relative
        w-full h-full
        flex flex-col
        bg-white/95 backdrop-blur-sm
        border-gray-200
        rounded-2xl
        shadow-lg
        transform transition-all duration-300
        group-hover:scale-[1.02] group-hover:shadow-2xl
        ${isLoading ? 'opacity-75' : ''}
      `}>
        <CardHeader className="flex-none text-center pt-8">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={chatbot.imageUrl}
                alt={chatbot.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col justify-center px-6">
          <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
            {chatbot.name}
          </h3>
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            {chatbot.description}
          </p>
          
          {isLoading && (
            <div className="mt-4 flex justify-center">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </CardContent>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </div>
  );
}