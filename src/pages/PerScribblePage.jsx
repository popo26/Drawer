import { useParams, Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function PerScribblePage({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();

  let scribbleData;

  for (let x of data["scribbles"]) {
    if (x.id == id) {
      //console.log(x)
      scribbleData = x;
    }
  }

  const deleteScribble = (id) => {
    console.log("drawer length: ", Object.values(data["scribbles"]).length);
    fetch(`http://localhost:3000/scribbles/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.error(error.message));
  };

  const handleDelete = (id) => {

    alert(`Are you sure to delete this scribble? -ID:${id}`);
    deleteScribble(id);
    const scribbleToBeDeleted = data["scribbles"].filter(
      (item) => item.id == id
    );
    console.log("stray", scribbleToBeDeleted);
    (scribbleToBeDeleted[0].stray == true) ? navigate("/stray") : navigate("/home");
  };

  return (
    <div>
      <div>Per Scribble Page - ID {id}</div>
      <div>
        <h2>
          {scribbleData.id}, {scribbleData.title}
        </h2>
        <section>{scribbleData.content}</section>
      </div>
      <div>
        <Icon
          icon="icon-park-outline:back"
          color="black"
          width="30"
          onClick={() => navigate(-1)}
        />
        <Icon icon="uiw:edit" color="black" width="30" />
        <Icon
          icon="ion:trash-outline"
          color="black"
          width="30"
          onClick={() => handleDelete(scribbleData.id)}
        />

        <Icon
          icon="mingcute:drawer-line"
          color="black"
          width="30"
          height="30"
          onClick={() => navigate("/sort", { state: { id: id } })}
        />
      </div>
    </div>
  );
}
