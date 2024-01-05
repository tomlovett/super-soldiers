import Link from 'next/link'
import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'

interface LinkCardProps {
  href: string
  headerText: string
  bodyText: string
  icon: JSX.Element
}

const LinkCard = ({ href, headerText, bodyText, icon }: LinkCardProps) => (
  <Grid item xs={12} sm={6} md={6}>
    <Link href={href}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {icon} {headerText}
          </Typography>
          <Typography>{bodyText}</Typography>
        </CardContent>
      </Card>
    </Link>
  </Grid>
)

const Home = () => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Container maxWidth="md">
      <Typography component="h1" variant="h2" align="center" color="primary" gutterBottom>
        Super Soldiers
      </Typography>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        The best in modern XCOM mission-tracking
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar
        et feugiat blandit at. In mi viverra elit nunc.
      </Typography>
    </Container>

    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        <LinkCard
          href="/missions"
          headerText="View Missions"
          bodyText="Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi."
          icon={<MilitaryTechIcon />}
          key="missions"
        />

        <LinkCard
          href="/soldiers"
          headerText="View Soldiers"
          bodyText="Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam amet."
          icon=<LocalPoliceIcon />
          key="soldiers"
        />
      </Grid>
    </Container>
  </main>
)

export default Home
