import { useState, useEffect } from 'react';
import { useQuestTrack } from '../QuestTrackContext';
import { Compass, Tornado, Castle, FlaskConical, PawPrint, CalendarDays, Sword, Cat, Check, ChevronDown, RotateCcw } from 'lucide-react';
import { cn } from '../../../lib/utils';

export const FRIGOST_DATA = [
  { name: "Royalmouth", kamas: 20136 },
  { name: "Mansot Royal", kamas: 26856 },
  { name: "Ben le Ripate", kamas: 30576 },
  { name: "Obsidiantre", kamas: 34536 },
  { name: "Tengu Snowfoux", kamas: 38736 },
  { name: "Korriandre", kamas: 43176 },
  { name: "Kolosso", kamas: 47856 },
  { name: "Glourséleste", kamas: 47856 },
  { name: "Sylargh", kamas: 0 },
  { name: "Klime", kamas: 0 },
  { name: "Nileza", kamas: 0 },
  { name: "Missiz Frizz", kamas: 0 },
  { name: "Comte Harebourg", kamas: 0 }
];

export const FRIGOST_DUNGEONS = FRIGOST_DATA.map(d => d.name);

export const TORNADE_DATA = [
  { quest: 'Donjon en mousse', dungeon: 'Donjon mousse', kamas: 1872 },
  { quest: 'Donjon rikiki', dungeon: 'Donjon rikiki', kamas: 5712 },
  { quest: 'Donjon en lambeaux', dungeon: 'Maison Fantôme', kamas: 5712 },
  { quest: 'Donjon éducatif', dungeon: 'Akadémie des Gobs', kamas: 5712 },
  { quest: 'Donjon douillet', dungeon: 'Nid du Kwakwa', kamas: 8352 },
  { quest: 'Donjon magistral', dungeon: 'Grotte Hesque', kamas: 8352 },
  { quest: 'Entre quatre blops', dungeon: 'Clos des Blops', kamas: 11472 },
  { quest: 'Un Kanniboul versé', dungeon: 'Village Kanniboul', kamas: 11472 },
  { quest: 'Le Wa Pythie', dungeon: 'Château du Wa Wabbit', kamas: 11472 },
  { quest: 'Gelée bien eue', dungeon: 'Gelaxième dimension', kamas: 11472 },
  { quest: 'C\'est radical ici', dungeon: 'Épreuve de Draegnerys', kamas: 15072 },
  { quest: 'Chéri fais-moi peur', dungeon: 'Cale de l\'arche d\'Otomaï', kamas: 15072 },
  { quest: 'Histoire de chiens', dungeon: 'Laboratoire de Brumen Tinctorias', kamas: 15072 },
  { quest: 'Le fossile et le marteau', dungeon: 'Cimetière des Mastodontes', kamas: 19152 },
  { quest: 'Un défilé de Wobots', dungeon: 'Terrier du Wa Wabbit', kamas: 19152 },
  { quest: 'C\'est du bateau', dungeon: 'Bateau du Chouque', kamas: 23712 },
  { quest: 'Le spectacle vivant', dungeon: 'Chapiteau des Magik Riktus', kamas: 23712 },
  { quest: 'Tour du propriétaire', dungeon: 'Antre de la Reine Nyée', kamas: 23712 },
  { quest: 'Tour d\'honneur', dungeon: 'Repaire du Kharnozor', kamas: 28752 },
  { quest: 'Tour de marionnettes', dungeon: 'Théâtre de Dramak', kamas: 28752 },
  { quest: 'Tour d\'horizon', dungeon: 'Arbre de Moon', kamas: 28752 },
  { quest: 'Tour à tour', dungeon: 'Goulet du Rasboul', kamas: 34272 },
  { quest: 'Tour de table', dungeon: 'Antre du Blop Multicolore Royal', kamas: 40272 },
  { quest: 'Tour de passe-passe', dungeon: 'Laboratoire du Tynril', kamas: 53712 },
  { quest: 'Tour de rein', dungeon: 'Repaire de Sphincter Cell', kamas: 61152 },
  { quest: 'Tour de main', dungeon: 'Canopée du Kimbo', kamas: 69072 },
  { quest: 'Tour de force', dungeon: 'Temple du Grand Ougah', kamas: 86352 },
  { quest: 'Tour nage', dungeon: 'Aquadôme de Merkator', kamas: 105552 },
  { quest: 'Le tour est joué', dungeon: 'Antre du Kralamoure Géant', kamas: 105552 }
];

