import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  Image,
} from "reactstrap";

const ItemCard = ({ item }) => {
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
            class="img-fluid"
            width="50px"
            height="60px"
            top
            src={item.image}
            alt="Card image cap"
          />
        </div>
        <CardBody>
          <CardTitle tag="h5">{item.title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            <img src={item.logo} alt="Item logo" /> {item.hostname}
          </CardSubtitle>
          <CardText>{item.description}</CardText>
          <CardLink href={item.url}>Product Url</CardLink>
        </CardBody>
      </Card>
    </div>
  );
};

export default ItemCard;
