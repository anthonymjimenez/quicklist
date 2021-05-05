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
  categories: [],
  oneCategory: {},
};

export const ItemContext = createContext(initialState);

export const ItemProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [state, dispatch] = useReducer(ItemReducer, initialState);
  const [errState, errDispatch] = useReducer(ErrorReducer, errorState);

  //errors
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

  //items
  async function getItems(sub) {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        `${serverUrl}/api/v1/items?user=${sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "GET_ITEMS",
        payload: response.data.result,
      });
    } catch (error) {
      // returnErrors(error.response.data.error, error.response.data.status);
      console.error(error);
    }
  }

  async function getPublicItem() {
    try {
      const response = await axios.get(`${serverUrl}/api/v1/items/test`);
      dispatch({
        type: "GET_PUBLIC_ITEM",
        payload: response.data.results,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function postItem(item) {
    try {
      console.log("HELLO");
      const token = await getAccessTokenSilently();

      const response = await axios.post(`${serverUrl}/api/v1/items`, {
        ...item,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      console.log("hello", state.categories);
      dispatch({
        type: "POST_ITEM",
        payload: response.data.results,
      });
    } catch (error) {
      console.error(error);
    }
  }
  // categories
  async function getCategories(sub) {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        `${serverUrl}/api/v1/categories?user=${sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "GET_CATEGORIES",
        payload: response.data.results,
      });
    } catch (error) {
      // returnErrors(error.response.data.error, error.response.data.status);
      console.error(error);
    }
    console.log(sub);
  }

  async function postNewCategory(category) {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post(`${serverUrl}/api/v1/categories`, {
        ...category,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      dispatch({
        type: "POST_CATEGORY",
        payload: response.data.results,
      });
    } catch (error) {
      // returnErrors(error.response.data.error, error.response.data.status);
      console.error(error);
    }
  }

  function findOneCategory(_id) {
    console.log(state.categories, "FINDONE");
    console.log(
      state.categories.find((cat) => {
        console.log("HELLO");
        console.log(_id, cat._id);
        return _id === cat._id;
      })
    );

    dispatch({
      type: "FIND_ONE_CATEGORY",
      payload: _id,
    });
  }

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        categories: state.categories,
        itemError: errState,
        publicItem: state.publicItem,
        oneCategory: state.oneCategory,
        getItems,
        getPublicItem,
        getCategories,
        postNewCategory,
        postItem,
        findOneCategory,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
