import Button from '../components/Button';

const articles = [
  {
    title: 'Impact on Variety Television',
    tag: 'Analysis',
    img: 'https://i.pinimg.com/736x/2a/f4/74/2af474a0ea4f1ab699b3d02e48cc555a.jpg',
    desc: 'How Ryzza Mae redefined the role of child performers in the digital age of television.'
  },
  {
    title: 'From Little Miss to Lead Host',
    tag: 'Career History',
    img: 'https://alchetron.com/cdn/ryzza-mae-dizon-f771b678-d254-4912-be43-78d67392749-resize-750.png',
    desc: 'A timeline of the crucial decisions that helped Ryzza sustain her longevity in media.'
  },
  {
    title: 'The Art of the Interview',
    tag: 'Media Study',
    img: 'https://i0.wp.com/www.pinoyparazzi.com/wp-content/uploads/2015/09/Ryzza-Mae-Dizon2.jpg',
    desc: 'Looking back at the most iconic moments from "The Ryzza Mae Show" and its unique format.'
  }
];

const ArticlePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16">
        <h1 
          className="text-4xl font-bold" 
          style={{ color: '#08060d' }}
        >
          Featured Articles
        </h1>
        <p className="mt-4 max-w-2xl" style={{ color: '#6b6375' }}>
          Exploring the milestones and cultural impact of Ryzza Mae Dizon's career in entertainment.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((art, i) => (
          <article key={i} className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all hover:shadow-xl">
            <div className="aspect-video overflow-hidden">
              <img 
                src={art.img} 
                alt={art.title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
            <div className="flex flex-col p-6">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#aa3bff' }}>
                {art.tag}
              </span>
              <h3 className="mt-3 text-xl font-bold" style={{ color: '#08060d' }}>
                {art.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#6b6375' }}>
                {art.desc}
              </p>
              <Button 
                className="mt-6 border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white transition-colors" 
                style={{ color: '#08060d' }}
              >
                Read Full Article
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;