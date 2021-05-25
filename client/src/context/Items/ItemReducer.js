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
        categories: state.categories.map((category) => {
          if (action.payload.categories.includes(category._id)) {
            category.items.push(action.payload);
          }
          return category;
        }),
      };
    case "UPDATE_ITEMS":
      return {
        ...state,
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
    case "FIND_UPDATED_CATEGORIES":
      return {
        ...state,
        newlyUpdatedCategories: state.categories.filter((category) =>
          action.payload.includes(category._id)
        ),
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "POST_CATEGORY":
      return {
        ...state,
        categories: [action.payload, ...state.categories],
      };
    case "UPDATE_CATEGORY_ITEMS":
      return {
        ...state,
        categories: state.categories.map((category) => {
          let newCat = category;
          newCat.items = newCat.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
          return newCat;
        }),
      };
    case "DELETE_CATEGORY_ITEMS":
      return {
        ...state,
        categories: state.categories.map((category) => {
          let newCat = category;
          newCat.items = newCat.items.filter(
            (category) => category._id !== action.payload._id
          );
          return newCat;
        }),
      };
    default:
      return state;
  }
};

export default ItemReducer;
