import Button from "../components/Button";
import "../css/ScribblePage.css";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";

export default function ScribblePage() {
  const navigate = useNavigate();
  return (
    <div className="ScribblePage">
      <div>
        <Icon
          icon="ic:outline-attachment"
          color="black"
          width="36"
          
        />
        <Link to="/sort">
          <Icon
            icon="mingcute:drawer-line"
            color="black"
            width="30"
            height="30"
          />
        </Link>
      </div>
      <textarea>Scribble here</textarea>
      <br />
      <Button href="#" btnName="Just Save" color="yellow" />

      <div>
        {" "}
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
