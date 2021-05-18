import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import { Media } from "reactstrap";
import { FcSynchronize } from "react-icons/fc";
import {
  IoReloadCircleSharp,
  IoPencilSharp,
  IoPaperPlaneSharp,
  IoTrashSharp,
  IoAddSharp,
} from "react-icons/io5";
const Item = () => {
  let { id } = useParams();
  let { items } = useContext(ItemContext);

  let [item, setItem] = useState(true);
  useEffect(() => {
    console.log(items.map((el) => el));
    let found = items.find(({ _id }) => _id === id);
    if (items.length === 0) {
      setItem(false);
    }

    setItem(found);
    console.log(id, items);
  }, [items, id]);

  return (
    <div>
      <h2>
        {console.log(item)}
        {item?.title} (${item?.price}){" "}
      </h2>
      <br />
      <div style={{ width: "90%" }}>
        <Media
          style={{ width: "85%" }}
          object
          src={item?.image}
          alt="Quicklist Icon"
        />
      </div>
      <img src={item?.logo} alt="Item logo" /> {item?.hostname}
      <p>{item?.description}</p>
      <div>
        <>
          <IoReloadCircleSharp />
        </>
        <>
          <IoPencilSharp />
        </>
        <>
          <IoAddSharp />
        </>
        <a href={item?.url} rel="noreferrer" target="_blank">
          <IoPaperPlaneSharp />
        </a>
        <>
          <IoTrashSharp />
        </>
      </div>
    </div>
  );
};

export default Item;
