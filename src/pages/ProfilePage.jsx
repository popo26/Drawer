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
      Profile Page
      <br />
      <InputField
        name="username"
        htmlFor="username"
        placeholder="Username"
        id="username"
        type="text"
      />
      <button>Change</button>
      <br />
      <InputField
        name="email"
        htmlFor="email"
        placeholder="Email"
        id="email"
        type="email"
      />
      <button>Change</button>
      <br />
      <InputField
        name="password"
        htmlFor="password"
        placeholder="Password"
        id="password"
        type="password"
      />
      <Link to="/password-reset">
        <button>Change</button>
      </Link>
      <br />
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
