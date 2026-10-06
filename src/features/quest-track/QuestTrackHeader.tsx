import { Plus } from 'lucide-react';
import { useQuestTrack } from './QuestTrackContext';
import { cn } from '../../lib/utils';

export function QuestTrackHeader() {
  const { teams, activeTeamId, addTeam, setActiveTeam } = useQuestTrack();

  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => setActiveTeam(team.id)}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
              activeTeamId === team.id
                ? "bg-white/10 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
            {team.name}
          </button>
        ))}
      </div>
      
      <button
        onClick={addTeam}
        className="flex shrink-0 items-center gap-1.5 px-3 py-1 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-md transition-colors ml-4 border border-transparent hover:border-white/10"
        title="Ajouter une Team"
      >
        <Plus size={14} />
        <span className="hidden sm:inline">Ajouter une Team</span>
      </button>
    </div>
  );
}
