import Accordion from "../components/Accordion";
import Button from "../components/Button";

export default function HomePage({expandedIndex, data}) {
  return (
    <div>
      <Accordion expandedIndex={expandedIndex} data={data}/>
      <Button btnName="Create New Drawer" href="/create"/>
    </div>
  );
}
