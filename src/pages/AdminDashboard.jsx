// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function AdminDashboard({onLogout}) {
// //   const [users, setUsers] = useState([]);
// //   const [properties, setProperties] = useState([]);

// //   const [loading, setLoading] = useState(true);

// //   const [searchUser, setSearchUser] = useState("");
// //   const [searchProperty, setSearchProperty] = useState("");

// //   const [newUser, setNewUser] = useState({
// //   fullName: "",
// //   email: "",
// //   password: "",
// //   role: "tenant",
// // });


// //   useEffect(() => {
// //     Promise.all([loadUsers(), loadProperties()]).then(() => setLoading(false));
// //   }, []);

// //   const loadUsers = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:3000/admin/users");
// //       setUsers(res.data);
// //     } catch (err) {
// //       console.error("Failed to load users:", err);
// //     }
// //   };

// //   const deleteUser = async (id) => {
// //     if (!confirm("Delete this user?")) return;

// //     try {
// //       await axios.delete(`http://localhost:3000/admin/users/${id}`);
// //       loadUsers();
// //     } catch (err) {
// //       console.error("Failed to delete user:", err);
// //     }
// //   };

// //   const addUser = async () => {
// //   if (!newUser.fullName || !newUser.email || !newUser.password)
// //     return alert("All fields are required!");

// //   try {
// //     await axios.post("http://localhost:3000/admin/users", newUser);

// //     alert("User added successfully!");

// //     // Reset form
// //     setNewUser({ fullName: "", email: "", password: "", role: "tenant" });

// //     // Reload user list
// //     loadUsers();

// //   } catch (err) {
// //     alert(err.response?.data?.error || "Failed to add user");
// //   }
// // };


// //   const loadProperties = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:3000/admin/properties");
// //       setProperties(res.data);
// //     } catch (err) {
// //       console.error("Failed to fetch properties:", err);
// //     }
// //   };

// // const approve = async (id) => {
// //   if (!confirm("Approve this property?")) return;

// //   try {
// //     const res = await axios.put(`http://localhost:3000/admin/properties/${id}/approve`);

// //     // Update state instantly (no reload needed)
// //     setProperties((prev) =>
// //       prev.map((p) => (p._id === id ? { ...p, approved: true } : p))
// //     );

// //   } catch (err) {
// //     console.error("Failed to approve property:", err);
// //   }
// // };

// // const unapprove = async (id) => {
// //   if (!confirm("Unapprove this property?")) return;

// //   try {
// //     await axios.put(`http://localhost:3000/admin/properties/${id}/unapprove`);

// //     setProperties((prev) =>
// //       prev.map((p) => (p._id === id ? { ...p, approved: false } : p))
// //     );

// //   } catch (err) {
// //     console.error("Failed to unapprove property:", err);
// //   }
// // };



// //   // --------------------------
// //   // RENDER LOADING SPINNER
// //   // --------------------------
// //   if (loading) return <h2>Loading...</h2>;

// //   return (
// //     <>
// //   <div>
// //   <header className="header">
// //         <div className="logo">🏠 SmartRent+</div>
// //         <nav className="navbar">
// //           <ul>
// //             <li onClick={() => setActiveTab("home")}>Home</li>
// //             <li onClick={() => setActiveTab("features")}>Features</li>
// //            <li onClick={() => setActiveTab("about")}>About Us </li>
// //             <li onClick={() => setActiveTab("contact")}>Contact</li>
// //             <li>
// //               <button className="logout-btn" onClick={onLogout}>
// //                 Logout
// //               </button>
// //             </li>
// //           </ul>
// //         </nav>
// //       </header>
// //       </div>
// //     <div style={{ padding: "20px" }}>
// //       <h2>Admin Dashboard</h2>

// //       {/* SUMMARY CARDS */}
// //       <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
// //         <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
// //           <h3>Total Users</h3>
// //           <p>{users.length}</p>
// //         </div>

// //         <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
// //           <h3>Total Properties</h3>
// //           <p>{properties.length}</p>
// //         </div>

// //         <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
// //           <h3>Pending Approvals</h3>
// //           <p>{properties.filter((p) => !p.approved).length}</p>
// //         </div>
// //       </div>

// //       {/* ----------------------
// //            USERS
// //       ----------------------- */}
// //       <h3>Users</h3>
// // <div
// //   style={{
// //     padding: "15px",
// //     background: "#eef2ff",
// //     borderRadius: "10px",
// //     marginBottom: "20px",
// //   }}
// // >
// //   <h4>Add New User</h4>

