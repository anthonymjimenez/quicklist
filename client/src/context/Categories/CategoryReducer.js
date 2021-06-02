const CategoryReducer = (state, action) => {
  switch (action.type) {
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
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category._id === action.payload._id) {
            category.title = action.payload.title;
          }
          return category;
        }),
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
    case "POST_ITEM":
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (action.payload.categories.includes(category._id)) {
            category.items.push(action.payload);
          }
          return category;
        }),
      };
    case "REMOVE_ITEM_FROM_CATEGORIES":
      return {
        ...state,
        categories: state.categories.map((category) => {
          let newCat = category;
          newCat.items = newCat.items.filter(
            (item) =>
              !action.payload.categories.includes(category._id) &&
              item._id === action.payload.results._id
          );
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

export default CategoryReducer;
