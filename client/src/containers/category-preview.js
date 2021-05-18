import { ListGroup, ListGroupItem } from "reactstrap";
const CategoryPreview = ({ category }) => {
  return (
    <ListGroup>
      <h1>{category.title}</h1>
      {category?.items.map((item) => (
        <ListGroupItem key={item._id}>
          <img
            style={{ width: "45px", height: "30px" }}
            alt=""
            src={item.logo}
          />
          {"  " + item.title}{" "}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CategoryPreview;
