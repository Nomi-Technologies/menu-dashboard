import React from "react"
import styled from "styled-components"

import RightArrowIcon from "../assets/img/right-arrow.png"

import { navigate } from "@reach/router"

let FormTitle = styled.h1`
    padding-top: 120px;
    font-size: 36px;
    line-height: 43px;
    margin: 0;
`

let PopupFormTitle = styled.h1`
    font-size: 36px;
    line-height: 43px;
    margin: 0;
`;

let FormSubtitle = styled.p`
    font-size: 16px;
    line-height: 19px;
    max-width: 400px;
    margin-bottom: 52px;
`

let FloatingLabel = styled.span`
    position: absolute;
    pointer-events: none;
    left: 10px;
    top: 20px;
    transition: 0.2s ease all;
    color: #ACADAE;
    text-transform: uppercase;
    font-size: 18px;
`

let StyledInput = styled.input`
    display: block;
    width: 100%;
    border: 1px solid #ACADAE;
    border-radius: 3px;
    background-color: #FFFFFF;
    font-size: 18px;
    padding: 8px;
    padding-top: 26px;
    box-sizing: border-box; 
    

    &:focus ~ ${ FloatingLabel }
    {
        top: 10px;
        bottom: 30px;
        font-size: 12px;
        opacity: 1;
    }

    &:valid ~ ${ FloatingLabel }
    {
        top: 10px;
        bottom: 30px;
        font-size: 12px;
        opacity: 1;
    }
`

let FormContainer = styled.div`
    position: relative;
    margin: 0 auto;
    width: 80%;
    height: 100%;

`

let FormRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

let FormControls = styled.div`
    display: flex;
    /* flex-direction: row; */
    /* position: absolute; */
    /* bottom: 20px; */
    padding-top: 40px;
    width: 100%;
    justify-content: space-between;
`

let StyledFormInput = styled.div`
    position: relative;
    flex-basis: ${({width}) => width ? width : 'auto'};
    margin: 20px 0;
`

let StyledNextButton = styled.button`
    display: flex;
    background-color: #F2994A;
    border-radius: 16px;
    align-items: center;
    font-size: 18px;
    color: white;
    padding: 15px 28px;
    align-self: flex-end;
    margin-right: -20px;

    img {
        padding-left: 10px;
        width: 16px;
    }
`

let NextButton = (props) => (
    <StyledNextButton onClick = { props.onClick }>
        NEXT
        <img src={ RightArrowIcon }></img>
    </StyledNextButton>
)

let DoneButton = (props) => (
    <StyledNextButton onClick = { props.onClick }>
        DONE
    </StyledNextButton>
)

let StyledPrevButton = styled.button`
    border: none;
    background: none;
    color: #ACADAE;
    align-self: flex-start;
    font-size: 18px;
`

let PrevButton = (props) => (
    <StyledPrevButton  onClick = { () => navigate(props.destination, {state: props.state}) }>
        PREVIOUS STEP
    </StyledPrevButton>
)

let FormInput = (props) => (
    <StyledFormInput width={ props.width }>
        <StyledInput type={ props.type } onChange={ props.onChange } value={ props.value } required></StyledInput>
        <FloatingLabel>{ props.placeholder }</FloatingLabel>
    </StyledFormInput>
)

let FormError = styled.p`
    color: red;
    margin: 0px;
`

export { FormInput, FormContainer, FormTitle, PopupFormTitle, FormSubtitle, FormRow, NextButton, PrevButton, DoneButton, FormControls, FormError}