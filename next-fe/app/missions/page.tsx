import type { Mission } from '../../app/types';

const missionsList: Mission[] = [
  { name: 'Testarooski' },
  { name: 'Fumblerooski' },
];

const MissionCard = ({ name }: Mission) => (
  <li className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <img
        className="h-12 w-12 flex-none rounded-full bg-gray-50"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-slate-200">{name}</p>
        <p className="mt-1 truncate text-xs leading-5 text-slate-300">
          Lorem details
        </p>
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-slate-400">more stuff</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        Last seen <time>3h ago</time>
      </p>
    </div>
  </li>
);

const MissionsPage = () => (
  <div className="container mx-auto px-8 items-center justify-between p-12">
    <ul role="list" className="column divide-y divide-gray-400">
      {missionsList.map((mission) => (
        <MissionCard name={mission.name} key={mission.name} />
      ))}
    </ul>
  </div>
);

export default MissionsPage;
