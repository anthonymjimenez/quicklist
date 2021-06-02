const ItemReducer = (state, action) => {
  switch (action.type) {
    case "GET_ITEMS":
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
    case "REMOVE_CATEGORY_FROM_ITEMS": {
      return {
        ...state,
        items: [],
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
