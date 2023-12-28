import Link from 'next/link'

interface LinkCardProps {
  href: string
  headerText: string
  bodyText: string
  icon: string
}

const LinkCard = ({ href, headerText, bodyText, icon }: LinkCardProps) => (
  <Link href={href}>
    <div className="relative pl-16">
      <dt className="text-base font-semibold leading-7">
        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
          {icon}
        </div>
        {headerText}
      </dt>
      <dd className="mt-2 text-base leading-7 text-gray-600">{bodyText}</dd>
    </div>
  </Link>
)

const Home = () => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="mx-auto max-w-2xl lg:text-center">
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Super Soldiers</h1>
      <h3 className="mt-6 text-lg leading-8 text-indigo-600">The best in modern XCOM mission-tracking</h3>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar
        et feugiat blandit at. In mi viverra elit nunc.
      </p>
    </div>

    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <LinkCard
          href="/missions"
          headerText="View Missions"
          bodyText="Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi."
          icon="M"
          key="missions"
        />

        <LinkCard
          href="/soldiers"
          headerText="View Soldiers"
          bodyText="Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam amet."
          icon="S"
          key="soldiers"
        />
      </dl>
    </div>
  </main>
)

export default Home
