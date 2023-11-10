import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ScribbleListPage({ data, selectedScribbleId, setSelectedScribbleId }) {
  //   console.log(data[0]["stray"]);
  const navigate = useNavigate();

  // const [selectedScribbleId, setSelectedScribbleId] = useState("");

  const strayScribbles = data["scribbles"];

  const renderedList = strayScribbles.map(
    (item) =>
      item.stray === true && (
        <p key={item.id}>
          <Link to={`/scribble/${item.id}`}>
            ID:{item.id}, {item.title}
          </Link>{" "}
          <a
            onClick={(item) => alert(`Are you sure to delete? -ID:${item.id}`)}
          >
            <Icon icon="ion:trash-outline" color="black" width="20" />
          </a>
          <Icon
            icon="mingcute:drawer-line"
            color="black"
            width="22"
            onClick={() => {
              // setSelectedScribbleId(item.id);
              // console.log(selectedScribbleId)
              // navigate("/sort", { scribbleId: { selectedScribbleId } })}}
              //console.log(item.id)
              // navigate("/sort", { state: {selectedScribbleId} })}}
              navigate("/sort", { state: {id:item.id} })}}
          />
        </p>
      )
  );

  // const renderedList = strayScribbles.map((item) => {
  //   if (item.stray === true) {
  //     console.log(item.id)
  //     return (
  //       <p key={item.id}>
  //         <Link to={`/scribble/${item.id}`}>
  //           ID:{item.id}, {item.title}
  //         </Link>{" "}
  //         <a
  //           onClick={(item) => alert(`Are you sure to delete? -ID:${item.id}`)}
  //         >
  //           <Icon icon="ion:trash-outline" color="black" width="20" />
  //         </a>
  //         <Icon icon="mingcute:drawer-line" color="black" width="22" />
  //       </p>
  //     );
  //   }
  // });

  //  const strayScribbles = data["stray"];
  // const renderedList = strayScribbles.map((item) => (
  //   <p key={item.id}>
  //     <Link to={`/scribble/${item.id}`}>
  //       ID:{item.id}, {item.title}
  //     </Link>{" "}
  //     <a onClick={(item) => alert(`Are you sure to delete? -ID:${item.id}`)}>
  //       <Icon icon="ion:trash-outline" color="black" width="20" />
  //     </a>
  //     <Icon icon="mingcute:drawer-line" color="black" width="22" />
  //   </p>
  // ));

  return (
    <div>
      <h2>Stray scribbles</h2>
      <div>{renderedList}</div>
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
