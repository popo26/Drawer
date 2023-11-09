import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

export default function SortPage({ data }) {
  const navigate = useNavigate();
  const [newDrawerName, setNewDrawerName] = useState("");
  const [selectedDrawerId, setSelectedDrawerId] = useState("");
  const { state } = useLocation();
  const [selectedScribbleId, setSelectedScribbleId] = useState("");

  // console.log("scribble ID",state.id);
  //   const scribbleId = state.id
  // console.log("Scribble state", state.id)
  // const passingData = {selectedDrawerId:selectedDrawerId}
  // let passingData = {...state, selectedDrawerId}
  // console.log("PassingData",passingData)

  //   window.onload = () => {
  //     setSelectedScribbleId(state.id);
  //   };

  console.log("State", state);

  //Need to set state.id somewhere then chose screen click
  useEffect(() => {
    const screen = document.getElementById("page");
    screen.addEventListener("click", function () {
      setSelectedScribbleId(state.id);
    });
  }, []);

  console.log("Sccribleid is", selectedScribbleId);
  // console.log("root ID",Object.values(data["drawers"])[state.selectedDrawerId]['rootId'])

  // console.log(selectedScribbleId)

  //   const handleMenuOne = () => {
  //     // do something
  //     console.log('clicked one');
  //   };

  //   const handleMenuTwo = () => {
  //     // do something
  //     console.log('clicked 2');
  //   };

  //need revise
  const createNewDrawer = () => {
    console.log("drawer length: ", Object.values(data["drawers"]).length);
    let dataPost = {
      userId: 1,
      id: Object.values(data["drawers"]).length + 1,
      name: drawerName,
      type: "drawer",
      "sub-drawer": false,
    };
    fetch("http://localhost:3000/drawers", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    }).then((response) => console.log(response.json()));
  };

  const handleChange = (value) => {
    console.log(value);
    //somehow need a spot to set this state
    // setSelectedScribbleId(state.id)
    setNewDrawerName(value);
  };

  const handleCreate = (value) => {
    console.log("Create btn clicked", value);
    createNewDrawer();
  };

  return (
    <div id="page">
      <div>
        <InputField
          type="text"
          name="create-new-drawer"
          id="create-new-drawer"
          placeholder="Enter new drawer name"
          value={newDrawerName}
          handleNewDrawerChange={handleChange}
        />
        <br />
        <Button
          href={null}
          btnName="Create & Save"
          handleNewDrawerCreate={handleCreate}
          drawerName={newDrawerName}
        />

        <h6>Or choose from existing drawer</h6>

        <Dropdown
          data={data}
          selectedDrawerId={selectedDrawerId}
          setSelectedDrawerId={setSelectedDrawerId}
          //   onClick={()=>{setSelectedScribbleId(state.id)}}
        />

        {/* <Dropdown
          //   open={open}
          trigger={<button>Dropdown</button>}
          menu={[
            <button onClick={handleMenuOne}>Menu 1</button>,
            <button onClick={handleMenuTwo}>Menu 2</button>,
          ]}
        /> */}
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
