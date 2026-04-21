// src/pages/ArticleListPage.jsx
import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content.js';

const ArticleListPage = () => {
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
      
      {/* Rendering the list using props */}
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListPage;