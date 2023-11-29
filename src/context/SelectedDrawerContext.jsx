import { createContext, useState, useContext } from "react";

// 1. Create the context
const SelectedDrawerContext = createContext("");
// Custom provider component for this context.
// Use it in App.jsx like <UserProvider>...</UserProvider>
export const SelectedDrawerProvider = (props) => {
  // store the current user in state at the top level
  const [selectedDrawerId, setSelectedDrawerId] = useState("");
  // sets user object in state, shared via context
  const handleSelectedDrawerId = (id) => {
    setSelectedDrawerId(id);
  };
  // 2. Provide the context.
  // The Provider component of any context (UserContext.Provider)
  // sends data via its value prop to all children at every level.
  // We are sending both the current user and an update function
  return (
    <SelectedDrawerContext.Provider value={{selectedDrawerId, handleSelectedDrawerId}}>
      {props.children}
    </SelectedDrawerContext.Provider>
  );
};
// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useSelectedDrawerContext = () => {
  return useContext(SelectedDrawerContext);
};
// Save as UserContext.jsx in a separate 'context' folder