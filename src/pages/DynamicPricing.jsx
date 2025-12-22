import React from "react";

function DynamicPricing() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "30px 20px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        margin: "40px 0",
        maxWidth: "1000px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{ color: "#2e7dff", marginBottom: "15px" }}>
        🤖 Dynamic Pricing with SmartRent+ AI
      </h2>
      <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "25px" }}>
        Dynamic pricing automatically adjusts rental prices in real-time
        instead of keeping them fixed. Our AI engine analyzes live data and
        recommends the best rental price for each property at any moment.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3 style={cardTitle}>📊 Data Collection</h3>
          <p style={cardText}>
            The system gathers key property details like size, type, and location.
          </p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitle}>🔍 Tenant Demand</h3>
          <p style={cardText}>
            Monitors search frequency, tenant interest, and booking patterns.
          </p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitle}>📅 Season & Events</h3>
          <p style={cardText}>
            Adjusts prices based on seasonality, local events, and market trends.
          </p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitle}>💹 Historical Pricing</h3>
          <p style={cardText}>
            Compares similar properties in the area to recommend competitive rates.
          </p>
        </div>
      </div>

      <p style={{ color: "#555", marginTop: "25px", fontStyle: "italic" }}>
        SmartRent+ AI helps maximize revenue while keeping your properties
        competitively priced.
      </p>
    </section>
  );
}

const cardStyle = {
  background: "#f5f6fa",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const cardTitle = {
  color: "#224daa",
  marginBottom: "8px",
  fontSize: "16px",
};

const cardText = {
  color: "#555",
  fontSize: "14px",
  lineHeight: "1.4",
};

export default DynamicPricing;