// //   <input
// //     type="text"
// //     placeholder="Full Name"
// //     value={newUser.fullName}
// //     onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
// //     style={{ padding: "8px", width: "250px", marginRight: "10px" }}
// //   />

// //   <input
// //     type="email"
// //     placeholder="Email"
// //     value={newUser.email}
// //     onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
// //     style={{ padding: "8px", width: "250px", marginRight: "10px" }}
// //   />

// //   <input
// //     type="password"
// //     placeholder="Password"
// //     value={newUser.password}
// //     onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
// //     style={{ padding: "8px", width: "250px", marginRight: "10px", marginTop: "10px" }}
// //   />

// //   <select
// //     value={newUser.role}
// //     onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
// //     style={{ padding: "8px", marginRight: "10px", marginTop: "10px" }}
// //   >
// //     <option value="tenant">Tenant</option>
// //     <option value="landlord">Landlord</option>
// //     <option value="admin">Admin</option>
// //   </select>

// //   <button
// //     className="btn btn-primary btn-sm"
// //     onClick={addUser}
// //     style={{ marginTop: "10px" }}
// //   >
// //     Add User
// //   </button>
// // </div>

// //       {/* SEARCH BOX */}
// //       <input
// //         type="text"
// //         placeholder="Search users..."
// //         onChange={(e) => setSearchUser(e.target.value.toLowerCase())}
// //         style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
// //       />

// //       <div style={{ maxHeight: "300px", overflowY: "auto" }}>
// //         <table className="table">
// //           <thead>
// //             <tr>
// //               <th>Name</th>
// //               <th>Email</th>
// //               <th>Role</th>
// //               <th></th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {users
// //               .filter((u) => u.fullName.toLowerCase().includes(searchUser))
// //               .map((u) => (
// //                 <tr key={u._id}>
// //                   <td>{u.fullName}</td>
// //                   <td>{u.email}</td>
// //                   <td>
// //                     <span
// //                       style={{
// //                         padding: "5px 10px",
// //                         borderRadius: "8px",
// //                         background:
// //                           u.role === "admin"
// //                             ? "#d4edda"
// //                             : u.role === "landlord"
// //                             ? "#d1ecf1"
// //                             : "#f8d7da",
// //                       }}
// //                     >
// //                       {u.role}
// //                     </span>
// //                   </td>
// //                   <td>
// //                     <button
// //                       className="btn btn-danger btn-sm"
// //                       onClick={() => deleteUser(u._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* ----------------------
// //            PROPERTIES
// //       ----------------------- */}
// //       <h3 style={{ marginTop: "30px" }}>Properties</h3>

// //       {/* SEARCH BOX */}
// //       <input
// //         type="text"
// //         placeholder="Search properties..."
// //         onChange={(e) => setSearchProperty(e.target.value.toLowerCase())}
// //         style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
// //       />

// //       <div style={{ maxHeight: "300px", overflowY: "auto" }}>
// //         <table className="table">
// //           <thead>
// //             <tr>
// //               <th>Title</th>
// //               <th>Location</th>
// //               <th>Price</th>
// //               <th>Approved</th>
// //               <th></th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {properties.filter((p) => p.title.toLowerCase().includes(searchProperty)).map((p) => (
// //                 <tr
// //                   key={p._id}
// //                   style={{ background: !p.approved ? "#fff3cd" : "white" }}
// //                 >
// //                   <td>{p.title}</td>
// //                   <td>{p.location}</td>
// //                   <td>${Number(p.price).toLocaleString()}</td>
// //                   <td>{p.approved ? "Yes" : "No"}</td>

// //                   <td>
// //                   {!p.approved ? (
// //   <button
// //     className="btn btn-success btn-sm"
// //     onClick={() => approve(p._id)}
// //   >
// //     Approve
// //   </button>
// // ) : (
// //   <button
// //     className="btn btn-warning btn-sm"
// //     onClick={() => unapprove(p._id)}
// //   >
// //     Unapprove
// //   </button>
// // )}
// // </td>
// //   </tr>
// //               ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //     </>
// //   );
// // }



// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function AdminDashboard({ onLogout }) {
// //   const [users, setUsers] = useState([]);
// //   const [properties, setProperties] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchUser, setSearchUser] = useState("");
// //   const [searchProperty, setSearchProperty] = useState("");
// //   const [propertyFilter, setPropertyFilter] = useState("all");
// //   const [newUser, setNewUser] = useState({
// //     fullName: "",
// //     email: "",
// //     password: "",
// //     role: "tenant",
// //   });
// //   const [newProperty, setNewProperty] = useState({
// //     title: "",
// //     location: "",
// //     price: "",
// //     landlord: "",
// //     image: null,
// //   });
// //   const [activeTab, setActiveTab] = useState("dashboard");
// //   const [sidebarOpen, setSidebarOpen] = useState(true);

