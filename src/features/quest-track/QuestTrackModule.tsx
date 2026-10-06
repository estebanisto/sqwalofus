import { useState } from 'react';
import { QuestTrackProvider } from './QuestTrackContext';
import { QuestTrackHeader } from './QuestTrackHeader';
import { QuestBoard } from './components/QuestBoard';
import { QuestDashboard } from './components/QuestDashboard';
import { ChevronLeft } from 'lucide-react';

function QuestTrackContent() {
  const [view, setView] = useState<'dashboard' | 'board'>('dashboard');

  return (
    <div className="flex flex-col h-full w-full">
      {view === 'dashboard' ? (
        <QuestDashboard onGoToBoard={() => setView('board')} />
      ) : (
        <>
          <div className="mb-4 flex items-center">
            <button 
              onClick={() => setView('dashboard')} 
              className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} /> Retour à la vue d'ensemble
            </button>
          </div>
          <QuestTrackHeader />
          <QuestBoard />
        </>
      )}
    </div>
  );
}

export function QuestTrackModule() {
  return (
    <QuestTrackProvider>
      <QuestTrackContent />
    </QuestTrackProvider>
  );
}