const VACCIN_DURATION = 8 * 24 * 60 * 60 * 1000;

const getLastTuesdayAt7AM = (nowTime: number) => {
  const now = new Date(nowTime);
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  
  let daysAgo = (currentDay - 2 + 7) % 7;
  if (currentDay === 2 && currentHour < 7) {
    daysAgo = 7;
  }
  
  const lastReset = new Date(nowTime);
  lastReset.setDate(now.getDate() - daysAgo);
  lastReset.setHours(7, 0, 0, 0);
  return lastReset.getTime();
};

const getNextTuesdayAt7AM = (nowTime: number) => {
  const lastReset = new Date(getLastTuesdayAt7AM(nowTime));
  lastReset.setDate(lastReset.getDate() + 7);
  return lastReset.getTime();
};

export const TOUR_DU_MONDE_DATA = [
  { quest: 'Le tour du monde.', dungeons: ['Grange du Tournesol Affamé'], kamas: 1872 },
  { quest: 'Revenons à nos bouftons.', dungeons: ['Cour du Bouftou Royal'], kamas: 3552 },
  { quest: 'maitre des clés', dungeons: ['Donjon des Squelettes', 'Donjon des Tofus'], kamas: 11424 },
  { quest: 'Les sbires du maître', dungeons: ['Donjon des Scarafeuilles', 'Donjon des Forgerons', 'Donjon des Bworks', 'Donjon des Larves', 'Refuge Sylvestre', 'Pitons Rocheux des Craqueleurs'], kamas: 54192 },
  { quest: 'Un juge hystérique', dungeons: ['Domaine Ancestral', 'Antre du Dragon Cochon', 'Caverne du Koulosse', 'Tanière du Meulou', 'Garde-manger du Rat Blanc', 'Sousouricière du Rat Noir'], kamas: 178512 },
  { quest: 'Des donjons, encore des donjons', dungeons: ['Bibliothèque du Maître Corbac', 'Serre du Royalmouth', 'Labyrinthe du Minotoror', 'Tofulailler Royal', 'Antre de Crocabulia'], kamas: 195360 },
  { quest: 'La voie du guerrier', dungeons: ['Repaire de Skeunk', 'Atelier du Tanukouï San', 'Fabrique de foux d\'artifice', 'Clairière du Chêne Mou', 'Donjon du Minotot', 'Grotte du Bworker'], kamas: 349872 },
  { quest: 'Le tracas du guerrier', dungeons: [], kamas: 0 }
];

const RPGCheckbox = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    className={cn(
      "flex h-4 w-4 items-center justify-center rounded-[3px] border transition-colors flex-shrink-0",
      checked
        ? "border-emerald-500/50 bg-emerald-500/80 text-white"
        : "border-zinc-700 bg-zinc-950 hover:border-zinc-600"
    )}
  >
    {checked && <Check size={12} strokeWidth={2.5} />}
  </button>
);

const RPGBadge = ({ text, variant = 'default' }: { text: string; variant?: 'active' | 'daily' | 'weekly' | 'default' }) => {
  const variants = {
    active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    daily: "bg-amber-500/10 text-amber-500/90 border border-amber-500/20",
    weekly: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    default: "bg-zinc-800 text-zinc-400 border border-zinc-700"
  };
  return (
    <span className={cn("text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded", variants[variant])}>
      {text}
    </span>
  );
};

