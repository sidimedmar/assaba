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
  { centre: 'École El Jedida', inscrits: 320, votes: 210, participation: 65.62 },
  { centre: 'École El Mina', inscrits: 280, votes: 145, participation: 51.78 },
  { centre: 'École El Khayri', inscrits: 410, votes: 285, participation: 69.51 },
  { centre: 'École El Amal', inscrits: 195, votes: 120, participation: 61.53 },
  { centre: 'École El Houda', inscrits: 350, votes: 240, participation: 68.57 },
  { centre: 'École El Nour', inscrits: 215, votes: 138, participation: 64.18 },
  { centre: 'École El Wafa', inscrits: 385, votes: 260, participation: 67.53 },
  { centre: 'École El Salam', inscrits: 150, votes: 95, participation: 63.33 },
  { centre: 'École El Baraka', inscrits: 425, votes: 310, participation: 72.94 },
  { centre: 'École El Rahma', inscrits: 275, votes: 180, participation: 65.45 },
  { centre: 'École El Taqwa', inscrits: 310, votes: 205, participation: 66.12 },
  { centre: 'École El Imane', inscrits: 180, votes: 115, participation: 63.88 },
  { centre: 'École El Ihsan', inscrits: 340, votes: 225, participation: 66.17 },
  { centre: 'École El Falah', inscrits: 265, votes: 175, participation: 66.03 },
  { centre: 'École El Nassr', inscrits: 125, votes: 82, participation: 65.60 },
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
