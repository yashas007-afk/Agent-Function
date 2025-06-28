import { useEffect, useState } from 'react';
import axios from 'axios';

function AgentPage() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/agents', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAgents(res.data);
    } catch (err) {
      console.error('Failed to fetch agents');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAgent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/agents/add', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Agent added successfully');
      setForm({ name: '', email: '', mobile: '', password: '' });
      fetchAgents(); // Refresh list
    } catch (err) {
      setMessage('Failed to add agent');
    }
  };

  return (
    <div>
      <h2>Agent Management</h2>

      <form onSubmit={handleAddAgent} style={{ marginBottom: 20 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
        <button type="submit">Add Agent</button>
        {message && <p>{message}</p>}
      </form>

      <h3>Agents List</h3>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>
            {agent.name} – {agent.email} – {agent.mobile}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentPage;
