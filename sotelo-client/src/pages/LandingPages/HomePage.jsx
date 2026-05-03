import Button from '../../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-16 pb-20">
      <section className="relative overflow-hidden bg-zinc-50 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">Official Portfolio</p>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                {}
                <span className="text-zinc-900">The evolution of</span>{" "}
                <span className="text-purple-600">Ryzza Mae Dizon.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-700">
                From the grand winner of Little Miss Philippines to becoming the youngest talk show host 
                in the country, Ryzza Mae's journey is a testament to natural talent and hard work.
              </p>
              <div className="mt-10 flex gap-4">
                <Button to="/about" variant="primary" className="px-8 py-4">
                  Full Biography
                </Button>
                <Button to="/articles" className="px-8 py-4 bg-white border-zinc-200 text-zinc-900">
                  Career Milestones
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.gmanews.tv/v3/webpics/v3/2015/02/2015_02_17_21_05_36.jpg" 
                alt="Ryzza Mae" 
                className="rounded-3xl shadow-2xl ring-1 ring-zinc-900/10 object-cover w-full aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 mb-12">By The Numbers</h2>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { label: 'Years Active', value: '12' },
            { label: 'Acting Awards', value: '08' },
            { label: 'Movies Filmed', value: '06' },
            { label: 'TV Shows', value: '15' },
          ].map((kpi, i) => (
            <div key={i} className="flex flex-col gap-y-2 border-l border-zinc-200 pl-8 text-left">
              <dt className="text-sm text-zinc-600">{kpi.label}</dt>
              <dd className="text-4xl font-bold tracking-tight text-zinc-900">{kpi.value}</dd>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;