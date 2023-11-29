import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
//Apply color in css in progress
export default function MyButton({
  btnName,
  href,
  color,
  drawerName,
  handleNewDrawerCreate,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    handleNewDrawerCreate(drawerName);
  };

  return (
    <>
      <Link to={href}>
        {/* <button onClick={handleClick} className="btn btn-success">
          {btnName}
        </button> */}
        <Button variant="success" onClick={handleClick}>
          {" "}
          {btnName}
        </Button>{" "}
      </Link>
    </>
  );
}
