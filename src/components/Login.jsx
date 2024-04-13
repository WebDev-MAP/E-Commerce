import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../data/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Überprüfen, ob alle Felder ausgefüllt sind
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const success = await loginUser(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 px-16 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-center font-satoshi_regular placeholder-black placeholder-opacity-70" placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2 px-16 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-center font-satoshi_regular placeholder-black placeholder-opacity-70" placeholder="Password" />
      <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500 font-integral_cf">Login</button>
    </form>
  );
}

export default Login;
