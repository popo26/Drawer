import { useState } from "react";
import "../css/Dropdown.css";
import { Icon } from "@iconify/react";

export default function Dropdown({
  data,
  selectedDrawerId,
  setSelectedDrawerId,
}) {
  const [open, setOpen] = useState(false);
  const [currentDropdown, setCurrentDropDown] = useState("Existing Drawers");

  const handleOpen = () => {
    setOpen(!open);
  };

  // const existingDrawersList = data["drawers"].map((item) => {
  //   return item["drawerId"] ? (
  //     <li
  //       key={item.id}
  //       onClick={() => {
  //         setCurrentDropDown(item.name);
  //         setSelectedDrawerId(item.id);
  //         console.log("SelectedId", item.id);
  //       }}
  //       className={"indent-" + item.level}
  //     >
  //       <a className="dropdown-item" href="#">
  //         {item.name}
  //       </a>
  //     </li>
  //   ) : (
  //     <li
  //       key={item.id}
  //       onClick={() => {
  //         setCurrentDropDown(item.name);
  //         setSelectedDrawerId(item.id);
  //         console.log("SelectedId", item.id);
  //       }}
  //     >
  //       <a className="dropdown-item" href="#">
  //         {item.name}
  //       </a>
  //     </li>
  //   );
  // });

  //TRY2
  // ++++++++++++++ Find Sub Drawers +++++++++++++++++++++++++++++++++++++++++++++
  const findSubDrawers = (id, array) => {
    let newArray = [];
    let values = Object.values(array);

    for (let x in values) {
      for (let y in values[x]) {
        if (values[x][y].drawerId && values[x][y].rootId == id) {
          newArray.push(values[x][y]);
        }
      }
      return newArray.map((item) => {
        return (
            <p 
            className={"sub-drawer indent-" + item.level}
            style={{cursor:"pointer"}}
            key={item.id}
            onClick={() => {
              setCurrentDropDown(item.name);
              setSelectedDrawerId(item.id);
            }}
            >{item.name}</p>
        );
      });
    }
  };

  const existingDrawersList = data["drawers"].map((item) => {
    if (item.root === true) {
      return (
        <>
        <div 
        key={item.id}
        onClick={() => {
          setCurrentDropDown(item.name);
          setSelectedDrawerId(item.id);
        }}
        >
          <p style={{cursor:"pointer"}}>{item.name}</p>
          </div>
          <div>
          {item["sub-drawer"] === true ? (
              <>{findSubDrawers(item.id, Array(data["drawers"]))} </>
          ) : null}
        </div>
        </>
      );
    }
  });

  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={handleOpen}
        >
          {currentDropdown}
        </button>
        {/* <ul className="dropdown-menu">{existingDrawersList}</ul> */}
        <div className="dropdown-menu">{existingDrawersList}</div>

      </div>
    </div>
  );
}
