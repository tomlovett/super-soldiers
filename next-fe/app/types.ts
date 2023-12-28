export type Mission = {
  name: string;
};

export type Soldier = {
  first_name: string;
  last_name: string;
  nationality: string;
  gender: string;
  is_alive: boolean;
  userId?: number;
  nickname: string | null;
  fighterClass: string;
  exp: number;
};

export type MissionPerformance = {
  missionId: number;
  soldierId: number;
  hits: number;
  misses: number;
  kills: number;
  expGained: number;
  wasKIA: boolean;
  wasPromoted: boolean;
};
