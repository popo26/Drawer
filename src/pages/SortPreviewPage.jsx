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

  console.log("State", state);

  const addToNewSubDrawer = (passedId) => {
    console.log("PUT")
    console.log("scribble length: ", Object.values(data["scribbles"]).length);
    let dataPost = {
      drawerId: passedId,
      id: state.selectedScribbleId,
      stray: false,
    };
    fetch("http://localhost:3000/scribbles", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => console.log(response.json()))
    //   .then(addToNewSubDrawer(Object.values(data["drawers"]).length + 1)
    //   )
      .catch((error) => console.error(error.message));
  };

  const createNewSubDrawer = () => {
    console.log("POST")
    console.log("drawer length: ", Object.values(data["drawers"]).length);
    let dataPost = {
      userId: 1,
      id: Object.values(data["drawers"]).length + 1,
      name: newSubDrawerName,
      type: "drawer",
      "sub-drawer": false,
      drawerId: state.selectedDrawerId,
    };
    fetch("http://localhost:3000/drawers", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.error(error.message));

    // addToNewSubDrawer(Object.values(data["drawers"]).length + 1);
  };

  const handleChange = (value) => {
    console.log(value);
    setNewSubDrawerName(value);
  };

  const handleCreate = (value) => {
    console.log("Create btn clicked", value);
    createNewSubDrawer();
    // addToNewSubDrawer(Object.values(data["drawers"]).length + 1);

  };

  const renderedList = data["drawers"]
    .filter((item) => item.id == state.selectedDrawerId)
    // .filter((item) => item.id == state.passingData.selectedDrawerId)

    .map((item) => (
      <h4 className="sort-preview-drawer" key={item.id}>
        {item.name}
      </h4>
    ));

  const FindSubDrawers = () => {
    const x = data["drawers"].filter(
      (item) => item.id == state.selectedDrawerId
    // (item) => item.id == state.passingData.selectedDrawerId

    );
    //console.log(x);
    const renderedChildren =
      x[0]["sub-drawer"] === true
        ? data["drawers"]
            .filter((sub) => sub.drawerId == x[0].id)
            .map((sub) => (
              <p key={sub.id} className="sort-preview-sub-drawers">
                ID:{sub.id}:{sub.name}
                <span>-- [Sub-Drawer]</span>
              </p>
            ))
        : data["scribbles"]
            .filter((scrb) => scrb.drawerId == x[0].id)
            .map((scrb) => (
              <p key={scrb.id} className="sort-preview-scribbles">
                ID:{scrb.id}:{scrb.title}
                <span>-- [scribble]</span>
              </p>
            ));

    // const renderedChildren = () => {
    //     console.log("X subdrawer", x[0]['sub-drawer'])
    //   if (x[0]['sub-drawer'] === true) {
    //     for (let y in data["drawers"]) {
    //       if (data["drawers"][y].drawerId == x[0].id) {
    //         console.log(data["drawers"][y]);
    //       }
    //     }
    //   } else {
    //     for (let z in data["scribbles"]) {
    //       if (data["scribbles"][z].drawerId == x[0].id) {
    //         console.log(data["scribbles"][z]);
    //       }
    //     }
    //   }
    // };
    // renderedChildren()

    return renderedChildren;
  };

  return (
    <div>
      <p>Sort Preview - Selected Drawer ID: {state.selectedDrawerId}</p>
      <p>Scribble ID: {state.selectedScribbleId}</p>

      {/* <p>Sort Preview - Selected Drawer ID: {state.passingData.selectedDrawerId}</p> */}

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
