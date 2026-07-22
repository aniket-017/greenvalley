import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getToken, login, setToken } from '../../api/admin';
import './Admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (getToken()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(username.trim(), password);
      setToken(data.token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <p className="admin-eyebrow">Expert Tutorial Center</p>
        <h1>Admin Login</h1>
        <p className="admin-sub">Manage teacher sections and faculty for the Classes page.</p>

        {error ? <div className="admin-alert">{error}</div> : null}

        <label className="admin-field">
          <span>Username</span>
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="admin-btn primary" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
