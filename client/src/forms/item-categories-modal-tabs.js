import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { ItemContext } from "../context/Items/ItemContext";
import ErrorMessage from "../components/error-message";
import { useState, useEffect, useContext } from "react";
import AddItemCategoriesTab from "./add-item-categories-tab";
import RemoveItemCategoriesTab from "./remove-item-categories-tab";
// CONSIDER making add-item-categories-tab && remove-item-categories-tab into one component

const ItemCategoriesModalTabs = ({ item }) => {
  const [activeTab, setActiveTab] = useState("1");
  const { itemError, clearErrors } = useContext(ItemContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    itemError.id === "POST_CATEGORY_ERROR" || itemError.id === "POST_ITEM_ERROR"
      ? setMessage(itemError.message)
      : setMessage(false);

    console.log(itemError);
  }, [itemError]);
  return (
    <div>
      <Nav tabs>
        {console.log(activeTab)}
        <NavItem>
          <NavLink
            className={activeTab === "1" ? "active" : ""}
            onClick={() => setActiveTab("1")}
          >
            Add Item To Categories
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => setActiveTab("2")}
          >
            Remove Item From Categories
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <AddItemCategoriesTab item={item} clearErrors={clearErrors} />
        </TabPane>
        <TabPane tabId="2">
          <RemoveItemCategoriesTab item={item} clearErrors />
        </TabPane>
      </TabContent>
      <ErrorMessage message={message} />
    </div>
  );
};

export default ItemCategoriesModalTabs;
