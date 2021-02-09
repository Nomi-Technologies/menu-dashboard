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
    
    &:focus ~ ${ FloatingLabel}
    {
        top: 10px;
        bottom: 30px;
        font-size: 12px;
        opacity: 1;
    }

    &:valid ~ ${ FloatingLabel}
    {
        top: 10px;
        bottom: 30px;
        font-size: 12px;
        opacity: 1;
    }
`

let FormContainer = styled.div`
    position: relative;
    margin-left: 96px;
    button {
        cursor: pointer;
    }

    button:focus {
        outline: none;
    }

    button:hover {
        opacity: 0.8;
    }
`

let FormRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const FormControls = styled.div`
    box-sizing: border-box;
    position: sticky;
    display: flex;
    justify-content: flex-end;
    bottom: 0px;
    right: 0px;
    padding: 32px 0;
    width: 100%;

    background-color: white;

    ${Button} {
        margin-left: 16px;
    }
`

export const FormSplitRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const FormButton = (props) => {
    if(props.destination) {
        return (
            <StyledButton { ...props } onClick={() => navigate(props.destination, { state: props.state })}>{ props.text }</StyledButton>
        )    
    } else {
        return ( 
            <StyledButton { ...props }>{ props.text }</StyledButton>
        )
    }

    
}


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

let StyledSaveButton = styled.button`
  display: inline-block;
  background-color: ${ ({ save }) => save ? "#f2994a" : "white" };
  color: ${ ({ save }) => save ? "white" : "#f2994a" };
  transition: background-color 0.4s ease;
  border-radius: 8px;
  border: 2px solid #f2994a;
  font-size: 18px;
  width: 200px;
  padding: 10px 0;
  margin-top: 20px;

`
export const FormSubtitleNoCaps = styled.p`
    font-family: HK Grotesk;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;

`
export const FormError = styled.p`
    color: red;
    margin: 0px;
`

let StyledNewInput = styled.input`
    width: 100%;
    border-radius: 6px;
    background-color: #E1E7EC;
    opacity: 0.75;
    font-size: 14px;
    padding: 14px;
    padding-left: 20px;
    font-family: HK Grotesk Regular;
    box-sizing: border-box;
    margin: 10px 0;
`

let DishFormInput = (props) => (
    <StyledNewInput type={props.type} onChange={ props.onChange } defaultValue={ props.value } placeholder={ props.placeholder } required/>    
)


let StyledNewTextArea = styled.textarea`
    width: 100%;
    border-radius: 6px;
    background-color: #E1E7EC;
    opacity: 0.75;
    font-size: 14px;
    padding: 14px;
    padding-left: 20px;
    font-family: HK Grotesk Regular;
    box-sizing: border-box;
    resize: none;
    border: none;
    height: 70px;
    margin-bottom: 24px;
`


