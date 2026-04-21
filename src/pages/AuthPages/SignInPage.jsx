import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses = "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";
const actionButtonClassName = "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  return (
    <>
      <h1 
        className="text-4xl font-bold tracking-tight mb-2" 
        style={{ color: '#08060d', background: 'transparent' }}
      >
        Log In
      </h1>
      <p className="text-sm leading-6 mb-8" style={{ color: '#6b6375' }}>
        Access your account using the same monochrome wireframe language used across the site.
      </p>

      <form className="space-y-5">
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium" style={{ color: '#08060d' }}>Email Address</label>
          <input id="signin-email" type="email" placeholder="Placeholder" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="signin-password" className="text-sm font-medium" style={{ color: '#08060d' }}>Password</label>
          <input id="signin-password" type="password" placeholder="Placeholder" className={inputClasses} />
          <p className="mt-2 text-xs leading-5" style={{ color: '#6b6375' }}>Minimum 8 letters, numbers, and symbols.</p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2" style={{ color: '#6b6375' }}>
            <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-zinc-900" />
            <span>Remember me</span>
          </label>
          <button type="button" className="font-medium hover:opacity-70" style={{ color: '#08060d' }}>Forgot Password?</button>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>Log In</Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button variant="secondary" className={actionButtonClassName}>Log In with Google</Button>
          <Button variant="secondary" className={actionButtonClassName}>Log In with Apple</Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm">
        <span style={{ color: '#6b6375' }}>No account yet?</span>
        <Link to="/auth/signup" className="font-semibold ml-1 hover:opacity-70" style={{ color: '#08060d' }}>Sign Up</Link>
      </div>
    </>
  );
};

export default SignInPage;