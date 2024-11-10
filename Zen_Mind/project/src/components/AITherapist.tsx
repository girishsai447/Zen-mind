import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AITherapist: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const genAI = new GoogleGenerativeAI('AIzaSyDkUIP2nnVhRF61BOOA2XOS_uenKkYK49c');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: 'act as my therapist and mental health specialist in the chat from now',
      },
      {
        role: 'model',
        parts: "I'll be your supportive therapist and mental health specialist. Feel free to share your thoughts and feelings in a safe, confidential space.",
      },
    ],
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      setMessages(prev => [...prev, { role: 'assistant', content: response.text() }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again.' }]);
    }

    setIsLoading(false);
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-xl transition-all duration-300 ${
      isMinimized ? 'w-16 h-16' : 'w-96 h-[500px]'
    }`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <MessageSquare className="text-purple-600" size={20} />
          {!isMinimized && <span className="font-medium text-gray-800">AI Therapist</span>}
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
        </button>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[380px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-700 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AITherapist;