import Link from 'next/link'
import type { Performance } from '../../types'
import { displayName, rank } from '../../utils/soldier'
import apiClient from '../../api'

// const mortalityStatus = (soldier: Soldier): JSX.Element => {
//   const text: string = soldier.is_alive ? 'Active' : 'KIA'
//   const textColor: string = soldier.is_alive ? 'text-green-600' : 'text-red-600'
//
//   return <span className={textColor}>{text}</span>
// }

const PerformanceSlice = async ({ perf }: { perf: Performance }) => {
  const soldier = await apiClient.useSoldier(perf.soldier_id)

  return (
    <li>
      <Link href={`/soldiers/${perf.soldier_id}`}>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-slate-200">
            {displayName(soldier)}
            <span className="text-red-600">{perf.was_KIA ? ' X' : ''}</span>
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-slate-300">
            <span className="uppercase">{rank(soldier)}</span> {soldier.fighter_class}
          </p>
          <p>{/* stats */}</p>
        </div>
      </Link>
    </li>
  )
}

const MissionPage = async ({ params }: any) => {
  const mission = await apiClient.useMission(params.id as string)

  return (
    <div className="container p-6">
      <h2>{mission.name}</h2>

      <ul role="list" className="column divide-y divide-gray-400">
        {mission.performances.map((perf) => (
          <PerformanceSlice perf={perf} key={perf.soldier_id} />
        ))}
      </ul>
    </div>
  )
}

export default MissionPage
