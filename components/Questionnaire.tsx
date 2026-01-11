
import React, { useState, useEffect } from 'react';
import { QUESTIONS_POOL } from '../constants';
import { ConstitutionType, ScoreMap, Question } from '../types';

interface QuestionnaireProps {
  onComplete: (scores: ScoreMap) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dynamicList, setDynamicList] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  // 初始化：第一阶段 9个核心题
  useEffect(() => {
    const stage1 = QUESTIONS_POOL.filter(q => q.priority === 1);
    setDynamicList(stage1);
  }, []);

  const handleAnswer = (val: number) => {
    const currentQ = dynamicList[currentIdx];
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);

    // 如果刚完成第一阶段 (第9题)
    if (currentIdx === 8) {
      // 动态判定接下来的题目
      const followUpQuestions = determineFollowUps(newAnswers);
      
      if (followUpQuestions.length === 0) {
         // 没有明显的偏颇倾向，提前结束
         calculateAndFinish(newAnswers);
      } else {
         setDynamicList([...dynamicList, ...followUpQuestions]);
         setCurrentIdx(currentIdx + 1);
      }
    } 
    // 后续题目或正常进行
    else if (currentIdx < dynamicList.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } 
    else {
      calculateAndFinish(newAnswers);
    }
  };

  const determineFollowUps = (currentAnswers: Record<string, number>): Question[] => {
    // 找出得分高于3分 (即"有时"及以上) 的非平和质体质
    const stage1 = QUESTIONS_POOL.filter(q => q.priority === 1);
    const candidates: ConstitutionType[] = [];

    stage1.forEach(q => {
      if (q.type !== ConstitutionType.PINGHE && currentAnswers[q.id] >= 3) {
        candidates.push(q.type);
      }
    });

    // 只取最有倾向的2个进行深挖，确保总数 9 + (2*2) = 13题 < 16题
    return QUESTIONS_POOL.filter(q => 
      q.priority === 2 && candidates.slice(0, 2).includes(q.type)
    );
  };

  const calculateAndFinish = (finalAnswers: Record<string, number>) => {
    const constitutionScores: Record<string, { sum: number, count: number }> = {};
    Object.values(ConstitutionType).forEach(type => {
      constitutionScores[type] = { sum: 0, count: 0 };
    });

    // 统计各类型得分
    QUESTIONS_POOL.forEach(q => {
      const ans = finalAnswers[q.id];
      if (ans !== undefined) {
        constitutionScores[q.type].sum += ans;
        constitutionScores[q.type].count += 1;
      }
    });

    // 计算标准分
    const finalScores: ScoreMap = {};
    Object.keys(constitutionScores).forEach(type => {
      const { sum, count } = constitutionScores[type];
      if (count === 0) {
        finalScores[type] = 0;
      } else {
        // 标准化计算公式：[(原始分-题目数)/(题目数*4)] * 100
        const standardized = ((sum - count) / (count * 4)) * 100;
        finalScores[type] = Math.max(0, standardized);
      }
    });

    onComplete(finalScores);
    setIsFinished(true);
  };

  if (dynamicList.length === 0 || isFinished) return null;

  const currentQ = dynamicList[currentIdx];
  const progress = Math.round(((currentIdx + 1) / (dynamicList.length || 15)) * 100);

  const options = [
    { label: '没有', val: 1 },
    { label: '很少', val: 2 },
    { label: '有时', val: 3 },
    { label: '经常', val: 4 },
    { label: '总是', val: 5 },
  ];

  return (
    <div className="max-w-md mx-auto mt-6 px-4">
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-emerald-800 mb-1 font-bold uppercase tracking-wider">
          <span>Question {currentIdx + 1}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-emerald-100 h-1.5 rounded-full overflow-hidden shadow-inner">
          <div className="bg-emerald-600 h-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl min-h-[350px] flex flex-col justify-between border border-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <span className="text-6xl font-serif">中医</span>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-emerald-600 font-bold mb-2">依据《中医体质分类判定标准》</p>
          <h4 className="text-2xl font-bold text-gray-800 mb-8 leading-snug">
            {currentQ.text}
          </h4>
        </div>

        <div className="space-y-3 relative z-10">
          {options.map((opt) => (
            <button
              key={opt.val}
              onClick={() => handleAnswer(opt.val)}
              className="w-full text-left px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-900 transition-all active:scale-[0.97] group"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{opt.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)}
          className="text-gray-400 text-xs font-medium hover:text-emerald-700 transition-colors disabled:opacity-0"
          disabled={currentIdx === 0}
        >
          返回上一题
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
