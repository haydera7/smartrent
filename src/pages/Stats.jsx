import React from "react";

function Stats({ properties }) {
  const total = properties.length;
  const active = properties.filter(p => p.status === "Active").length;
  const pending = properties.filter(p => p.status === "Pending").length;
  const rented = properties.filter(p => p.status === "Rented").length;
  
  const pct = (n) => total === 0 ? 0 : Math.round((n/total)*100);

  return (
    <div className="card">
      <h3>Property Statistics</h3>
      <div className="stat-row">Total Properties: {total}</div>
      <div className="stat-row">
        Active: {active} ({pct(active)}%)
        <div className="bar-bg">
          <div className="bar-fill" style={{ width: `${pct(active)}%` }}></div>
        </div>
      </div>
      <div className="stat-row">
        Pending: {pending} ({pct(pending)}%)
        <div className="bar-bg">
          <div className="bar-fill" style={{ width: `${pct(pending)}%` }}></div>
        </div>
      </div>
      <div className="stat-row">
        Rented: {rented} ({pct(rented)}%)
        <div className="bar-bg">
          <div className="bar-fill" style={{ width: `${pct(rented)}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Stats;