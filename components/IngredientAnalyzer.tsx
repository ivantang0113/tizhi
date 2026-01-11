
import React, { useState } from 'react';
import { analyzeIngredients } from '../services/geminiService';
import { AnalysisResult } from '../types';

const IngredientAnalyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeIngredients(input);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('分析失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="analyzer" className="py-20 px-6 bg-[#F3F7F2]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold text-green-900 mb-4">智能食材养生分析</h2>
        <p className="text-gray-600 mb-10">输入您想了解的植物食材，AI 将为您解析其性味与功效。</p>
        
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-50">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="例如：怀山药、芡实、红枣..."
              className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-700 disabled:bg-gray-400 transition-all shadow-lg flex items-center justify-center"
            >
              {loading ? (
                <i className="fas fa-circle-notch animate-spin mr-2"></i>
              ) : (
                <i className="fas fa-microscope mr-2"></i>
              )}
              {loading ? '分析中...' : '立即分析'}
            </button>
          </div>

          {result && (
            <div className="text-left animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <i className="fas fa-thermometer-half mr-2"></i> 食材性质
                  </h4>
                  <p className="text-green-700">{result.nature}</p>
                </div>
                <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100">
                  <h4 className="font-bold text-orange-800 mb-2 flex items-center">
                    <i className="fas fa-star mr-2"></i> 主要功效
                  </h4>
                  <ul className="list-disc list-inside text-orange-700 space-y-1">
                    {result.benefits.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-800 mb-2">养生建议</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{result.recommendations}</p>
                <h4 className="font-bold text-red-800 mb-2">注意事项</h4>
                <p className="text-red-700 bg-red-50 p-4 rounded-xl">{result.cautions}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IngredientAnalyzer;
