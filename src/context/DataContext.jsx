import { createContext, useState, useContext } from "react";
import fakedata from "../../fakedata.json";

// 1. Create the context
const DataContext = createContext();
// Custom provider component for this context.
// Use it in App.jsx like <UserProvider>...</UserProvider>
export const DataProvider = (props) => {
  // store the current user in state at the top level
  //const [data, setData] = useState("");
  const data = fakedata;
  // sets user object in state, shared via context
//   const handleUpdateUser = (user) => {
//     setCurrentUser(user);
//   };
  // 2. Provide the context.
  // The Provider component of any context (UserContext.Provider)
  // sends data via its value prop to all children at every level.
  // We are sending both the current user and an update function
  return (
    <DataContext.Provider value={data}>
      {props.children}
    </DataContext.Provider>
  );
};
// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useDataContext = () => {
  return useContext(DataContext);
};
// Save as UserContext.jsx in a separate 'context' folder