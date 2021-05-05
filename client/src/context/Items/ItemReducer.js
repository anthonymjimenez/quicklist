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
        oneCategory: console.log(
          state.categories.find(({ _id }) => {
            console.log("HELLO");
            console.log(_id, action.payload);
            return _id === action.payload;
          })
        ),
      };
    default:
      return state;
  }
};

export default ItemReducer;
