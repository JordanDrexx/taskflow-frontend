import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { logoutSession } from '../services/api';

function Navbar({ activePill = 'Tablero Kanban' }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    api.get('/user')
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.warn('No se pudo obtener el usuario autenticado:', err);
      });
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutSession();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard" className="brand-badge small" style={{ textDecoration: 'none', color: 'inherit' }}>
            <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <path d="M9 9h6M9 13h6M9 17h4" />
            </svg>
            <span className="brand-name">TaskFlow</span>
          </Link>
          <span className="navbar-pill">{activePill}</span>
        </div>

        <div className="navbar-actions">
          {user && (
            <div className="navbar-user">
              <span className="user-avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
              <span className="user-name">{user.name || user.email}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="btn-logout"
            title="Cerrar sesión"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>{isLoggingOut ? 'Saliendo...' : 'Cerrar sesión'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
