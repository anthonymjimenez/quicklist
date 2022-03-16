import React from "react";
import { Spinner } from "reactstrap";

const Loading = ({ loading }) => (
  <>
    {loading && (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )}
  </>
);

export default Loading;
