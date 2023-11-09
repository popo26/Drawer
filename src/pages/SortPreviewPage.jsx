import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import { useState } from "react";
import "../css/SortPreviewPage.css";
import Button from "../components/Button";

export default function SortPreviewPage({ data }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [newSubDrawerName, setNewSubDrawerName] = useState("");

  console.log("State", state.selectedDrawerId);
  console.log("RootId",Object.values(data["drawers"]))
  // console.log("Selected one",Object.values(data["drawers"])["id"] = state.selectedDrawerId)
  // console.log("Selected ID",state.selectedDrawerId)
  const u = data['drawers'].filter((item)=> item.id == state.selectedDrawerId)
  console.log("U id", u[0]['rootId'])
  console.log("length", u.length)

  const updateParentDrawerBoolean = (parentDrawerId) => {
    console.log("PUT2");
    let dataPost;
    const x = data["drawers"].filter((item) => item.id == parentDrawerId);
    //Something wrong with here
    // console.log("x[0][drawerId]", x[0]["drawerId"]);
    if (x[0]["drawerId"]) {
      dataPost = {
        rootId: parentDrawerId,
        drawerId: x[0]["drawerId"],
        userId: 1,
        name: "Bagger",
        type: "drawer",
        ["sub-drawer"]: true,
        // level:Object.values(data["drawers"])[parentDrawerId]["level"],
        // root:Object.values(data["drawers"])[parentDrawerId]["root"]
        level:x[0]["level"],
        root:x[0]["root"]
      };
    } else {
      dataPost = {
        rootId: parentDrawerId,
        userId: 1,
        name: "Bomb",
        type: "drawer",
        ["sub-drawer"]: true,
        level:1,
        root:true
      };
    }

    fetch(`http://localhost:3000/drawers/${parentDrawerId}`, {
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

  const addScribbleToNewSubDrawer = (passedId) => {
    console.log("PUT");
    const parentDrawerObject = data["drawers"].filter((item) => item.id == state.selectedDrawerId);
    //console.log("scribble length: ", Object.values(data["scribbles"]).length);
    let dataPost = {
      //   drawerId: Object.values(data["drawers"]).length + 1,
      drawerId: passedId,
      userId: 1,
      title: "HARD CODED",
      content: "HTTP//:HARDCODED",
      type: "scribble",
      id: state.selectedScribbleId,
      stray: false,
      level:parentDrawerObject[0]["level"]+1,
    };
    fetch(`http://localhost:3000/scribbles/${state.selectedScribbleId}`, {
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

 


  const createNewSubDrawer = () => {
    console.log("POST");
    const selectedDrawerObject = data['drawers'].filter((item)=> item.id == state.selectedDrawerId);

    let dataPost = {
      rootId: selectedDrawerObject[0]['rootId'],
      // rootId: data["drawers"][state.selectedDrawerId]["rootId"],
      userId: 1,
      id: Object.values(data["drawers"]).length + 1,
      name: newSubDrawerName,
      type: "drawer",
      "sub-drawer": false,
      drawerId: state.selectedDrawerId,
      root: false,
      // level:Object.values(data["drawers"])[state.selectedDrawerId]["level"],
      level:selectedDrawerObject[0]['level']+1
    };
    fetch("http://localhost:3000/drawers", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => {
        console.log(response.json());
      })
      .catch((error) => console.error(error.message));

    addScribbleToNewSubDrawer(Object.values(data["drawers"]).length+1);
    updateParentDrawerBoolean(state.selectedDrawerId);
  };

  const handleChange = (value) => {
    setNewSubDrawerName(value);
  };

  const handleCreate = (value) => {
    createNewSubDrawer();
  };

  const renderedList = data["drawers"]
    .filter((item) => item.id == state.selectedDrawerId)
    .map((item) => (
      <h4 className="sort-preview-drawer" key={item.id}>
        {item.name}
      </h4>
    ));

  const scribblies = (x) => {
    return data["scribbles"]
      .filter((scrb) => scrb.drawerId == x[0].id)
      .map((scrb) => (
        <p
          key={scrb.id}
          className={"sort-preview-scribbles scrb-indent" + scrb.level}
        >
          ID:{scrb.id}:{scrb.title}
          <span>-- [scribble]</span>
        </p>
      ));
  };

  const subDrawers = (x) => {
    return data["drawers"]
      .filter((sub) => sub.drawerId == x[0].id)
      .map((sub) => (
        <p
          key={sub.id}
          className={"sort-preview-sub-drawers indent-" + sub.level}
        >
          ID:{sub.id}:{sub.name}
          <span>-- [Sub-Drawer]</span>
        </p>
      ));
  };

  const FindSubDrawers = () => {
    const x = data["drawers"].filter(
      (item) => item.id == state.selectedDrawerId
    );
    const renderedChildren =
      x[0]["sub-drawer"] === true ? (
        <>
          {scribblies(x)}
          {subDrawers(x)}
        </>
      ) : (
        <>{scribblies(x)}</>
      );

    return renderedChildren;
  };

  return (
    <div>
      <p>Sort Preview - Selected Drawer ID: {state.selectedDrawerId}</p>
      <p>Scribble ID: {state.selectedScribbleId}</p>

      <div>{renderedList}</div>
      {/* <div>{findSubDrawers()}</div> */}
      <FindSubDrawers />

      <div>
        <button>Save Here</button>
        <h6>Or create new sub-drawer</h6>
        <InputField
          type="text"
          name="create-new-sub-drawer"
          id="create-new-sub-drawer"
          placeholder="New sub drawer name"
          value={newSubDrawerName}
          handleNewDrawerChange={handleChange}
        />
        <br />
        <Button
          href={null}
          btnName="Create & Save"
          handleNewDrawerCreate={handleCreate}
          drawerName={newSubDrawerName}
        />
      </div>
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
