import "../css/Navbar.css";
import { Link } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import { Icon } from '@iconify/react';

export default function Navbar() {
  return (
    <div className="Navbar">


<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home"><Icon icon="mingcute:drawer-line" color="black" width="48" height="48" /></Link>
    <span className="navbar-text">
        Hi TomTom!
      </span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#"><Icon icon="uil:home" color="black" width="30" height="30" /></a>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/profile"><Icon icon="healthicons:ui-user-profile" color="black" width="30" height="30"  /></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/search"><Icon icon="bi:search" color="black" width="30" height="30"  /></Link>
        </li>
      </ul>
   
      <Link className="nav-link" to="/stray"><Icon icon="game-icons:files" color="black" width="30" height="30" /></Link>
      {/* <span className="navbar-text">
        Hi TomTom!
      </span> */}
      {/* <a className="nav-link" href="#"><Icon icon="healthicons:ui-user-profile" color="black" width="30" height="30"  /></a> */}

    </div>
  </div>
</nav>



      {/* <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/stray">Stray Scribbles</Link>
        </li>
      </ul> */}
    </div>
  );
}
