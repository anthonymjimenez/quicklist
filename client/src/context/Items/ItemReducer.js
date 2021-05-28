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
    case "IS_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "NO_UPDATE_NEEDED": {
      return {
        ...state,
        loading: false,
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
    case "ADD_ITEM_TO_CATEGORIES":
      return {
        ...state,
        categories: state.categories.map((category) => {
          let newCat = category;
          if (action.payload.categories.includes(category._id)) {
            newCat.items.push(action.payload.results);
          }
          return newCat;
        }),
      };

    case "REMOVE_ITEM_FROM_CATEGORIES":
      return {
        ...state,
        categories: state.categories.map((category) => {
          let newCat = category;
          console.log(action.payload.categories);
          newCat.items = newCat.items.filter((item) => {
            if (
              action.payload.categories.includes(category._id) &&
              item._id === action.payload.results._id
            ) {
              return false;
            }
            return true;
          });
          console.log(newCat);
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
