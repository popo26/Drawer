import AccordionItem from "./AccordionItem";
import "../css/Accordion.css";
import { GoTriangleLeft, GoTriangleDown } from "react-icons/go";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";


export default function Accordion({ expandedIndex, data, setExpandedIndex, handleExpand }) {
  // const [isExpanded, setIsExpanded] = useState(false);

  // const handleExpanded = (id) => {
  //   // expandedIndex === id;
  //   setExpandedIndex(id)
  // };

  const renderedList = data["non-stray"].map((item) => {
    const isExpanded = item.id === expandedIndex;

    const triangle = (
      <span> {isExpanded ? <GoTriangleLeft /> : <GoTriangleDown />}</span>
    );

    return(
    <div  key={item.id}  onClick={() => {
      handleExpand(item.id);
    }}>
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
      {isExpanded ? <div>{item.name}</div> : <div>{item.content}</div>}
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

    )


  });

  return <div className="Accordion">{renderedList}</div>;
}
