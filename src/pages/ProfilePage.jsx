import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Icon } from "@iconify/react";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div>
      
      <InputField
        name="username"
        htmlFor="username"
        placeholder="Username"
        id="username"
        type="text"
      />
      <button className="btn btn-dark">Change</button>
      <InputField
        name="email"
        htmlFor="email"
        placeholder="Email"
        id="email"
        type="email"
      />
      <button className="btn btn-dark">Change</button>
      <InputField
        name="password"
        htmlFor="password"
        placeholder="Password"
        id="password"
        type="password"
      />
      <Link to="/password-reset">
        <button className="btn btn-dark">Change</button>
      </Link>
      <br />
      <div>
        <Icon
        className="back-btn"
          icon="icon-park-outline:back"
          color="black"
          width="50"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
