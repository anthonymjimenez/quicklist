import ItemPreviewList from "../containers/item-preview-list";
import ItemForm from "../components/item-form";
const Items = () => {
  return (
    <>
      <h3>Add new Item</h3>
      <ItemForm />
      <h3>Your Lists!</h3>
      <ItemPreviewList />
    </>
  );
};
export default Items;
