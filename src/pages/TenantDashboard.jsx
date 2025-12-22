import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TenantDashBoard.css";
import Chatbot from "../components/Chatbot";
import BookingChat from "../components/BookingChat";

import jwtDecode from "jwt-decode";


const API_URL = import.meta.env.VITE_API_URL;



       function TenantDashboard({ onLogout }) {
           const [properties, setProperties] = useState([]);
           const [loading, setLoading] = useState(true);
           const [activeTab, setActiveTab] = useState("home"); // 👈 navigation state
          const [bookings, setBookings] = useState([]);
          const [showChatPanel, setShowChatPanel] = useState(false);
          const [activeBooking, setActiveBooking] = useState(null);

          const token = localStorage.getItem("token");
         const decoded = token ? jwtDecode(token) : null;
         const tenantId = decoded?.id;


          
           const handleBookNow = async (property) => {
  try {
    const token = localStorage.getItem("token");
    if (!token || !tenantId) {
      alert("Login required");
      return;
    }

    await axios.post(
     `${API_URL}/bookingRequests`,
      {
        propertyId: property._id, // ✅ correct key
    message: "I want to book this property",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Booking request sent successfully ✅");
  } catch (err) {
    console.error("BOOKING ERROR:", err.response?.data || err.message);
    alert("Failed to send booking request ❌");
  }
};



  
           useEffect(() => { 
            fetchProperties();
             fetchBookings();
            }, []);

           const fetchProperties = async () => {
            try {
                const res = await axios.get(`${API_URL}/properties/public`);

                setProperties(res.data);
            } catch (err) {
                console.error("Failed to fetch properties:", err);
           } finally {
              setLoading(false);
          }
      };

const fetchBookings = async () => {
  try {
    const res = await axios.get(`${API_URL}/bookingRequests/my`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBookings(res.data);
  } catch (err) {
    console.error("Failed to fetch bookings", err);
  }
};

const markBookingsSeen = async () => {
  try {
    await axios.put(
      `${API_URL}/bookingRequests/mark-seen`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchBookings(); // refresh list
  } catch (err) {
    console.error("Failed to mark seen");
  }
};



       if (loading){
            return  (
            <div className="loading">Loading properties...</div>
            )
           }



    return (
        <div className="tenant-dashboard">
           <header className="header">
               <div className="logo">🏠 SmartRent+</div>
               <nav className="navbar">
                  <ul>
                     <li onClick={() => setActiveTab("home")}>Home</li>
                    <li  onClick={() => { setActiveTab("bookings"); markBookingsSeen(); }}>
                    📑 Book Requests {bookings.filter(b => b.status === "pending" && !b.seen).length > 0 && (
                   <span className="badge"> {bookings.filter(b => b.status === "pending" && !b.seen).length} </span> )} </li>
                     <li className="icon-item" onClick={() => {  setActiveTab("chat");
                     setShowChatPanel(true);  }} > 💬</li>
                     <li onClick={() => setActiveTab("features")}>Features</li>
                     <li onClick={() => setActiveTab("about")}>About Us </li>
                     <li onClick={() => setActiveTab("contact")}>Contact</li>
                     <li> <button className="logout-btn" onClick={onLogout}>Logout</button></li>
                  </ul>
               </nav>
           </header>


      {activeTab === "home" && (
         <>

            <section className="page-title">
               <h1>Explore Available Properties</h1>
               <p>Find your perfect home from trusted landlords on SmartRent+</p>
            </section>

          <div className="property-grid">
               {properties.map((p) => (
               <div key={p._id} className="property-card">
                    <div className="property-image-wrapper">
                        <img src={p.images?.[0] ? `${API_URL}${p.images[0]}` : "https://via.placeholder.com/400x200"} />
                        </div>

                     <div className="property-details">
                          <h3>{p.title}</h3>
                          <p className="location">📍 {p.location}</p>
                          <p className="price">💰 {p.price} ETB / month</p>
                          <span className={`status ${p.status?.toLowerCase()}`}>{p.status || "Available"} </span>
                          <button className="message-btn" onClick={() => handleBookNow(p)}>Book Now</button>
                          <button className="rent-btnn">View Details</button>
                     </div>
                 </div>
                ))}
           </div>
       </>
    )} 


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

{activeTab === "bookings" && (
  <section className="page-section bookings-section">
    <h1 className="section-title">My Booking Requests</h1>

    {bookings.length === 0 && (
      <p className="empty-text">No booking requests yet</p>
    )}

    <div className="booking-list">
      {bookings.map((b) => (
        <div key={b._id} className="booking-card">
         <div className="booking-info">
  <h4>{b.property?.title || "Property no longer available"}</h4>
  <p>📍 {b.property?.location || "N/A"}</p>
</div>


          <span className={`status-badge ${b.status}`}>
            {b.status.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  </section>
)}

{activeTab === "chat" && showChatPanel && (
  <section className="page-section chat-section">

    <div className="chat-panel">

      {/* LEFT — CHAT LIST */}
      <div className="chat-list">
        <h4>Messages</h4>

        {bookings.length === 0 && (
          <p className="empty-text">No conversations</p>
        )}

        {bookings.map((b) => (
          <div
            key={b._id}
            className={`chat-user ${
              activeBooking?._id === b._id ? "active" : ""
            }`}
            onClick={() => setActiveBooking(b)}
          >
            <strong>{b.property?.title || "Property"}</strong>
            <p>👤 {b.landlord?.fullName || "Landlord"}</p>
          </div>
        ))}
      </div>

      {/* RIGHT — CHAT WINDOW */}
      <div className="chat-window">
        {activeBooking ? (
          <BookingChat booking={activeBooking} />
        ) : (
          <p className="empty-chat">
            Select a conversation
          </p>
        )}
      </div>

    </div>

  </section>
)}


      

      {/* Chatbot + Footer */}
      <Chatbot />
      <footer className="footer">
        <p>© {new Date().getFullYear()} SmartRent+. All rights reserved.</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default TenantDashboard;
