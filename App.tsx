
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import IngredientAnalyzer from './components/IngredientAnalyzer';
import RecipeGenerator from './components/RecipeGenerator';
import WellnessChat from './components/WellnessChat';
import Disclaimer from './components/Disclaimer';
import UserInfoForm from './components/UserInfoForm';
import Questionnaire from './components/Questionnaire';
import ResultView from './components/ResultView';
import Branding from './components/Branding';
import { UserInfo, ScoreMap } from './types';

enum View {
  LANDING,
  TCM_DISCLAIMER,
  TCM_USER_INFO,
  TCM_QUESTIONS,
  TCM_RESULT,
}

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.LANDING);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [scores, setScores] = useState<ScoreMap | null>(null);

  // Home functionality
  const startTCM = () => setView(View.TCM_DISCLAIMER);
  const backToHome = () => setView(View.LANDING);

  // TCM functionality
  const handleDisclaimerAccept = () => setView(View.TCM_USER_INFO);
  const handleInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    setView(View.TCM_QUESTIONS);
  };
  const handleQuestionsComplete = (finalScores: ScoreMap) => {
    setScores(finalScores);
    setView(View.TCM_RESULT);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3E9]">
      {/* Dynamic Navbar based on view */}
      {view === View.LANDING ? (
        <Navbar />
      ) : (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 py-3 px-4 flex justify-between items-center shadow-sm">
          <button onClick={backToHome} className="text-emerald-900 flex items-center font-bold hover:text-emerald-700">
            <i className="fas fa-chevron-left mr-2"></i> 返回主页
          </button>
          <h1 className="text-xl font-bold text-emerald-900 flex items-center">
            🌿 中医体质辨识
          </h1>
          <div className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-bold uppercase">
            AI Expert
          </div>
        </nav>
      )}

      {/* Main Content Areas */}
      {view === View.LANDING ? (
        <div className="animate-fadeIn">
          <Home onStartTCM={startTCM} />
          <IngredientAnalyzer />
          <RecipeGenerator />
          <WellnessChat />
          <footer className="bg-[#1A3C34] text-[#F7F3E9]/60 py-16 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="font-serif text-3xl font-bold text-white mb-8 md:mb-0">植愈本草</div>
              <div className="text-sm text-center md:text-right space-y-2">
                <p>秉承“天人合一”哲学，探索生命调理之道</p>
                <p>© 2024 植愈本草. 搜索小红书：本草君</p>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <main className="flex-grow container mx-auto pb-10 pt-6">
          {view === View.TCM_DISCLAIMER && <Disclaimer onAccept={handleDisclaimerAccept} />}
          {view === View.TCM_USER_INFO && <UserInfoForm onSubmit={handleInfoSubmit} />}
          {view === View.TCM_QUESTIONS && <Questionnaire onComplete={handleQuestionsComplete} />}
          {view === View.TCM_RESULT && userInfo && scores && (
            <ResultView scores={scores} userInfo={userInfo} />
          )}
          {view !== View.TCM_RESULT && <Branding />}
        </main>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-fadeIn { animation: fadeIn 1.2s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        font-serif { font-family: 'Noto Serif SC', serif; }
      `}</style>
    </div>
  );
};

export default App;
