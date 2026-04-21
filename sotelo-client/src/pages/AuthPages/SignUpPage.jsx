import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses = "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";
const actionButtonClassName = "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  return (
    <>
      <h1 
        className="text-4xl font-bold tracking-tight mb-2" 
        style={{ color: '#08060d', background: 'transparent' }}
      >
        Sign Up
      </h1>
      <p className="text-sm leading-6 mb-8" style={{ color: '#6b6375' }}>
        Create your account with shared button treatment.
      </p>

      <form className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium" style={{ color: '#08060d' }}>First Name</label>
            <input id="first-name" type="text" placeholder="Placeholder" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium" style={{ color: '#08060d' }}>Last Name</label>
            <input id="last-name" type="text" placeholder="Placeholder" className={inputClasses} />
          </div>
        </div>
        <div>
          <label htmlFor="signup-email" className="text-sm font-medium" style={{ color: '#08060d' }}>Email</label>
          <input id="signup-email" type="email" placeholder="Placeholder" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="signup-password" className="text-sm font-medium" style={{ color: '#08060d' }}>Password</label>
          <input id="signup-password" type="password" placeholder="Placeholder" className={inputClasses} />
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>Create Account</Button>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm">
        <span style={{ color: '#6b6375' }}>Already have an account?</span>
        <Link to="/auth/signin" className="font-semibold ml-1 hover:opacity-70" style={{ color: '#08060d' }}>Log In</Link>
      </div>
    </>
  );
};

export default SignUpPage;