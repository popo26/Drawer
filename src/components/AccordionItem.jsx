import { TbTriangleInverted } from "react-icons/tb";

export default function AccordionItem({ name, content, expandedIndex }) {

    let isExpanded = expandedIndex === -1;
  const triangle = <span>
    {<TbTriangleInverted />}</span>;

  return (
    <div>
      <div>
        <div>{name} {triangle}</div>
      </div>
      <div>
        {isExpanded ? <div>{content}</div> : <div>Sample scribble</div>}
      </div>
    </div>
  );
}