// //   useEffect(() => {
// //     Promise.all([loadUsers(), loadProperties()]).then(() => setLoading(false));
// //   }, []);

// //   const loadUsers = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:3000/admin/users");
// //       setUsers(res.data);
// //     } catch (err) {
// //       console.error("Failed to load users:", err);
// //     }
// //   };

// //   const loadProperties = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:3000/admin/properties");
// //       setProperties(res.data);
// //     } catch (err) {
// //       console.error("Failed to fetch properties:", err);
// //     }
// //   };

// //   const deleteUser = async (id) => {
// //     if (!confirm("Delete this user?")) return;
// //     try {
// //       await axios.delete(`http://localhost:3000/admin/users/${id}`);
// //       loadUsers();
// //     } catch (err) {
// //       console.error("Failed to delete user:", err);
// //     }
// //   };

// //   const addUser = async () => {
// //     if (!newUser.fullName || !newUser.email || !newUser.password)
// //       return alert("All fields are required!");
// //     try {
// //       await axios.post("http://localhost:3000/admin/users", newUser);
// //       alert("User added successfully!");
// //       setNewUser({ fullName: "", email: "", password: "", role: "tenant" });
// //       loadUsers();
// //     } catch (err) {
// //       alert(err.response?.data?.error || "Failed to add user");
// //     }
// //   };

// //   const approve = async (id) => {
// //     if (!confirm("Approve this property?")) return;
// //     try {
// //       await axios.put(`http://localhost:3000/admin/properties/${id}/approve`);
// //       setProperties((prev) =>
// //         prev.map((p) => (p._id === id ? { ...p, approved: true } : p))
// //       );
// //     } catch (err) {
// //       console.error("Failed to approve property:", err);
// //     }
// //   };

// //   const unapprove = async (id) => {
// //     if (!confirm("Unapprove this property?")) return;
// //     try {
// //       await axios.put(`http://localhost:3000/admin/properties/${id}/unapprove`);
// //       setProperties((prev) =>
// //         prev.map((p) => (p._id === id ? { ...p, approved: false } : p))
// //       );
// //     } catch (err) {
// //       console.error("Failed to unapprove property:", err);
// //     }
// //   };

// //   const addProperty = async () => {
// //     if (!newProperty.title || !newProperty.location || !newProperty.price || !newProperty.landlord)
// //       return alert("All fields are required!");
// //     try {
// //       const formData = new FormData();
// //       formData.append("title", newProperty.title);
// //       formData.append("location", newProperty.location);
// //       formData.append("price", newProperty.price);
// //       formData.append("landlord", newProperty.landlord);
// //       if (newProperty.image) formData.append("image", newProperty.image);

// //       await axios.post("http://localhost:3000/admin/properties", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       alert("Property added successfully!");
// //       setNewProperty({ title: "", location: "", price: "", landlord: "", image: null });
// //       loadProperties();
// //     } catch (err) {
// //       alert(err.response?.data?.error || "Failed to add property");
// //     }
// //   };

// //   if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

// //   // Filtered properties for table display
// //   const filteredProperties = properties
// //     .filter((p) => (propertyFilter === "all" ? true : propertyFilter === "approved" ? p.approved : !p.approved))
// //     .filter((p) => p.title.toLowerCase().includes(searchProperty));

// //   return (
// //     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif", background: "#f4f6f8" }}>
// //       {/* Sidebar */}
// //       <aside
// //         style={{
// //           width: sidebarOpen ? 250 : 0,
// //           background: "#1f2937",
// //           color: "white",
// //           display: "flex",
// //           flexDirection: "column",
// //           padding: sidebarOpen ? "20px" : 0,
// //           overflow: "hidden",
// //           transition: "all 0.3s ease",
// //           flexShrink: 0,
// //         }}
// //       >
// //         <h1 style={{ marginBottom: "30px", fontSize: "1.5rem" }}>{sidebarOpen ? "🏠 SmartRent+" : ""}</h1>
// //         <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
// //           {["dashboard", "users", "properties"].map((tab) => (
// //             <button
// //               key={tab}
// //               onClick={() => setActiveTab(tab)}
// //               style={{
// //                 background: activeTab === tab ? "#2563eb" : "transparent",
// //                 border: "none",
// //                 padding: "10px",
// //                 textAlign: "left",
// //                 color: "white",
// //                 borderRadius: "5px",
// //                 cursor: "pointer",
// //               }}
// //             >
// //               {sidebarOpen ? tab.charAt(0).toUpperCase() + tab.slice(1) : tab.charAt(0).toUpperCase()}
// //             </button>
// //           ))}
// //         </nav>
// //         <button
// //           onClick={onLogout}
// //           style={{
// //             marginTop: "auto",
// //             padding: "10px",
// //             background: "#ef4444",
// //             border: "none",
// //             borderRadius: "5px",
// //             cursor: "pointer",
// //             color: "white",
// //           }}
// //         >
// //           {sidebarOpen ? "Logout" : "⏻"}
// //         </button>
// //       </aside>

