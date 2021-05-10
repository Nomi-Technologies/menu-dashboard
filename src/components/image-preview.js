import React, { useState } from "react";
import styled from "styled-components";

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
`;

export default ({ src, children, alt = null, onError }) => {
  const [errored, setErrored] = useState(false);

  const errorHandler = (err) => {
    onError && onError(err);
    setErrored(true);
  };

  return errored ? (
    alt
  ) : (
    <>
      <PreviewImage src={src} onError={errorHandler} />
      {children}
    </>
  );
};
