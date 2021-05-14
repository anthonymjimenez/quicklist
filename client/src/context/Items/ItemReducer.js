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
        items: [action.payload, state.items],
        categories: state.categories.map((category) => {
          if (action.payload.categories.includes(category._id)) {
            category.items.push(action.payload);
          }
          return category;
        }),
      };
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
    case "UPDATE_CATEGORIES":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.items.map((item) => {
            if (item._id === action.payload._id) {
              item = action.payload;
            }
            return item;
          })
        ),
      };
    case "FIND_ONE_CATEGORY":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default ItemReducer;
