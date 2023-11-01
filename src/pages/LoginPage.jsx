import { useState } from "react";
import InputField from "../components/InputField";
import "../css/LoginPage.css";

export default function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password:""
  });

  const handleClick = (e) => {
    e.preventDefault();
    console.log("LoginBtn clicked");
  };

  return (
    <div className="LoginPage">
      <form>
        <InputField
          htmlFor="username"
          type="text"
          name="username"
          placeholder="username"
          id="username"
          value={loginDetails.username}
        /><br/>
        <InputField
          htmlFor="password"
          type="password"
          name="password"
          placeholder="password"
          id="password"
          value={loginDetails.password}
        />
        <button onClick={handleClick}>Login</button>
      </form>
      <a href="#">Don't remember?</a>
      <br/>
      <a><button>Sign Up</button></a>
    </div>
  );
}
