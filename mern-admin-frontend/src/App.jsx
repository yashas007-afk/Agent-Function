import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import AgentPage from './pages/AgentPage';
import UploadPage from './pages/UploadPage';
import TaskPage from './pages/TaskPage';
import Layout from './components/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/" /> : <LoginPage />
        }
      />
      <Route
        path="/signup"
        element={
          isLoggedIn ? <Navigate to="/" /> : <SignupPage />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          isLoggedIn ? <Layout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="agents" element={<AgentPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="tasks" element={<TaskPage />} />
      </Route>
    </Routes>
  );
}

export default App;
