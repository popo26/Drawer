import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function ProfilePage(){
    return (
        <div>
            Profile Page
            <br/>
            <InputField name="username" htmlFor="username" placeholder="Username" id="username" type="text"/>
            <button>Change</button><br/>
            <InputField name="email" htmlFor="email" placeholder="Email" id="email" type="email"/>
            <button>Change</button><br/>
            <InputField name="password" htmlFor="password" placeholder="Password" id="password" type="password"/>
            <button>Change</button><br/>

        </div>
    )
}