
import React, { useState } from 'react';
import { generateRecipe } from '../services/geminiService';

interface RecipeData {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  healthFocus: string;
}

const RecipeGenerator: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal) return;
    setLoading(true);
    try {
      const data = await generateRecipe(goal);
      setRecipe(data);
    } catch (e) {
      alert('生成食谱失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="recipes" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-serif font-bold text-green-900 mb-6">AI 私人食谱定制</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              根据您的身体状态（如：补气、清火、润燥）或现有食材，
              由我们的 AI 营养师为您实时生成专属的天然植食菜谱。
            </p>
            <div className="space-y-4">
              <button onClick={() => setGoal('补气润肺的秋季汤品')} className="mr-3 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"># 补气润肺</button>
              <button onClick={() => setGoal('适合久坐族的轻体沙拉')} className="mr-3 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"># 减脂排毒</button>
              <button onClick={() => setGoal('改善睡眠的晚间谷物粥')} className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"># 宁心助眠</button>
            </div>
          </div>
          <div className="md:w-5/12 bg-white p-8 rounded-[2rem] shadow-2xl border border-green-100">
            <textarea
              className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 mb-4 resize-none"
              placeholder="输入您的健康需求或想用的食材..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 disabled:bg-gray-400 flex items-center justify-center transition-all"
            >
              {loading ? <i className="fas fa-spinner animate-spin mr-2"></i> : <i className="fas fa-magic mr-2"></i>}
              {loading ? '正在匠心调制...' : '生成专属食谱'}
            </button>
          </div>
        </div>

        {recipe && (
          <div className="bg-white rounded-3xl p-10 shadow-xl border-l-8 border-green-600 animate-fadeIn">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-green-600">定制食谱</span>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mt-2">{recipe.title}</h3>
              <p className="text-gray-500 mt-2 italic">“{recipe.description}”</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h4 className="font-bold text-gray-800 mb-4 pb-2 border-b">所需食材</h4>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-4 pb-2 border-b">烹饪步骤</h4>
                <ol className="space-y-4">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">{i+1}</span>
                      <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipeGenerator;
