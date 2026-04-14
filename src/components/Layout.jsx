// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="flex-grow pb-16 pt-20">
        {/* The Outlet is where your changing pages (Home, Articles, etc.) load */}
        <Outlet />
      </main>
      {/* The Footer stays locked at the bottom of the layout */}
      <Footer />
    </div>
  );
};

export default Layout;