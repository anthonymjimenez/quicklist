import ItemCategoriesModalTabs from "../../forms/item-categories-modal-tabs";

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
        categories: action.payload.map((cat) => {
          // reversing results from API so they display from new to old
          cat.items.reverse();
          return cat;
        }),
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
    case "ADD_ITEM_TO_CATEGORIES": // ADDS EXISTING ITEMS TO EXISTING CATEGORIES
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
    case "POST_ITEM": // POSTS NEW ITEMS TO EXISTING CATEGORIES
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (action.payload.categories.includes(category._id)) {
            category.items.push(action.payload);
          }
          let reverseItemsInCategory = category;
          reverseItemsInCategory.items.reverse();
          return reverseItemsInCategory;
        }),
      };
    case "REMOVE_ITEM_FROM_CATEGORIES": //removing categories from item
      return {
        ...state,
        categories: state.categories.map((category) => {
          let newCat = category;
          newCat.items = newCat.items.filter((item) => {
            if (
              action.payload.categories.includes(category._id) &&
              item._id === action.payload.results._id
            ) {
              return false;
            }
            return true;
          });
          return newCat;
        }),
      };
    case "DELETE_CATEGORY_ITEMS": // when item is deleted
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
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload._id
        ),
      };
    case "DELETE_ITEMS_IN_CATEGORY": // while removing items from existing category
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category._id === action.payload.results.category._id) {
            let newCat = category;
            newCat.items = newCat.items.filter(
              (item) => !action.payload.items.includes(item._id)
            );
            return newCat;
          }
          return category;
        }),
      };
    default:
      return state;
  }
};

export default CategoryReducer;
