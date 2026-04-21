// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} RMD Studio. All rights reserved.
        </p>
        <p className="mt-2 text-xs text-zinc-400">
          Built for Web Systems and Technologies | Lab Activity 3
        </p>
      </div>
    </footer>
  );
};

export default Footer;