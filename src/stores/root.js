import React, { createContext, useContext, useReducer } from "react";

const defaultState = {
  lat: null,
  long: null,
  country: " ",
  city: " "
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "SET_COORDS":
      return { ...state, lat: action.payload.lat, long: action.payload.long };
    case "SET_COUNTRY":
      return {
        ...state,
        country: action.payload.country,
        city: action.payload.city
      };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

const StoreContext = createContext(null);