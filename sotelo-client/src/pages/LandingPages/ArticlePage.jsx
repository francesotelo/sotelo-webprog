import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import NotFoundPage from '../NotFoundPage.jsx';
import { fetchArticles } from '../../services/ArticleService';

const ArticlePage = () => {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await fetchArticles();
        const dbArticle = res.data.articles.find(a => a.slug === name && a.isActive);
        
        if (dbArticle) {
          const generatedParagraphs = Array.from(
            { length: Math.max(0, dbArticle.paragraphs - 1) }, 
            () => "Additional detailed content for this section will be updated soon."
          );

          setArticle({
            name: dbArticle.slug,
            title: dbArticle.title,
            tag: 'Feature',
            img: 'https://images.gmanews.tv/v3/webpics/v3/2015/02/2015_02_17_21_05_36.jpg',
            content: [dbArticle.preview, ...generatedParagraphs]
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [name]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24">
        <p style={{ color: '#aa3bff', fontWeight: 'bold' }}>Loading article...</p>
      </div>
    );
  }

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