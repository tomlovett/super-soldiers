import Link from 'next/link'

const Home = () => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">

    <div className="mx-auto max-w-2xl lg:text-center">
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Super Soldiers</h1>
      <h3 className="mt-6 text-lg leading-8 text-indigo-600">The best in modern XCOM mission-tracking</h3>
      <p className="mt-6 text-lg leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
    </div>

    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">

        <Link href="/missions">
          <div className="relative pl-16">
            <dt className="text-base font-semibold leading-7">
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                M
              </div>
              View Missions
            </dt>
            <dd className="mt-2 text-base leading-7 text-gray-600">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.</dd>
          </div>
        </Link>

        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              S
            </div>
            View Soldiers
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.</dd>
        </div>

      </dl>
    </div>

  </main>
)

export default Home;
