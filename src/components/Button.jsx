import {Link} from 'react-router-dom';
//Apply color in css in progress
export default function Button({btnName, href, color}) {
  return <>
  {/* <a href={href}><button>{btnName}</button></a> */}
  <Link to={href}><button>{btnName}</button></Link>

  </>;
}
