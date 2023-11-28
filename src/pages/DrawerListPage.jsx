import "../css/DrawerListPage.css";
import { Icon } from "@iconify/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useCallback, useRef, useEffect } from "react";
// import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";

export default function DrawerListPage({
  data,
  expandedIndex,
  selectedDrawerId,
  setSelectedDrawerId,
  drawerToBeMoved,
  setDrawerToBeMoved,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drawerNameToEdit, setDrawerNameToEdit] = useState("");
  const [drawerIdToEdit, setDrawerIdToEdit] = useState("");
  const [updateIconIndex, setUpdateIconIndex] = useState(-1);
  //const [isContentEditableDisabled, setIsContentEditableDisabled] = useState(true);
  const [isContentEditable, setIsContentEditable] = useState(false);

  const text = useRef(drawerNameToEdit);

  // console.log("Text current", text.current.innerText);
  // console.log("Updated draewr name", drawerNameToEdit);
  // console.log("Clicked drawer name", drawerNameToEdit);
  // console.log("Clicked drawer Id", drawerIdToEdit);

  // ++++++++Delete Drawer and its sub-drawers and scribbles

  const deleteScribbles = (drawerId) => {
    const associatedScribbles = data["scribbles"].filter(
      (scrb) => scrb.drawerId === drawerId
    );
    for (let t of associatedScribbles) {
      fetch(`http://localhost:3000/scribbles/${t.id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response.json()))
        .catch((error) => console.error(error.message));
    }
  };

  const deleteSelectedDrawer = (id) => {
    console.log("drawer length: ", Object.values(data["drawers"]).length);
    fetch(`http://localhost:3000/drawers/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.error(error.message));
    deleteSubDrawers(id);
  };

  // // for (let x of data["drawers"]) {
  // //   if (x.root === true) {
  // //     //delete all rootId
  // //     console.log(x);
  // //   } else if (x["sub-drawer"] === true) {
  // //     //delete all subdrawers whose drawerId is id
  // //     console.log("subdrawers");
  // //   }
  // // }

  const deleteSubDrawers = (id) => {
    for (let x of data["drawers"]) {
      if (x.root === true) {
        //delete all rootId
        const sameRootIdDrawers = data["drawers"].filter(
          (item) => item.rootId == id
        );
        for (let y of sameRootIdDrawers) {
          fetch(`http://localhost:3000/drawers/${y.id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => console.log(response.json()))
            .catch((error) => console.error(error.message));
          deleteScribbles(y.id);
        }
      } else if (x.root === false && x["sub-drawer"] === true) {
        //delete all subdrawers whose drawerId is id
        const subDrawers = data["drawers"].filter(
          (item) => item.drawerId == id
        );
        for (let y of subDrawers) {
          fetch(`http://localhost:3000/drawers/${y.id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => console.log(response.json()))
            .catch((error) => console.error(error.message));
          deleteScribbles(y.id);
        }
      }
    }
  };

  const handleDelete = (id) => {
    alert(`Are you sure to delete this drawer and all the content? -ID:${id}`);
    deleteSelectedDrawer(id);
    navigate("/");
  };

  //+++++++++++++++++++Get feedback from Anthony++++++++++++++++++++++++++++++++
  // const sanitizeConf = {
  //   allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
  //   allowedAttributes: { a: ["href"] },
  // };

  const showUpdateIcon = (id) => {
    const isEditing = id == updateIconIndex;
    if (isEditing) {
      return (
        <Icon
          icon="material-symbols:update"
          color="red"
          width="22"
          onClick={update}
        />
      );
    }
  };

  //top
  const handleUpdateIcon = (passedIndex) => {
    setUpdateIconIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === passedIndex) {
        return -1;
      } else {
        return passedIndex;
      }
    });
  };

  //experiement
  const test = (id) => {
    //with sanitization - GET FEEDBACK from ANTHONY
    // document
    // .getElementById(`targetDrawerId${id}`)
    // .addEventListener("input", function () {
    //   setDrawerNameToEdit(
    //     sanitizeHtml(document.getElementById(`targetDrawerId${id}`).innerText, sanitizeConf
    //     )
    //   );
    // });

    document
      .getElementById(`targetDrawerId${id}`)
      .addEventListener("input", function () {
        setDrawerNameToEdit(
          document.getElementById(`targetDrawerId${id}`).innerText
        );
      });
  };

  const handleSelectedDrawer = (clickedId) => {
    handleUpdateIcon(clickedId);
    console.log("update icon index", updateIconIndex);
    setUpdateIconIndex(clickedId);
    test(clickedId);
    const drawerName = data["drawers"].filter((item) => item.id == clickedId);
    setDrawerNameToEdit(drawerName[0]["name"]);
    setDrawerIdToEdit(drawerName[0]["id"]);
    text.current = document.getElementById(
      `targetDrawerId${clickedId}`
    ).innerText;
  };

  // const update = (id) => {
  //   save(id)
  //   return()=>updateDrawerName(drawerIdToEdit);
  // };

  // const save = (id) => {
  //   setDrawerNameToEdit(
  //     document.getElementById(`targetDrawerId${id}`).innerText
  //   );
  // };

  const update = () => {
    updateDrawerName(drawerIdToEdit);
    setUpdateIconIndex(-1);
  };

  // const save = (id) => {
  //   setDrawerNameToEdit(
  //     document.getElementById(`targetDrawerId${id}`).innerText
  //   );
  // };

  // const handleChange3 = (id) => {
  //   //can't access changed value with e.target.value
  //   text.current = document.getElementById(`targetDrawerId${id}`).innerText;
  //   // setDrawerNameToEdit(
  //   //   document.getElementById(`targetDrawerId${id}`).innerText
  //   // );
  // };

  // const onContentChange = useCallback((evt) => {
  //   const sanitizeConf = {
  //     allowedTags: ["b", "i", "a", "p"],
  //     allowedAttributes: { a: ["href"] },
  //   };
  //   setDrawerNameToEdit(
  //     sanitizeHtml(evt.currentTarget.innerText, sanitizeConf)
  //     // sanitizeHtml(evt.target.value, sanitizeConf)
  //   );
  // }, []);

  const handleEdit = (e, id) => {
    handleSelectedDrawer(id);
    console.log("Edit clicked");
    //setIsContentEditableDisabled(!isContentEditableDisabled);
    //setIsContentEditable(!isContentEditable);
    console.log(e.target.value);
  };

  // ++++++++++++++ Find Scribbles +++++++++++++++++++++++++++++++++++++++++++++
  const findScribbles = (id, scribbles) => {
    let scribbleArray = [];
    const scbs = Object.values(scribbles);
    for (let x in scbs) {
      if (scbs[x].drawerId == id) {
        scribbleArray.push(scbs[x]);
      }
    }
    return scribbleArray.map((item) => (
      <Link key={item.id} to={`/scribble/${item.id}`}>
        <p className="individual-scribble">{item.title} </p>
      </Link>
    ));
  };

  // ++++++++++++++ Find Sub Drawers +++++++++++++++++++++++++++++++++++++++++++++
  const findSubDrawers = (id, array) => {
    console.log("ID", id);
    let newArray = [];
    let values = Object.values(array);

    for (let x in values) {
      for (let y in values[x]) {
        if (values[x][y].drawerId && values[x][y].rootId == id) {
          console.log("VALUE-X-Y", values[x][y])
          newArray.push(values[x][y]);
        }
      }

      newArray.sort((a, b) => parseInt(a.level) - parseInt(b.level));

      return newArray.map((item) => {
        const scribbleList = findScribbles(item.id, data["scribbles"]);
        return (
          <div key={item.id} className="sub-drawer-header">
            {/* <h3 className={"sub-drawer indent-" + item.level}>
              {item.name} */}

            <h3
              id={`targetDrawerId${item.id}`}
              style={{ display: "inline-block" }}
              className={"sub-drawer indent-" + item.level}
              onClick={() => {
                handleSelectedDrawer(item.id);
              }}
              contentEditable="true"
              // contentEditable={isContentEditable}
              suppressContentEditableWarning={true}
              //onChange={() => handleChange3(item.id)}
              ref={text}
            >
              {item.name}

              {/* <ContentEditable
                onChange={onContentChange}
                // onChange={handleChange2}
                // html={drawerNameToEdit}
                html={item.name}
                // value={drawerNameToEdit}
              /> */}
            </h3>

            <Icon
              onClick={() => handleDelete(item.id)}
              icon="ion:trash-outline"
              color="black"
              width="12"
            />

            {/* <Link
                to={`/sort-preview`}
                onClick={() => setSelectedDrawerId(item.id)}
              > */}
            <Icon
              icon="mingcute:drawer-line"
              color="black"
              width="12"
              onClick={() => {
                drawerToBeMoved = item.id;
                setDrawerToBeMoved(drawerToBeMoved);
                let passingData = { selectedDrawerId, drawerToBeMoved };
                console.log("PassingData", passingData);
                navigate("/sort-drawer", { state: passingData });
              }}
            />

            {/* <button
              onClick={() => {
                drawerToBeMoved = item.id;
                setDrawerToBeMoved(drawerToBeMoved);
                let passingData = { drawerToBeMoved };
                console.log("PassingData", passingData);
                navigate("/sort-drawer", { state: passingData });
              }}
            >
              <Icon icon="mingcute:drawer-line" color="black" width="12" />
            </button> */}

            {/* <Icon
              icon="uiw:edit"
              color="black"
              width="22"
              onClick={(e) => handleEdit(e, item.id)}
            /> */}
            {/* temp */}
            {/* {isEditing && (
              <Icon
                icon="material-symbols:update"
                color="black"
                width="22"
                onClick={update}
              />
            )} */}

            {showUpdateIcon(item.id)}

            {/* <button onClick={() => save(item.id)}>Save</button> */}
            {/* </Link> */}
            {/* </h3> */}
            {scribbleList.length === 0 ? (
              <h6 className="no-scribble">No Scribbles</h6>
            ) : (
              <div
                className={"sub-drawer-scribble-list scrb-indent" + item.level}
              >
                {scribbleList}
              </div>
            )}
          </div>
        );
      });
    }
  };

  console.log("Ref", text);

  ///////++++++++Update Drawer Name in DB+++++++++++++
  const updateDrawerName = (id) => {
    const drawerToBeUpdated = data["drawers"].filter((item) => item.id == id);

    //setDrawerIdToEdit(id)
    const newName = text.current.innerText;
    // const newName = drawerNameToEdit;
    console.log("newName", newName);
    setDrawerNameToEdit(text.current.innerText);
    console.log("You are here");
    let dataPost = {
      rootId: drawerToBeUpdated[0]["rootId"],
      userId: 1,
      drawerId: drawerToBeUpdated[0]["drawerId"],
      id: id,
      name: drawerNameToEdit,

      // name: newName,
      //name:[text.current.innerText],
      type: "drawer",
      ["sub-drawer"]: drawerToBeUpdated[0]["sub-drawer"],
      root: drawerToBeUpdated[0]["root"],
      level: drawerToBeUpdated[0]["level"],
    };
    fetch(`http://localhost:3000/drawers/${id}`, {
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

  const renderedList = data["drawers"].map((item) => {
    if (id == item.id) {
      return (
        <div key={item.id}>
          <div className="rendered-drawers">
            {/* <h2 contentEditable={isContentEditable} style={{display:"inline-block"}} value={drawerNameToEdit}>
            {item.name}
            </h2>             */}
            <h2
              id={`targetDrawerId${item.id}`}
              // contentEditable={isContentEditable}
              style={{ display: "inline-block" }}
              onClick={() => {
                handleSelectedDrawer(item.id);
              }}
              contentEditable="true"
              // contentEditable={isContentEditable}
              suppressContentEditableWarning={true}
              // onChange={handleChange3}
              //onChange={() => handleChange3(item.id)}
              ref={text}
              //ref={`text${item.id}`}
            >
              {item.name}

              {/* <ContentEditable
                // onChange={onContentChange}
                onChange={handleChange2}
                // html={drawerNameToEdit}
                html={item.name}
                disabled={isContentEditableDisabled}
                // value={drawerNameToEdit}
              /> */}
            </h2>
            <Icon
              onClick={() => handleDelete(item.id)}
              icon="ion:trash-outline"
              color="black"
              width="12"
            />
            <Icon
              icon="mingcute:drawer-line"
              color="black"
              width="12"
              onClick={() => {
                drawerToBeMoved = item.id;
                setDrawerToBeMoved(drawerToBeMoved);
                let passingData = { selectedDrawerId, drawerToBeMoved };
                console.log("PassingData", passingData);
                navigate("/sort-drawer", { state: passingData });
              }}
            />
            {/* <Icon
              icon="uiw:edit"
              color="black"
              width="22"
              // onClick={handleEdit}
              onClick={(e) => handleEdit(e, item.id)}
            /> */}
            {/* temp */}
            {/* {updateIconIndex && (
              <Icon
                icon="material-symbols:update"
                color="black"
                width="22"
                onClick={update}
              />
            )} */}

            {showUpdateIcon(item.id)}

            {/* <Icon
              icon="material-symbols:update"
              color="black"
              width="48"
              height="48"
              // onClick={()=>{
              //   save(item.id)
              //   return ()=>update
              // }}
              onClick={update}
            /> */}
            {/* <button onClick={() => save(item.id)}>Save</button> */}
          </div>

          {item["sub-drawer"] === true ? (
            <div>
              <div className="no-subfolder">
                {findScribbles(item.id, data["scribbles"])}
              </div>
              <div>{findSubDrawers(item.id, Array(data["drawers"]))} </div>
            </div>
          ) : (
            <div>{findScribbles(item.id, data["scribbles"])}</div>
          )}
        </div>
      );
    }
  });

  return (
    <div>
      <div className="drawer-list">{renderedList}</div>
      <div>
        <Icon
          icon="icon-park-outline:back"
          color="black"
          width="50"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