// //       {/* Main Content */}
// //       <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
// //         {/* Mobile toggle button */}
// //         <button
// //           onClick={() => setSidebarOpen(!sidebarOpen)}
// //           style={{
// //             display: "inline-block",
// //             marginBottom: "20px",
// //             padding: "10px 15px",
// //             background: "#2563eb",
// //             color: "white",
// //             border: "none",
// //             borderRadius: "5px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           {sidebarOpen ? "Hide Menu" : "Show Menu"}
// //         </button>

// //         {activeTab === "dashboard" && (
// //           <>
// //             <h2 style={{ marginBottom: "20px", color: "#111827" }}>Dashboard</h2>
// //             {/* SUMMARY CARDS */}
// //             <div
// //               style={{
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
// //                 gap: "20px",
// //                 marginBottom: "30px",
// //               }}
// //             >
// //               {[
// //                 { title: "Total Users", value: users.length },
// //                 { title: "Admins", value: users.filter(u => u.role === "admin").length },
// //                 { title: "Landlords", value: users.filter(u => u.role === "landlord").length },
// //                 { title: "Tenants", value: users.filter(u => u.role === "tenant").length },
// //                 { title: "Total Properties", value: properties.length },
// //                 { title: "Pending Approvals", value: properties.filter(p => !p.approved).length },
// //               ].map((card, i) => (
// //                 <div
// //                   key={i}
// //                   style={{
// //                     background: "white",
// //                     padding: "20px",
// //                     borderRadius: "10px",
// //                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //                     textAlign: "center",
// //                   }}
// //                 >
// //                   <h3>{card.title}</h3>
// //                   <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{card.value}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </>
// //         )}

// //         {activeTab === "users" && (
// //           <>
// //             {/* Add New User Form */}
// //             <div style={{ background: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
// //               <h3>Add New User</h3>
// //               <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
// //                 <input type="text" placeholder="Full Name" value={newUser.fullName} onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })} style={{ padding: "10px", flex: "1 1 200px", minWidth: "100px" }} />
// //                 <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} style={{ padding: "10px", flex: "1 1 200px", minWidth: "100px" }} />
// //                 <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} style={{ padding: "10px", flex: "1 1 200px", minWidth: "100px" }} />
// //                 <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} style={{ padding: "10px" }}>
// //                   <option value="tenant">Tenant</option>
// //                   <option value="landlord">Landlord</option>
// //                   <option value="admin">Admin</option>
// //                 </select>
// //                 <button onClick={addUser} style={{ padding: "10px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add User</button>
// //               </div>
// //             </div>

// //             {/* Users Table */}
// //             <div style={{ overflowX: "auto", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
// //               <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
// //                 <thead style={{ background: "#e5e7eb", position: "sticky", top: 0 }}>
// //                   <tr>
// //                     <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
// //                     <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
// //                     <th style={{ padding: "10px", textAlign: "left" }}>Role</th>
// //                     <th style={{ padding: "10px" }}></th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {users.filter((u) => u.fullName.toLowerCase().includes(searchUser)).map((u) => (
// //                     <tr key={u._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
// //                       <td style={{ padding: "10px" }}>{u.fullName}</td>
// //                       <td style={{ padding: "10px" }}>{u.email}</td>
// //                       <td style={{ padding: "10px" }}>
// //                         <span style={{ padding: "5px 10px", borderRadius: "8px", background: u.role === "admin" ? "#d4edda" : u.role === "landlord" ? "#d1ecf1" : "#f8d7da" }}>
// //                           {u.role}
// //                         </span>
// //                       </td>
// //                       <td style={{ padding: "10px" }}>
// //                         <button onClick={() => deleteUser(u._id)} style={{ padding: "5px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </>
// //         )}

