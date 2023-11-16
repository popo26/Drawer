import Accordion from "../components/Accordion";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function HomePage({expandedIndex, data, handleExpand}) {
  return (
    <div>
      <Accordion expandedIndex={expandedIndex} handleExpand={handleExpand} data={data}/>
      {/* <Button btnName="Create New Drawer" href="/create"/> */}
      <Link to="/create" className="btn btn-dark btn-lg">Create New Drawer</Link>
    </div>
  );
}
