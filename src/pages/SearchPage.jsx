import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import "../css/SearchPage.css";
import { Icon } from "@iconify/react";


export default function SearchPage({data}) {

  const navigate = useNavigate();
  
  return (
    <div className="SearchPage">
      <Search data={data}/>

      <div>
      <Icon
          icon="icon-park-outline:back"
          color="black"
          width="30"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
