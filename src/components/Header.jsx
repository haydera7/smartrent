import { useState, useRef, useEffect } from "react";
import "./Header.css";

function Header({
  user,
  onLogout,
  onLoginClick,
  onSignupClick,
  onNavigate,
  onAdminClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const burgerRef = useRef(null);

  const handleNavClick = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  const handleActionClick = (action) => {
    action();
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        !burgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="logo" onClick={() => handleNavClick("home")}>
        🏠 SmartRent
      </div>

      <div
        ref={burgerRef}
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </div>

      <nav ref={navRef} className={`nav ${menuOpen ? "nav-open" : ""}`}>
        {!user && (
          <ul className="nav-links">
            <li onClick={() => handleNavClick("home")}>Home</li>
            <li onClick={() => handleNavClick("features")}>Features</li>
            <li onClick={() => handleNavClick("about")}>About Us</li>
            <li onClick={() => handleNavClick("contact")}>Contact</li>
          </ul>
        )}

        {user ? (
          <div className="auth-area">
            <span>Welcome, {user.name}</span>
            <button
              onClick={() => handleActionClick(onLogout)}
              className="btn-logout"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="buttonsHeader">
            <button
              onClick={() => handleActionClick(onLoginClick)}
              className="btn-link"
            >
              Sign In
            </button>
            <button
              onClick={() => handleActionClick(onSignupClick)}
              className="btn-primary"
            >
              Sign Up
            </button>
            <button
              onClick={() => handleActionClick(onAdminClick)}
              className="admin-btn"
            >
              Admin Panel
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
