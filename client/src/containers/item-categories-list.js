import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

const ItemCategoriesList = ({ itemCategories }) => {
  return (
    <>
      {itemCategories.map((category) => (
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/category/${category._id}`,
          }}
        >
          {" "}
          <Badge>{category.title}</Badge>
        </Link>
      ))}
    </>
  );
};

export default ItemCategoriesList;