// //         {activeTab === "properties" && (
// //           <>
// //             {/* Add New Property Form */}
// //             <div style={{ background: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
// //               <h3>Add New Property</h3>
// //               <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
// //                 <input type="text" placeholder="Title" value={newProperty.title} onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })} style={{ padding: "10px", flex: "1 1 200px" }} />
// //                 <input type="text" placeholder="Location" value={newProperty.location} onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })} style={{ padding: "10px", flex: "1 1 200px" }} />
// //                 <input type="number" placeholder="Price" value={newProperty.price} onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })} style={{ padding: "10px", flex: "1 1 200px" }} />
// //                 <input type="text" placeholder="Landlord Name" value={newProperty.landlord} onChange={(e) => setNewProperty({ ...newProperty, landlord: e.target.value })} style={{ padding: "10px", flex: "1 1 200px" }} />
// //                 <input type="file" onChange={(e) => setNewProperty({ ...newProperty, image: e.target.files[0] })} style={{ padding: "10px" }} />
// //                 <button onClick={addProperty} style={{ padding: "10px 20px", background: "#16a34a", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add Property</button>
// //               </div>

// //               {/* Filter by approval status */}
// //               <div style={{ marginTop: "10px" }}>
// //                 <select onChange={(e) => setPropertyFilter(e.target.value)} value={propertyFilter} style={{ padding: "8px" }}>
// //                   <option value="all">All Properties</option>
// //                   <option value="approved">Approved</option>
// //                   <option value="pending">Pending</option>
// //                 </select>
// //               </div>
// //             </div>

// //             {/* Properties Table */}
// //             <div style={{ overflowX: "auto", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
// //               <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
// //                 <thead style={{ background: "#e5e7eb", position: "sticky", top: 0 }}>
// //                   <tr>
// //                     <th style={{ padding: "10px", textAlign: "left" }}>Image</th>
// //                     <th style={{ padding: "10px", textAlign: "left" }}>Title</th>
// //                     <th style={{ padding: "10px", textAlign: "left" }}>Location</th>
// //                     <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
// //                     <th style={{ padding: "10px", textAlign: "left" }}>Approved</th>
// //                     <th style={{ padding: "10px" }}></th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredProperties.map((p) => (
// //                     <tr key={p._id} style={{ borderBottom: "1px solid #e5e7eb", background: !p.approved ? "#fff7ed" : "white" }}>
// //                       <td style={{ padding: "10px" }}>
// //                         {p.imageUrl && <img src={p.imageUrl} alt={p.title} style={{ width: "80px", borderRadius: "5px" }} />}
// //                       </td>
// //                       <td style={{ padding: "10px" }}>{p.title}</td>
// //                       <td style={{ padding: "10px" }}>{p.location}</td>
// //                       <td style={{ padding: "10px" }}>${Number(p.price).toLocaleString()}</td>
// //                       <td style={{ padding: "10px" }}>{p.approved ? "Yes" : "No"}</td>
// //                       <td style={{ padding: "10px" }}>
// //                         {!p.approved ? (
// //                           <button onClick={() => approve(p._id)} style={{ padding: "5px 10px", background: "#16a34a", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Approve</button>
// //                         ) : (
// //                           <button onClick={() => unapprove(p._id)} style={{ padding: "5px 10px", background: "#f59e0b", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Unapprove</button>
// //                         )}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }





//  import { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/AdminDashboard.css"


// export default function AdminDashboard({ onLogout }) {
//   const [users, setUsers] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchUser, setSearchUser] = useState("");
//   const [searchProperty, setSearchProperty] = useState("");
//   const [newUser, setNewUser] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     role: "tenant",
//   });
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

  
//   useEffect(() => {
//     Promise.all([loadUsers(), loadProperties()]).then(() => setLoading(false));
//   }, []);


//   const loadUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/admin/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to load users:", err);
//     }
//   };


//   const deleteUser = async (id) => {
//     if (!confirm("Delete this user?")) return;

//     try {
//       await axios.delete(`http://localhost:3000/admin/users/${id}`);
//       loadUsers();
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//     }
//   };



//   const addUser = async () => {
//     if (!newUser.fullName || !newUser.email || !newUser.password)
//       return alert("All fields are required!");

//     try {
//       await axios.post("http://localhost:3000/admin/users", newUser);
//       alert("User added successfully!");
//       setNewUser({ fullName: "", email: "", password: "", role: "tenant" });
//       loadUsers();
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to add user");
//     }
//   };



