export type Mission = {
  name: string
}

export type Soldier = {
  first_name: string
  last_name: string
  nationality: string
  gender: string
  is_alive: boolean
  user_id?: number
  nickname: string | null
  fighter_class: string
  exp: number
}

export type MissionPerformance = {
  mission_id: number
  soldier_id: number
  hits: number
  misses: number
  kills: number
  exp_gained: number
  was_KIA: boolean
  was_promoted: boolean
}
