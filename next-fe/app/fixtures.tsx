import type { Soldier, Mission, MissionPerformance } from './types'

export const soldiers: Soldier[] = [
  {
    first_name: 'Tom',
    last_name: 'Segura',
    nationality: 'PER',
    gender: 'M',
    is_alive: true,
    user_id: 1,
    nickname: 'Tommy Buns',
    fighter_class: 'Assault',
    exp: 623,
  },
  {
    first_name: 'Joey',
    last_name: 'Diaz',
    nationality: 'CUB',
    gender: 'M',
    is_alive: true,
    user_id: 1,
    nickname: 'CoCo',
    fighter_class: 'Heavy',
    exp: 123,
  },
  {
    first_name: 'Bobby',
    last_name: 'Lee',
    nationality: 'KOR',
    gender: 'M',
    is_alive: false,
    user_id: 1,
    nickname: null,
    fighter_class: 'Sniper',
    exp: 0,
  },
]

export const missions: Mission[] = [{ name: 'The Big Shebang' }, { name: 'The Lusty Barmaid' }]

export const missionPerformances: MissionPerformance[] = [
  {
    mission_id: 1,
    soldier_id: 2,
    hits: 7,
    misses: 2,
    kills: 4,
    exp_gained: 137,
    was_KIA: false,
    was_promoted: true,
  },
  {
    mission_id: 3,
    soldier_id: 2,
    hits: 11,
    misses: 4,
    kills: 5,
    exp_gained: 137,
    was_KIA: false,
    was_promoted: false,
  },
]
