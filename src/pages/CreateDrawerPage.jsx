import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../css/CreateDrawerPage.css";

export default function CreateDrawerPage() {
  const [drawerName, setDrawerName] = useState("");

  const handleChange =(e)=>{
    console.log(e.target.value);
  }

  const handleCreate =(e) => {
    e.preventDefault();
    console.log("Create btn clicked")
  }

  return (
    <div className="CreateDrawerPage">
      <form>
        <InputField
          htmlFor="new-drawer"
          name="new-drawer"
          id="new-drawer"
          placeholder="New Drawer Name"
          value={drawerName}
          onChange={handleChange}
        /><br/>
        <Button href={null} btnName="Create" onClick={handleCreate}/><br/>
        <Button href={null} btnName="Cancel"/>

      </form>
    </div>
  );
}
