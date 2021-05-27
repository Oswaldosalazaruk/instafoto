import React, { createContext, useReducer, useContext } from "react";
import storeReducer, { initialStore } from "./storeReducer";

export const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {" "}
      { children }{" "}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext)[0];

export const useDispatch = () => useContext(StoreContext)[1];
