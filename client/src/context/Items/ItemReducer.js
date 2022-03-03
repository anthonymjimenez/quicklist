const ItemReducer = (state, action) => {
  switch (action.type) {
    case "GET_ITEMS": // grabs all items regardless of category
      return {
        ...state,
        items: action.payload,
      };
    case "GET_PUBLIC_ITEM":
      return {
        ...state,
        publicItem: action.payload,
      };
    case "POST_ITEM":
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case "IS_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "UPDATE_ITEMS":
      return {
        ...state,
        loading: false,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            item = action.payload;
          }
          return item;
        }),
      };
    case "DELETE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload._id),
      };
    }
    case "UPDATE_ITEM_CATEGORIES":
      return {
        ...state,
        items: state.items.map((item) => {
          let newItem = item;
          newItem.categories = newItem.categories.map((category) =>
            category._id === action.payload._id ? action.payload : category
          );
          return newItem;
        }),
      };
    case "REMOVE_CATEGORY_FROM_ITEMS": {
      return {
        ...state,
        items: state.items.map((item) => {
          let newItem = item;
          newItem.categories = newItem.categories.filter((category) => {
            if (
              action.payload.items.includes(item._id) &&
              category._id === action.payload.results._id
            ) {
              return false;
            } else {
              return true;
            }
          });
          return newItem;
        }),
      };
    }
    case "NO_UPDATE_NEEDED": {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default ItemReducer;
