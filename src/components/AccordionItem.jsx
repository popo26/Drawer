import { GoTriangleLeft, GoTriangleDown } from "react-icons/go";
import "../css/AccordionItem.css";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";

export default function AccordionItem({
  isExpanded,
  handleExpand,
  triangle,
  findSubDrawers,
  findScribbles,
  item,
}) {
  const navigate = useNavigate();
  const data = useDataContext();

  return (
    <>
      {/* React-Bootstrap - I dont like it */}
      {/* <Accordion>
        <Accordion.Item
          eventKey="0"
          className="AccordionItem"
          key={item.id}
          onClick={() => {
            console.log("Itemmmm id", item.id);
            handleExpand(item.id);
          }}
        >
          <Accordion.Header className="accordion-header">
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
          </Accordion.Header>
          <Accordion.Body>
            {isExpanded ? (
              item["sub-drawer"] === true ? (
                <div>
                  <div className="no-subfolder">
                    {findScribbles(item.id, data["scribbles"])}
                  </div>
                  <div>{findSubDrawers(item.id, Array(data["drawers"]))}</div>
                </div>
              ) : (
                <div>{findScribbles(item.id, data["scribbles"])}</div>
              )
            ) : null}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}

      {/* NEED TO CHECK BEHAVIOUR - OPEN&CLOSE */}
      <div
        className="AccordionItem"
        key={item.id}
        onClick={() => {
          console.log("Itemmmm id", item.id);
          handleExpand(item.id);
        }}
      >
        <div>
          <div className="accordion-header">
            <h1>
              {item.name} {triangle}
            </h1>
            <div style={{ position: "absolute", right: 60 }}>
              <Link to={`/drawer-list/${item.id}`}>
                <Icon
                  icon="mingcute:drawer-line"
                  color="black"
                  width="30"
                  height="30"
                />
              </Link>
            </div>
          </div>
        </div>
        <div>
          {isExpanded ? (
            item["sub-drawer"] === true ? (
              <div>
                <div className="no-subfolder">
                  {findScribbles(item.id, data["scribbles"])}
                </div>
                <div>{findSubDrawers(item.id, Array(data["drawers"]))}</div>
              </div>
            ) : (
              <div>{findScribbles(item.id, data["scribbles"])}</div>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
