import Button from "../components/Button"
import "../css/ScribblePage.css";

export default function ScribblePage(){
    return (
        <div className="ScribblePage">
            <textarea>Scribble here</textarea><br/>
            <Button href="#" btnName="Just Save" color="yellow"/>
        </div>
    )
}