import axios from "axios";
import { useState } from "react";

// ✅ Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL;

function TenantSignupForm({ setActiveTab, onLogin }) {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, {
        ...form,
        role: "tenant",
      });

      // Save token for persistence
      localStorage.setItem("token", res.data.token);

      // Auto-login
      if (onLogin) onLogin(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Tenant Signup</h2>

      <button type="button" className="btn google">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          style={{ width: "20px", marginRight: "8px" }}
        />
        Sign up with Google
      </button>

      <p>or</p>

      <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

      <button type="submit" className="btn green" disabled={loading}>
        {loading ? "Signing up..." : "Signup as Tenant"}
      </button>
    </form>
  );
}

export default TenantSignupForm;
