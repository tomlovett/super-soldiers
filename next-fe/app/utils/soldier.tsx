import type { MissionPerformance, Soldier } from '../types';
import {
  ROOKIE,
  SQUADDIE,
  CORPORAL,
  SERGEANT,
  LIEUTENANT,
  CAPTAIN,
  MAJOR,
  COLONEL,
} from '../constants';

export const displayName = (soldier: Soldier): string =>
  !!soldier.nickname
    ? soldier.nickname
    : `${soldier.first_name} ${soldier.last_name}`;

export const level = (soldier: Soldier): number => {
  if (soldier.exp < 100 || !soldier.exp) return 0;
  if (soldier.exp < 250) return 1;
  if (soldier.exp < 500) return 2;
  if (soldier.exp < 1000) return 3;
  if (soldier.exp < 2000) return 4;
  if (soldier.exp < 4000) return 5;
  if (soldier.exp < 8000) return 6;
  return 7;
};

export const rank = (soldier: Soldier): string => {
  switch (level(soldier)) {
    case 0:
      return ROOKIE;
    case 1:
      return SQUADDIE;
    case 2:
      return CORPORAL;
    case 3:
      return SERGEANT;
    case 4:
      return LIEUTENANT;
    case 5:
      return CAPTAIN;
    case 6:
      return MAJOR;
    default:
      return COLONEL;
  }
};

export const careerPerformance = (
  missionPerfs: MissionPerformance[],
): { kills: number; accuracy: number } => {
  let kills = 0;
  let hits = 0;
  let misses = 0;

  missionPerfs.map((missionPerf) => {
    kills += missionPerf.kills;
    hits += missionPerf.hits;
    misses += missionPerf.misses;
  });

  const accuracy = Math.round((100 * hits) / (hits + misses));

  return { kills, accuracy };
};
