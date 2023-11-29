import { useState } from "react";
import { Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MyNavbar from "./components/MyNavbar";
import ScribbleBtn from "./components/ScribbleBtn";
import "./css/App.css";
//import fakedata from "../fakedata.json";
import { DataProvider } from "./context/DataContext";
import { SelectedDrawerProvider } from "./context/SelectedDrawerContext";
import { SelectedScribbleProvider } from "./context/SelectedScribbleContext";

export default function App() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [drawerName, setDrawerName] = useState("");
  // const [selectedScribbleId, setSelectedScribbleId] = useState("");
  // const [selectedDrawerId, setSelectedDrawerId] = useState("");
  const [drawerToBeMoved, setDrawerToBeMoved] = useState("");
  const [files, setFiles] = useState([]);

  //const data = fakedata;

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
    <>
      <DataProvider>
        <SelectedDrawerProvider>
          <SelectedScribbleProvider>
          <MyNavbar />
          <AppRoutes
            expandedIndex={expandedIndex}
            handleExpand={handleClickExpand}
            //data={data}
            // selectedScribbleId={selectedScribbleId}
            // setSelectedScribbleId={setSelectedScribbleId}
            files={files}
            setFiles={setFiles}
            drawerName={drawerName}
            setDrawerName={setDrawerName}
            // selectedDrawerId={selectedDrawerId}
            // setSelectedDrawerId={setSelectedDrawerId}
            drawerToBeMoved={drawerToBeMoved}
            setDrawerToBeMoved={setDrawerToBeMoved}
          />
          <Link to="/scribble">
            <ScribbleBtn />
          </Link>
          </SelectedScribbleProvider>
        </SelectedDrawerProvider>
      </DataProvider>
    </>
  );
}
