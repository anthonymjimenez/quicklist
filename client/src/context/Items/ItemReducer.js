const ItemReducer = (state, action) => {
  switch (action.type) {
    case "GET_ITEMS":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default ItemReducer;
