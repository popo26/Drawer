import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

export default function SortPage({
  data,
  drawerName,
  setDrawerName,
  selectedScribbleId,
  setSelectedScribbleId,
  selectedDrawerId,
  setSelectedDrawerId,
}) {
  const navigate = useNavigate();
  // const [newDrawerName, setNewDrawerName] = useState("");
  // const [selectedDrawerId, setSelectedDrawerId] = useState("");
  const { state } = useLocation();
  // const [selectedScribbleId, setSelectedScribbleId] = useState("");

  //console.log("State", state);

  //To persist selected Scribble ID so browser refresh won't wipe it
  useEffect(() => {
    // const screen = document.getElementById("page");
    // screen.addEventListener("click", function () {
    //   setSelectedScribbleId(state.id);
    // });
    setSelectedScribbleId(state.id);
    setSelectedDrawerId("") //this is still bit in quesion

  }, []);

  //console.log("Sccribleid is", selectedScribbleId);

  const addScribbleToNewSubDrawer = (passedId) => {
    console.log("PUT");
    const scribbleObject = data["scribbles"].filter(
      (item) => item.id == selectedScribbleId
    );

    let dataPost = {
      rootDrawerId: passedId,
      drawerId: passedId,
      userId: 1,
      title: scribbleObject[0]["title"],
      content: scribbleObject[0]["content"],
      type: "scribble",
      id: selectedScribbleId,
      stray: false,
      level: 1,
      attachment:scribbleObject[0]["attachment"],
      files:[scribbleObject[0]["files"]]
    };
    fetch(`http://localhost:3000/scribbles/${selectedScribbleId}`, {
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
    console.log("drawer length: ", Object.values(data["drawers"]).length);
    let dataPost = {
      rootId: Object.values(data["drawers"]).length + 1,
      userId: 1,
      id: Object.values(data["drawers"]).length + 1,
      name: drawerName.toUpperCase(),
      type: "drawer",
      "sub-drawer": false,
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

    addScribbleToNewSubDrawer(Object.values(data["drawers"]).length + 1);
  };

  const handleChange = (value) => {
    console.log(value);
    //somehow need a spot to set this state
    setDrawerName(value);
  };

  const handleCreate = (value) => {
    console.log("Create btn clicked", value);
    createNewDrawer();
    setDrawerName("")
  };

  return (
    <div id="page">
      <h4>Scribble ID: {selectedScribbleId}</h4>
      <h4>Selected Drawer Id: {selectedDrawerId}</h4>
      <div>
        <InputField
          type="text"
          name="create-new-drawer"
          id="create-new-drawer"
          placeholder="Enter new drawer name"
          value={drawerName}
          handleNewDrawerChange={handleChange}
        />
        <br />
        <Button
          href={null}
          btnName="Create & Save"
          handleNewDrawerCreate={handleCreate}
          drawerName={drawerName}
          // onClick={()=>{navigate("/home")}}
        />


        <h6>Or choose from existing drawer</h6>

        <Dropdown
          data={data}
          selectedDrawerId={selectedDrawerId}
          setSelectedDrawerId={setSelectedDrawerId}
          //   onClick={()=>{setSelectedScribbleId(state.id)}}
        />
      </div>
      {/* <Button href="/sort-preview" btnName="Next" handleNewDrawerCreate={handleNext}/> */}
      <button
        onClick={(e) => {
          e.preventDefault();
          // setSelectedScribbleId(state.id)
          let passingData = { selectedScribbleId, selectedDrawerId };
          console.log("PassingData", passingData);
          navigate("/sort-preview", { state: passingData });
        }}
      >
        Next
      </button>
      <div>
        <Icon
          icon="icon-park-outline:back"
          color="black"
          width="30"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
