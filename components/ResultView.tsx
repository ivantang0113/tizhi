
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ConstitutionType, ScoreMap, UserInfo } from '../types';
import { CONSTITUTION_INFO } from '../constants';
import { generateStaticExpertAdvice } from '../utils/adviceGenerator';
import Branding from './Branding';

interface ResultViewProps {
  scores: ScoreMap;
  userInfo: UserInfo;
}

const ResultView: React.FC<ResultViewProps> = ({ scores, userInfo }) => {
  const determinePrimary = (): ConstitutionType => {
    const entries = Object.entries(scores);
    const nonPingheEntries = entries.filter(([type]) => type !== ConstitutionType.PINGHE);
    const maxNonPinghe = Math.max(...nonPingheEntries.map(([, s]) => s as number));

    // Simple rule based determination
    if (scores[ConstitutionType.PINGHE] >= 60 && maxNonPinghe < 30) {
      return ConstitutionType.PINGHE;
    }

    let maxScore = -1;
    let maxType = ConstitutionType.PINGHE;
    nonPingheEntries.forEach(([type, s]) => {
      if ((s as number) > maxScore) {
        maxScore = s as number;
        maxType = type as ConstitutionType;
      }
    });
    return maxType;
  };

  const primaryType = determinePrimary();
  const advice = generateStaticExpertAdvice(userInfo, scores, primaryType);

  const chartData = Object.entries(scores).map(([name, value]) => ({
    name: name.replace('质', ''),
    value: Math.max(value as number, 0),
  }));

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fadeIn">
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-emerald-50">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-8 text-center text-white relative">
          <div className="absolute top-4 left-4 text-[10px] opacity-40">
            {userInfo.province} · {userInfo.climate}气
          </div>
          <p className="text-emerald-200 text-xs mb-3 uppercase tracking-[0.2em] font-bold">体质辨识报告</p>
          <h2 className="text-4xl font-bold mb-3">{primaryType}</h2>
          <div className="h-1 w-12 bg-emerald-400 mx-auto rounded-full mb-4"></div>
          <p className="text-emerald-50/80 text-sm leading-relaxed max-w-sm mx-auto italic">
            "{CONSTITUTION_INFO[primaryType].description}"
          </p>
        </div>

        <div className="p-6">
          <div className="h-64 mb-8 bg-emerald-50/30 rounded-2xl py-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="#065f46" strokeOpacity={0.1} />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#065f46', fontSize: 11, fontWeight: 'bold' }} />
                <Radar
                  name="分值"
                  dataKey="value"
                  stroke="#059669"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <section className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm relative">
              <div className="absolute -top-3 left-6 bg-emerald-700 text-white text-[10px] px-3 py-1 rounded-full font-bold">
                中医养生处方
              </div>
              <h3 className="text-lg font-bold text-emerald-900 mb-4 pt-2">本草君调理建议</h3>
              
              <div className="text-gray-700 text-sm leading-8 whitespace-pre-wrap font-medium">
                {advice}
              </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100/50">
                <h4 className="font-bold text-amber-900 mb-2 text-xs flex items-center">
                  <span className="mr-1">🍎</span> 性格引导
                </h4>
                <p className="text-amber-800 text-[11px] leading-relaxed">{CONSTITUTION_INFO[primaryType].mind}</p>
              </div>
              <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                <h4 className="font-bold text-emerald-900 mb-2 text-xs flex items-center">
                  <span className="mr-1">🗺️</span> 地域适应
                </h4>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  居住在 <strong>{userInfo.province}</strong> 需顺应其 <strong>{userInfo.climate}</strong> 属性，及时增减衣物。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/80 p-6 flex justify-center border-t border-gray-100">
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-2.5 rounded-full border border-emerald-700 text-emerald-700 text-xs font-bold hover:bg-emerald-700 hover:text-white transition-all active:scale-95"
            >
              重新测定体质
            </button>
        </div>
      </div>
      <Branding />
    </div>
  );
};

export default ResultView;
