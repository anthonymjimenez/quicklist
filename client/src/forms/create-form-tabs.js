import { useState, useEffect, useContext } from "react";
import CreateItemTab from "./create-item-tab";
import CreateCategoryTab from "./create-category-tab";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { ItemContext } from "../context/Items/ItemContext";
import ErrorMessage from "../components/error-message";
import Loading from "../components/loading";
const CreateFormTabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  const { itemError, clearErrors, loading } = useContext(ItemContext);
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
          <CreateItemTab clearErrors={clearErrors} />
        </TabPane>
        <TabPane tabId="2">
          <CreateCategoryTab clearErrors={clearErrors} />
        </TabPane>
      </TabContent>
      <ErrorMessage message={message} />
      <Loading loading={loading} />
    </div>
  );
};

export default CreateFormTabs;
