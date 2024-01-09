import { Soldier } from 'classes'
import { Performance } from 'types'

export type Mission = {
  id: string
  name: string
  soldiers: Soldier[]
  performances: Performance[]
}
