import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import "../css/SortPage.css";

export default function SortDrawerPage({
  data,
  drawerName,
  setDrawerName,
  selectedScribbleId,
  setSelectedScribbleId,
  selectedDrawerId,
  setSelectedDrawerId,
  drawerToBeMoved,
  setDrawerToBeMoved,
}) {
  const navigate = useNavigate();
  // const [newDrawerName, setNewDrawerName] = useState("");
  // const [selectedDrawerId, setSelectedDrawerId] = useState("");
  const { state } = useLocation();
  // const [selectedScribbleId, setSelectedScribbleId] = useState("");
  //   const [drawerToBeMoved, setDrawerToBeMoved] = useState("");

  console.log("State", state);
  console.log("DrawerToBeMoved", drawerToBeMoved);

  useEffect(() => {
    // const drawerToBeMoved = selectedDrawerId;
    // setDrawerToBeMoved(drawerToBeMoved);
    setDrawerToBeMoved(state.drawerToBeMoved);
    setSelectedDrawerId("");

    return () => {
      console.log("cleanup");
      // setSelectedDrawerId("")
      // const drawer = selectedDrawerId;
      // setDrawerToBeMoved(state.selectedDrawerId);
    };
  }, []);

  //   const parentDrawerObject = data["drawers"].filter(
  //     (item) => item.id == drawerToBeMoved
  //   );
  //   console.log(parentDrawerObject)

  //   const allDrawers = data["drawers"];
  //   const allScribbles = data["scribbles"];

  //   for (let x of allDrawers) {
  //     if (x.rootId == drawerToBeMoved) {
  //       //console.log("rootId same as DrawerToBeMoved {{PUT FOR DRAWERS}}",x)
  //       //console.log("Sub Drawer ID",x.id)
  //     }
  //   }

  //   for (let x of allScribbles) {
  //     if (x.rootDrawerId == drawerToBeMoved) {
  //       //console.log(
  //         "rootDrawerId same as DrawerToBeMoved {{PUT FOR SCRIBBLES}}",
  //         x
  //       );
  //     }
  //   }

  const moveAllChildrenToNewDrawer = (parentDrawerId, newTopLevelDrawerId) => {
    console.log("PUT - move Children");
    const drawerToBeMovedObject = data["drawers"].filter(
      //   (item) => item.id == drawerToBeMoved
      (item) => item.id == parentDrawerId
    );

    const newTopLevelDrawerObject = data["drawers"].filter(
      (item) => item.id == newTopLevelDrawerId
    );

    const allDrawers = data["drawers"];
    const allScribbles = data["scribbles"];

    for (let x of allDrawers) {
      if (x.drawerId === parentDrawerId) {
        let dataPost = {
          rootId: newTopLevelDrawerId,
          userId: 1,
          drawerId: x.drawerId,
          id: x.id,
          name: x.name,
          type: "drawer",
          ["sub-drawer"]: x["sub-drawer"],
          root: false,
          level: drawerToBeMovedObject[0]["level"] + 1,
        };
        //console.log("You are in Move Children fx");
        //console.log("FETCH PATH",`http://localhost:3000/drawers/${x.id}`)

        fetch(`http://localhost:3000/drawers/${x.id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataPost),
        })
          .then((response) => console.log(response.json()))
          .catch((error) => console.error(error.message));
      }
    }

    for (let x of allScribbles) {
      if (x.rootDrawerId === parentDrawerId) {
        let dataPost = {
          rootDrawerId: newTopLevelDrawerId,
          userId: 1,
          drawerId: x.drawerId,
          id: x.id,
          title: x.title,
          content: x.content,
          type: "scribble",
          stray: false,
          level: drawerToBeMovedObject[0]["level"] + 1,
        };
        fetch(`http://localhost:3000/scribbles/${x.id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataPost),
        })
          .then((response) => console.log(response.json()))
          .catch((error) => console.error(error.message));
      }
    }
    //console.log("DONE with moveChildren fx")
  };

  const parentDrawerObject = data["drawers"].filter(
    (item) => item.id == Object.values(data["drawers"]).length
  );
  //console.log("drawer length",Object.values(data["drawers"]).length)
  //console.log(parentDrawerObject[0]['level'])

  const moveDrawerToNewDrawer = (passedId) => {
    //console.log("PUT - move Drawer To New Drawer");
    const drawerToBeMovedObject = data["drawers"].filter(
      (item) => item.id == drawerToBeMoved
    );
    const parentDrawerObject = data["drawers"].filter(
      (item) => item.id == passedId
    );
    let dataPost = {
      rootId: passedId,
      userId: 1,
      drawerId: passedId,
      id: drawerToBeMovedObject[0]["id"],
      name: drawerToBeMovedObject[0]["name"],
      type: "drawer",
      ["sub-drawer"]: drawerToBeMovedObject[0]["sub-drawer"],
      root: false,
      level: 2,
    };
    ////console.log("You are in MoveDrawerToNewDrawer fx")
    //console.log("FETCH PATH",`http://localhost:3000/drawers/${drawerToBeMoved}`)
    fetch(`http://localhost:3000/drawers/${drawerToBeMoved}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.error(error.message));
  };

  const createNewDrawer = () => {
    let dataPost = {
      rootId: Object.values(data["drawers"]).length + 1,
      userId: 1,
      id: Object.values(data["drawers"]).length + 1,
      name: drawerName.toUpperCase(),
      type: "drawer",
      "sub-drawer": true,
      root: true,
      level: 1,
    };
    fetch("http://localhost:3000/drawers", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    }).then((response) => console.log(response.json()));

    //console.log("DONE with moveToNeDrawer fx")
    moveDrawerToNewDrawer(Object.values(data["drawers"]).length + 1);
    moveAllChildrenToNewDrawer(
      drawerToBeMoved,
      Object.values(data["drawers"]).length + 1
    );
  };

  const handleChange = (value) => {
    //console.log(value);
    //somehow need a spot to set this state
    // setSelectedScribbleId(state.id)
    setDrawerName(value);
  };

  const handleCreate = (value) => {
    //console.log("Create btn clicked", value);
    createNewDrawer();
    setDrawerName("");
  };

  const drawerToBeMovedObj = data["drawers"].filter(
    (item) => item.id == drawerToBeMoved
  );
  console.log("LOOK", drawerToBeMovedObj[0]["name"]);

  return (
    <div id="page">
      <h4>
        Drawer to be moved : {drawerToBeMovedObj[0]["name"]}---ID
        {drawerToBeMoved}
      </h4>
      <h4>Selected drawer Id : {selectedDrawerId}</h4>
      <div>
        <InputField
          type="text"
          name="create-new-drawer"
          id="create-new-drawer"
          placeholder="Create new TOP-level drawer"
          value={drawerName}
          handleNewDrawerChange={handleChange}
        />
        <br />
        <Button
          href={null}
          btnName="Create & Move"
          handleNewDrawerCreate={handleCreate}
          drawerName={drawerName}
        />

        <h4 className="sort-msg">Or move it to existing drawer</h4>

        <Dropdown
          data={data}
          selectedDrawerId={selectedDrawerId}
          setSelectedDrawerId={setSelectedDrawerId}
          //   onClick={()=>{setSelectedScribbleId(state.id)}}
        />
      </div>
      {/* <Button href="/sort-preview" btnName="Next" handleNewDrawerCreate={handleNext}/> */}
      <button
      className="btn btn-outline-success next-btn"
        onClick={(e) => {
          e.preventDefault();
          let passingData = { selectedDrawerId, drawerToBeMoved };
          console.log("PassingData", passingData);
          navigate("/sort-drawer-preview", { state: passingData });
        }}
      >
        Next
      </button>
      <div>
        <Icon
          icon="icon-park-outline:back"
          color="black"
          width="50"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
