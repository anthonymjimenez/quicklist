import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
const CategoryPreview = ({ category }) => {
  return (
    <ListGroup>
      <Link
        style={{ textDecoration: "none" }}
        to={{
          pathname: `/category/${category._id}`,
        }}
      >
        {" "}
        <h1>{category.title}</h1>{" "}
      </Link>
      {category?.items.map((item) => (
        <ListGroupItem key={item._id}>
          <img
            style={{ width: "45px", height: "30px" }}
            alt=""
            src={item.logo}
          />
          <Link
            style={{ textDecoration: "none" }}
            to={{ pathname: `item/${item._id}` }}
          >
            {" "}
            {"  " + item.title}{" "}
          </Link>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CategoryPreview;
