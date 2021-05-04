import { useState } from "react";
import AddItem from "../components/add-item";
import AddCategory from "../components/add-category";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
const ItemForm = () => {
  let [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div>
      <Nav tabs>
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
          <AddItem />
        </TabPane>
        <TabPane tabId="2">
          <AddCategory />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ItemForm;
