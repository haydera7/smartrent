



import { useState, useEffect } from "react";
import axios from "axios";

// Pages
import LoginForm from "./pages/LoginForm";
import TenantSignupForm from "./pages/TenantSignupForm";
import LandlordSignupForm from "./pages/LandlordSignupForm";
import TenantDashboard from "./pages/TenantDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
 import AdminDashboard from "./pages/AdminDashboard";
 import AdminLoginForm from "./pages/AdminLoginForm";
import AddProperty from "./pages/PropertyForm";
import Header from "./components/Header";
import Footer from "./components/Footer"; // ✅ new footer component
import "./index.css";


const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [activeTab, setActiveTab] = useState("home"); // 👈 start at landing page
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [properties, setProperties] = useState([]);
const [selectedProperty, setSelectedProperty] = useState(null);
const [searchLocation, setSearchLocation] = useState("");
const [filterStatus, setFilterStatus] = useState("");

// Fetch data
useEffect(() => {
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/properties`);
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };
  fetchProperties();
}, []);

// Filter logic
const filteredProperties = properties.filter(
  (p) =>
    p.location?.toLowerCase().includes(searchLocation.toLowerCase()) &&
    (!filterStatus || p.status?.toLowerCase() === filterStatus.toLowerCase())
);



useEffect(() => {
  if (activeTab !== "home") return;

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/properties`); //public to gain active and aproved properties
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
      setProperties([]);
    }
  };

  fetchProperties();
}, [activeTab]);



  // ✅ Check login token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");//Checks if the user already has a login token stored in the browser.
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => { //If there is a token, fetch user data
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch /api/user/me:", err);
        localStorage.removeItem("token");
        setUser(null);
        setError("Session expired or server unreachable");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setActiveTab("home");
  };

  // ✅ Loading screen
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Loading…</h2>
        <p>Checking authentication</p>
      </div>
    );
  }

  // ✅ Logged-in users
  if (user) {
    if (user.role === "admin") {
  return (
    <>
      <AdminDashboard user={user} onLogout={handleLogout} />
      <Footer />
    </>
  );
}

    if (user.role === "tenant") {
      return (
        <>
          <TenantDashboard user={user} onLogout={handleLogout} />
         
        </>
      );
    }

    if (user.role === "landlord") {
      if (activeTab === "addProperty") {
        return (
          <>
            
            <AddProperty />
            
          </>
        );
      }

      return (
        <>
        
          <LandlordDashboard
            user={user}
            onLogout={handleLogout}
            onAddProperty={() => setActiveTab("addProperty")}
          />
          <Footer />
        </>
      );
    }

    // Unknown role fallback
    return (
      <>
        <Header user={user}
  onLogout={handleLogout}
  onLoginClick={() => setActiveTab("login")}
  onSignupClick={() => setActiveTab("chooseSignup")}
  onNavigate={(tab) => setActiveTab(tab)} />
        <div style={{ padding: 40 }}>
          <h2>Unknown user role</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Public / Not logged in
  return (
    <>
     <Header
  user={user}
  onLogout={handleLogout}
  onLoginClick={() => setActiveTab("login")}
  onSignupClick={() => setActiveTab("chooseSignup")}
  onAdminClick={() => setActiveTab("admin") }
  onNavigate={(tab) => setActiveTab(tab)} // 👈 This line is critical
/>

      
      <div className="container">
        <div className="cardHome">
          {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
{activeTab === "home" && (
  <section className="home-section">
    {/* 🌟 Hero Section */}
<div className="hero-section">
  <div className="hero-overlay"></div>

  <div className="hero-container">
    
    {/* Left Content */}
    <div className="hero-content">
      <span className="hero-badge">Trusted Rental Platform</span>

      <h1 className="hero-title">
        Find Your Perfect Home <span>With Ease</span>
      </h1>

      <p className="hero-subtitle">
        Explore verified rental properties from reliable landlords across Ethiopia.
        Simple. Secure. Fast.
      </p>

      <div className="hero-search">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Rented">Rented</option>
        </select>
      </div>
    </div>

  </div>
</div>



  
    {/* 🏠 Filtered Property Cards */}
    <div className="property-grid">
      {filteredProperties.length > 0 ? (
        filteredProperties.map((p) => (
          <div key={p._id} className="property-card">
            <div className="property-image-wrapper">
              <img
                src={
                  p.images?.[0]
                    ? `${API_URL}${p.images[0]}`
                    : "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={p.title}
                className="property-image"
              />
            </div>
     
            <div className="property-details">
              <h3>{p.title}</h3>
              <p className="location">📍 {p.location}</p>
              <p className="price">💰 {p.price} ETB / month</p>
              <span className={`status ${p.status?.toLowerCase()}`}>
                {p.status || "Available"}
              </span>
              <button
                className="rent-btn"
                onClick={() => setSelectedProperty(p)}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No matching properties found.</p>
      )}
    </div>

    {/* 🪟 Property Modal */}
    {selectedProperty && (
      <div className="modal-overlay" onClick={() => setSelectedProperty(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="close-btn"
            onClick={() => setSelectedProperty(null)}
          >
            ✖
          </button>

          <div className="modal-images">
            <img
              src={
                selectedProperty.images?.[0]
                  ? `${API_URL}${selectedProperty.images[0]}`
                  : "https://via.placeholder.com/600x400?text=No+Image"
              }
              alt={selectedProperty.title}
            />
          </div>

          <div className="modal-info">
            <h2>{selectedProperty.title}</h2>
            <p className="location">📍 {selectedProperty.location}</p>
            <p className="price">💰 {selectedProperty.price} ETB / month</p>
            <p className="description">
              {selectedProperty.description || "No description available."}
            </p>
            <button
              className="login-prompt-btn"
              onClick={() => {
                setSelectedProperty(null);
                setActiveTab("login");
              }}
            >
              🔒 Sign in to Contact Landlord
            </button>
          </div>
        </div>
      </div>
    )}
  </section>
)}
{/* ---------------- FEATURES ---------------- */}
{activeTab === "features" && (
  <section className="page-section features-section">
    <h1>Our Key Features 🚀</h1>
    <p className="section-subtitle">
      Everything you need to rent or list properties securely and easily.
    </p>

    <div className="features-grid">
      <div className="feature-card">
        <i className="fas fa-home"></i>
        <h3>Easy Property Search</h3>
        <p>Filter and explore verified rental listings effortlessly.</p>
      </div>

      <div className="feature-card">
        <i className="fas fa-comments"></i>
        <h3>Instant Chat</h3>
        <p>Communicate directly with landlords or tenants in real time.</p>
      </div>

      <div className="feature-card">
        <i className="fas fa-credit-card"></i>
        <h3>Secure Payments</h3>
        <p>Make transactions safely through our integrated system.</p>
      </div>

      <div className="feature-card">
        <i className="fas fa-bell"></i>
        <h3>Smart Alerts</h3>
        <p>Get notified about new listings or rent updates instantly.</p>
      </div>
    </div>
  </section>
)}

{/* ---------------- ABOUT ---------------- */}
{activeTab === "about" && (
  <section className="page-section about-section">
    <h1>About SmartRent 🏢</h1>
    <p className="section-subtitle">
      We make renting transparent, secure, and simple for everyone.
    </p>

    <div className="about-content">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3306/3306618.png"
        alt="About SmartRent"
        className="about-img"
      />
      <div className="about-text">
        <p>
          SmartRent is a modern property rental platform designed to bridge the
          gap between landlords and tenants. We focus on transparency,
          simplicity, and security.
        </p>
        <p>
          With SmartRent, landlords can list their properties easily, and
          tenants can find their perfect home without the hassle of agents.
        </p>
      </div>
    </div>
  </section>
)}

{/* ---------------- CONTACT ---------------- */}
{activeTab === "contact" && (
  <section className="page-section contact-section">
    <h1>Contact Us 📞</h1>
    <p className="section-subtitle">
      Have questions or feedback? We'd love to hear from you!
    </p>

    <form className="contact-form">
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" required></textarea>
      <button type="submit" className="btn-primary">
        Send Message
      </button>
    </form>
  </section>
)}

















          {activeTab === "login" && (
            <>
              <LoginForm onLogin={(u) => setUser(u)} />
              <p className="text-center mt-3">
                Don’t have an account?{" "}
                <button
                  onClick={() => setActiveTab("chooseSignup")}
                  className="link-btn"
                >
                  Sign Up
                </button>
              </p>
            </>
          )}

          {activeTab === "chooseSignup" && (
            <div className="signup-options">
              <h3>Choose Account Type</h3>
              <button
                className="btn tenantlandord-btn"
                onClick={() => setActiveTab("tenant")}
              >
                Sign Up as Tenant
              </button>
              <button
                className="btn tenantlandord-btn"
                onClick={() => setActiveTab("landlord")}
              >
                Sign Up as Landlord
              </button>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className="link-btn"
                >
                  Login
                </button>
              </p>
            </div>
          )}

          {activeTab === "tenant" && (
            <>
              <TenantSignupForm setActiveTab={setActiveTab} onLogin={(u) => setUser(u)} />
              <div className="signup-footer">
                <p className="back-login" onClick={() => setActiveTab("login")}>
                  ⬅️ Back to Login
                </p>
              </div>
            </>
          )}

          {activeTab === "landlord" && (
            <>
              <LandlordSignupForm setActiveTab={setActiveTab} onLogin={(u) => setUser(u)} />
              <div className="signup-footer">
                <p className="back-login" onClick={() => setActiveTab("login")}>
                  ⬅️ Back to Login
                </p>
              </div>
            </>
          )}

          {activeTab === "admin" &&  (
            <>
            <AdminLoginForm setActiveTab={setActiveTab} onLogin={(u) => setUser(u)} />
            <div className="signup-footer">
                <p className="back-login" onClick={() => setActiveTab("home")}>
                  ⬅️ Back to Home
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;


