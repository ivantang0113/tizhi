
import React, { useState, useRef, useEffect } from 'react';
import { getWellnessChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const WellnessChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '您好，我是您的植愈管家。今天有什么关于素食养生或天然调理的问题想问我吗？' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      history.push({ role: 'user', parts: [{ text: input }] });

      const aiText = await getWellnessChatResponse(history);
      setMessages(prev => [...prev, { role: 'model', text: aiText || '抱歉，我暂时无法回答。' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: '网络连接出现问题，请稍后再试。' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consult" className="py-20 px-6 bg-green-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-800 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50"></div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-serif font-bold mb-8">24/7 植食养生顾问</h2>
          <p className="text-green-100 text-lg leading-relaxed mb-8">
            通过深度学习海量中医典籍与现代营养学报告，我们的 AI 顾问能为您提供即时的养生建议：
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <i className="fas fa-check-circle text-green-400 mr-3"></i>
              <span>针对体质推荐季节性食材</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check-circle text-green-400 mr-3"></i>
              <span>解析常见蔬果的药食同源原理</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check-circle text-green-400 mr-3"></i>
              <span>全植食谱的营养均衡优化建议</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl h-[500px] flex flex-col overflow-hidden text-gray-800">
          <div className="bg-green-50 p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white mr-3">
                <i className="fas fa-leaf text-xs"></i>
              </div>
              <span className="font-bold text-green-900">植愈小管家</span>
            </div>
            <span className="text-xs text-green-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              在线咨询中
            </span>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-green-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-700 rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-gray-100 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder="在此输入您的问题..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="bg-green-600 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessChat;
