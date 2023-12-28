import Link from 'next/link';
import type { MissionPerformance } from '../../../types';
import { missionPerformances } from '../../../fixtures';

const statsByline = ({ hits, misses, kills }: MissionPerformance): string => {
  const percentage = hits / (hits + misses);
  const accuracy: number = Math.round(percentage * 100);

  return `Kills: ${kills} Accuracy: ${accuracy}%`;
};

export type sliceProps = {
  missionPerformance: MissionPerformance;
  missionName: string;
};

// Extract this and missions/[id] PerformanceSlice into single component
const MissionPerformanceSlice = ({
  missionPerformance,
  missionName,
}: sliceProps): JSX.Element => (
  <Link href="/missions">
    {' '}
    {/* this Link component breaks the dividers between LI's */}
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-slate-200">
            {missionName}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-slate-300">
            {statsByline(missionPerformance)}
            <span className="text-yellow-400">
              {missionPerformance.was_promoted ? ' ^' : ''}
            </span>
            <span className="text-red-600">
              {missionPerformance.was_KIA ? ' X' : ''}
            </span>
          </p>
        </div>
      </div>
    </li>
  </Link>
);

const PerformancePage = (): JSX.Element => (
  <div className="container mx-auto items-center justify-between p-12">
    <ul role="list" className="column divide-y divide-gray-400">
      {missionPerformances.map((missionPerf) => (
        <MissionPerformanceSlice
          missionPerformance={missionPerf}
          missionName={'Da Mission'}
          key={missionPerf.mission_id}
        />
      ))}
    </ul>
  </div>
);

export default PerformancePage;
