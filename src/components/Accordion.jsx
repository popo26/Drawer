import AccordionItem from "./AccordionItem";
import "../css/Accordion.css";

export default function Accordion({ expandedIndex, data }) {
  const renderedList = data['non-stray'].map((item) => (
    <AccordionItem 
    key={item.id} 
    name={item.name} 
    content={item.content} 
    expandedIndex={expandedIndex}
    />
  ));

  return <div className="Accordion">{renderedList}</div>;
}
