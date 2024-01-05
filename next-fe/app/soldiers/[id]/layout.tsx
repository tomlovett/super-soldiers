import { ReactNode } from 'react'
import apiClient from 'api'

const Layout = async ({ children, params }: { children: ReactNode; params: any }) => {
  const soldier = await apiClient.useSoldier(params.id)

  return (
    <div className="container p-6">
      <h2>{soldier.longName}</h2>
      <p className="mt-1 truncate text-xs leading-5 text-slate-300">
        <span className="uppercase">{soldier.rank}</span> {soldier.fighter_class}
        <span className="text-red-600">{soldier.is_alive ? '' : ' X'}</span>
      </p>
      <p>
        Missions: {soldier.numMissions} &nbsp; Kills: {soldier.numKills} &nbsp; Accuracy: {soldier.accuracy}
      </p>

      {children}
    </div>
  )
}

export default Layout
