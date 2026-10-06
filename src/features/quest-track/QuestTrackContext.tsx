import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type QuestData = {
  tourDuMondeQuest: string;
  tourDuMondeChecked: string[];
  tornadeDonjonStep: number;
  tornadeChecked: number[];
  frigostDungeon: string;
  frigostChecked: number[];
  vaccinActive: boolean;
  vaccinTimestamp: number | null;
  dragodindeDone: boolean;
  dragodindeDate: string | null;
  almanaxDone: boolean;
  almanaxDate: string | null;
  justiciersDone: boolean;
  justiciersTimestamp: number | null;
  kerubimDone: boolean;
  kerubimTimestamp: number | null;
};

type Team = {
  id: string;
  name: string;
  data: QuestData;
};

interface QuestTrackState {
  teams: Team[];
  activeTeamId: string;
  addTeam: () => void;
  setActiveTeam: (id: string) => void;
  updateTeamData: (id: string, data: Partial<QuestData>) => void;
  resetTeam: (id: string) => void;
}

const QuestTrackContext = createContext<QuestTrackState | undefined>(undefined);

const defaultData: QuestData = { 
  tourDuMondeQuest: 'Le tour du monde.', 
  tourDuMondeChecked: [],
  tornadeDonjonStep: 0, 
  tornadeChecked: [],
  frigostDungeon: '',
  frigostChecked: [],
  vaccinActive: false,
  vaccinTimestamp: null,
  dragodindeDone: false,
  dragodindeDate: null,
  almanaxDone: false,
  almanaxDate: null,
  justiciersDone: false,
  justiciersTimestamp: null,
  kerubimDone: false,
  kerubimTimestamp: null,
};

const STORAGE_KEY = 'sqwalofus_quest_data';

export function QuestTrackProvider({ children }: { children: ReactNode }) {
  // Chargement initial depuis le localStorage (mémoire du navigateur)
  const [teams, setTeams] = useState<Team[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.teams) {
          // On fusionne avec defaultData au cas où de nouveaux champs auraient été ajoutés dans le code entre temps
          return parsed.teams.map((t: Team) => ({ ...t, data: { ...defaultData, ...t.data } }));
        }
      } catch (e) {}
    }
    return [{ id: '1', name: 'Team A', data: defaultData }];
  });

  const [activeTeamId, setActiveTeamId] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.activeTeamId) return parsed.activeTeamId;
      } catch (e) {}
    }
    return '1';
  });

  // Sauvegarde automatique en arrière-plan à chaque modification
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ teams, activeTeamId }));
  }, [teams, activeTeamId]);

  const addTeam = () => {
    const newId = Date.now().toString();
    const newName = `Team ${String.fromCharCode(65 + teams.length)}`;
    setTeams([...teams, { id: newId, name: newName, data: defaultData }]);
    setActiveTeamId(newId);
  };

  const updateTeamData = (id: string, data: Partial<QuestData>) => {
    setTeams(teams.map(t => (t.id === id ? { ...t, data: { ...t.data, ...data } } : t)));
  };

  const resetTeam = (id: string) => {
    setTeams(teams.map(t => (t.id === id ? { ...t, data: defaultData } : t)));
  };

  return (
    <QuestTrackContext.Provider
      value={{
        teams,
        activeTeamId,
        addTeam,
        setActiveTeam: setActiveTeamId,
        updateTeamData,
        resetTeam,
      }}
    >
      {children}
    </QuestTrackContext.Provider>
  );
}

export function useQuestTrack() {
  const context = useContext(QuestTrackContext);
  if (!context) {
    throw new Error('useQuestTrack must be used within a QuestTrackProvider');
  }
  return context;
}
