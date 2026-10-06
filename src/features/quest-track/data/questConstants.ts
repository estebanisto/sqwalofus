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

export const TOUR_DU_MONDE_DATA = [
  { quest: 'Le tour du monde.', dungeons: ['Donjon des Bouftous', 'Donjon des Tofus', 'Donjon des Squelettes'], kamas: 1872 },
  { quest: 'Revenons à nos bouftons.', dungeons: ['Donjon des Scarafeuilles', 'Donjon des Bworks', 'Donjon des Forgerons'], kamas: 3552 },
  { quest: 'Le maître des clefs.', dungeons: ['Donjon des Bulbes', 'Grotte Hesque', 'Donjon des Craqueleurs'], kamas: 11424 },
  { quest: 'Les sbires du maître.', dungeons: ['Donjon des Blops', 'Donjon des Firefoux', 'Donjon des Pandikazes', 'Donjon des Kitsounes', 'Donjon des Dragœufs', 'Donjon de Daïgoro'], kamas: 54192 },
  { quest: 'Un juge hystérique.', dungeons: ['Donjon des Rats de Bonta', 'Donjon des Rats de Brâkmar', 'Donjon du Maître Corbac', 'Donjon des Kannibouls', 'Donjon des Foux', 'Donjon du Dragon Cochon', 'Donjon du Koulosse'], kamas: 178512 },
  { quest: 'Donjons, encore des donjons.', dungeons: ['Donjon des Rat Blanc', 'Donjon des Rat Noir', 'Donjon des Abraknydes Sombres', 'Donjon du Chêne Mou', 'Donjon du Maître Pandore', 'Donjon du Minotoror', 'Donjon de la Reine Nyée'], kamas: 195360 },
  { quest: 'La voie du guerrier.', dungeons: ['Donjon du Bworker', 'Donjon du Sphincter Cell', 'Donjon du Kimbo', 'Donjon du Tynril', 'Donjon du Kralamoure Géant'], kamas: 349872 },
  { quest: 'Le tracas du guerrier.', dungeons: [], kamas: 0 }
];

export const VACCIN_DURATION = 8 * 24 * 60 * 60 * 1000;

export const getLastTuesdayAt7AM = (nowTime: number) => {
  const now = new Date(nowTime);
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  let daysAgo = (currentDay - 2 + 7) % 7;
  if (currentDay === 2 && currentHour < 7) {
    daysAgo = 7;
  }
  const lastTuesday = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  lastTuesday.setHours(7, 0, 0, 0);
  return lastTuesday.getTime();
};

export const getNextTuesdayAt7AM = (nowTime: number) => {
  const now = new Date(nowTime);
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  let daysUntil = (2 - currentDay + 7) % 7;
  if (daysUntil === 0 && currentHour >= 7) {
    daysUntil = 7;
  }
  const nextTuesday = new Date(now.getTime() + daysUntil * 24 * 60 * 60 * 1000);
  nextTuesday.setHours(7, 0, 0, 0);
  return nextTuesday.getTime();
};
