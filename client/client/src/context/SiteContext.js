import { createContext, useReducer } from "react";
import SiteReducer from "./SiteReducer";

// const INITIAL_STATE = {
//   login: {},  
//   darkMode: false,
//   barMode: true,
// };

export const SiteContext = createContext({
    login: {},  
    colorMode: 'light',
    barMode: true,
  });

export const SiteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SiteReducer, {
    login: {},  
    colorMode: 'light',
    barMode: true,
  });

  return (
    <SiteContext.Provider value={{ state, dispatch }}>
      {children}
    </SiteContext.Provider>
  );
};