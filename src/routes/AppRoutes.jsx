import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/App.css";
import ScribbleBtn from "../components/ScribbleBtn";
import SearchPage from "../pages/SearchPage";
import PasswordResetPage from "../pages/PasswordResetPage";
import CreateDrawerPage from "../pages/CreateDrawerPage";
import ScribblePage from "../pages/ScribblePage";
import ProfilePage from "../pages/ProfilePage";
import ScribbleListPage from "../pages/ScribbleListPage";
import HomePage from "../pages/HomePage";
import DrawerListPage from "../pages/DrawerListPage";
import PerScribblePage from "../pages/PerScribblePage";
// import SortPage from "../pages/SortPage";
// import SortPreviewPage from "../pages/SortPreviewPage";
import SortDrawerPage from "../pages/SortDrawerPage";
import SortDrawerPreviewPage from "../pages/SortDrawerPreviewPage";
import TestPage from "../pages/TestPage";
import { PageNotFound } from "../pages/PageNotFound";
import SortScribblePage from "../pages/SortScribblePage";
import SortScribblePreviewPage from "../pages/SortScribblePreviewPage";

export default function AppRoutes({
  expandedIndex,
  handleExpand,
  data,
  selectedScribbleId,
  setSelectedScribbleId,
  files,
  setFiles,
  drawerName,
  setDrawerName,
  selectedDrawerId,
  setSelectedDrawerId,
  drawerToBeMoved,
  setDrawerToBeMoved,
}) {

  return (
    <div>
      <Routes>
        <Route
          index
          // path="/home"
          element={
            <HomePage
              expandedIndex={expandedIndex}
              handleExpand={handleExpand}
              data={data}
            />
          }
        ></Route>
        <Route path="/search" element={<SearchPage data={data} />}></Route>
        <Route
          path="/scribble"
          element={
            <ScribblePage
              data={data}
              selectedScribbleId={selectedScribbleId}
              setSelectedScribbleId={setSelectedScribbleId}
              files={files}
              setFiles={setFiles}
            />
          }
        ></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route
          path="/stray"
          element={
            <ScribbleListPage
              data={data}
              selectedScribbleId={selectedScribbleId}
              setSelectedScribbleId={setSelectedScribbleId}
              files={files}
            />
          }
        ></Route>
        <Route
          path="/scribble/:id"
          element={
            <PerScribblePage data={data} files={files} setFiles={setFiles} />
          }
        ></Route>
        <Route
          path="/sort"
          element={
            <SortScribblePage
              data={data}
              drawerName={drawerName}
              setDrawerName={setDrawerName}
              selectedScribbleId={selectedScribbleId}
              setSelectedScribbleId={setSelectedScribbleId}
              selectedDrawerId={selectedDrawerId}
              setSelectedDrawerId={setSelectedDrawerId}
            />
          }
        ></Route>
        <Route
          path="/sort-preview"
          element={
            <SortScribblePreviewPage
              data={data}
              selectedScribbleId={selectedScribbleId}
              setSelectedScribbleId={setSelectedScribbleId}
              selectedDrawerId={selectedDrawerId}
              setSelectedDrawerId={setSelectedDrawerId}
            />
          }
        ></Route>

        <Route
          path="/sort-drawer"
          element={
            <SortDrawerPage
              data={data}
              drawerName={drawerName}
              setDrawerName={setDrawerName}
              selectedScribbleId={selectedScribbleId}
              setSelectedScribbleId={setSelectedScribbleId}
              selectedDrawerId={selectedDrawerId}
              setSelectedDrawerId={setSelectedDrawerId}
              drawerToBeMoved={drawerToBeMoved}
              setDrawerToBeMoved={setDrawerToBeMoved}
            />
          }
        ></Route>
        <Route
          path="/sort-drawer-preview"
          element={
            <SortDrawerPreviewPage
              data={data}
              selectedScribbleId={selectedScribbleId}
              setSelectedScribbleId={setSelectedScribbleId}
              selectedDrawerId={selectedDrawerId}
              setSelectedDrawerId={setSelectedDrawerId}
              drawerToBeMoved={drawerToBeMoved}
              setDrawerToBeMoved={setDrawerToBeMoved}
            />
          }
        ></Route>

        <Route path="/password-reset" element={<PasswordResetPage />}></Route>
        <Route
          path="/create"
          element={
            <CreateDrawerPage
              data={data}
              drawerName={drawerName}
              setDrawerName={setDrawerName}
            />
          }
        ></Route>
        <Route
          path="/drawer-list/:id"
          element={
            <DrawerListPage
              data={data}
              expandedIndex={expandedIndex}
              selectedDrawerId={selectedDrawerId}
              setSelectedDrawerId={setSelectedDrawerId}
              drawerToBeMoved={drawerToBeMoved}
              setDrawerToBeMoved={setDrawerToBeMoved}
            />
          }
        ></Route>
        {/* TEST */}
        <Route
          path="/test"
          element={
            <TestPage
              data={data}
              selectedScribbleId={selectedScribbleId}
              setSelectedScribbleId={setSelectedScribbleId}
              files={files}
              setFiles={setFiles}
            />
          }
        ></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Link to="/scribble">
        <ScribbleBtn />
      </Link> */}
    </div>
  );
}
