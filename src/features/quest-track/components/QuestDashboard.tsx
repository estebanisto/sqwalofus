import { useQuestTrack } from '../QuestTrackContext';
import { Compass, Tornado, Castle, CalendarDays, Sword, PawPrint, Cat } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { TOUR_DU_MONDE_DATA, TORNADE_DATA, FRIGOST_DUNGEONS } from './QuestBoard';

const TOTAL_TDM = TOUR_DU_MONDE_DATA.length;
const TOTAL_TORNADE = TORNADE_DATA.length;
const TOTAL_FRIGOST = FRIGOST_DUNGEONS.length;

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1.5 bg-zinc-950 rounded-full border border-white/5 overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-500", color)} 
          style={{ width: `${percent}%` }} 
        />
      </div>
      <span className="text-[10px] font-medium text-zinc-500 w-8 text-right">{value}/{max}</span>
    </div>
  );
}

export function QuestDashboard({ onGoToBoard }: { onGoToBoard: () => void }) {
  const { teams, activeTeamId, setActiveTeam } = useQuestTrack();

  // Weekly reset is Tuesday 7AM
  const getLastTuesdayAt7AM = () => {
    const d = new Date();
    let daysAgo = (d.getDay() - 2 + 7) % 7;
    if (d.getDay() === 2 && d.getHours() < 7) daysAgo = 7;
    d.setDate(d.getDate() - daysAgo);
    d.setHours(7, 0, 0, 0);
    return d.getTime();
  };
  
  const lastTuesday = getLastTuesdayAt7AM();

  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-400">
        <p>Aucune team trouvée.</p>
        <button onClick={onGoToBoard} className="mt-4 px-4 py-2 bg-amber-500/20 text-amber-500 rounded hover:bg-amber-500/30">Créer une Team</button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      <div className="flex justify-between items-center mb-8 px-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            Vue d'ensemble des Teams
          </h2>
          <p className="text-sm text-zinc-500">Aperçu rapide de la progression de toutes vos équipes.</p>
        </div>
        <button
          onClick={onGoToBoard}
          className="px-4 py-2 text-sm font-semibold text-zinc-900 bg-amber-500 hover:bg-amber-400 rounded-md transition-colors shadow-lg shadow-amber-500/20"
        >
          Ouvrir le Tracker
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {teams.map((team) => {
          const d = team.data;
          const tdmValue = TOUR_DU_MONDE_DATA.filter(q => {
            if (q.dungeons.length === 0) return d.tourDuMondeChecked.includes('pnj');
            return q.dungeons.every(dj => d.tourDuMondeChecked.includes(dj));
          }).length;
          const tornadeValue = (d.tornadeChecked || []).length;
          const frigostValue = (d.frigostChecked || []).length;

          const isJusticiersDone = d.justiciersTimestamp !== null && d.justiciersTimestamp >= lastTuesday;
          const isKerubimDone = d.kerubimTimestamp !== null && d.kerubimTimestamp >= lastTuesday;
          
          const todayStr = new Date().toDateString();
          const isAlmanaxDone = d.almanaxDone && d.almanaxDate === todayStr;
          const isDragoDone = d.dragodindeDone && d.dragodindeDate === todayStr;

          return (
            <div 
              key={team.id}
              onClick={() => {
                setActiveTeam(team.id);
                onGoToBoard();
              }}
              className={cn(
                "bg-zinc-900 border border-zinc-800/80 rounded-xl p-5 hover:border-amber-500/50 hover:bg-zinc-800/80 transition-all cursor-pointer group shadow-xl",
                activeTeamId === team.id ? "ring-1 ring-amber-500/50" : ""
              )}
            >
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                <h3 className="font-bold text-zinc-100 text-lg group-hover:text-amber-500 transition-colors">{team.name}</h3>
                <span className="text-xs font-semibold bg-zinc-950 px-2 py-1 rounded text-zinc-400 border border-zinc-800">
                  {d.teamSize || 8} comptes
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                    <Compass size={14} /> Tour du Monde
                  </div>
                  <ProgressBar value={tdmValue} max={TOTAL_TDM} color="bg-emerald-500/80" />
                </div>
                
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-amber-500/80">
                    <Tornado size={14} /> Tornade
                  </div>
                  <ProgressBar value={tornadeValue} max={TOTAL_TORNADE} color="bg-amber-500/80" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-cyan-400">
                    <Castle size={14} /> Frigost
                  </div>
                  <ProgressBar value={frigostValue} max={TOTAL_FRIGOST} color="bg-cyan-400" />
                </div>

                <div className="pt-2 mt-2 border-t border-white/5 grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Quotidien</span>
                    <div className={cn("flex items-center gap-1 text-xs", isAlmanaxDone ? "text-emerald-500" : "text-red-400/80")}>
                      <CalendarDays size={12} /> Almanax
                    </div>
                    <div className={cn("flex items-center gap-1 text-xs", isDragoDone ? "text-emerald-500" : "text-red-400/80")}>
                      <PawPrint size={12} /> Élevage
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Hebdomadaire</span>
                    <div className={cn("flex items-center gap-1 text-xs", isJusticiersDone ? "text-emerald-500" : "text-red-400/80")}>
                      <Sword size={12} /> Justiciers
                    </div>
                    <div className={cn("flex items-center gap-1 text-xs", isKerubimDone ? "text-emerald-500" : "text-red-400/80")}>
                      <Cat size={12} /> Kérubim
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
