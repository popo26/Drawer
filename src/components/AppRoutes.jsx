import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
// import { Router, Route, Routes, Link, Navigate } from "react-router-dom";

// import { Redirect } from 'react-router';
import "../css/App.css";
import fakedata from "../../fakedata.json";
import Navbar from "./Navbar";
import ScribbleBtn from "./ScribbleBtn";
import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";
import PasswordResetPage from "../pages/PasswordResetPage";
import CreateDrawerPage from "../pages/CreateDrawerPage";
import ScribblePage from "../pages/ScribblePage";
import ProfilePage from "../pages/ProfilePage";
import ScribbleListPage from "../pages/ScribbleListPage";
import HomePage from "../pages/HomePage";
import DrawerListPage from "../pages/DrawerListPage";
import PerScribblePage from "../pages/PerScribblePage";
import SortPage from "../pages/SortPage";

export default function AppRoutes() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  //   const [isLoggedIn, setIsLoggedIn] = useState(true);
  const data = fakedata;

  const handleClickExpand = (passedIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === passedIndex) {
        return -1;
      } else {
        return passedIndex;
      }
    });
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/home"
            element={
              <HomePage
                expandedIndex={expandedIndex}
                handleExpand={handleClickExpand}
                data={data}
              />
            }
          ></Route>
          <Route path="/search" element={<SearchPage data={data} />}></Route>
          <Route path="/scribble" element={<ScribblePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route
            path="/stray"
            element={<ScribbleListPage data={data} />}
          ></Route>
          <Route
            path="/scribble/:id"
            element={<PerScribblePage data={data} />}
          ></Route>
          <Route
            path="/sort"
            element={<SortPage data={data} />}
          ></Route>

          <Route path="/password-reset" element={<PasswordResetPage />}></Route>
          <Route
            path="/create"
            element={<CreateDrawerPage data={data} />}
          ></Route>
          <Route
            path="/drawer-list/:id"
            element={
              <DrawerListPage data={data} expandedIndex={expandedIndex} />
            }
          ></Route>
        </Routes>
        <Link to="/scribble">
          <ScribbleBtn />
        </Link>
      </Router>
    </div>
  );
}
