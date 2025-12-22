
import "./Header.css";

function Header({ user, onLogout, onLoginClick, onSignupClick, onNavigate,onAdminClick }) {
 
    return (
            <header className="header">
              <div className="logo" onClick={() => onNavigate("home")} style={{ cursor: "pointer" }}>🏠 SmartRent</div>
                <nav >
                  {user ? (
                  <>
                   <div className="LogoutLand">
                     <span>Welcome, {user.name}</span>
                     <button onClick={onLogout} className="btn-logout">
                      Logout
                    </button>
                  </div>
              </>
                 ) : (
             <>
          <ul
          style={{
            marginRight:"400px",
           position:"relative",
           top:"10px"
          }}>
           <li onClick={() => onNavigate("home")}>Home</li>   
              <li onClick={() => onNavigate("features")}>Features</li>
              <li onClick={() => onNavigate("about")}>About Us</li>
              <li onClick={() => onNavigate("contact")}>Contact</li>
         </ul>


          <div className="buttonsHeader">
             <button onClick={onLoginClick} className="btn-link">
              Sign In
             </button>
             <button  onClick={onSignupClick} className="btn-primary">
              Sign Up
             </button>
             <button onClick={onAdminClick}  className="admin-btn"> Admin Panel</button>
          </div>
         
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

// function Header({ user, onLogout, onLoginClick, onSignupClick, onNavigate }) {
//   return (
//     <header className="header">
//       <div
//         className="logo"
//         onClick={() => onNavigate("home")}
//         style={{ cursor: "pointer" }}
//       >
//         🏠 SmartRent
//       </div>

//       <nav>
//         {user ? (
//           <>
//             <div className="LogoutLand">
//               <span>Welcome, {user.name}</span>

//               {/* 👇 Show ADMIN button only if role is admin */}
//               {user.role === "admin" && (
//                 <button
//                   onClick={() => onNavigate("admin")}
//                   className="btn-admin"
//                   style={{
//                     marginLeft: "15px",
//                     padding: "5px 10px",
//                     background: "#4CAF50",
//                     color: "white",
//                     borderRadius: "5px",
//                     border: "none",
//                     cursor: "pointer"
//                   }}
//                 >
//                   Admin Panel
//                 </button>
//               )}

//               <button onClick={onLogout} className="btn-logout">
//                 Logout
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <ul
//               style={{
//                 marginRight: "400px",
//                 position: "relative",
//                 top: "10px",
//               }}
//             >
//               <li onClick={() => onNavigate("home")}>Home</li>
//               <li onClick={() => onNavigate("features")}>Features</li>
//               <li onClick={() => onNavigate("about")}>About Us</li>
//               <li onClick={() => onNavigate("contact")}>Contact</li>
//             </ul>

//             <div
//               style={{
//                 marginLeft: "700px",
//                 position: "relative",
//                 bottom: "20px",
//               }}
//             >
//               <button onClick={onLoginClick} className="btn-link">
//                 Sign In
//               </button>
//               <button onClick={onSignupClick} className="btn-primary">
//                 Sign Up
//               </button>
//             </div>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }

// export default Header;
