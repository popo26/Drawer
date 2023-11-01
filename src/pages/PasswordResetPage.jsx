import InputField from "../components/InputField";
import { useState } from "react";
import "../css/PasswordResetPage.css";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setEmail(e.target.value);
    console.log("email is: ", email);
    setIsSent(true);
  };

  return (
    <div className="PasswordResetPage">
      <form onSubmit={handleSubmit}>
        <InputField
          htmlFor="email"
          name="email"
          type="email"
          placeholder="Your email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <br />
        <button>Send Password Reset Link</button>
        {isSent && <div>Please check your email.</div>}
      </form>
    </div>
  );
}
