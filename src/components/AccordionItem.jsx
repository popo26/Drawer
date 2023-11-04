import { GoTriangleLeft, GoTriangleDown } from "react-icons/go";
import "../css/AccordionItem.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AccordionItem({ name, content, id, expandedIndex, isExpanded, handleExpanded, triangle }) {
//  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    handleExpanded(id)
  };

  // const triangle = (
  //   <span id={id} onClick={handleClick}>
  //     {isExpanded ? <GoTriangleLeft /> : <GoTriangleDown />}
  //   </span>
  // );

  return (
    <div className="AccordionItem"  onClick={handleClick}>
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
          {name} {triangle}
        </div>
      </div>
      <div>
        {isExpanded ? <div>{content}</div> : <div>Sample scribble</div>}
      </div>
    </div>
  );
}
