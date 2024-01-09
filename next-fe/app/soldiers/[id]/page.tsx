import Link from 'next/link'
import { Grid, Typography } from '@mui/material'
import { PromotionIcon, RipIcon } from 'components/Icons'
import TabList from 'components/TabList'
// import { Soldier } from 'classes'
import { Performance } from 'types'
import apiClient from 'api'

const InformationTab = () => <Typography>Information</Typography>
const SoldierForm = () => <Typography>SoldierForm</Typography>

const PerformanceSlice = async ({ performance }: { performance: Performance }) => {
  const mission = await apiClient.useMission(performance.mission_id)
  const { hits, misses, kills, was_promoted, was_KIA } = performance
  const accuracy = Math.round((hits / (hits + misses)) * 100)

  return (
    <>
      <Grid item xs={1} alignItems="right">
        {was_KIA && <RipIcon />}
        {was_promoted && <PromotionIcon />}
      </Grid>
      <Grid item xs={2}>
        <Link href={`/missions/${mission.id}`}>
          <Typography variant="h6" color="primary">
            {mission.name}
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={1}>
        <Typography>{`Hits: ${hits}`}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>{`Misses: ${misses}`}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>{`Kills: ${kills}`}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>{`Accuracy: ${accuracy}%`}</Typography>
      </Grid>
    </>
  )
}

const PerformanceTab = ({ performances }: { performances: Performance[] }): JSX.Element => (
  <Grid container columns={7} spacing={2}>
    {performances.map((p: Performance) => (
      <PerformanceSlice performance={p} key={p.id} />
    ))}
  </Grid>
)

const SoldierPage = async ({ params }: { params: any }) => {
  const soldier = await apiClient.useSoldier(params.id)

  const tabListObjs = [
    { label: 'information', elements: <InformationTab /> },
    { label: 'edit', elements: <SoldierForm /> },
    { label: 'performance', elements: <PerformanceTab performances={soldier.performances} /> },
  ]

  return <TabList dataObjs={tabListObjs} />
}

export default SoldierPage
