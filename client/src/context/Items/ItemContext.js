import React, { createContext, useEffect, useReducer } from "react";
import ItemReducer from "./ItemReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { errorState } from "../Errors/ErrorContext";
import ErrorReducer from "../Errors/ErrorReducer";
import { categoryState as catState } from "../Categories/CategoryContext";
import CategoryReducer from "../Categories/CategoryReducer";

// eslint-disable-next-line react-hooks/rules-of-hooks

const initialState = {
  publicItem: false,
  items: [],
  loading: false,
};

export const ItemContext = createContext(initialState);

export const ItemProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [state, dispatch] = useReducer(ItemReducer, initialState);
  const [errState, errDispatch] = useReducer(ErrorReducer, errorState);
  const [categoryState, categoryDispatch] = useReducer(
    CategoryReducer,
    catState
  );
  async function headers() {
    const token = await getAccessTokenSilently();
    return {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8",
    };
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
      categoryDispatch({
        type: "POST_ITEM",
        payload: response.data.results,
      });
      categoryDispatch({
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
      categoryDispatch({
        type: "UPDATE_CATEGORY_ITEMS",
        payload: response.data.results,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function autoUpdateItem(id) {
    try {
      dispatch({ type: "IS_LOADING" });
      const response = await axios.patch(`${serverUrl}/api/v1/items/auto`, {
        id: id,
        header: headers(),
      });
      console.log(response.data);
      if (response.data.update) {
        dispatch({
          type: "UPDATE_ITEMS",
          payload: response.data.results,
        });
        categoryDispatch({
          type: "UPDATE_CATEGORY_ITEMS",
          payload: response.data.results,
        });
      } else {
        dispatch({
          type: "NO_UPDATE_NEEDED",
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteItem(id) {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/v1/items?itemId=${id}`,
        {
          header: headers(),
        }
      );
      dispatch({
        type: "DELETE_ITEM",
        payload: response.data.results,
      });
      categoryDispatch({
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
      categoryDispatch({
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
      categoryDispatch({
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

      categoryDispatch({
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
      categoryDispatch({
        type: "POST_CATEGORY",
        payload: response.data.results,
      });
    } catch (error) {
      returnErrors(
        error?.response.data.error,
        error?.response.data.status,
        "POST_CATEGORY_ERROR"
      );
      // returnErrors(error.response.data.error, error.response.data.status, "POST_CATEGORY_ERROR")
    }
  }

  async function updateCategory(id, update) {
    try {
      const response = await axios.patch(`${serverUrl}/api/v1/categories`, {
        id: id,
        updates: update,
        header: headers(),
      });
      console.log(response);
      categoryDispatch({
        type: "UPDATE_CATEGORY",
        payload: response.data.results,
      });
      dispatch({
        type: "UPDATE_ITEM_CATEGORIES",
        payload: response.data.results,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCategory(id) {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/v1/categories?categoryId=${id}`,
        {
          header: headers(),
        }
      );

      categoryDispatch({
        type: "DELETE_CATEGORY",
        payload: response.data.results,
      });
      dispatch({
        type: "REMOVE_CATEGORY_FROM_ITEMS",
        payload: {
          items: response.data.results.items,
          results: response.data.results,
        },
      });
    } catch (error) {}
  }

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        categories: categoryState.categories,
        itemError: errState,
        publicItem: state.publicItem,
        newlyUpdatedCategories: categoryState.newlyUpdatedCategories,
        loading: state.loading,
        successMessage: state.successMessage,
        getItems,
        getPublicItem,
        updateItem,
        deleteItem,
        addItemCategories,
        autoUpdateItem,
        removeItemCategories,
        postItem,
        clearErrors,
        getCategories,
        postNewCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
