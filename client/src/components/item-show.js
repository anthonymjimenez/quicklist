import React from "react";
import { Media } from "reactstrap";
import Loading from "../components/loading";
import { IoPaperPlaneSharp } from "react-icons/io5";
const ItemShow = ({ item, loading }) => {
  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <h2>
            {console.log(item)}
            {item?.title}{" "}
            {loading ? <Loading loading={loading} /> : <> (${item?.price}) </>}
          </h2>
          <h5>
            Item is currently{" "}
            {item?.availability ? <> in stock </> : <> out of stock </>}
            <a href={item?.url} rel="noreferrer" target="_blank">
              <IoPaperPlaneSharp />
            </a>
          </h5>
        </>
      )}
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
    </div>
  );
};

export default ItemShow;
