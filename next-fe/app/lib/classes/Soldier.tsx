import { ROOKIE, SQUADDIE, CORPORAL, SERGEANT, LIEUTENANT, CAPTAIN, MAJOR, COLONEL } from 'lib/constants'

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

  constructor(options?: any) {
    if (!options) return
    if (options.id) this.id = options.id
    if (options.first_name) this.first_name = options.first_name
    if (options.last_name) this.last_name = options.last_name
    if (options.nickname) this.nickname = options.nickname
    if (options.nationality) this.nationality = options.nationality
    if (options.gender) this.gender = options.gender
    if (options.is_alive) this.is_alive = options.is_alive
    if (options.user_id) this.user_id = options.user_id
    if (options.fighter_class) this.fighter_class = options.fighter_class
    if (options.exp) this.exp = options.exp
    if (options.performances) this.performances = options.performances
  }

  get shortName(): string {
    return this.nickname ? this.nickname : `${this.first_name} ${this.last_name}`
  }

  get longName(): string {
    return this.nickname
      ? `${this.first_name} '${this.nickname}' ${this.last_name}`
      : `${this.first_name} ${this.last_name}`
  }

  get level(): number {
    if (this.exp < 100 || this.exp === undefined) return 0
    if (this.exp < 250) return 1
    if (this.exp < 500) return 2
    if (this.exp < 1000) return 3
    if (this.exp < 2000) return 4
    if (this.exp < 4000) return 5
    if (this.exp < 8000) return 6
    return 7
  }

  get rank(): string {
    switch (this.level) {
      case 0:
        return ROOKIE
      case 1:
        return SQUADDIE
      case 2:
        return CORPORAL
      case 3:
        return SERGEANT
      case 4:
        return LIEUTENANT
      case 5:
        return CAPTAIN
      case 6:
        return MAJOR
      default:
        return COLONEL
    }
  }

  get numMissions(): number {
    return this.performances.length
  }

  private accumulateStat(statName: string): number {
    return this.performances.reduce((acc: number, currObj: any) => acc + currObj[statName], 0)
  }

  get numKills(): number {
    return this.accumulateStat('kills')
  }

  get numHits(): number {
    return this.accumulateStat('hits')
  }

  get numMisses(): number {
    return this.accumulateStat('misses')
  }

  get accuracy(): string {
    const misses = this.numMisses
    const hits = this.numHits

    return hits + misses > 0 ? Math.round((100 * hits) / (hits + misses)) + '%' : '0%'
  }
}
