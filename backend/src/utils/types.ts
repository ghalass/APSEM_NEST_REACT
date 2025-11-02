export type LubrifiantData = {
  name: string;
  qte: number;
  typeConsommation: string | null;
};

export type SaisieHrmDayData = {
  date: string;
  typeparc: string;
  parc: string;
  engin: string;
  site: string;
  hrm: number;
  panne: string | null;
  him: number;
  ni: number;
  obs: string | null;
  lubrifiants: LubrifiantData[];
};
