const ItemReducer = (state, action) => {
  switch (action.type) {
    case "GET_ITEMS":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "GET_PUBLIC_ITEM":
      return {
        ...state,
        loading: false,
        publicItem: action.payload,
      };
    default:
      return state;
  }
};

export default ItemReducer;
