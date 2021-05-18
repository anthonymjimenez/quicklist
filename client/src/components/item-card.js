import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
} from "reactstrap";
import { Link } from "react-router-dom";

const ItemCard = ({ item, isPublic = false }) => {
  return (
    <div>
      <Card>
        <div
          style={{
            width: "50%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardImg
            className="img-fluid"
            top
            src={item.image}
            alt="Card image cap"
          />
        </div>
        <CardBody>
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: isPublic ? `/items` : `/item/${item?._id}`,
            }}
          >
            <CardTitle tag="h5">
              {item.title} (${item.price})
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              <img src={item.logo} alt="Item logo" /> {item.hostname}
            </CardSubtitle>
          </Link>
          <CardText>{item.description}</CardText>
          <CardLink href={item.url}>Product Url</CardLink>
        </CardBody>
      </Card>
    </div>
  );
};

export default ItemCard;
