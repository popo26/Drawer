import { GoTriangleLeft, GoTriangleDown } from "react-icons/go";
import "../css/AccordionItem.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AccordionItem({
  name,
  content,
  id,
  expandedIndex,
  isExpanded,
  handleExpand,
  triangle,
  findSubDrawers,
  findScribbles,
  data,
  item,
}) {
  return (
    <div
      className="AccordionItem"
      key={item.id}
      onClick={() => {
        handleExpand(item.id);
      }}
    >
      <div>
        <div>
          <Link to="/drawer-list">
            <Icon
              icon="mingcute:drawer-line"
              color="black"
              width="30"
              height="30"
            />
          </Link>
          {item.name} {triangle}
        </div>
      </div>
      <div>
        {isExpanded ? (
          item["sub-drawer"] === true ? (
            <div>{findSubDrawers(item.id, Array(data["drawers"]))} </div>
          ) : (
            <>{findScribbles(item.id, data["scribbles"])}</>
          )
        ) : null}
      </div>
    </div>
  );
}
