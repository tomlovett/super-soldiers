import type { Soldier } from '../types';
import { rank, displayName } from '../utils/soldier';
import { soldiers } from '../fixtures';

const soldiersList: Soldier[] = soldiers;

const mortalityStatus = (soldier: Soldier): JSX.Element => {
  const text: string = soldier.isAlive ? 'Active' : 'KIA';
  const textColor: string = soldier.isAlive ? 'text-green-600' : 'text-red-600';

  return <span className={textColor}>{text}</span>;
};

const SoldierCard = ({ soldier }: { soldier: Soldier }): JSX.Element => (
  <li className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <img
        className="h-12 w-12 flex-none rounded-full bg-gray-50"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-slate-200">
          {displayName(soldier)}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-slate-300">
          <span className="uppercase">{rank(soldier)}</span>{' '}
          {soldier.fighterClass}
        </p>
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-slate-400">{soldier.nationality}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        {mortalityStatus(soldier)}
      </p>
    </div>
  </li>
);

const SoldiersPage = (): JSX.Element => (
  <div className="container mx-auto px-8 items-center justify-between p-12">
    <ul role="list" className="column divide-y divide-gray-400">
      {soldiersList.map((soldier) => (
        <SoldierCard soldier={soldier} key={displayName(soldier)} />
      ))}
    </ul>
  </div>
);

export default SoldiersPage;
