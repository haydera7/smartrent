import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
function AdminLoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" , role :"admin"});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
     setForm({ ...form, [e.target.name]: e.target.value 
   })};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
    
      // ✅ Save token for future API requests
      localStorage.setItem("token", res.data.token);

      // ✅ Notify App.jsx about logged-in user
      onLogin(res.data.user);

    } catch (err) {
      setError(err.response?.data?.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Welcome</h2>
      <p>Please Login To Admin Dashboard</p>
      {/* Optional error message */}
      {error && <p className="error">{error}</p>}

      {/* Google Login Button (UI only) */}
      <button  onClick={() => window.location.href = `${API_URL}/auth/google`} type="button" className="btn google">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          style={{ width: "20px", marginRight: "8px" }}
        />
        Sign in with Google
      </button>

      <p>or</p>

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

      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default AdminLoginForm;
