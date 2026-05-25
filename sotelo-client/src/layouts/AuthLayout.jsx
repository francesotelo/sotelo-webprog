// src/layouts/AuthLayout.jsx
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const leftPanelImageUrl = "https://aphrodite.gmanetwork.com/entertainment/articles/original/Main-Image-1-_-20230612183137.jpg";

  return (
    <section className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
      
      {/* Left Side: Full Height Image Panel */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zinc-200">
        <img 
          src={leftPanelImageUrl} 
          alt="Ryzza Mae Dizon" 
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Right Side: Auth Forms */}
      <main className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md">
          {/* We force the text color here to ensure visibility */}
          <div className="text-[#08060d]">
             <Outlet />
          </div>
        </div>
      </main>
    </section>
  );
};

export default AuthLayout;