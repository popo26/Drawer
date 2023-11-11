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
  const [isContentEditable, setIsContentEditable] = useState(false);

  // console.log("Passed ID", id);
  // console.log("passed data", data);
  // console.log("passed expandedIndex", expandedIndex);

  const handleSelectedDrawer = (clickedId) => {
    const drawerName = data["drawers"].filter((item) => item.id == clickedId);
    setDrawerNameToEdit(drawerName[0]["name"]);
  };

  console.log("Clicked ID", drawerNameToEdit)

  const onContentChange = useCallback((evt) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };

    setDrawerNameToEdit(
      sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf)
    );

    //PUT request to add
  }, []);

  useEffect(() => {
    const drawerName = data["drawers"].filter((item) => item.id == id);
    setDrawerNameToEdit(drawerName[0]["name"]);

    return () => {
      console.log("cleanup");
    };
  }, []);

  const handleEdit = (e) => {
    console.log("Edit clicked");
    // setIsContentEditable(!isContentEditable);
    console.log(e.target.value);
    // setDrawerNameToEdit(e.target.value);
  };

  // ++++++++++++++ Find Scribbles +++++++++++++++++++++++++++++++++++++++++++++
  const findScribbles = (id, scribbles) => {
    let scribbleArray = [];
    const scbs = Object.values(scribbles);
    //console.log(scribbles)
    for (let x in scbs) {
      if (scbs[x].drawerId == id) {
        //console.log("Scribble ID, ", scbs[x].id)
        //console.log(scbs[x])
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
        // if (values[x][y].drawerId) {
        // if (values[x][y].drawerId === id) {
        if (values[x][y].drawerId && values[x][y].rootId == id) {
          //console.log("DrawerId: ", values[x][y].drawerId);
          //console.log("ID: ", values[x][y].id);
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
              style={{ display: "inline-block" }}
              className={"sub-drawer indent-" + item.level}
              onClick={() => {
                handleSelectedDrawer(item.id);
              }}
            >
              <ContentEditable
                onChange={onContentChange}
                // onChange={handleChange2}
                // html={drawerNameToEdit}
                html={item.name}

                // value={drawerNameToEdit}
              />
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

  // const text = useRef(null);

  // const handleChange2 = (evt) => {
  //   text.current = evt.target.value;
  // };

  console.log("drawer name to edit", drawerNameToEdit);

  const renderedList = data["drawers"].map((item) => {
    if (id == item.id) {
      return (
        <div key={item.id}>
          <div>
            {/* <h2 contentEditable={isContentEditable} style={{display:"inline-block"}} value={drawerNameToEdit}>
            {item.name}
            </h2>             */}
            <h2
              // contentEditable={isContentEditable}
              style={{ display: "inline-block" }}
              // value={drawerNameToEdit}
              // ref={text}
              onClick={() => {
                handleSelectedDrawer(item.id);
              }}
            >
              <ContentEditable
                onChange={onContentChange}
                // onChange={handleChange2}
                // html={drawerNameToEdit}
                html={item.name}

                // value={drawerNameToEdit}
              />
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
            <Icon
              icon="uiw:edit"
              color="black"
              width="22"
              onClick={handleEdit}
            />
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
