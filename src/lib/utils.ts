import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ElectionData {
  centre: string;
  inscrits: number;
  votes: number;
  participation: number;
}

export const ELECTION_DATA: ElectionData[] = [
  { centre: 'École Hassi El Bekay', inscrits: 2718, votes: 1770, participation: 76.89 },
  { centre: 'Délégation Régionale', inscrits: 2002, votes: 469, participation: 58.59 },
  { centre: 'École 2', inscrits: 1879, votes: 388, participation: 45.20 },
  { centre: 'Commissariat Sécu.', inscrits: 1653, votes: 245, participation: 42.10 },
  { centre: 'École 1', inscrits: 1636, votes: 512, participation: 52.30 },
  { centre: 'Centre O.T.', inscrits: 1560, votes: 290, participation: 48.50 },
  { centre: 'École Iraq', inscrits: 1409, votes: 351, participation: 55.20 },
  { centre: 'École 4', inscrits: 1333, votes: 318, participation: 51.40 },
  { centre: 'École Sektar', inscrits: 1262, votes: 210, participation: 44.10 },
  { centre: 'Lycée', inscrits: 1211, votes: 195, participation: 40.20 },
  { centre: 'Centre Moyen', inscrits: 1169, votes: 180, participation: 39.50 },
  { centre: 'École Legleib', inscrits: 1084, votes: 347, participation: 62.10 },
  { centre: 'École Nizaha', inscrits: 1068, votes: 379, participation: 65.20 },
  { centre: 'École Ferdous', inscrits: 905, votes: 150, participation: 38.20 },
  { centre: 'Centre Santé', inscrits: 875, votes: 457, participation: 52.22 },
  { centre: 'Boumlane', inscrits: 450, votes: 375, participation: 83.27 },
  { centre: 'Dar El Avia', inscrits: 476, votes: 358, participation: 75.10 },
  { centre: 'École Saada', inscrits: 378, votes: 279, participation: 73.70 },
  { centre: 'Atwila', inscrits: 250, votes: 182, participation: 72.99 },
  { centre: 'École Kandra', inscrits: 713, votes: 507, participation: 71.06 },
  { centre: 'Hay Wiam', inscrits: 448, votes: 296, participation: 66.02 },
];

export function exportToCSV(data: ElectionData[], filename: string = 'election_data.csv') {
  const headers = ['Centre', 'Inscrits', 'Votes', 'Participation (%)'];
  const csvContent = [
    headers.join(','),
    ...data.map(item => [
      `"${item.centre}"`,
      item.inscrits,
      item.votes,
      item.participation
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
