import { QuestTrackProvider } from './QuestTrackContext';
import { QuestTrackHeader } from './QuestTrackHeader';
import { QuestBoard } from './components/QuestBoard';

export function QuestTrackModule() {
  return (
    <QuestTrackProvider>
      <div className="flex flex-col h-full w-full">
        <QuestTrackHeader />
        <QuestBoard />
      </div>
    </QuestTrackProvider>
  );
}
