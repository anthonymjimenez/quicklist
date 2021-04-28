import React, { createContext, useReducer, useContext } from "react";
import ItemReducer from "./ItemReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { errorState } from "../Errors/ErrorContext";
import ErrorReducer from "../Errors/ErrorReducer";

// eslint-disable-next-line react-hooks/rules-of-hooks

const initialState = {
  publicItem: {},
  items: [],
  loading: true,
};

export const ItemContext = createContext(initialState);

export const ItemProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
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
  async function getItems(sub) {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}/api/v1/items?user=${sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      console.log("response", responseData);
      console.log("token", token);
      dispatch({
        type: "GET_ITEMS",
        payload: { items: responseData.results },
      });
    } catch (error) {
      // returnErrors(error.response.data.error, error.response.data.status);
      console.error(error);
    }
  }

  async function getPublicItem() {
    try {
      const response = await fetch(`${serverUrl}/api/v1/items/test`);
      const responseData = await response.json();
      dispatch({
        type: "GET_PUBLIC_ITEM",
        payload: { items: responseData.results },
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        itemError: errState,
        loading: state.loading,
        publicItem: state.publicItem,
        getItems,
        getPublicItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
