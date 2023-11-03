import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./css/App.css";
import Accordion from "./components/Accordion";
import fakedata from "./fakedata.json";
import Navbar from "./components/Navbar";
import ScribbleBtn from "./components/ScribbleBtn";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import CreateDrawerPage from "./pages/CreateDrawerPage";
import ScribblePage from "./pages/ScribblePage";
import ProfilePage from "./pages/ProfilePage";
import ScribbleListPage from "./pages/ScribbleListPage";

function App() {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const data = fakedata;

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/home"
            element={<Accordion expandedIndex={expandedIndex} data={data} />}
          ></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/scribble" element={<ScribblePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/stray" element={<ScribbleListPage />}></Route>


        </Routes>
        <Link to="/scribble"><ScribbleBtn/></Link>
      </Router>


      {/* Temporary */}
      {/* <SearchPage />
      <LoginPage />
      <PasswordResetPage />
      <CreateDrawerPage />
      <ScribblePage /> */}
    </>
  );
}

export default App;
