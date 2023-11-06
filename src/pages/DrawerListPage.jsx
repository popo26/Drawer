import "../css/DrawerListPage.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function DrawerListPage({ data }) {

  const renderedList = data['drawers'].map((item) => (
    <div key={item.id}>
      <h2>
        ID:{item.id}, {item.name}
        <Icon icon="ion:trash-outline" color="black" width="20" />
        <Icon icon="mingcute:drawer-line" color="black" width="22" />
      </h2>
      {item.draweritems &&
        item.draweritems.map((file) => (
          <p key={file.id}>
            <Link to={null}>ID:{file.id}, {file.name}</Link>
          </p>
        ))}
    </div>
  ));

  return (
    <div>
      Drawer List Page
      <div className="drawer-list">{renderedList}</div>
      <div></div>
    </div>
  );





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
}
