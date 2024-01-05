import { Soldier } from 'classes'

export type Mission = {
  id: string
  name: string
  soldiers: Soldier[]
  performances: Performance[]
}
