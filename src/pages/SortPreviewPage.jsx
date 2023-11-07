import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function SortPreviewPage({ data }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  //console.log(data["drawers"]);

  const renderedList = data["drawers"]
    .filter((item) => item.id == state.selectedDrawerId)
    .map((item) => item.name);

  //   const renderedList = data["drawers"]
  //     .filter((item) => item.id == state.selectedDrawerId)
  //     .map((item) => {
  //       return item["sub-drawer"] === true
  //         ? data["drawers"].map((sub) => sub.drawerId == item.id)
  //         : data["scriblles"].map((scrb) => scrb.drawerId == item.id);
  //     });

  return (
    <div>
      <p>Sort Preview - Selected Drawer ID: {state.selectedDrawerId}</p>
      {renderedList}
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
