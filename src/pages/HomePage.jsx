import MyAccordion from "../components/MyAccordion";
import MyButton from "../components/MyButton";
import { Link } from "react-router-dom";

export default function HomePage({expandedIndex, data, handleExpand}) {
  return (
    <div>
      <MyAccordion expandedIndex={expandedIndex} handleExpand={handleExpand} data={data}/>
      {/* <MyButton btnName="Create New Drawer" href="/create"/> */}
      <Link to="/create" className="btn btn-dark btn-lg">Create New Drawer</Link>
    </div>
  );
}
