
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
            <i className="fas fa-leaf text-xl"></i>
          </div>
          <span className="text-2xl font-serif font-bold text-green-800">植愈养生</span>
        </div>
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a href="#hero" className="hover:text-green-600 transition-colors">首页</a>
          <a href="#analyzer" className="hover:text-green-600 transition-colors">食材百科</a>
          <a href="#recipes" className="hover:text-green-600 transition-colors">时令食谱</a>
          <a href="#consult" className="hover:text-green-600 transition-colors">AI 咨询</a>
        </div>
        <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-all shadow-md hover:shadow-lg">
          加入会员
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
