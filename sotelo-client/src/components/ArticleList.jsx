// src/components/ArticleList.jsx
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((art) => (
        <article key={art.name} className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all hover:shadow-xl">
          <div className="aspect-video overflow-hidden">
            <img 
              src={art.img} 
              alt={art.title} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <div className="flex flex-col p-6 flex-grow">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#aa3bff' }}>
              {art.tag}
            </span>
            <h3 className="mt-3 text-xl font-bold" style={{ color: '#08060d' }}>
              {art.title}
            </h3>
            <p className="mt-3 mb-6 text-sm leading-relaxed text-zinc-600 flex-grow">
              {art.content[0].substring(0, 100)}...
            </p>
            <Button 
              to={`/articles/${art.name}`} 
              className="mt-auto w-full text-center border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white transition-colors" 
              style={{ color: '#08060d' }}
            >
              Read Full Article
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;