//   const loadProperties = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/admin/properties");
//       setProperties(res.data);
//     } catch (err) {
//       console.error("Failed to fetch properties:", err);
//     }
//   };



//   const approve = async (id) => {
//     if (!confirm("Approve this property?")) return;

//     try {
//       await axios.put(`http://localhost:3000/admin/properties/${id}/approve`);
//       setProperties((prev) =>
//         prev.map((p) => (p._id === id ? { ...p, approved: true } : p))
//       );
//     } catch (err) {
//       console.error("Failed to approve property:", err);
//     }
//   };



//   const unapprove = async (id) => {
//     if (!confirm("Unapprove this property?")) return;

//     try {
//       await axios.put(`http://localhost:3000/admin/properties/${id}/unapprove`);
//       setProperties((prev) =>
//         prev.map((p) => (p._id === id ? { ...p, approved: false } : p))
//       );
//     } catch (err) {
//       console.error("Failed to unapprove property:", err);
//     }
//   };


//   if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

//   return (
//     <div className="container">
//       <aside style={{ width: sidebarOpen ? 250 : 0, padding: sidebarOpen ? "20px" : 0,
//        background: "#1f2937",
//      color: "white",
//    display:" flex",
//   flexDirection: "column",
//   overFlow: "hidden",
//   transition: "all 0.3s ease",
//   flexShrink: 0}}>
//         <h1>{sidebarOpen ? "🏠 SmartRent+" : ""}</h1>
//         <nav>
//           {["dashboard", "users", "properties"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               style={{background: activeTab === tab ? "#2563eb" : "transparent", }}
//               onMouseEnter={(e) => (e.target.style.background = activeTab === tab ? "#2563eb" : "#374151")}
//               onMouseLeave={(e) => (e.target.style.background = activeTab === tab ? "#2563eb" : "transparent")}
//             >
//               {sidebarOpen ? tab.charAt(0).toUpperCase() + tab.slice(1) : tab.charAt(0).toUpperCase()}
//             </button>
//           ))}
//         </nav>
//         <button className="logout-btn"
//           onClick={onLogout}
//           onMouseEnter={(e) => (e.target.style.background = "#dc2626")}
//           onMouseLeave={(e) => (e.target.style.background = "#ef4444")}
//         >
//           {sidebarOpen ? "Logout" : "⏻"}
//         </button>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="main-content">
//         {/* Mobile toggle button */}
//         <button className="toggle-btn"
//           onClick={() => setSidebarOpen(!sidebarOpen)}>
//           {sidebarOpen ? "Hide Menu" : "Show Menu"}
//         </button>

//         {activeTab === "dashboard" && (
//           <>
//             <h2 style={{ marginBottom: "20px", color: "#111827" }}>Dashboard</h2>
//             {/* SUMMARY CARDS */}
//             <div 
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//                 gap: "20px",
//                 marginBottom: "30px",
//               }}
//             >
//               {[
//                 { title: "Total Users", value: users.length },
//                 { title: "Total Properties", value: properties.length },
//                 { title: "Pending Approvals", value: properties.filter((p) => !p.approved).length },
//               ].map((card, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     background: "white",
//                     padding: "20px",
//                     borderRadius: "10px",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                     textAlign: "center",
//                     transition: "transform 0.2s, box-shadow 0.2s",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-5px)";
//                     e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
//                   }}
//                 >
//                   <h3>{card.title}</h3>
//                   <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{card.value}</p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {activeTab === "users" && (
//           <>
//             {/* ADD NEW USER */}
//             <div
//               style={{
//                 background: "white",
//                 padding: "20px",
//                 borderRadius: "10px",
//                 marginBottom: "20px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               }}
//             >
//               <h3>Add New User</h3>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={newUser.fullName}
//                   onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
//                   style={{ padding: "10px", flex: "1 1 200px", minWidth: "100px" }}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={newUser.email}
//                   onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                   style={{ padding: "10px", flex: "1 1 200px", minWidth: "100px" }}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={newUser.password}
//                   onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//                   style={{ padding: "10px", flex: "1 1 200px", minWidth: "100px" }}
//                 />
//                 <select
//                   value={newUser.role}
//                   onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//                   style={{ padding: "10px" }}
//                 >
//                   <option value="tenant">Tenant</option>
//                   <option value="landlord">Landlord</option>
//                   <option value="admin">Admin</option>
//                 </select>
//                 <button
//                   onClick={addUser}
//                   style={{
//                     padding: "10px 20px",
//                     background: "#2563eb",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     transition: "all 0.2s ease",
//                   }}
//                   onMouseEnter={(e) => (e.target.style.background = "#1d4ed8")}
//                   onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
//                 >
//                   Add User
//                 </button>
//               </div>
//             </div>

