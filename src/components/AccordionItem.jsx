import { GoTriangleLeft, GoTriangleDown } from "react-icons/go";
import "../css/AccordionItem.css";
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom';


export default function AccordionItem({ name, content, expandedIndex }) {

    let isExpanded = expandedIndex === -1;
  const triangle = <span>{<GoTriangleLeft />}</span>;

  return (
    <div className="AccordionItem">
      <div>
        <div><Link to="/drawer-list"><Icon icon="mingcute:drawer-line" color="black" width="30" height="30" /></Link>{name} {triangle}</div>
      </div>
      <div>
        {isExpanded ? <div>{content}</div> : <div>Sample scribble</div>}
      </div>
    </div>
  );
}
