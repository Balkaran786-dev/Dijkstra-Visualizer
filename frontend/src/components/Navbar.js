import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 2L30 9v14L16 30 2 23V9l14-7z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="16" cy="16" r="4" fill="currentColor" />
              <path
                d="M16 12v8M12 16h8"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="brand-text">Dijkstra Visualizer</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Introduction
          </Link>
          <Link 
            to="/editor" 
            className={`navbar-link ${isActive('/editor') ? 'active' : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M9 9h6M9 13h6M9 17h3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Code Editor
          </Link>
          <Link 
            to="/visualizer" 
            className={`navbar-link ${isActive('/visualizer') ? 'active' : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Visualizer
          </Link>
        </div>

        {/* Dark Mode Toggle & Mobile Menu Button */}
        <div className="navbar-actions">
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            )}
          </button>

          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link 
          to="/" 
          className={`mobile-link ${isActive('/') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          Introduction
        </Link>
        <Link 
          to="/editor" 
          className={`mobile-link ${isActive('/editor') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M9 9h6M9 13h6M9 17h3" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Code Editor
        </Link>
        <Link 
          to="/visualizer" 
          className={`mobile-link ${isActive('/visualizer') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          Visualizer
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