const RPGSelect = ({ value, onChange, children, className }: { value: string | number; onChange: (e: any) => void; children: React.ReactNode; className?: string }) => (
  <div className={cn("relative group", className)}>
    <select
      value={value}
      onChange={onChange}
      className="appearance-none bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded px-2 pr-7 py-1.5 text-xs text-zinc-300 text-center focus:outline-none focus:border-zinc-600 cursor-pointer w-full transition-colors truncate"
      style={{ textAlignLast: 'center' }}
    >
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
      <ChevronDown className="w-4 h-4" />
    </div>
  </div>
);

export function QuestBoard() {
  const { teams, activeTeamId, updateTeamData, resetTeam } = useQuestTrack();
  const [isTdmExpanded, setIsTdmExpanded] = useState(true);
  const [manualTornadeStep, setManualTornadeStep] = useState<number | null>(null);
  const [manualFrigostStep, setManualFrigostStep] = useState<number | null>(null);

  const team = teams.find((t) => t.id === activeTeamId);
  if (!team) return null;

  const d = team.data;
  
  const safeTornadeChecked = d.tornadeChecked || [];
  const firstUncompletedTornade = TORNADE_DATA.findIndex((_, i) => !safeTornadeChecked.includes(i));
  const defaultTornadeStep = firstUncompletedTornade === -1 ? TORNADE_DATA.length : firstUncompletedTornade;
  const displayTornadeStep = manualTornadeStep !== null ? manualTornadeStep : defaultTornadeStep;
  const isCurrentTornadeDone = displayTornadeStep < TORNADE_DATA.length && safeTornadeChecked.includes(displayTornadeStep);

  const safeFrigostChecked = d.frigostChecked || [];
  const firstUncompletedFrigost = FRIGOST_DUNGEONS.findIndex((_, i) => !safeFrigostChecked.includes(i));
  const defaultFrigostStep = firstUncompletedFrigost === -1 ? FRIGOST_DUNGEONS.length : firstUncompletedFrigost;
  const displayFrigostStep = manualFrigostStep !== null ? manualFrigostStep : defaultFrigostStep;
  const isCurrentFrigostDone = displayFrigostStep < FRIGOST_DUNGEONS.length && safeFrigostChecked.includes(displayFrigostStep);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const vaccinTimeLeft = d.vaccinTimestamp ? Math.max(0, d.vaccinTimestamp + VACCIN_DURATION - now) : 0;
  const isVaccinActive = vaccinTimeLeft > 0;

  const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return '';
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (days > 0) return `${days}j ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m ${seconds}s`;
  };

  const [almanaxData, setAlmanaxData] = useState<{ bonus: string; itemName: string; qty: number; img: string } | null>(null);

  useEffect(() => {
    const today = new Date();
    const localDateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    fetch(`https://api.dofusdb.fr/almanax?date=${localDateString}`)
      .then(res => res.json())
      .then(data => {
         if (data && data.items) {
           setAlmanaxData({
              bonus: data.desc?.fr || '',
              itemName: data.items[0]?.name?.fr || 'Inconnu',
              qty: data.quantities?.[0] || 0,
              img: data.items[0]?.img || ''
           });
         }
      })
      .catch(err => console.error("Erreur API Almanax:", err));
  }, []);

  const nowLocal = new Date();
  const todayString = `${nowLocal.getFullYear()}-${String(nowLocal.getMonth() + 1).padStart(2, '0')}-${String(nowLocal.getDate()).padStart(2, '0')}`;
  const isAlmanaxDoneToday = d.almanaxDate === todayString;
  const isDragodindeDoneToday = d.dragodindeDate === todayString;

  const lastTuesday7AM = getLastTuesdayAt7AM(now);
  const nextTuesday7AM = getNextTuesdayAt7AM(now);
  const weeklyTimeLeft = nextTuesday7AM - now;
  const isJusticiersDone = d.justiciersTimestamp !== null && d.justiciersTimestamp >= lastTuesday7AM;
  const isKerubimDone = d.kerubimTimestamp !== null && d.kerubimTimestamp >= lastTuesday7AM;

  const update = (field: keyof typeof d, value: any) => {
    updateTeamData(activeTeamId, { [field]: value });
  };

  const currentTdmIndex = TOUR_DU_MONDE_DATA.findIndex(q => q.quest === d.tourDuMondeQuest);
  const currentTdmQuest = currentTdmIndex !== -1 ? TOUR_DU_MONDE_DATA[currentTdmIndex] : TOUR_DU_MONDE_DATA[0];
  const totalTdmSteps = TOUR_DU_MONDE_DATA.length;
  const currentTdmStep = TOUR_DU_MONDE_DATA.filter(q => {
    if (q.dungeons.length === 0) return d.tourDuMondeChecked.includes('pnj');
    return q.dungeons.every(dj => d.tourDuMondeChecked.includes(dj));
  }).length;

  const teamSize = d.teamSize || 8;

  const totalTdmKamas = TOUR_DU_MONDE_DATA.reduce((acc, q) => acc + q.kamas, 0) * teamSize;
  const earnedTdmKamas = TOUR_DU_MONDE_DATA.reduce((acc, q) => {
    const isQuestDone = q.dungeons.length === 0 
      ? d.tourDuMondeChecked.includes('pnj')
      : q.dungeons.every(dj => d.tourDuMondeChecked.includes(dj));
    return acc + (isQuestDone ? q.kamas : 0);
  }, 0) * teamSize;

  const totalTornadeKamas = TORNADE_DATA.reduce((acc, q) => acc + q.kamas, 0) * teamSize;
  const earnedTornadeKamas = TORNADE_DATA.reduce((acc, q, i) => {
    return acc + (safeTornadeChecked.includes(i) ? q.kamas : 0);
  }, 0) * teamSize;

  const FRIGOST_3_META_BONUS = 211104;
  const totalFrigostKamas = (FRIGOST_DATA.reduce((acc, q) => acc + q.kamas, 0) + FRIGOST_3_META_BONUS) * teamSize;
  const earnedFrigostKamas = (FRIGOST_DATA.reduce((acc, q, i) => {
    return acc + (safeFrigostChecked.includes(i) ? q.kamas : 0);
  }, 0) + ([8, 9, 10, 11].every(id => safeFrigostChecked.includes(id)) ? FRIGOST_3_META_BONUS : 0)) * teamSize;

  return (
    <div className="w-full max-w-5xl mx-auto my-8 rounded-lg bg-zinc-900 border border-zinc-800/50 shadow-xl shadow-black/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-amber-500/90 tracking-wider uppercase flex items-center gap-2">
          Suivi de progression
        </h2>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 bg-zinc-950 px-1.5 py-1 rounded border border-zinc-800 shadow-inner">
            <span className="text-xs text-zinc-400 font-medium px-2">Comptes :</span>
            {[1, 4, 8].map(size => (
              <button
                key={size}
                onClick={() => update('teamSize', size)}
                className={cn(
                  "px-2.5 py-0.5 rounded text-xs font-bold transition-all",
                  teamSize === size 
                    ? "bg-amber-500/20 text-amber-500 border border-amber-500/50 shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 border border-transparent"
                )}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (window.confirm(`Êtes-vous sûr de vouloir réinitialiser toute la progression de la team "${team.name}" ?`)) {
                resetTeam(activeTeamId);
              }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded border border-red-500/20 transition-colors"
          title="Réinitialiser la Team"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">Reset la Team</span>
        </button>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-zinc-800/50">
        
        {/* Ligne : Tour du Monde */}
        <div className="flex flex-col hover:bg-zinc-800/40 transition-colors">
          <div className="flex items-center justify-between py-3.5 px-6">
            
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setIsTdmExpanded(!isTdmExpanded)}
              title="Réduire/Agrandir les donjons"
            >
              <Compass className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">Tour du Monde</span>
              <ChevronDown className={cn("w-4 h-4 text-zinc-500 transition-transform duration-300", isTdmExpanded ? "rotate-180" : "")} />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col gap-1.5 w-60">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500/80 transition-all duration-500" 
                      style={{ width: `${(currentTdmStep / totalTdmSteps) * 100}%` }} 
                    />
                  </div>
                  <span className="text-xs font-medium text-zinc-400 w-8 text-right">{currentTdmStep}/{totalTdmSteps}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-amber-500/80 transition-all duration-500" 
                      style={{ width: `${(earnedTdmKamas / Math.max(1, totalTdmKamas)) * 100}%` }} 
                    />
                  </div>
                  <span className="text-[10px] font-medium text-amber-500/90 w-auto text-right tabular-nums whitespace-nowrap">
                    {earnedTdmKamas.toLocaleString('fr-FR')} / {totalTdmKamas.toLocaleString('fr-FR')} 💰
                  </span>
                </div>
              </div>
              
              <RPGSelect
                value={d.tourDuMondeQuest}
                onChange={(e) => update('tourDuMondeQuest', e.target.value)}
                className="w-[160px] sm:w-[220px]"
              >
                {TOUR_DU_MONDE_DATA.map((q) => {
                  const isDone = q.dungeons.length === 0 
                    ? d.tourDuMondeChecked.includes('pnj')
                    : q.dungeons.every(dj => d.tourDuMondeChecked.includes(dj));
                    
                  return (
                    <option key={q.quest} value={q.quest} className={cn("bg-zinc-900 text-left", isDone ? "text-emerald-400" : "text-zinc-300")}>
                      {isDone ? '✓ ' : ''}{q.quest}
                    </option>
                  );
                })}
                <option value="DONE" className="bg-zinc-900 text-emerald-400 text-left font-medium">
                  Quête terminée !
                </option>
              </RPGSelect>
            </div>
          </div>
          
          {/* Sous-zone des donjons */}
          {isTdmExpanded && (
            <div className="ml-10 mr-6 mb-4 pl-4 border-l border-zinc-700/50 flex flex-col gap-3">
              
              {d.tourDuMondeQuest === 'DONE' ? (
                <div className="flex justify-between items-center mt-2 p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-sm text-emerald-400 font-medium">Le Tour du Monde est entièrement terminé !</span>
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
              ) : currentTdmQuest.dungeons.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                    {currentTdmQuest.dungeons.map((dj) => {
                      const isChecked = d.tourDuMondeChecked.includes(dj);
                      
                      return (
                        <div 
                          key={dj} 
                          onClick={() => {
                            if (isChecked) {
                              update('tourDuMondeChecked', d.tourDuMondeChecked.filter(item => item !== dj));
                            } else {
                              update('tourDuMondeChecked', [...d.tourDuMondeChecked, dj]);
                            }
                          }}
                          className="flex justify-between items-center p-2 rounded-md bg-zinc-800/30 border border-zinc-700/50 hover:bg-zinc-700/50 cursor-pointer group transition-colors"
                        >
                          <span className={cn(
                            "text-sm select-none transition-colors", 
                            isChecked ? "text-zinc-600 line-through" : "text-zinc-300 group-hover:text-zinc-100"
                          )}>
                            {dj}
                          </span>
                          
                          <div className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border transition-all flex-shrink-0",
                            isChecked
                              ? "border-emerald-500/50 bg-emerald-500/80 text-white"
                              : "border-zinc-700 bg-zinc-950 group-hover:border-zinc-600"
                          )}>
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-end pt-1 gap-2">
                    {currentTdmQuest.dungeons.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newChecks = [...d.tourDuMondeChecked];
                          currentTdmQuest.dungeons.forEach(dj => {
                            if (!newChecks.includes(dj)) newChecks.push(dj);
                          });
                          update('tourDuMondeChecked', newChecks);
                        }}
                        className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 hover:text-zinc-100 transition-colors bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded border border-zinc-700/50"
                      >
                        Tout cocher
                      </button>
                    )}
                    {currentTdmQuest.dungeons.every(dj => d.tourDuMondeChecked.includes(dj)) && currentTdmIndex < TOUR_DU_MONDE_DATA.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          update('tourDuMondeQuest', TOUR_DU_MONDE_DATA[currentTdmIndex + 1].quest);
                        }}
                        className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-0.5 rounded border border-emerald-500/30"
                      >
                        Suivant ➔
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                  <div 
                    onClick={() => {
                      const isChecked = d.tourDuMondeChecked.includes('pnj');
                      if (isChecked) {
                        updateTeamData(activeTeamId, {
                          tourDuMondeChecked: d.tourDuMondeChecked.filter(item => item !== 'pnj')
                        });
                      } else {
                        updateTeamData(activeTeamId, {
                          tourDuMondeChecked: [...d.tourDuMondeChecked, 'pnj'],
                          tourDuMondeQuest: 'DONE'
                        });
                      }
                    }}
                    className="flex justify-between items-center p-2 rounded-md bg-zinc-800/30 border border-zinc-700/50 hover:bg-zinc-700/50 cursor-pointer group transition-colors"
                  >
                    <span className={cn(
                      "text-sm select-none transition-colors", 
                      d.tourDuMondeChecked.includes('pnj') ? "text-zinc-600 line-through" : "text-zinc-300 group-hover:text-zinc-100"
                    )}>
                      Rendre la quête au PNJ
                    </span>
                    
                    <div className={cn(
                      "flex h-4 w-4 items-center justify-center rounded border transition-all flex-shrink-0",
                      d.tourDuMondeChecked.includes('pnj')
                        ? "border-emerald-500/50 bg-emerald-500/80 text-white"
                        : "border-zinc-700 bg-zinc-950 group-hover:border-zinc-600"
                    )}>
                      {d.tourDuMondeChecked.includes('pnj') && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ligne : Tornade de Donjons */}
        <div className="flex items-center justify-between py-3.5 px-6 hover:bg-zinc-800/40 transition-colors">
          <div className="flex items-center gap-3">
            <Tornado className="w-5 h-5 text-amber-500/80" />
            <span className="text-sm font-medium text-zinc-100">Tornade de Donjons</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col gap-1.5 w-60">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-zinc-950 rounded-full border border-white/5 overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-emerald-500/80 transition-all duration-500" 
                    style={{ width: `${(safeTornadeChecked.length / TORNADE_DATA.length) * 100}%` }} 
                  />
                </div>
                <span className="text-xs font-medium text-zinc-400 w-8 text-right">{safeTornadeChecked.length}/{TORNADE_DATA.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-amber-500/80 transition-all duration-500" 
                    style={{ width: `${(earnedTornadeKamas / Math.max(1, totalTornadeKamas)) * 100}%` }} 
                  />
                </div>
                <span className="text-[10px] font-medium text-amber-500/90 w-auto text-right tabular-nums whitespace-nowrap">
                  {earnedTornadeKamas.toLocaleString('fr-FR')} / {totalTornadeKamas.toLocaleString('fr-FR')} 💰
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <RPGSelect
                value={displayTornadeStep}
                onChange={(e) => setManualTornadeStep(Number(e.target.value))}
                className="w-[180px] sm:w-[260px]"
              >
                {TORNADE_DATA.map((t, i) => {
                  const isDone = safeTornadeChecked.includes(i);
                  return (
                    <option key={i} value={i} className={cn("bg-zinc-900 text-left", isDone ? "text-emerald-400" : "text-zinc-300")}>
                      {isDone ? '✓ ' : ''}{t.quest} ({t.dungeon})
                    </option>
                  );
                })}
                <option value={TORNADE_DATA.length} className="bg-zinc-900 text-zinc-300 text-left font-medium">
                  Quête terminée !
                </option>
              </RPGSelect>
              
              <button
                onClick={() => {
                  if (displayTornadeStep < TORNADE_DATA.length) {
                    if (isCurrentTornadeDone) {
                      update('tornadeChecked', safeTornadeChecked.filter(x => x !== displayTornadeStep));
                    } else {
                      update('tornadeChecked', [...safeTornadeChecked, displayTornadeStep]);
                      setManualTornadeStep(null);
                    }
                  }
                }}
                disabled={displayTornadeStep >= TORNADE_DATA.length}
                className={cn(
                  "flex items-center justify-center h-[28px] w-[28px] rounded border transition-all flex-shrink-0 group",
                  displayTornadeStep >= TORNADE_DATA.length
                    ? "border-emerald-500/40 bg-emerald-500/20 opacity-100 cursor-default"
                    : isCurrentTornadeDone 
                      ? "border-emerald-500/40 bg-emerald-500/20 hover:bg-emerald-500/30" 
                      : "border-zinc-700 bg-zinc-950 hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer"
                )}
                title={isCurrentTornadeDone ? "Annuler l'étape" : "Valider l'étape"}
              >
                {displayTornadeStep >= TORNADE_DATA.length || isCurrentTornadeDone ? (
                   <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />
                ) : (
                   <Check className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" strokeWidth={3} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Ligne : Frigost */}
        <div className="flex items-center justify-between py-3.5 px-6 hover:bg-zinc-800/40 transition-colors">
          <div className="flex items-center gap-3">
            <Castle className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-zinc-100">Donjons Frigost</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col gap-1.5 w-60">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-zinc-950 rounded-full border border-white/5 overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-emerald-500/80 transition-all duration-500" 
                    style={{ width: `${(safeFrigostChecked.length / FRIGOST_DUNGEONS.length) * 100}%` }} 
                  />
                </div>
                <span className="text-xs font-medium text-zinc-400 w-8 text-right">{safeFrigostChecked.length}/{FRIGOST_DUNGEONS.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-amber-500/80 transition-all duration-500" 
                    style={{ width: `${(earnedFrigostKamas / Math.max(1, totalFrigostKamas)) * 100}%` }} 
                  />
                </div>
                <span className="text-[10px] font-medium text-amber-500/90 w-auto text-right tabular-nums whitespace-nowrap">
                  {earnedFrigostKamas.toLocaleString('fr-FR')} / {totalFrigostKamas.toLocaleString('fr-FR')} 💰
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <RPGSelect
                value={displayFrigostStep}
                onChange={(e) => setManualFrigostStep(Number(e.target.value))}
                className="w-[180px] sm:w-[260px]"
              >
                {FRIGOST_DUNGEONS.map((dj, i) => {
                  const isDone = safeFrigostChecked.includes(i);
                  return (
                    <option key={i} value={i} className={cn("bg-zinc-900 text-left", isDone ? "text-emerald-400" : "text-zinc-300")}>
                      {isDone ? '✓ ' : ''}{dj}
                    </option>
                  );
                })}
                <option value={FRIGOST_DUNGEONS.length} className="bg-zinc-900 text-zinc-300 text-left font-medium">
                  Quête terminée !
                </option>
              </RPGSelect>
              
              <button
                onClick={() => {
                  if (displayFrigostStep < FRIGOST_DUNGEONS.length) {
                    if (isCurrentFrigostDone) {
                      update('frigostChecked', safeFrigostChecked.filter(x => x !== displayFrigostStep));
                    } else {
                      update('frigostChecked', [...safeFrigostChecked, displayFrigostStep]);
                      setManualFrigostStep(null);
                    }
                  }
                }}
                disabled={displayFrigostStep >= FRIGOST_DUNGEONS.length}
                className={cn(
                  "flex items-center justify-center h-[28px] w-[28px] rounded border transition-all flex-shrink-0 group",
                  displayFrigostStep >= FRIGOST_DUNGEONS.length
                    ? "border-emerald-500/40 bg-emerald-500/20 opacity-100 cursor-default"
                    : isCurrentFrigostDone 
                      ? "border-emerald-500/40 bg-emerald-500/20 hover:bg-emerald-500/30" 
                      : "border-zinc-700 bg-zinc-950 hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer"
                )}
                title={isCurrentFrigostDone ? "Annuler l'étape" : "Valider l'étape"}
              >
                {displayFrigostStep >= FRIGOST_DUNGEONS.length || isCurrentFrigostDone ? (
                   <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />
                ) : (
                   <Check className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" strokeWidth={3} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Ligne : Vaccin Frigost */}
        <div className="flex items-center justify-between py-3.5 px-6 hover:bg-zinc-800/40 transition-colors">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-5 h-5 text-fuchsia-400" />
            <span className="text-sm font-medium text-zinc-100">Vaccin Frigost</span>
            {isVaccinActive && <RPGBadge text="ACTIF" variant="active" />}
          </div>
          <div className="flex items-center gap-4">
            {isVaccinActive && (
              <span className="text-xs font-mono font-medium text-zinc-400 tracking-wider">
                {formatTimeLeft(vaccinTimeLeft)}
              </span>
            )}
            <button
              onClick={() => update('vaccinTimestamp', isVaccinActive ? null : Date.now())}
              className={cn(
                "text-xs px-3 py-1 rounded transition-all shadow-inner",
                isVaccinActive 
                  ? "bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-zinc-300"
                  : "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700"
              )}
            >
              {isVaccinActive ? 'Annuler' : 'Prendre le vaccin'}
            </button>
          </div>
        </div>

        {/* Ligne : Dragodinde */}
        <div className="flex items-center justify-between py-3.5 px-6 hover:bg-zinc-800/40 transition-colors">
          <div className="flex items-center gap-3">
            <PawPrint className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-zinc-100">Quête Dragodinde</span>
            <RPGBadge text="QUOTIDIEN" variant="daily" />
          </div>
          <RPGCheckbox checked={isDragodindeDoneToday} onChange={(v) => update('dragodindeDate', v ? todayString : null)} />
        </div>

        {/* Ligne : Almanax */}
        <div className="flex flex-col py-3.5 px-6 hover:bg-zinc-800/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-yellow-500/80" />
              <span className="text-sm font-medium text-zinc-100">Almanax</span>
              <RPGBadge text="QUOTIDIEN" variant="daily" />
            </div>
            <RPGCheckbox checked={isAlmanaxDoneToday} onChange={(v) => update('almanaxDate', v ? todayString : null)} />
          </div>
          
          {almanaxData && (
             <div className="mt-3 ml-8 flex items-start gap-3 bg-zinc-900 p-2.5 rounded-md border border-zinc-800">
                <img src={almanaxData.img} alt={almanaxData.itemName} className="w-10 h-10 rounded-sm drop-shadow-md bg-zinc-900/80 p-0.5 border border-white/5" />
                <div className="flex flex-col justify-center">
                   <span className="text-[13px] text-zinc-100 font-semibold tracking-wide">
                      Offrande : {almanaxData.qty}x {almanaxData.itemName}
                   </span>
                   <span 
                      className="text-[11px] text-zinc-400 leading-snug mt-1 max-w-lg"
                      dangerouslySetInnerHTML={{ __html: almanaxData.bonus }}
                   />
                </div>
             </div>
          )}
        </div>

        {/* Ligne : Justiciers */}
        <div className="flex items-center justify-between py-3.5 px-6 hover:bg-zinc-800/40 transition-colors">
          <div className="flex items-center gap-3">
            <Sword className="w-5 h-5 text-slate-300" />
            <span className="text-sm font-medium text-zinc-100">Justiciers</span>
            <RPGBadge text="HEBDOMADAIRE" variant="weekly" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-medium text-zinc-500 tracking-wider">
              {formatTimeLeft(weeklyTimeLeft)}
            </span>
            <RPGCheckbox checked={isJusticiersDone} onChange={(v) => update('justiciersTimestamp', v ? Date.now() : null)} />
          </div>
        </div>

        {/* Ligne : Kerubim */}
        <div className="flex items-center justify-between py-3.5 px-6 hover:bg-zinc-800/40 transition-colors">
          <div className="flex items-center gap-3">
            <Cat className="w-5 h-5 text-slate-300" />
            <span className="text-sm font-medium text-zinc-100">Kerubim</span>
            <RPGBadge text="HEBDOMADAIRE" variant="weekly" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-medium text-zinc-500 tracking-wider">
              {formatTimeLeft(weeklyTimeLeft)}
            </span>
            <RPGCheckbox checked={isKerubimDone} onChange={(v) => update('kerubimTimestamp', v ? Date.now() : null)} />
          </div>
        </div>

      </div>
    </div>
  );
}
