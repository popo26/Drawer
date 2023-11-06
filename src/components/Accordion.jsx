import AccordionItem from "./AccordionItem";
import "../css/Accordion.css";
import { GoTriangleLeft, GoTriangleDown } from "react-icons/go";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Accordion({
  expandedIndex,
  data,
  setExpandedIndex,
  handleExpand,
}) {
  // const findScribbles = (array, scribbles) => {
  //   let scribbleArray = [];
  //   const scbs = Object.values(scribbles);
  //   //console.log(scribbles)
  //   for (let x in scbs) {
  //     // console.log(scbs[x].drawerId)
  //     for (let y in array) {
  //       if (scbs[x].drawerId == array[y].id) {
  //         //console.log("Scribble ID, ", scbs[x].id)
  //         //console.log(scbs[x])
  //         scribbleArray.push(scbs[x]);
  //       }
  //     }
  //   }

  //   return scribbleArray.map(item => <a key={item.id}><h5>{item.title} </h5></a>);
  // };

  // ++++++++++++++ Find Scribbles +++++++++++++++++++++++++++++++++++++++++++++
  const findScribbles = (id, scribbles) => {
    let scribbleArray = [];
    const scbs = Object.values(scribbles);
    //console.log(scribbles)
    for (let x in scbs) {
      if (scbs[x].drawerId == id) {
        //console.log("Scribble ID, ", scbs[x].id)
        //console.log(scbs[x])
        scribbleArray.push(scbs[x]);
      }
    }
    return scribbleArray.map((item) => (
      <a key={item.id}>
        <h5>{item.title} </h5>
      </a>
    ));
  };

  // ++++++++++++++ Find Sub Drawers +++++++++++++++++++++++++++++++++++++++++++++
  const findSubDrawers = (id, array) => {
    let newArray = [];
    let values = Object.values(array);
    for (let x in values) {
      for (let y in values[x]) {
        if (values[x][y].drawerId) {
          //console.log("DrawerId: ", values[x][y].drawerId);
          //console.log("ID: ", values[x][y].id);
          newArray.push(values[x][y]);
        }
      }
    }
    return newArray.map((item) => {
      const scribbleList = findScribbles(item.id, data["scribbles"]);
      return (
        <div key={item.id}>
          <p>{item.name}</p>
          {scribbleList.length === 0 ? (
            <h6>No Scribbles</h6>
          ) : (
            <div>{scribbleList}</div>
          )}
        </div>
      );
    });
  };

  // ++++++++++++++ Render Whole List +++++++++++++++++++++++++++++++++++++++++++++
  const renderedList = data["drawers"].map((item) => {
    if (!item.drawerId) {
      const isExpanded = item.id === expandedIndex;

      const triangle = (
        <span> {isExpanded ? <GoTriangleDown /> : <GoTriangleLeft />}</span>
      );

      return (
        <div
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
                <div>{findSubDrawers(item.id, Array(data.drawers))} </div>
              ) : (
                <>{findScribbles(item.id, data.scribbles)}</>
              )
            ) : null}
          </div>
        </div>

        //   <AccordionItem
        //   key={item.id}
        //   id={item.id}
        //   name={item.name}
        //   content={item.content}
        //   expandedIndex={expandedIndex}
        //   triangle={triangle}
        //   handleExpanded={handleExpanded}
        // />
      );
    }
  });

  return <div className="Accordion">{renderedList}</div>;
}
