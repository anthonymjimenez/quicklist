import { ListGroup, ListGroupItem } from "reactstrap";
const CategoryPreview = ({ category }) => {
  return (
    <ListGroup>
      <h1>{category.title}</h1>
      {category?.items.map((item) => (
        <ListGroupItem>
          <img
            style={{ width: "auto", height: "auto" }}
            alt=""
            src={item.logo}
            rounded
          />
          {"  " + item.title}{" "}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CategoryPreview;
