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
    img: 'https://th.bing.com/th/id/R.6815ec0fb6c71104901c3505c9e8d75c?rik=DlGKu6Lx48b04A&riu=http%3a%2f%2fphilnews.ph%2fwp-content%2fuploads%2f2017%2f12%2fryzza-mae.jpg&ehk=7zZqzyxXRHt8scFkgDInPHC0d3dsN%2fpSFbuTZl9iJ4M%3d&risl=&pid=ImgRaw&r=0',
    desc: 'Looking back at the most iconic moments from "The Ryzza Mae Show" and its unique format.'
  }
];

const ArticlePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-zinc-900">Featured Articles</h1>
        <p className="mt-4 text-zinc-700 max-w-2xl">Exploring the milestones and cultural impact of Ryzza Mae Dizon's career in entertainment.</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((art, i) => (
          <article key={i} className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all hover:shadow-xl">
            <div className="aspect-video overflow-hidden">
              <img src={art.img} alt={art.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600">{art.tag}</span>
              <h3 className="mt-3 text-xl font-bold text-zinc-900">{art.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{art.desc}</p>
              <Button className="mt-6 border-zinc-200 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">Read Full Article</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;