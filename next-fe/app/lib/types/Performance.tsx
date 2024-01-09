import { Mission } from 'types'
import { Soldier } from 'classes'

export type Performance = {
  id: number
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
