import {Link} from 'react-router-dom';
//Apply color in css in progress
export default function Button({btnName, href, color, drawerName, handleNewDrawerCreate}) {

const handleClick =(e) => {
  e.preventDefault();
  handleNewDrawerCreate(drawerName)
}

  return <>
  {/* <a href={href}><button>{btnName}</button></a> */}
  <Link to={href}><button onClick={handleClick}>{btnName}</button></Link>

  </>;
}
