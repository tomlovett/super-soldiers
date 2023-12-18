"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { soldiers, missions, missionPerformances } from "../../fixtures";
import type { Mission, MissionPerformance, Soldier } from "../../types";
import { displayName, rank } from "../../utils/soldier";

const mortalityStatus = (soldier: Soldier): JSX.Element => {
  const text: string = soldier.isAlive ? "Active" : "KIA";
  const textColor: string = soldier.isAlive ? "text-green-600" : "text-red-600";

  return <span className={textColor}>{text}</span>;
};

const PerformanceSlice = ({
  perf,
  soldier,
}: {
  perf: MissionPerformance;
  soldier: Soldier;
}) => (
  <li>
    <Link href={`/soldiers/${perf.soldierId}`}>
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-slate-200">
          {displayName(soldier)}
					<span className="text-red-600">{perf.wasKIA ? " X" : ""}</span>
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-slate-300">
          <span className="uppercase">{rank(soldier)}</span>{" "}
          {soldier.fighterClass}
        </p>
				<p>

				</p>
      </div>
    </Link>
  </li>
);

const MissionPage = () => {
  const { id } = useParams<{ id: string }>();
  const mission = missions[Number(id)] as Mission;

  return (
    <div className="container p-6">
      <h2>{mission.name}</h2>

      <ul role="list" className="column divide-y divide-gray-400">
        {missionPerformances.map((perf) => (
          <PerformanceSlice
            perf={perf}
            soldier={soldiers[0]}
            key={perf.soldierId}
          />
        ))}
      </ul>
    </div>
  );
};

export default MissionPage;
