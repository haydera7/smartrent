import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropertyForm from "./PropertyForm";
import BookingChat from "../components/BookingChat";

import "../styles/LandlordDashboard.css";

// ✅ Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL;

function LandlordDashboard({ user, onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [properties, setProperties] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    bookingRequests: 0,
    totalRevenue: 0,
    responseRate: 0,
  });
  const [filterStatus, setFilterStatus] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({});

  const notificationRef = useRef(null);

  // ✅ Helper to get auth headers
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  // ✅ Fetch all data on mount
  useEffect(() => {
    fetchProperties();
    fetchAnalytics();
    fetchNotifications();
    fetchBookings();
    fetchUnreadCounts();
  }, []);

  // ✅ Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ API Calls
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/properties/landlord`, getAuthHeader());
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_URL}/analytics`, getAuthHeader());
      setAnalytics(res.data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/notifications`, getAuthHeader());
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookingRequests/landlord`, getAuthHeader());
      setBookingRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const fetchUnreadCounts = async () => {
    try {
      const res = await axios.get(`${API_URL}/messages/unread-count`, getAuthHeader());
      setUnreadCounts(res.data);
    } catch (err) {
      console.error("Failed to fetch unread counts:", err);
    }
  };

  // ✅ Actions
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`${API_URL}/properties/${id}`, getAuthHeader());
      fetchProperties();
    } catch (err) {
      console.error(err);
      alert("Failed to delete property");
    }
  };

  const togglePropertyStatus = async (id) => {
    const property = properties.find((p) => p._id === id);
    const updated = { ...property, status: property.status === "Active" ? "Inactive" : "Active" };
    try {
      await axios.put(`${API_URL}/properties/${id}`, updated, getAuthHeader());
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    const propertyToEdit = properties.find((p) => p._id === id);
    setSelectedProperty(propertyToEdit);
    setShowForm(true);
  };

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setShowForm(true);
  };

  const updateBooking = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/bookingRequests/${id}/status`,
        { status },
        getAuthHeader()
      );
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API_URL}/notifications/${id}/read`, {}, getAuthHeader());
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  // ✅ Filtered properties
  const filteredProperties = properties.filter((p) =>
    filterStatus === "All" ? true : p.status === filterStatus
  );

  return (
    <div className="landloardDashboard">
      <header className="header">
        <div className="logo">🏠 SmartRent+</div>
        <nav className="navbar">
          <ul>
            <li onClick={() => setActiveTab("home")}>Home</li>
            <li onClick={() => setActiveTab("bookings")}>Bookings</li>
            <li onClick={() => setActiveTab("features")}>Features</li>
            <li onClick={() => setActiveTab("about")}>About Us</li>
            <li onClick={() => setActiveTab("contact")}>Contact</li>
            <li className="icon-item" onClick={() => setShowNotifications((prev) => !prev)}>
              🔔
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="badge">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </li>
            <li className="icon-item" onClick={() => setShowChatPanel((prev) => !prev)}>
              💬
              {Object.values(unreadCounts).some((c) => c > 0) && (
                <span className="badge">
                  {Object.values(unreadCounts).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </li>
            <li>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {showNotifications && (
          <div ref={notificationRef} className={`notifications-box show`}>
            <h4>Notifications</h4>
            {notifications.length === 0 && <p>No notifications</p>}
            {notifications.map((n) => (
              <div
                key={n._id}
                className={`notification-item ${n.read ? "read" : ""}`}
                onClick={() => markAsRead(n._id)}
              >
                <p>{n.message}</p>
                <small>{new Date(n.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        )}
      </header>

      {showChatPanel && (
        <div className="chat-panel">
          <div className="chat-list">
            <h4>Messages</h4>
            {bookingRequests.map((b) => (
              <div
                key={b._id}
                className={`chat-user ${activeBooking?._id === b._id ? "active" : ""}`}
                onClick={() => setActiveBooking(b)}
              >
                <strong>{b.tenant?.fullName}</strong>
                <p>{b.property?.title}</p>
                {unreadCounts[b._id] > 0 && <span className="unread">{unreadCounts[b._id]}</span>}
              </div>
            ))}
          </div>
          <div className="chat-window">
            {activeBooking ? <BookingChat booking={activeBooking} /> : <p className="empty-chat">Select a conversation</p>}
          </div>
        </div>
      )}

      <div className="landloard-container">
        {/* HOME TAB */}
       {activeTab === "home" && (
  <>
    <div className="dashboard-hero animated-hero">
      <div className="hero-content fade-slide">
        <h1>Manage Your Properties Smarter <span> with SmartRent+</span></h1>
        <p>Monitor performance, respond to tenants instantly, and maximize rental income — all from one intelligent platform.</p>
        <div className="hero-actions">
          <button className="primary-btn glow-btn" onClick={handleAddProperty}>+ Add New Property</button>
          <button className="secondary-btn outline-btn" onClick={() => setActiveTab("bookings")}>View Bookings</button>
        </div>
      </div>
      <div className="hero-stats slide-up">
        <div className="stat"><strong>{properties.length}</strong><span>Properties</span></div>
        <div className="stat"><strong>{analytics.bookingRequests}</strong><span>Requests</span></div>
        <div className="stat"><strong>{analytics.responseRate}%</strong><span>Response Rate</span></div>
        <div className="stat"><strong>{analytics.totalRevenue} ETB</strong><span>Total Revenue</span></div>
      </div>
      <span className="blob blob-1"></span>
      <span className="blob blob-2"></span>
    </div>

    {/* Property Grid */}
    <div className="propertyGridsL">
      {filteredProperties.map((p) => (
        <div
          className="property-cards"
          key={p._id}
          style={{
            opacity: p.approved ? 1 : 0.5,
            pointerEvents: p.approved ? "auto" : "none",
          }}
        >
          <img
            src={p.images?.[0] ? `${API_URL}${p.images[0]}` : "https://via.placeholder.com/400x200"}
            alt={p.title}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <div className="innercard">
            {!p.approved && <span>Pending Admin Approval</span>}
            <h3>{p.title}</h3>
            <p className="location">📍 {p.location}</p>
            <p className="price">💰 {p.price} ETB/month</p>
            <span
              className="status"
              style={{
                background: p.status === "Active" ? "#00c85333" : "#ff475733",
                color: p.status === "Active" ? "#00c853" : "#ff4757",
              }}
            >
              {p.status}
            </span>
            <div className="buttons">
              <button className="edit" onClick={() => handleEdit(p._id)}>Edit</button>
              <button className="activate" onClick={() => togglePropertyStatus(p._id)}>
                {p.status === "Active" ? "Deactivate" : "Activate"}
              </button>
              <button className="delete" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Property Form */}
    {showForm && (
      <PropertyForm
        property={selectedProperty}
        onClose={() => setShowForm(false)}
        onSave={fetchProperties}
      />
    )}
  </>
)}


        {/* FEATURES TAB */}
        {activeTab === "features" && (
          <section className="page-section features-section">
            <h1>Our Key Features 🚀</h1>
            <p className="section-subtitle">Everything you need to rent or list properties securely and easily.</p>
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

        {/* ABOUT TAB */}
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

        {/* CONTACT TAB */}
        {activeTab === "contact" && (
          <section className="page-section contact-section">
            <h1>Contact Us 📞</h1>
            <p className="section-subtitle">Have questions or feedback? We'd love to hear from you!</p>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </section>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <section className="page-section bookings-section">
            <h2>Booking Requests</h2>
            {bookingRequests.length === 0 && <p className="empty-text">No booking requests</p>}
            <div className="booking-grid">
              {bookingRequests.map((b) => (
                <div key={b._id} className="booking-card">
                  <div>
                    <h4>{b.property?.title || "Property not available"}</h4>
                    <p>👤 {b.tenant?.fullName || "Unknown tenant"}</p>
                  </div>
                  <span className={`status-badge ${b.status}`}>
                    {b.status.toUpperCase()}
                  </span>
                  {b.status === "pending" && (
                    <div className="booking-actions">
                      <button className="accept" onClick={() => updateBooking(b._id, "accepted")}>Accept</button>
                      <button className="reject" onClick={() => updateBooking(b._id, "rejected")}>Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default LandlordDashboard;
