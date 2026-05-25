import React, { useState, useEffect } from 'react';
import ArticleList from '../../components/ArticleList.jsx';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await fetchArticles();
        const activeArticles = res.data.articles
          .filter(a => a.isActive)
          .map(a => ({
            name: a.slug,
            title: a.title,
            tag: 'Feature',
            img: 'https://images.gmanews.tv/v3/webpics/v3/2015/02/2015_02_17_21_05_36.jpg',
            content: [a.preview]
          }));
        setArticles(activeArticles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

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
      
      {loading ? (
        <p style={{ color: '#aa3bff', fontWeight: 'bold' }}>Loading articles...</p>
      ) : (
        <ArticleList articles={articles} />
      )}
    </div>
  );
};

export default ArticleListPage;