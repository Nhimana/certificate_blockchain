import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <img src="/certificate-check.png" alt="D-Cert" className="nav-logo" />
        <span>D-Cert</span>
      </div>
      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </button>
      <div className={`blockchain-nav${menuOpen ? " open" : ""}`}>
        <div className="nav-links">
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            <span className="link-icon" role="img" aria-label="Home">🏠</span>
            <span className="link-text">Home</span>
            <span className="link-underline"></span>
          </Link>
          <Link to="/issue" className="nav-link" onClick={() => setMenuOpen(false)}>
            <span className="link-icon" role="img" aria-label="Issue Certificate">🎓</span>
            <span className="link-text">Issue Certificate</span>
            <span className="link-underline"></span>
          </Link>
          <Link to="/contact" className="nav-link highlight" onClick={() => setMenuOpen(false)}>
            <span className="link-icon" role="img" aria-label="Institution Portal">🏛️</span>
            <span className="link-text">Institution Portal</span>
            <span className="link-underline"></span>
            <span className="link-badge">New</span>
          </Link>
          <Link to="/verify" className="nav-link" onClick={() => setMenuOpen(false)}>
            <span className="link-icon" role="img" aria-label="Verify">✅</span>
            <span className="link-text">Verify</span>
            <span className="link-underline"></span>
          </Link>
          <Link to="/institutions" className="nav-link" onClick={() => setMenuOpen(false)}>
            <span className="link-icon" role="img" aria-label="Registered Institutions">🏫</span>
            <span className="link-text">Registered Institutions</span>
            <span className="link-underline"></span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .navigation {
          background: #2c3e50;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .nav-logo {
          width: 32px;
          height: 32px;
        }

        .nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          margin-left: 1rem;
        }

        .hamburger {
          width: 28px;
          height: 3px;
          background: #fff;
          margin: 4px 0;
          border-radius: 2px;
          transition: 0.3s;
        }

        .blockchain-nav {
          display: flex;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .link-icon {
          font-size: 1.4em;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 1.5em;
        }

        .link-text {
          display: inline-block;
        }

        @media (max-width: 900px) {
          .nav-links {
            gap: 1rem;
          }
          .nav-link {
            padding: 0.5rem;
          }
        }

        @media (max-width: 768px) {
          .nav-toggle {
            display: flex;
          }
          .blockchain-nav {
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            background: #2c3e50;
            flex-direction: column;
            width: 100%;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            z-index: 100;
          }
          .blockchain-nav.open {
            max-height: 500px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          }
          .nav-links {
            flex-direction: column;
            gap: 0;
          }
          .nav-link {
            width: 100%;
            padding: 1rem 2rem;
            border-radius: 0;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </nav>
  );
}

export default Navigation;