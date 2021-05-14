import { useState, useEffect, useContext } from "react";
import AddItem from "../components/add-item";
import AddCategory from "../components/add-category";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { ItemContext } from "../context/Items/ItemContext";
import ErrorMessage from "./error_message";
const ItemForm = () => {
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
            Add Item
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => setActiveTab("2")}
          >
            Add QuickList
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <AddItem clearErrors={clearErrors} />
        </TabPane>
        <TabPane tabId="2">
          <AddCategory clearErrors={clearErrors} />
        </TabPane>
      </TabContent>
      <ErrorMessage />
    </div>
  );
};

export default ItemForm;
