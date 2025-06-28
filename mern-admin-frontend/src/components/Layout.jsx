import { Link, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: 200, background: '#f2f2f2', padding: 20 }}>
        <h3>Admin Panel</h3>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/agents">Agents</Link></li>
            <li><Link to="/upload">Upload CSV</Link></li>
            <li><Link to="/tasks">View Tasks</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
