export class Mission {
  id: string
  name: string
  soldiers: Soldier[]
  performances: Performance[]

  constructor(options?: any) {
    if (!options) return
    if (options.id) this.id = options.id
    if (options.name) this.name = options.name
    if (options.soldiers) this.soldiers = options.soldiers
    if (options.performances) this.performances = options.performances
  }
}

export class Soldier {
  id: string
  first_name: string
  last_name: string
  nationality: string
  gender: string
  is_alive: boolean
  user_id?: number
  nickname: string | null
  fighter_class: string
  exp: number
  performances: Performance[]
}

export type Performance = {
  mission_id: string
  mission?: Mission
  soldier_id: string
  soldier?: Soldier
  hits: number
  misses: number
  kills: number
  exp_gained: number
  was_KIA: boolean
  was_promoted: boolean
}
