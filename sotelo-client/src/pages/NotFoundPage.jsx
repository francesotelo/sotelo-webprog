// src/pages/NotFoundPage.jsx
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="relative">
        {/* Fixed color for the 404 text */}
        <h1 
          className="text-9xl font-extrabold tracking-widest"
          style={{ color: '#08060d' }}
        >
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded bg-purple-500 px-3 py-1 text-sm font-bold text-white shadow-xl">
          Page Not Found
        </div>
      </div>
      
      {/* Fixed color for the main heading */}
      <h2 
        className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl"
        style={{ color: '#08060d' }}
      >
        Oops! Missing Link.
      </h2>
      
      <p className="mt-4 max-w-md text-lg text-zinc-600">
        Looks like this page took a Cha-Cha step in the wrong direction. The link you followed must be broken.
      </p>
      
      <div className="mt-10">
        <Button to="/" variant="primary" className="px-8 py-4">
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;