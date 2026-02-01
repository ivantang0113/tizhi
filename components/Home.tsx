
import React from 'react';

interface HomeProps {
  onStartTCM: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartTCM }) => {
  return (
    <div className="bg-[#F7F3E9]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
        {/* Abstract Ink Wash Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <filter id="ink">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
              <feDisplacementMap in="SourceGraphic" scale="20" />
            </filter>
            <path d="M0 500 Q250 200 500 500 T1000 500 V1000 H0 Z" fill="#1A3C34" filter="url(#ink)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          <div className="animate-fadeIn">
            <h2 className="text-emerald-800 text-sm tracking-[0.4em] mb-4 font-bold">天人合一 · 顺时养生</h2>
            <h1 className="text-6xl md:text-8xl font-bold text-[#1A3C34] leading-[1.1] mb-8 font-serif">
              植愈身心<br />
              <span className="text-[#8B9D77]">自然而治</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-10 max-w-lg">
              融合东方古典哲学与人工智能，探索植物食材的疗愈能量。
              在喧嚣尘世中，寻回与自然的和谐共鸣。
            </p>
            
            {/* Call to Action: TCM Tool */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={onStartTCM}
                className="group relative px-10 py-5 bg-[#1A3C34] text-[#F7F3E9] rounded-full overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 text-xl font-bold flex items-center">
                  <i className="fas fa-magic mr-3"></i> 测定中医体质
                </span>
                <div className="absolute inset-0 bg-emerald-800 transform translate-y-full transition-transform group-hover:translate-y-0"></div>
              </button>
              <a href="#analyzer" className="px-10 py-5 border-2 border-[#1A3C34] text-[#1A3C34] rounded-full text-xl font-bold hover:bg-[#1A3C34] hover:text-[#F7F3E9] transition-all flex items-center justify-center">
                探索本草
              </a>
            </div>
          </div>

          <div className="relative animate-float">
             <div className="w-full aspect-square relative">
                <div className="absolute inset-0 border-[20px] border-[#E2D1A0] rounded-full opacity-20 animate-spin-slow"></div>
                <div className="absolute inset-8 rounded-full overflow-hidden shadow-inner bg-white/50 backdrop-blur-sm p-4">
                   <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000" 
                    alt="Natural Ingredients"
                    className="w-full h-full object-cover rounded-full"
                   />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#8B9D77]/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center p-4 transform rotate-12">
                   <p className="text-[#F7F3E9] text-center text-sm font-bold">春生<br/>夏长<br/>秋收<br/>冬藏</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 border-y border-emerald-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-1 bg-[#1A3C34] mx-auto mb-8"></div>
          <h3 className="text-3xl font-serif text-[#1A3C34] mb-8">“春省、夏解、秋润、冬补”</h3>
          <p className="text-gray-600 text-lg leading-[2] italic">
            天地大宇宙，人身小宇宙。植愈养生不仅是关乎口腹，更是关乎如何顺应四时气律，
            以草木精华调理脏腑，实现内外兼修的平和之美。
          </p>
        </div>
      </section>

      {/* Feature Navigation Tiles */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <Tile 
          icon="fas fa-search-leaf" 
          title="食材百科" 
          desc="AI 深度解析食材性味功效" 
          link="#analyzer" 
          color="bg-[#1A3C34]"
        />
        <Tile 
          icon="fas fa-utensils" 
          title="时令食谱" 
          desc="为您定制专属植食方案" 
          link="#recipes" 
          color="bg-[#8B9D77]"
        />
        <Tile 
          icon="fas fa-comment-dots" 
          title="智能咨询" 
          desc="24小时养生顾问在线答疑" 
          link="#consult" 
          color="bg-[#E2D1A0]"
        />
      </section>
    </div>
  );
};

const Tile = ({ icon, title, desc, link, color }: any) => (
  <a href={link} className="group p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all border border-emerald-50 relative overflow-hidden">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6`}>
      <i className={icon}></i>
    </div>
    <h4 className="text-2xl font-bold text-[#1A3C34] mb-2">{title}</h4>
    <p className="text-gray-500">{desc}</p>
    <div className="mt-6 flex items-center text-[#1A3C34] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
      立即前往 <i className="fas fa-arrow-right ml-2 text-xs"></i>
    </div>
  </a>
);

export default Home;
