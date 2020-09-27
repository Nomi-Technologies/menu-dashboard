import styled from "styled-components"

 const Container = styled.div`
    display: flex;
    min-height: 100vh;
    height: 100%;
    width: 100vw;
    flex-direction: row;
 `

 const Column = styled.div`
   flex-basis: ${({width}) => width ? width : 'auto'};
   flex-grow: ${({width}) => width ? 0 : 1};
   box-sizing: border-box;
 `

 const ImageColumn = styled(Column)`
   background-image: url(${({background}) => background});
   background-size: cover;
 `

 export { Container, Column, ImageColumn }