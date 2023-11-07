import { useState, cloneElement } from "react";
import "../css/Dropdown.css";

// export default function Dropdown({ trigger, menu }) {
export default function Dropdown({ data, selectedDrawerId, setSelectedDrawerId }) {
  const [open, setOpen] = useState(false);
  const [currentDropdown, setCurrentDropDown] = useState("Existing Drawers");
  // const [selectedDrawerId, setSelectedDrawerId] = useState("");

  const handleOpen = () => {
    setOpen(!open);
  };

  const existingDrawersList = data["drawers"].map((item) => {
    return item["drawerId"] ? (
      <li
        key={item.id}
        onClick={() => {
          setCurrentDropDown(item.name);
          setSelectedDrawerId(item.id);
          console.log("SelectedId", item.id)

        }}
        className="indent"
      >
        <a className="dropdown-item" href="#">
          {item.name}
        </a>
      </li>
    ) : (
      <li
        key={item.id}
        onClick={() => {
          setCurrentDropDown(item.name);
          setSelectedDrawerId(item.id);
          console.log("SelectedId", item.id)
        }}
      >
        <a className="dropdown-item" href="#">
          {item.name}
        </a>
      </li>
    );
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
        <ul className="dropdown-menu">{existingDrawersList}</ul>
      </div>

      {/* experiment wiht blog */}
      {/* {cloneElement(trigger, {
        onClick:handleOpen,
      })}
      {open ? (
        <ul>
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null} */}
    </div>
  );
}
