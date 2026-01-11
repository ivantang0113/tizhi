
import React, { useState } from 'react';
import Disclaimer from './components/Disclaimer';
import UserInfoForm from './components/UserInfoForm';
import Questionnaire from './components/Questionnaire';
import ResultView from './components/ResultView';
import Branding from './components/Branding';
import { UserInfo, ScoreMap } from './types';

enum Step {
  DISCLAIMER,
  USER_INFO,
  QUESTIONS,
  RESULT,
}

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.DISCLAIMER);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [scores, setScores] = useState<ScoreMap | null>(null);

  const handleDisclaimerAccept = () => setStep(Step.USER_INFO);

  const handleInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    setStep(Step.QUESTIONS);
  };

  const handleQuestionsComplete = (finalScores: ScoreMap) => {
    setScores(finalScores);
    setStep(Step.RESULT);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100 py-3 px-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-emerald-900 flex items-center">
          <span className="text-2xl mr-2">🌿</span>
          中医体质辨识
        </h1>
        <div className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-bold uppercase">
          AI Expert Edition
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto pb-10">
        {step === Step.DISCLAIMER && <Disclaimer onAccept={handleDisclaimerAccept} />}
        
        {step === Step.USER_INFO && (
          <div className="animate-fadeIn">
            <UserInfoForm onSubmit={handleInfoSubmit} />
          </div>
        )}

        {step === Step.QUESTIONS && (
          <div className="animate-slideIn">
            <Questionnaire onComplete={handleQuestionsComplete} />
          </div>
        )}

        {step === Step.RESULT && userInfo && scores && (
          <ResultView scores={scores} userInfo={userInfo} />
        )}

        {step !== Step.RESULT && <Branding />}
      </main>

      {/* Persistence Branding for small screens if not at Result */}
      <footer className="md:hidden fixed bottom-4 right-4 z-50">
         <div className="bg-emerald-900 text-white text-[10px] px-3 py-1 rounded-full shadow-lg opacity-80">
            搜索小红书：本草君
         </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
