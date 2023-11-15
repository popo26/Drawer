import { useState } from "react";
import Button from "../components/Button";
import "../css/ScribblePage.css";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import FileDrop from "../components/FileDrop";

export default function ScribblePage({
  data,
  selectedScribbleId,
  setSelectedScribbleId,
  files,
  setFiles
}) {
  const navigate = useNavigate();
  // const [scribbleId, setScribbleId] = useState("");
  const [scribbleContent, setScribbleContent] = useState("");
  const [scribbleTitle, setScribbleTitle] = useState("");


  const createNewScribble = () => {
    console.log("scribble length: ", Object.values(data["scribbles"]).length);
    const attachmentBool = files.length < 1 ? false : true;
    //files default extraction include only path and preview so add more info here
    console.log("files", files)
    let filesInfo = [];
    for (let x of files){
      const perFile = {}
      perFile["name"] = x.name
      perFile["preview"] = x.preview
      console.log('url', x)
      perFile["size"] = x.size
      perFile["type"] = x.type
      filesInfo.push(perFile)
    }
    let dataPost = {
      userId: 1,
      // id: Object.values(data["scribbles"]).length + 1,
      id: selectedScribbleId,
      title: scribbleTitle ? scribbleTitle : "Untitled",
      type: "scribble",
      content: scribbleContent,
      stray: true,
      level: 1,
      attachment: attachmentBool,
      files:filesInfo

    };
    fetch("http://localhost:3000/scribbles", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.error(error.message));
  };

  const handleScribbleChange = (e) => {
    console.log(e.target.value);
    setScribbleContent(e.target.value);
  };

  const handleTitleChange = (value) => {
    setScribbleTitle(value);
    setSelectedScribbleId(Object.values(data["scribbles"]).length + 1);
  };

  const handleSubmitScribble = () => {
    createNewScribble();
  };

  return (
    <div className="ScribblePage">
      <div>
        {/* <Icon icon="ic:outline-attachment" color="black" width="36" /> */}
        {/* <Link to="/sort" > */}
        <Icon
          icon="mingcute:drawer-line"
          color="black"
          width="30"
          height="30"
          onClick={() => {
            createNewScribble();
            navigate("/sort", { state: { id: selectedScribbleId } });
          }}
        />
        {/* </Link> */}
      </div>
      <InputField
        htmlFor="Title"
        type="text"
        name="scribble-title"
        placeholder="Title"
        value={scribbleTitle}
        id="scribble-title"
        // Change the name - handleNewDrawerChange
        handleNewDrawerChange={handleTitleChange}
      />
      <FileDrop files={files} setFiles={setFiles} />

      <br />
      <div className="textarea-wrap">
        <textarea
          autoFocus
          value={scribbleContent}
          onChange={handleScribbleChange}
          rows="20"
          cols="100"
        >
          Scribble here
        </textarea>
      </div>
      <div contentEditable="true" className="screenshot"></div>
      <br />
      {/* <Button href="#" btnName="Just Save" color="yellow" /> */}
      <button onClick={handleSubmitScribble}>Just Save</button>

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
