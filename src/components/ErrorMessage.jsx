import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";


// add to ErrorMessage.jsx
function ErrorMessage({ error, resetErrorBoundary }) {
  const navigate = useNavigate();
  console.error(error);
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  // Will work for errors caused by changing state, but not syntax errors
  return (
    <div className="ErrorMessage">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
      <button onClick={() => resetErrorBoundary()}>Try Again?</button>
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
export default ErrorMessage;
