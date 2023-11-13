import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ScribbleListPage({
  data,
  selectedScribbleId,
  setSelectedScribbleId,
}) {
  //   console.log(data[0]["stray"]);
  const navigate = useNavigate();

  // const [selectedScribbleId, setSelectedScribbleId] = useState("");

  const strayScribbles = data["scribbles"];

  const deleteScribble = (id) => {
    console.log("drawer length: ", Object.values(data["scribbles"]).length);
    fetch(`http://localhost:3000/scribbles/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(dataPost),
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.error(error.message));
  };

  const handleDelete = (id) => {
    alert(`Are you sure to delete? -ID:${id}`);
    deleteScribble(id);
  };

  const renderedList = strayScribbles.map(
    (item) =>
      item.stray === true && (
        <p key={item.id}>
          <Link to={`/scribble/${item.id}`}>
            ID:{item.id}, {item.title}
          </Link>{" "}
          <a onClick={() => handleDelete(item.id)}>
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
              navigate("/sort", { state: { id: item.id } });
            }}
          />
        </p>
      )
  );

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
