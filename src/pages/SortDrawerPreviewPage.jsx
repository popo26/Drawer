import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import { useState } from "react";
import "../css/SortPreviewPage.css";
import Button from "../components/Button";

export default function SortDrawerPreviewPage({
  data,
  selectedScribbleId,
  setSelectedScribbleId,
  selectedDrawerId,
  setSelectedDrawerId,
  drawerToBeMoved,
  setDrawerToBeMoved,
}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [newSubDrawerName, setNewSubDrawerName] = useState("");

  console.log("State", state);


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
        // name: "Bagger",
        // type: "drawer",
        name: x[0]["name"],
        type: "drawer",
        ["sub-drawer"]: true,
        // level:Object.values(data["drawers"])[parentDrawerId]["level"],
        // root:Object.values(data["drawers"])[parentDrawerId]["root"]
        level: x[0]["level"],
        root: x[0]["root"],
      };
    } else {
      dataPost = {
        rootId: parentDrawerId,
        userId: 1,
        // name: "Bomb",
        name: x[0]["name"],
        type: "drawer",
        ["sub-drawer"]: true,
        level: 1,
        root: true,
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



  const handleMoveHere = () => {
    // const selectedDrawerObject = data["drawers"].filter(
    //   (item) => item.id == state.selectedDrawerId
    // );
    // addScribbleToNewSubDrawer(state.selectedDrawerId, selectedDrawerObject[0]['level'])
    moveDrawerToNewDrawer(selectedDrawerId);
    moveAllChildrenToNewDrawer(drawerToBeMoved, selectedDrawerId);
    updateParentDrawerBoolean(selectedDrawerId);
  };

  //   const handleChange = (value) => {
  //     setNewSubDrawerName(value);
  //   };

  //   const handleCreate = (value) => {
  //     createNewSubDrawer();
  //   };

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

  const drawerToBeMovedObj = data["drawers"].filter(
    (item) => item.id == drawerToBeMoved
  );
  console.log("LOOK", drawerToBeMovedObj[0]["name"]);
  const destinationObj = data["drawers"].filter(
    (item) => item.id == selectedDrawerId
  );
  console.log("LOOK", destinationObj[0]["name"]);


  return (
    <div>
      <h3>Drawer to be moved: {drawerToBeMovedObj[0]["name"]}---ID {drawerToBeMoved}</h3>
      <p>To: {selectedDrawerId}</p>

      <div>{renderedList}</div>
      {/* <div>{findSubDrawers()}</div> */}
      <FindSubDrawers />

      <div>
        <button onClick={handleMoveHere}>Move Here</button>
        {/* <h6>Or create new sub-drawer</h6>
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
          btnName="Create & Move"
          handleNewDrawerCreate={handleCreate}
          drawerName={newSubDrawerName}
        /> */}
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