//             {/* USERS TABLE */}
//             <div style={{ overflowX: "auto", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
//                 <thead style={{ background: "#e5e7eb", position: "sticky", top: 0 }}>
//                   <tr>
//                     <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
//                     <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
//                     <th style={{ padding: "10px", textAlign: "left" }}>Role</th>
//                     <th style={{ padding: "10px" }}></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users
//                     .filter((u) => u.fullName.toLowerCase().includes(searchUser))
//                     .map((u) => (
//                       <tr
//                         key={u._id}
//                         style={{
//                           borderBottom: "1px solid #e5e7eb",
//                           transition: "background 0.2s",
//                         }}
//                         onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
//                         onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
//                       >
//                         <td style={{ padding: "10px" }}>{u.fullName}</td>
//                         <td style={{ padding: "10px" }}>{u.email}</td>
//                         <td style={{ padding: "10px" }}>
//                           <span
//                             style={{
//                               padding: "5px 10px",
//                               borderRadius: "8px",
//                               background:
//                                 u.role === "admin"
//                                   ? "#d4edda"
//                                   : u.role === "landlord"
//                                   ? "#d1ecf1"
//                                   : "#f8d7da",
//                             }}
//                           >
//                             {u.role}
//                           </span>
//                         </td>
//                         <td style={{ padding: "10px" }}>
//                           <button
//                             onClick={() => deleteUser(u._id)}
//                             style={{
//                               padding: "5px 10px",
//                               background: "#ef4444",
//                               color: "white",
//                               border: "none",
//                               borderRadius: "5px",
//                               cursor: "pointer",
//                               transition: "all 0.2s ease",
//                             }}
//                             onMouseEnter={(e) => (e.target.style.background = "#dc2626")}
//                             onMouseLeave={(e) => (e.target.style.background = "#ef4444")}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}

