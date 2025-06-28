import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5050/api/auth/register', form);
      setSuccess(res.data.message || 'Signup successful');
      setTimeout(() => navigate('/login'), 1500); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container">
      <h2>Admin Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Admin</button>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>Already an admin? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default SignupPage;
