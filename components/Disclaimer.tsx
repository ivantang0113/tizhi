
import React from 'react';

interface DisclaimerProps {
  onAccept: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAccept }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-xl mt-10 border border-emerald-100">
      <h2 className="text-2xl font-bold text-emerald-900 mb-4">免责声明</h2>
      <div className="text-sm text-gray-600 space-y-3 mb-8 leading-relaxed">
        <p>1. 本测试基于中华中医药学会《中医体质分类判定标准》，仅供健康参考，不作为临床诊断依据。</p>
        <p>2. 测试结论不代表专业医疗建议。如有身体不适，请务必前往医院咨询执业医师。</p>
        <p>3. 任何根据本测试结果进行的调理或药物使用，用户需承担相应后果。</p>
        <p>4. 测评数据将经过脱敏处理用于算法优化，我们尊重您的个人隐私。</p>
      </div>
      <button
        onClick={onAccept}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95"
      >
        我已阅读并同意
      </button>
    </div>
  );
};

export default Disclaimer;
