import { useParams, Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import { useEffect, useState, useRef } from "react";
import FileDrop from "../components/FileDrop";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

// export default function PerScribblePage({ data, files, setFiles }) {
export default function PerScribblePage({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [screenshots, setSecreenshots] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  const body = useRef(screenshots);

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
    scribbleToBeDeleted[0].stray == true
      ? navigate("/stray")
      : navigate("/");
  };

  const deleteAttachment = (id, blob) => {
    const selectedScribble = data["scribbles"].filter((item) => item.id == id);
    const newAttachments = selectedScribble[0].files.filter(
      (item) => item.preview != blob
    );
    // setFiles(newAttachments)
    // console.log("fffiles", files)
    let filesInfo = [];
    for (let x of newAttachments) {
      const perFile = {};
      perFile["path"] = x.path;
      perFile["name"] = x.name;
      perFile["preview"] = x.preview;
      perFile["size"] = x.size;
      perFile["type"] = x.type;
      filesInfo.push(perFile);
    }
    let dataPost = {
      userId: 1,
      id: id,
      title: selectedScribble[0].title,
      type: "scribble",
      content: selectedScribble[0].content,
      stray: selectedScribble[0].stray,
      level: selectedScribble[0].level,
      attachment:
        filesInfo.length === 0 ? false : selectedScribble[0].attachment,
      files: filesInfo,
    };
    fetch(`http://localhost:3000/scribbles/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.error(error.message));
  };

  const handleDeleteAttachment = (e, blob) => {
    //e.stopPropagation();
    // console.log("current files", files);
    const currentAttachemnts = data["scribbles"].filter(
      (item) => item.id == id
    ).files;
    // const newAttachments = currentAttachments.filter((item) => item.preview != blob);
    // setFiles(newFiles);
    console.log(
      "Delete clicked",
      data["scribbles"].filter((item) => item.id == id)[0].files
    );
    deleteAttachment(id, blob);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  //   const renderedAttachments = data["scribbles"]
  //     .find((item) => item.id == id)
  //     .files.map((x) => x.preview);

  //   const thumbs = data["scribbles"]
  //     .find((item) => item.id == id)
  //     .files.map((file) => (
  //       <div style={thumb} key={file.preview}>
  //         <div style={thumbInner}>
  //           <img
  //             src={file.preview}
  //             style={img}
  //             // Revoke data uri after image is loaded
  //             // onLoad={() => {
  //             //   URL.revokeObjectURL(file.preview);
  //             // }}
  //           />
  //         </div>
  //         <div className="remove-div">
  //         <button
  //           className="remove-btn"
  //           onClick={(e) => handleDeleteAttachment(e, file.preview)}
  //         >
  //           X
  //         </button>
  //       </div>
  //       </div>
  //     ));

  const thumbs = () => {
    return data["scribbles"]
      .find((item) => item.id == id)
      .files.map((file) => (
        <div style={thumb} key={file.preview}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
              // Revoke data uri after image is loaded
              // onLoad={() => {
              //   URL.revokeObjectURL(file.preview);
              // }}
            />
          </div>
          <div className="remove-div">
            <button
              className="remove-btn"
              onClick={(e) => handleDeleteAttachment(e, file.preview)}
            >
              X
            </button>
          </div>
        </div>
      ));
  };

  const updateContent = () => {
    const scribbleContentToBeUpdated = data["scribbles"].filter(
      (item) => item.id == id
    );

    const newContent = body.current.innerHTML;
    setSecreenshots(newContent);

    let dataPost = {
      rootDrawerId: scribbleContentToBeUpdated[0]["rootDrawerId"],
      userId: 1,
      drawerId: scribbleContentToBeUpdated[0]["drawerId"],
      id: id,
      title: scribbleContentToBeUpdated[0]["title"],
      type: "scribble",
      content: newContent,
      stray: scribbleContentToBeUpdated[0]["stray"],
      level: scribbleContentToBeUpdated[0]["level"],
      files: scribbleContentToBeUpdated[0]["files"],
    };
    fetch(`http://localhost:3000/scribbles/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => console.log(response.json()))
      //.then((response) => console.log("newName", newName))

      .catch((error) => console.error(error.message));
  };

  const update = () => {
    updateContent();
    setIsEditable(false)
  };

  //console.log("fffilesPerScribble", files)

  // useEffect(() => {
  //     const selectedScribble = data['scribbles'].filter(item=>item.id ==id)
  //    console.log(files)
  //    setFiles(
  //     files.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // //   return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, []);

  //   useEffect(() => {
  //       // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //       return () => data["scribbles"]
  //       .find((item) => item.id == id)
  //       .files.forEach((file) => URL.revokeObjectURL(file.preview));
  //     }, []);

  //+++++++++Experiment Screenshot===========================================================================
  // const selectedScribble = data["scribbles"].filter((item) => item.id == id);
  // const c = selectedScribble[0].content;
  // console.log("OBJ", selectedScribble[0].content);
  // if (c.includes("data:image")) {
  //   console.log("yes", c.indexOf("data:image"));
  //   const img = document.createElement("img");
  //   img.src = c;
  //   document.body.appendChild(img);
  //   console.log(img)
  //   c.replace(img)
  // }
  //+++++++++Experiment Screenshot===========================================================================

  // html string
  const selectedScribble = data["scribbles"].filter((item) => item.id == id);
  const htmlStr = selectedScribble[0].content;

  function decodeHtml(html) {
    if (document.getElementById("content")) {
      var txt = document.getElementById("content");
      txt.innerHTML = html;
      return txt.value;
    }
  }
  const decodedHTML = decodeHtml(htmlStr);

  //Need to have scribble content onload so that decodeHtml function can be used
  useEffect(() => {
    const selectedScribble = data["scribbles"].filter((item) => item.id == id);
    setSecreenshots(selectedScribble[0].content);
    return () => setSecreenshots([]);
  }, []);

  return (
    <div>
      <div>Per Scribble Page - ID {id}</div>

      <div>
        <h2>
          {scribbleData.id}, {scribbleData.title}
        </h2>

        {/* <section id="content">{decodedHTML}</section> */}
        <section
          id="content"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          ref={body}
        >
          {decodedHTML}
        </section>

        {/* <aside>{renderedAttachments}</aside> */}
        {scribbleData.attachment && (
          <aside style={thumbsContainer}>{thumbs()}</aside>
        )}
      </div>
      <div>
        <Icon
          icon="icon-park-outline:back"
          color="black"
          width="30"
          onClick={() => navigate(-1)}
        />
        {!isEditable ? (
          <Icon icon="uiw:edit" color="black" width="30" onClick={handleEdit} />
        ) : (
          <Icon
            icon="material-symbols:update"
            color="black"
            width="22"
            onClick={update}
          />
        )}

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
        {/* <FileDrop files={files} setFiles={setFiles} /> */}
      </div>
    </div>
  );
}
