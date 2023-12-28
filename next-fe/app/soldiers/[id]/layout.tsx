'use client';

import { useParams } from 'next/navigation';
import { ReactNode } from 'react';
import type { Soldier } from '../../types';
import { soldiers, missionPerformances } from '../../fixtures';
import { careerPerformance, rank } from '../../utils/soldier';

const soldierName = ({ first_name, last_name, nickname }: Soldier): string =>
  !!nickname
    ? `${first_name} "${nickname}" ${last_name}`
    : `${first_name} ${last_name}`;

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const soldier: Soldier = soldiers[Number(id)];

  const careerStats = careerPerformance(missionPerformances);

  return (
    <div className="container p-6">
      <h2>{soldierName(soldier)}</h2>
      <p className="mt-1 truncate text-xs leading-5 text-slate-300">
        <span className="uppercase">{rank(soldier)}</span>{' '}
        {soldier.fighter_class}
        <span className="text-red-600">{soldier.is_alive ? '' : ' X'}</span>
      </p>
      <p>
        Missions: {missionPerformances.length} &nbsp; Kills: {careerStats.kills}{' '}
        &nbsp; Accuracy: {careerStats.accuracy}%
      </p>

      {children}
    </div>
  );
};

export default Layout;
