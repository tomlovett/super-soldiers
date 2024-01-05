import Link from 'next/link'
import type { Performance } from 'types'
import apiClient from 'api'

// const mortalityStatus = (soldier: Soldier): JSX.Element => {
//   const text: string = soldier.is_alive ? 'Active' : 'KIA'
//   const textColor: string = soldier.is_alive ? 'text-green-600' : 'text-red-600'
//
//   return <span className={textColor}>{text}</span>
// }

const statsByline = ({ hits, misses, kills }: Performance): string => {
  const percentage = hits / (hits + misses)
  const accuracy: number = Math.round(percentage * 100)

  return `Hits: ${hits} Misses: ${misses} Kills: ${kills} Accuracy: ${accuracy}%`
}

const PerformanceSlice = async ({ perf }: { perf: Performance }) => {
  const soldier = await apiClient.useSoldier(perf.soldier_id)

  return (
    <li className="py-4">
      <Link href={`/soldiers/${perf.soldier_id}`}>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-slate-200">
            {soldier.shortName}
            <span className="text-red-600">{perf.was_KIA ? ' X' : ''}</span>
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-slate-300">
            <span className="uppercase">{soldier.rank}</span> {soldier.fighter_class}
          </p>
          <p>{statsByline(perf)}</p>
        </div>
      </Link>
    </li>
  )
}

const MissionPage = async ({ params }: any) => {
  const mission = await apiClient.useMission(params.id as string)

  return (
    <div className="container p-6">
      <h2>MISSION: {mission.name}</h2>

      <ul role="list" className="column divide-y divide-gray-400">
        {mission.performances.map((perf) => (
          <PerformanceSlice perf={perf} key={perf.soldier_id} />
        ))}
      </ul>
    </div>
  )
}

export default MissionPage
