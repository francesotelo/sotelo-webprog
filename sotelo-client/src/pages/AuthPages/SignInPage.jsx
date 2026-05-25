import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/UserService';

const inputClasses = "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";
const actionButtonClassName = "w-full rounded-xl py-3 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#aa3bff] text-white hover:bg-[#8a2be2] transition-colors";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.role);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: '#08060d' }}>Log In</h1>
      <p className="text-sm leading-6 mb-8" style={{ color: '#6b6375' }}>Access your account to manage the platform.</p>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium" style={{ color: '#08060d' }}>Email Address</label>
          <input type="email" required onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
        </div>
        <div>
          <label className="text-sm font-medium" style={{ color: '#08060d' }}>Password</label>
          <input type="password" required onChange={(e) => setPassword(e.target.value)} className={inputClasses} />
        </div>
        <button type="submit" className={actionButtonClassName}>Log In</button>
      </form>
      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm">
        <span style={{ color: '#6b6375' }}>No account yet?</span>
        <Link to="/auth/signup" className="font-semibold ml-1 hover:opacity-70" style={{ color: '#aa3bff' }}>Sign Up</Link>
      </div>
    </>
  );
};

export default SignInPage;