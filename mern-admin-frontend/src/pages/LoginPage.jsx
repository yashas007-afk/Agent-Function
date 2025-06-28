import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
     console.log("Submitting login with", email, password); 
    try {
      const res = await axios.post('http://localhost:5050/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      setTimeout(() => navigate('/'), 100);

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%' }}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>

      </form>
    </div>
  );
}

export default LoginPage;