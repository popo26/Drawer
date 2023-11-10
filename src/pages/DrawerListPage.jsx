import "../css/DrawerListPage.css";
import { Icon } from "@iconify/react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function DrawerListPage({
  data,
  expandedIndex,
  selectedDrawerId,
  setSelectedDrawerId,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log("Passed ID", id);
  // console.log("passed data", data);
  // console.log("passed expandedIndex", expandedIndex);

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
            <h3 className={"sub-drawer indent-" + item.level}>
              {item.name}

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
                selectedDrawerId = item.id
                setSelectedDrawerId(selectedDrawerId)
                let passingData = { selectedDrawerId };
                console.log("PassingData", passingData);
                navigate("/sort-drawer", { state: passingData });
              }}
            >
                <Icon icon="mingcute:drawer-line" color="black" width="22" />
                </button>
              {/* </Link> */}
            </h3>
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

  const renderedList = data["drawers"].map((item) => {
    if (id == item.id) {
      return (
        <div key={item.id}>
          <h2>
            ID:{item.id}, {item.name}
            <Icon
              onClick={() => alert("Are you sure to delete whole folder?")}
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
                selectedDrawerId = item.id
                setSelectedDrawerId(selectedDrawerId)
                // e.preventDefault();
                // setSelectedScribbleId(state.id)
                let passingData = { selectedDrawerId };
                console.log("PassingData", passingData);
      
                navigate("/sort-drawer", { state: passingData });
              }}
            >
              <Icon icon="mingcute:drawer-line" color="black" width="22" />
              </button>
            {/* </Link> */}
          </h2>
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
