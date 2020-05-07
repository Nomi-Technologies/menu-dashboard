import React from "React"
import styled from "styled-components"

 const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: row;
 `

 const Column = styled.div`
   flex-basis: ${({width}) => width ? width : 'auto'};
   flex-grow: ${({width}) => width ? 0 : 1};
   height: 100%;
   
 `

 const ImageColumn = styled(Column)`
   background-image: url(${({background}) => background});
   background-size: cover;
 `

 export { Container, Column, ImageColumn }