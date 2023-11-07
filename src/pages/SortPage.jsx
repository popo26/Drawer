import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

export default function SortPage({ data }) {
  const navigate = useNavigate();
  const [newDrawerName, setNewDrawerName] = useState("");
  const [selectedDrawerId, setSelectedDrawerId] = useState("");


  //   const handleMenuOne = () => {
  //     // do something
  //     console.log('clicked one');
  //   };

  //   const handleMenuTwo = () => {
  //     // do something
  //     console.log('clicked 2');
  //   };

  const handleChange = (value) => {
    console.log(value);
    setNewDrawerName(value);
  };

  return (
    <div>
      <div>
        <InputField
          type="text"
          name="create-new-drawer"
          id="create-new-drawer"
          placeholder="Enter new drawer name"
          value={newDrawerName}
          handleNewDrawerChange={handleChange}
        />

        <h6>Or choose from existing drawer</h6>

        <Dropdown data={data} selectedDrawerId={selectedDrawerId} setSelectedDrawerId={setSelectedDrawerId}/>

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
      <button onClick={() => navigate("/sort-preview", {state:{selectedDrawerId}} )}>Next</button>
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
