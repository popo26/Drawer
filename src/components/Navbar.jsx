import "../css/Navbar.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            <Icon
              icon="mingcute:drawer-line"
              color="black"
              width="60"
            />
          </NavLink>

          <span className="navbar-text greeting">Hi TomTom!</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  <Icon
                    icon="healthicons:ui-user-profile"
                    color="black"
                    width="30"
                    height="30"
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/search">
                  <Icon icon="bi:search" color="black" width="30" height="30" />
                </NavLink>
              </li>
            </ul>

            <NavLink className="nav-link" to="/stray">
              <Icon
                icon="game-icons:files"
                color="black"
                width="30"
                height="30"
              />
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}



//ORIGINAL++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// export default function Navbar() {
//   return (
//     <div className="Navbar">
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/home">
//             <Icon
//               icon="mingcute:drawer-line"
//               color="black"
//               width="48"
//               height="48"
//             />
//           </Link>

//           <span className="navbar-text">Hi TomTom!</span>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarText"
//             aria-controls="navbarText"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarText">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  
//               <li className="nav-item">
//                 <Link className="nav-link" to="/profile">
//                   <Icon
//                     icon="healthicons:ui-user-profile"
//                     color="black"
//                     width="30"
//                     height="30"
//                   />
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/search">
//                   <Icon icon="bi:search" color="black" width="30" height="30" />
//                 </Link>
//               </li>
//             </ul>

//             <Link className="nav-link" to="/stray">
//               <Icon
//                 icon="game-icons:files"
//                 color="black"
//                 width="30"
//                 height="30"
//               />
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }
