import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function LandlordSignupForm({ setActiveTab, onLogin }) {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, {
        ...form,
        role: "landlord",
      });

      localStorage.setItem("token", res.data.token); // Save token
      if (onLogin) onLogin(res.data.user); // Auto-login

      setForm({ fullName: "", email: "", password: "" }); // Reset form
    } catch (err) {
      alert(err.response?.data?.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Landlord Signup</h2>

      {/* Google Signup */}
      <button
        type="button"
        className="btn google"
        onClick={() => (window.location.href = `${API_URL}/auth/google`)}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          style={{ width: "20px", marginRight: "8px" }}
        />
        Sign up with Google
      </button>

      <p>or</p>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn yellow" disabled={loading}>
        {loading ? "Signing up..." : "Signup as Landlord"}
      </button>
    </form>
  );
}

export default LandlordSignupForm;
