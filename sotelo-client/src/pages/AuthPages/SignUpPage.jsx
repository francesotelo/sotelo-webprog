import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserService';

const inputClasses = "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";
const actionButtonClassName = "w-full rounded-xl py-3 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#aa3bff] text-white hover:bg-[#8a2be2] transition-colors";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    age: '18', gender: 'other', contactNumber: '00000000000',
    role: 'editor', username: '', address: 'N/A'
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userPayload = {
        ...form,
        username: form.email.split('@')[0],
      };
      await createUser(userPayload);
      alert('Sign up successful!');
      navigate('/auth/signin');
    } catch (error) {
      alert('Error signing up: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: '#08060d' }}>Sign Up</h1>
      <p className="text-sm leading-6 mb-8" style={{ color: '#6b6375' }}>Create your account to access the dashboard.</p>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium" style={{ color: '#08060d' }}>First Name</label>
            <input name="firstName" type="text" required onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label className="text-sm font-medium" style={{ color: '#08060d' }}>Last Name</label>
            <input name="lastName" type="text" required onChange={handleChange} className={inputClasses} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium" style={{ color: '#08060d' }}>Email</label>
          <input name="email" type="email" required onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label className="text-sm font-medium" style={{ color: '#08060d' }}>Password</label>
          <input name="password" type="password" required onChange={handleChange} className={inputClasses} />
        </div>
        <button type="submit" className={actionButtonClassName}>Create Account</button>
      </form>
      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm">
        <span style={{ color: '#6b6375' }}>Already have an account?</span>
        <Link to="/auth/signin" className="font-semibold ml-1 hover:opacity-70" style={{ color: '#aa3bff' }}>Log In</Link>
      </div>
    </>
  );
};

export default SignUpPage;