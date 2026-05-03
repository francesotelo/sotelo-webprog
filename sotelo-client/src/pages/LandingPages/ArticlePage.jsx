// src/pages/ArticlePage.jsx
import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import articles from '../../assets/article-content.js';
import NotFoundPage from '../NotFoundPage.jsx';

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find((a) => a.name === name);

  // If URL doesn't match an article, show the Not Found page
  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-8">
        <Button to="/articles" variant="secondary">← Back to Articles</Button>
      </div>
      
      <div className="mb-12 overflow-hidden rounded-3xl shadow-xl border border-zinc-200">
        <img 
          src={article.img} 
          alt={article.title} 
          className="w-full aspect-video object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl">
        <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#aa3bff' }}>
          {article.tag}
        </span>
        
        {/* Title color fixed with inline styling */}
        <h1 
          className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: '#08060d' }}
        >
          {article.title}
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-8 text-zinc-700">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;