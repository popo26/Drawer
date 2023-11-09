import { GoTriangleLeft, GoTriangleDown } from "react-icons/go";
import "../css/AccordionItem.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AccordionItem({
  isExpanded,
  handleExpand,
  triangle,
  findSubDrawers,
  findScribbles,
  data,
  item,
}) {

  // const r = `/drawer-list/${item.id}`

//console.log("Accordion Item", item.id)

  return (
    <div
      className="AccordionItem"
      key={item.id}
      onClick={() => {
        handleExpand(item.id);
      }}
    >
      <div>
        <div className="accordion-header">
            <Link to={`/drawer-list/${item.id}`}>
              <Icon
                icon="mingcute:drawer-line"
                color="black"
                width="30"
                height="30"
              />
            </Link>
            <h1>
              {item.name} {triangle}
            </h1>
        </div>
      </div>

      <div>
        {isExpanded ? (
          item["sub-drawer"] === true ? (
            <div >
              <div className="no-subfolder">
              {findScribbles(item.id, data["scribbles"])}
              </div>
              <div>
              {findSubDrawers(item.id, Array(data["drawers"]))} 
              </div>
            </div>
          ) : (
            <div>{findScribbles(item.id, data["scribbles"])}</div>
          )
        ) : null}
      </div>


      {/* <div>
        {isExpanded ? (
          item["sub-drawer"] === true ? (
            <div >{findSubDrawers(item.id, Array(data["drawers"]))} </div>
          ) : (
            <>{findScribbles(item.id, data["scribbles"])}</>
          )
        ) : null}
      </div> */}
    </div>
  );
}
