import Link from 'next/link'
import { Soldier } from 'classes'
import apiClient from 'api'
import { sortById } from 'utils'
import { Avatar, Container, List, ListItem, ListItemText, Typography } from '@mui/material'

const secondaryText = (soldier: Soldier): string =>
  soldier.fighter_class ? `${soldier.rank.toUpperCase()} ${soldier.fighter_class}` : soldier.rank

const SoldierCard = ({ soldier }: { soldier: Soldier }): JSX.Element => (
  <ListItem divider component={Link} href={`soldiers/${soldier.id}`} sx={{ p: 2 }}>
    <Avatar
      alt={soldier.longName}
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    />
    <ListItemText
      primary={soldier.shortName}
      secondary={secondaryText(soldier)}
      primaryTypographyProps={{ color: 'text.primary' }}
    />
    <div>
      <Typography align="right" variant="subtitle1" color="text.primary">
        {soldier.nationality}
      </Typography>
      <Typography align="right" variant="subtitle2" color={soldier.is_alive ? 'text.secondary' : 'red'}>
        {soldier.is_alive ? 'Active' : 'KIA'}
      </Typography>
    </div>
  </ListItem>
)

const SoldiersPage = async () => {
  const soldiersList: Soldier[] = await apiClient.useSoldiers()
  soldiersList.sort(sortById)

  return (
    <Container max-width="lg">
      <h2>Soldiers</h2>
      <List>
        {soldiersList.map((soldier) => (
          <SoldierCard soldier={soldier} key={soldier.id} />
        ))}
      </List>
    </Container>
  )
}

export default SoldiersPage
