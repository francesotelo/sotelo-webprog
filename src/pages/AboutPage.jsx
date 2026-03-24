import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-12 pb-20">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#6b6375' }}>
            The Story
          </h2>
          <h1 
            className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" 
            style={{ color: '#08060d' }}
          >
            Child wonder to <span style={{ color: '#aa3bff' }}>versatile host.</span>
          </h1>
          <p className="mt-6 text-lg leading-8" style={{ color: '#6b6375' }}>
            Ryzza Mae Dizon (born June 12, 2005) broke through in 2012 after winning the popular 
            Eat Bulaga! segment Little Miss Philippines. Her quick wit and ability to interact 
            with seasoned veterans paved the way for "The Ryzza Mae Show."
          </p>
          <div className="mt-8 flex gap-4">
            <Button to="/articles" variant="primary">Read Features</Button>
          </div>
        </div>
        <div className="mt-12 lg:mt-0">
          <img 
            src="https://aphrodite.gmanetwork.com/entertainment/photos/photo/in_photos__ryzza_mae_dizon_s_cutest_throwback_surprise_1526985504.jpg" 
            alt="Ryzza Mae Throwback" 
            className="rounded-2xl shadow-xl object-cover w-full aspect-square"
          />
        </div>
      </section>

      <section className="bg-zinc-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'The Cha-Cha', text: 'Her signature dance move that became a nationwide viral craze.' },
              { title: 'Record Breaking', text: 'Became one of the youngest talk show hosts in Asian TV history.' },
              { title: 'Box Office Success', text: 'Starring roles in several "My Little Bossings" film installments.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-zinc-700 p-8 hover:bg-zinc-800 transition-colors">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-4 text-zinc-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;