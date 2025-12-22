import axios from "axios";
import { useState } from "react";

// ✅ Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL;

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token); // ✅ Save token
      onLogin(res.data.user); // ✅ Notify App.jsx about logged-in user
    } catch (err) {
      setError(err.response?.data?.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Sign in to your account</h2>
      {error && <p className="error">{error}</p>}

      <button
        type="button"
        className="btn google"
        onClick={() => window.location.href = `${API_URL}/auth/google`}
      >
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

export default LoginForm;
