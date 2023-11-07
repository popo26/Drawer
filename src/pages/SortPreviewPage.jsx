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

  const FindSubDrawers = () => {
    const x = data["drawers"].filter(
      (item) => item.id == state.selectedDrawerId
    );
    //console.log(x);
    const renderedChildren =
     x[0]['sub-drawer']===true
        ? data["drawers"]
            .filter((sub) => sub.drawerId == x[0].id)
            .map((sub) => (
              <p key={sub.id}>
                ID:{sub.id}:{sub.name}
              </p>
            ))
        : data["scribbles"]
            .filter((scrb) => scrb.drawerId == x[0].id)
            .map((scrb) => (
              <p key={scrb.id}>
                ID:{scrb.id}:{scrb.title}
              </p>
            ));

    // const renderedChildren = () => {
    //     console.log("X subdrawer", x[0]['sub-drawer'])
    //   if (x[0]['sub-drawer'] === true) {
    //     for (let y in data["drawers"]) {
    //       if (data["drawers"][y].drawerId == x[0].id) {
    //         console.log(data["drawers"][y]);
    //       }
    //     }
    //   } else {
    //     for (let z in data["scribbles"]) {
    //       if (data["scribbles"][z].drawerId == x[0].id) {
    //         console.log(data["scribbles"][z]);
    //       }
    //     }
    //   }
    // };
    // renderedChildren()

    return renderedChildren;
  };

  return (
    <div>
      <p>Sort Preview - Selected Drawer ID: {state.selectedDrawerId}</p>
      <div>{renderedList}</div>
      {/* <div>{findSubDrawers()}</div> */}
      <FindSubDrawers />

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
