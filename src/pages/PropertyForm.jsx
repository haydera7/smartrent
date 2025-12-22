// src/components/PropertyForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/propertyForm.css";

// ✅ Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL;

function PropertyForm({ property, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    status: "Active",
    images: [],
  });

  useEffect(() => {
    if (property) setForm(property);
  }, [property]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        if (key === "images") {
          form.images.forEach((img) => formData.append("images", img));
        } else {
          formData.append(key, form[key]);
        }
      }

      const token = localStorage.getItem("token");

      if (property?._id) {
        await axios.put(`${API_URL}/properties/${property._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/properties`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      onSave();
      onClose();
    } catch (err) {
      console.error("Failed to save property:", err.response?.data || err.message);
      alert(`Error saving property: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>{property ? "Edit Property" : "Add New Property"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="inputStyle"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="inputStyle"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="inputStyle"
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
          <option>Rented</option>
        </select>

        <label className="label">Images:</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          accept="image/*"
          style={{ marginBottom: "15px" }}
        />

        <div className="btn-container">
          <button className="btn cancel-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="btn save-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
