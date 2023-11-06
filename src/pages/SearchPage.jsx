import Search from "../components/Search";
import "../css/SearchPage.css";

export default function SearchPage({data}) {
  return (
    <div className="SearchPage">
      <Search data={data}/>
    </div>
  );
}
