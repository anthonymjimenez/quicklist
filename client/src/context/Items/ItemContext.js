import React, { createContext, useReducer } from "react";
import ItemReducer from "./ItemReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { errorState } from "../Errors/ErrorContext";
import ErrorReducer from "../Errors/ErrorReducer";
import { createPortal } from "react-dom";

// eslint-disable-next-line react-hooks/rules-of-hooks

const initialState = {
  publicItem: false,
  items: [],
  categories: [],
  newlyUpdatedCategories: [],
};

export const ItemContext = createContext(initialState);

export const ItemProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [state, dispatch] = useReducer(ItemReducer, initialState);
  const [errState, errDispatch] = useReducer(ErrorReducer, errorState);
  async function headers() {
    const token = await getAccessTokenSilently();
    return {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8",
    };
  }
  //utils
  function updateDispatch(results) {
    console.log(results);
    dispatch({
      type: "UPDATE_ITEMS",
      payload: results,
    });
    dispatch({
      type: "UPDATE_CATEGORY_ITEMS",
      payload: results,
    });
  }
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
      const response = await axios.get(
        `${serverUrl}/api/v1/items?user=${sub}`,
        {
          headers: headers(),
        }
      );
      dispatch({
        type: "GET_ITEMS",
        payload: response.data.results,
      });
    } catch (error) {
      // returnErrors(error.response.data.error, error.response.data.status);
      console.error(error);
    }
  }

  async function getPublicItem(item) {
    try {
      const response = await axios.post(`${serverUrl}/api/v1/items/test`, {
        ...item,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
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
      const response = await axios.post(`${serverUrl}/api/v1/items`, {
        ...item,
        headers: headers(),
      });
      dispatch({
        type: "POST_ITEM",
        payload: response.data.results,
      });
      dispatch({
        type: "FIND_UPDATED_CATEGORIES",
        payload: item.categories,
      });
    } catch (error) {
      console.log(error);
      returnErrors(
        error.response.data.error,
        error.response.data.status,
        "POST_ITEM_ERROR"
      );
    }
  }

  async function updateItem(id, update) {
    try {
      const response = await axios.patch(`${serverUrl}/api/v1/items`, {
        id: id,
        updates: update,
        header: headers(),
      });

      dispatch({
        type: "UPDATE_ITEMS",
        payload: response.data.results,
      });
      dispatch({
        type: "UPDATE_CATEGORY_ITEMS",
        payload: response.data.results,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteItem(id) {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/v1/items?user=${id}`,
        {
          header: headers(),
        }
      );
      dispatch({
        type: "DELETE_ITEM",
        payload: response.data.results,
      });
      dispatch({
        type: "DELETE_CATEGORY_ITEMS",
        payload: response.data.results,
      });
    } catch (error) {
      console.log("HELLO");
      console.error(error);
    }
  }
  async function addItemCategories(updates) {
    try {
      let response = await axios.patch(
        `${serverUrl}/api/v1/items/addCategories`,
        {
          ...updates,
          headers: headers(),
        }
      );
      dispatch({
        type: "UPDATE_ITEMS",
        payload: response.data.results,
      });
      dispatch({
        type: "ADD_ITEM_TO_CATEGORIES",
        payload: {
          results: response.data.results,
          categories: updates.categories,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function removeItemCategories(updates) {
    try {
      let response = await axios.patch(
        `${serverUrl}/api/v1/items/removeCategories`,
        {
          ...updates,
          headers: headers(),
        }
      );
      console.log(response);
      dispatch({
        type: "UPDATE_ITEMS",
        payload: response.data.results,
      });
      dispatch({
        type: "REMOVE_ITEM_FROM_CATEGORIES",
        payload: {
          results: response.data.results,
          categories: updates.categories,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  // categories
  async function getCategories(sub) {
    try {
      const response = await axios.get(
        `${serverUrl}/api/v1/categories?user=${sub}`,
        {
          headers: headers(),
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
  }

  async function postNewCategory(category) {
    try {
      const response = await axios.post(`${serverUrl}/api/v1/categories`, {
        ...category,
        headers: headers(),
      });
      dispatch({
        type: "POST_CATEGORY",
        payload: response.data.results,
      });
    } catch (error) {
      console.log(error.response.data.status);
      returnErrors(
        error?.response.data.error,
        error?.response.data.status,
        "POST_CATEGORY_ERROR"
      );
      // returnErrors(error.response.data.error, error.response.data.status, "POST_CATEGORY_ERROR")
    }
  }
  // dispatch({
  //   type: "FIND_ONE_CATEGORY",
  //   payload: found,
  // });

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        categories: state.categories,
        itemError: errState,
        publicItem: state.publicItem,
        newlyUpdatedCategories: state.newlyUpdatedCategories,
        getItems,
        getPublicItem,
        updateItem,
        deleteItem,
        addItemCategories,
        removeItemCategories,
        clearErrors,
        getCategories,
        postNewCategory,
        postItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
