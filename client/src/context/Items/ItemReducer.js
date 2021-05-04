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
          console.log("category", category, action.payload.categories);
          if (action.payload.categories.includes(category._id)) {
            console.log("PING");
            category.items.push(action.payload);
          }
          return category;
        }),
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
    default:
      return state;
  }
};

export default ItemReducer;
