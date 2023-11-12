import "../css/DrawerListPage.css";
import { Icon } from "@iconify/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useCallback, useRef, useEffect } from "react";
import sanitizeHtml from "sanitize-html";
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

  //const [isContentEditableDisabled, setIsContentEditableDisabled] = useState(true);
  const [isContentEditable, setIsContentEditable] = useState(false);

  // const text = useRef(drawerNameToEdit);
  const text = useRef(drawerNameToEdit);
  //console.log("array ref", text)

  console.log("Text current", text.current.innerText);
  console.log("Updated draewr name", drawerNameToEdit);
  console.log("Clicked drawer name", drawerNameToEdit);
  console.log("Clicked drawer Id", drawerIdToEdit);

 //experiement
 const test= (id) => {
  document.getElementById(`targetDrawerId${id}`).addEventListener("input", function(){
    setDrawerNameToEdit(
      document.getElementById(`targetDrawerId${id}`).innerText
    );
  })
}

  const handleSelectedDrawer = (clickedId) => {
    test(clickedId)
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
  };

  const save = (id) => {
    setDrawerNameToEdit(
      document.getElementById(`targetDrawerId${id}`).innerText
    );
  };

  // const handleChange3 = (id) => {

  //   //can't access changed value with e.target.value
  //   text.current = document.getElementById(`targetDrawerId${id}`).innerText;
  //   // setDrawerNameToEdit(
  //   //   document.getElementById(`targetDrawerId${id}`).innerText
  //   // );
  // };

 

  const onContentChange = useCallback((evt) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };
    setDrawerNameToEdit(
      sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf)
      // sanitizeHtml(evt.target.value, sanitizeConf)
    );
    console.log("Changed drawer name", drawerNameToEdit);
  }, []);

  // useEffect(() => {
  //   const drawerName = data["drawers"].filter((item) => item.id == id);
  //   setDrawerNameToEdit(drawerName[0]["name"]);

  //   return () => {
  //     console.log("cleanup");
  //   };
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
          newArray.push(values[x][y]);
        }
      }

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
              onClick={() => alert("Are you sure to delete this sub-drawer?")}
              icon="ion:trash-outline"
              color="black"
              width="20"
            />

            {/* <Link
                to={`/sort-preview`}
                onClick={() => setSelectedDrawerId(item.id)}
              > */}
            <button
              onClick={() => {
                // selectedDrawerId = item.id
                // setSelectedDrawerId(selectedDrawerId)
                // let passingData = { selectedDrawerId };
                drawerToBeMoved = item.id;
                setDrawerToBeMoved(drawerToBeMoved);
                let passingData = { drawerToBeMoved };
                console.log("PassingData", passingData);
                navigate("/sort-drawer", { state: passingData });
              }}
            >
              <Icon icon="mingcute:drawer-line" color="black" width="22" />
            </button>
            {/* <Icon
              icon="uiw:edit"
              color="black"
              width="22"
              onClick={(e) => handleEdit(e, item.id)}
            /> */}
            {/* temp */}
            <Icon
              icon="material-symbols:update"
              color="black"
              width="48"
              height="48"
              onClick={update}
              // onClick={()=>update(item.id)}
              // onClick={()=>{
              //   save(item.id)
              //   return ()=>update
              // }}
            />
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

  // //+++++++useREf++++++++++++
  //const text = useRef(drawerNameToEdit);

  // //+++++++Change Drawer Name++++++++++++
  // const handleChange2 = (evt) => {
  //   text.current = evt.target.value;
  //   return()=>{
  //     setDrawerNameToEdit(text.current);
  //     // updateDrawerName(drawerIdToEdit)
  //   }
  // };

  const renderedList = data["drawers"].map((item) => {
    if (id == item.id) {
      return (
        <div key={item.id}>
          <div>
            {/* <h2 contentEditable={isContentEditable} style={{display:"inline-block"}} value={drawerNameToEdit}>
            {item.name}
            </h2>             */}
            <h2
              // id="drawerName1"
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
              onClick={() => {
                alert("Are you sure to delete whole folder?");
              }}
              icon="ion:trash-outline"
              color="black"
              width="20"
            />
            <Icon
              icon="mingcute:drawer-line"
              color="black"
              width="22"
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
            <Icon
              icon="material-symbols:update"
              color="black"
              width="48"
              height="48"
              // onClick={()=>{
              //   save(item.id)
              //   return ()=>update
              // }}
              onClick={update}
              
            />
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
      Drawer List Page
      <div className="drawer-list">{renderedList}</div>
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
