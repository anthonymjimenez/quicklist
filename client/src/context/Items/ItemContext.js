import React, { createContext, useReducer, useContext } from "react";
import ItemReducer from "./ItemReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { errorState } from "../Errors/ErrorContext";
import ErrorReducer from "../Errors/ErrorReducer";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getAccessTokenSilently } = useAuth0();

const initialState = {
  token: getAccessTokenSilently,
  items: [],
  loading: true,
};

export const ItemContext = createContext(initialState);

export const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ItemReducer, initialState);
  const [errState, errDispatch] = useReducer(ErrorReducer, errorState);

  function returnErrors(message, status, id) {
    // ??? dispatch/return
    errDispatch({
      type: "GET_ERRORS",
      payload: { message, status, id },
    });
  }

  function clearErrors() {
    errDispatch({
      type: "CLEAR_ERRORS",
    });
  }
  async function getItems() {
    try {
      const response = await axios.get("http:/localhost:8080/items");
      dispatch({
        type: "GET_CALORIEEVENTS",
        payload: { items: response.data.results },
      });
    } catch (error) {
      // returnErrors(error.response.data.error, error.response.data.status);
      console.error(error);
    }
  }
  return (
    <ItemContext.Provider
      value={{
        calorieEvents: state.calorieEvents,
        itemError: errState,
        loading: state.loading,
        getItems,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