//         {activeTab === "properties" && (
//           <>
//             <div style={{ overflowX: "auto", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
//                 <thead style={{ background: "#e5e7eb", position: "sticky", top: 0 }}>
//                   <tr>
//                     <th style={{ padding: "10px", textAlign: "left" }}>Title</th>
//                     <th style={{ padding: "10px", textAlign: "left" }}>Location</th>
//                     <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
//                     <th style={{ padding: "10px", textAlign: "left" }}>Approved</th>
//                     <th style={{ padding: "10px" }}></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {properties
//                     .filter((p) => p.title.toLowerCase().includes(searchProperty))
//                     .map((p) => (
//                       <tr
//                         key={p._id}
//                         style={{
//                           borderBottom: "1px solid #e5e7eb",
//                           transition: "background 0.2s",
//                           background: !p.approved ? "#fff7ed" : "white",
//                         }}
//                         onMouseEnter={(e) => (e.currentTarget.style.background = !p.approved ? "#ffe9d6" : "#f3f4f6")}
//                         onMouseLeave={(e) => (e.currentTarget.style.background = !p.approved ? "#fff7ed" : "white")}
//                       >
//                         <td style={{ padding: "10px" }}>{p.title}</td>
//                         <td style={{ padding: "10px" }}>{p.location}</td>
//                         <td style={{ padding: "10px" }}>${Number(p.price).toLocaleString()}</td>
//                         <td style={{ padding: "10px" }}>{p.approved ? "Yes" : "No"}</td>
//                         <td style={{ padding: "10px" }}>
//                           {!p.approved ? (
//                             <button
//                               onClick={() => approve(p._id)}
//                               style={{
//                                 padding: "5px 10px",
//                                 background: "#16a34a",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "5px",
//                                 cursor: "pointer",
//                                 transition: "all 0.2s ease",
//                               }}
//                               onMouseEnter={(e) => (e.target.style.background = "#15803d")}
//                               onMouseLeave={(e) => (e.target.style.background = "#16a34a")}
//                             >
//                               Approve
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => unapprove(p._id)}
//                               style={{
//                                 padding: "5px 10px",
//                                 background: "#f59e0b",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "5px",
//                                 cursor: "pointer",
//                                 transition: "all 0.2s ease",
//                               }}
//                               onMouseEnter={(e) => (e.target.style.background = "#d97706")}
//                               onMouseLeave={(e) => (e.target.style.background = "#f59e0b")}
//                             >
//                               Unapprove
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [searchProperty, setSearchProperty] = useState("");
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "tenant",
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    Promise.all([loadUsers(), loadProperties()]).then(() => setLoading(false));
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  const loadProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/properties`);
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const addUser = async () => {
    if (!newUser.fullName || !newUser.email || !newUser.password) {
      return alert("All fields are required!");
    }
    try {
      await axios.post(`${API_URL}/admin/users`, newUser);
      alert("User added successfully!");
      setNewUser({ fullName: "", email: "", password: "", role: "tenant" });
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add user");
    }
  };

  const approve = async (id) => {
    if (!confirm("Approve this property?")) return;
    try {
      await axios.put(`${API_URL}/admin/properties/${id}/approve`);
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, approved: true } : p))
      );
    } catch (err) {
      console.error("Failed to approve property:", err);
    }
  };

  const unapprove = async (id) => {
    if (!confirm("Unapprove this property?")) return;
    try {
      await axios.put(`${API_URL}/admin/properties/${id}/unapprove`);
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, approved: false } : p))
      );
    } catch (err) {
      console.error("Failed to unapprove property:", err);
    }
  };

  if (loading)
    return <h2 className="loading-text">Loading...</h2>;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h1 className="sidebar-logo">{sidebarOpen ? "🏠 SmartRent+" : ""}</h1>
        <nav className="sidebar-nav">
          {["dashboard", "users", "properties"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`sidebar-btn ${activeTab === tab ? "active" : ""}`}
            >
              {sidebarOpen
                ? tab.charAt(0).toUpperCase() + tab.slice(1)
                : tab.charAt(0).toUpperCase()}
            </button>
          ))}
        </nav>
        <button className="logout-btn" onClick={onLogout}>
          {sidebarOpen ? "Logout" : "⏻"}
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <button
          className="toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Hide Menu" : "Show Menu"}
        </button>

        {activeTab === "dashboard" && (
          <DashboardTab users={users} properties={properties} />
        )}
        {activeTab === "users" && (
          <UsersTab
            users={users}
            searchUser={searchUser}
            setSearchUser={setSearchUser}
            newUser={newUser}
            setNewUser={setNewUser}
            addUser={addUser}
            deleteUser={deleteUser}
          />
        )}
        {activeTab === "properties" && (
          <PropertiesTab
            properties={properties}
            searchProperty={searchProperty}
            setSearchProperty={setSearchProperty}
            approve={approve}
            unapprove={unapprove}
          />
        )}
      </main>
    </div>
  );
}

/* ----------------- CHILD COMPONENTS ----------------- */

function DashboardTab({ users, properties }) {
  const cards = [
    { title: "Total Users", value: users.length },
    { title: "Total Properties", value: properties.length },
    { title: "Pending Approvals", value: properties.filter((p) => !p.approved).length },
  ];

  return (
    <div>
      <h2 className="tab-title">Dashboard</h2>
      <div className="summary-cards">
        {cards.map((card, i) => (
          <div key={i} className="summary-card">
            <h3>{card.title}</h3>
            <p className="card-value">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersTab({ users, searchUser, setSearchUser, newUser, setNewUser, addUser, deleteUser }) {
  return (
    <div>
      {/* Add New User */}
      <div className="form-card">
        <h3>Add New User</h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.fullName}
            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={addUser} className="add-btn">Add User</button>
        </div>
      </div>

      {/* Users Table */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value.toLowerCase())}
        className="search-input"
      />
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((u) => u.fullName.toLowerCase().includes(searchUser))
              .map((u) => (
                <tr key={u._id}>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge ${u.role}`}>{u.role}</span>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(u._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PropertiesTab({ properties, searchProperty, setSearchProperty, approve, unapprove }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search properties..."
        value={searchProperty}
        onChange={(e) => setSearchProperty(e.target.value.toLowerCase())}
        className="search-input"
      />
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Approved</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {properties
              .filter((p) => p.title.toLowerCase().includes(searchProperty))
              .map((p) => (
                <tr key={p._id} className={!p.approved ? "pending" : ""}>
                  <td>{p.title}</td>
                  <td>{p.location}</td>
                  <td>${Number(p.price).toLocaleString()}</td>
                  <td>{p.approved ? "Yes" : "No"}</td>
                  <td>
                    {!p.approved ? (
                      <button onClick={() => approve(p._id)} className="approve-btn">
                        Approve
                      </button>
                    ) : (
                      <button onClick={() => unapprove(p._id)} className="unapprove-btn">
                        Unapprove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
