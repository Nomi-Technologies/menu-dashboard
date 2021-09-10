import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  max-height: 100vh;
  top: 0;
  /* width: 100vw; */
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Column = styled.div`
  flex-basis: ${({ width }) => (width ? width : "auto")};
  flex-grow: ${({ width }) => (width ? 0 : 1)};
  box-sizing: border-box;
`;

const ImageColumn = styled(Column)`
  background-image: url(${({ background }) => background});
  background-size: cover;
`;

export { Container, Column, ImageColumn };
