import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../css/CreateDrawerPage.css";

export default function CreateDrawerPage({data}) {
  const [drawerName, setDrawerName] = useState("");

  //working! POST
  const createNewDrawer = () => {
    console.log("drawer length: ", Object.values(data['drawers']).length)
    let dataPost = {
      "userId": 1,
      "id":Object.values(data['drawers']).length + 1,
      "name": drawerName,
      "type": "drawer",
      "sub-drawer": false
    }
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
    setDrawerName(value);
  };

  const handleCreate = (value) => {
    console.log("Create btn clicked", value);
    createNewDrawer();
  };

  return (
    <div className="CreateDrawerPage">
      <form>
        <InputField
          htmlFor="new-drawer"
          name="new-drawer"
          id="new-drawer"
          placeholder="New Drawer Name"
          type="text"
          value={drawerName}
          // onChange={handleChange}
          handleNewDrawerChange={handleChange}
        />
        <br />
        <Button
          href={null}
          btnName="Create"
          handleNewDrawerCreate={handleCreate}
          drawerName={drawerName}
        />
        <br />
        <Button href={null} btnName="Cancel" />
      </form>
    </div>
  );
}
