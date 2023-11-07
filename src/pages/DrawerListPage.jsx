import "../css/DrawerListPage.css";
import { Icon } from "@iconify/react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function DrawerListPage({ data, expandedIndex }) {
  const { id } = useParams();
  const navigate = useNavigate();

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
        if (values[x][y].drawerId === id) {
          //console.log("DrawerId: ", values[x][y].drawerId);
          //console.log("ID: ", values[x][y].id);
          newArray.push(values[x][y]);
        }
      }
      return newArray.map((item) => {
        const scribbleList = findScribbles(item.id, data["scribbles"]);
        return (
          <div key={item.id} className="sub-drawer-header">
            <h3 className="sub-drawer">
              {item.name}
             
                <Icon onClick={()=>alert("Are you sure to delete this sub-drawer?")} icon="ion:trash-outline" color="black" width="20" />
           
              <Link to={null}>
                <Icon icon="mingcute:drawer-line" color="black" width="22" />
              </Link>
            </h3>
            {scribbleList.length === 0 ? (
              <h6 className="no-scribble">No Scribbles</h6>
            ) : (
              <div className="sub-drawer-scribble-list">{scribbleList}</div>
            )}
          </div>
        );
      });
    }
  };

  const renderedList = data["drawers"].map((item) => {
    //not sure why works with expandedIndex
    if (item.id === expandedIndex) {
      return (
        <div key={item.id}>
          <h2>
            ID:{item.id}, {item.name}
            <Icon onClick={()=>alert("Are you sure to delete whole folder?")} icon="ion:trash-outline" color="black" width="20" />
            <Icon icon="mingcute:drawer-line" color="black" width="22" />
          </h2>
          {item["sub-drawer"] === true ? (
            <div>{findSubDrawers(item.id, Array(data["drawers"]))} </div>
          ) : (
            <>{findScribbles(item.id, data["scribbles"])}</>
          )}
        </div>
      );
    }
  });

  return (
    <div>
      Drawer List Page
      <div className="drawer-list">{renderedList}</div>
      <div>ID is {id}</div>
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

// export default function DrawerListPage({ data }) {

//   const renderedList = data['drawers'].map((item) => (
//     <div key={item.id}>
//       <h2>
//         ID:{item.id}, {item.name}
//         <Icon icon="ion:trash-outline" color="black" width="20" />
//         <Icon icon="mingcute:drawer-line" color="black" width="22" />
//       </h2>
//       {item.draweritems &&
//         item.draweritems.map((file) => (
//           <p key={file.id}>
//             <Link to={null}>ID:{file.id}, {file.name}</Link>
//           </p>
//         ))}
//     </div>
//   ));

//   return (
//     <div>
//       Drawer List Page
//       <div className="drawer-list">{renderedList}</div>
//       <div></div>
//     </div>
//   );

//   const renderedList = data.map((item) => (
//     <div key={item.id}>
//       <h2>
//         ID:{item.id}, {item.name}
//         <Icon icon="ion:trash-outline" color="black" width="20" />
//         <Icon icon="mingcute:drawer-line" color="black" width="22" />
//       </h2>
//       {item.draweritems &&
//         item.draweritems.map((file) => (
//           <p key={file.id}>
//             <Link to={null}>ID:{file.id}, {file.name}</Link>
//           </p>
//         ))}
//     </div>
//   ));

//   return (
//     <div>
//       Drawer List Page
//       <div className="drawer-list">{renderedList}</div>
//       <div></div>
//     </div>
//   );
// }
