import type { Soldier, Mission, MissionPerformance } from './types';

export const soldiers: Soldier[] = [
  {
    first_name: 'Tom',
    last_name: 'Segura',
    nationality: 'PER',
    gender: 'M',
    is_alive: true,
    userId: 1,
    nickname: 'Tommy Buns',
    fighterClass: 'Assault',
    exp: 623,
  },
  {
    first_name: 'Joey',
    last_name: 'Diaz',
    nationality: 'CUB',
    gender: 'M',
    is_alive: true,
    userId: 1,
    nickname: 'CoCo',
    fighterClass: 'Heavy',
    exp: 123,
  },
  {
    first_name: 'Bobby',
    last_name: 'Lee',
    nationality: 'KOR',
    gender: 'M',
    is_alive: false,
    userId: 1,
    nickname: null,
    fighterClass: 'Sniper',
    exp: 0,
  },
];

export const missions: Mission[] = [
  { name: 'The Big Shebang' },
  { name: 'The Lusty Barmaid' },
];

export const missionPerformances: MissionPerformance[] = [
  {
    missionId: 1,
    soldierId: 2,
    hits: 7,
    misses: 2,
    kills: 4,
    expGained: 137,
    wasKIA: false,
    wasPromoted: true,
  },
  {
    missionId: 3,
    soldierId: 2,
    hits: 11,
    misses: 4,
    kills: 5,
    expGained: 137,
    wasKIA: false,
    wasPromoted: false,
  },
];
