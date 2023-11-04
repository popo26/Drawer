import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function ScribbleListPage({ data }) {


  //   console.log(data[0]["stray"]);
  const strayScribbles = data["stray"];
  const renderedList = strayScribbles.map((item) => (
    <p key={item.id}>
      <Link to={null}>
        ID:{item.id}, {item.title}
      </Link>{" "}
      <a onClick={(item) => alert(`Are you sure to delete? -ID:${item.id}`)}>
        <Icon icon="ion:trash-outline" color="black" width="20" />
      </a>
      <Icon icon="mingcute:drawer-line" color="black" width="22" />
    </p>
  ));

  return (
    <div>
      <h2>Stray scribbles</h2>
      <div>{renderedList}</div>
    </div>
  );
}
