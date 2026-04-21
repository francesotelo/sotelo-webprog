import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  `rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
    isActive
      ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200'
      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
  }`;

const NavBar = () => {
  const logoUrl = "https://alchetron.com/cdn/ryzza-mae-dizon-f771b678-d254-4912-be43-78d67392749-resize-750.png";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-zinc-200 bg-white">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="h-full w-full object-cover"
              onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=RMD&background=18181b&color=fff"; }}
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 uppercase">RMD Studio</span>
        </NavLink>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Enhancement 3: Access point for authentication */}
          <NavLink 
            to="/auth/signin" 
            className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-bold text-white transition hover:bg-zinc-700"
          >
            GET STARTED
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default NavBar;