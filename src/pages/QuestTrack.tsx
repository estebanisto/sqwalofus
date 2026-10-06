import { QuestTrackModule } from '../features/quest-track/QuestTrackModule';

export function QuestTrack() {
  return (
    <div className="h-full w-full">
      <h1 className="text-2xl font-semibold text-zinc-100 mb-6">QuestTrack</h1>
      <QuestTrackModule />
    </div>
  );
}
