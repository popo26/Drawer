import { useParams, Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";



export default function PerScribblePage({data}){
    const {id} = useParams();
    const navigate = useNavigate();

    let scribbleData;

    for (let x of data['scribbles']){
        if (x.id == id){
            //console.log(x)
            scribbleData = x;
        }
    }

    return(
        <div>
        <div>Per Scribble Page - ID {id}</div>
        <div>
            <h2>{scribbleData.id}, {scribbleData.title}</h2>
            <section>{scribbleData.content}</section>
        </div>
        <div>
        <Icon icon="icon-park-outline:back" color="black" width="30" onClick={()=> navigate(-1)}  />
        <Icon icon="uiw:edit" color="black" width="30"  />
        <Icon icon="ion:trash-outline" color="black" width="30" />

        <Link to={`/drawer-list/${id}`}>
              <Icon
                icon="mingcute:drawer-line"
                color="black"
                width="30"
                height="30"
              />
            </Link>
        </div>
        </div>
    )
}