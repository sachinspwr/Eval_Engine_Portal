import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, BookOpen, Home, Key, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <Code2 size={28} className="text-primary-custom" />
          <span className="gradient-text fw-bold fs-4">EvalEngine</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={16} />
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/docs' ? 'active' : ''}`} 
                to="/docs"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen size={16} />
                <span>Docs</span>
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} 
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Key size={16} />
                  <span>Dashboard</span>
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-muted-custom d-none d-sm-block small">
                  {user?.name || 'User'}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="btn btn-outline-custom d-flex align-items-center gap-2"
                >
                  <LogOut size={16} />
                  <span className="d-none d-sm-inline">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate('/register');
                  setIsMenuOpen(false);
                }}
                className="btn btn-glow d-flex align-items-center gap-2"
              >
                <Key size={16} />
                <span>Get API Key</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;