import { useState } from "react";
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

function App() {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const data = fakedata;

  return (
    <>
      <Navbar />
      <Accordion expandedIndex={expandedIndex} data={data} />
      <ScribbleBtn />

      {/* Temporary */}
      <SearchPage />
      <LoginPage />
      <PasswordResetPage />
      <CreateDrawerPage />
      <ScribblePage />
    </>
  );
}

export default App;
