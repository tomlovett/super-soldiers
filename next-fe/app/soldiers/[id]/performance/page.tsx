import Link from 'next/link'
import type { Performance } from '../../../types'
import apiClient from '../../../api'

const statsByline = ({ hits, misses, kills }: Performance): string => {
  const percentage = hits / (hits + misses)
  const accuracy: number = Math.round(percentage * 100)

  return `Hits: ${hits} Misses: ${misses} Kills: ${kills} Accuracy: ${accuracy}%`
}

// Extract this and missions/[id] PerformanceSlice into single component
const PerformanceSlice = async ({ performance }: { performance: Performance }) => {
  const mission = await apiClient.useMission(performance.mission_id)

  return (
    <Link href="/missions">
      {' '}
      {/* this Link component breaks the dividers between LI's */}
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-slate-200">{mission.name}</p>
            <p className="mt-1 truncate text-xs leading-5 text-slate-300">
              {statsByline(performance)}
              <span className="text-yellow-400">{performance.was_promoted ? ' ^' : ''}</span>
              <span className="text-red-600">{performance.was_KIA ? ' X' : ''}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

const PerformancePage = async ({ params }: any) => {
  const soldier = await apiClient.useSoldier(params.id)

  return (
    <div className="container mx-auto items-center justify-between p-12">
      <ul role="list" className="column divide-y divide-gray-400">
        {soldier.performances.map((performance) => (
          <PerformanceSlice performance={performance} key={performance.mission_id} />
        ))}
      </ul>
    </div>
  )
}

export default PerformancePage
