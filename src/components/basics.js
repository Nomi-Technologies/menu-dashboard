import React from "react"
import styled from "styled-components"

import RightArrowIcon from "../assets/img/right-arrow.png"
import { Colors } from "../util/colors"

import { navigate } from "@reach/router"

let Button = styled.div`    
    padding: 8px 40px;
    border-radius: 6px;
    color: white;
    cursor: pointer;

    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s all;
`

export const ButtonPrimary = styled(Button)`
    background-color: ${ Colors.ORANGE };
    border: 2px solid ${ Colors.ORANGE };

    &:hover {
        background-color: ${ Colors.ORANGE_LIGHT };
        border: 2px solid ${ Colors.ORANGE_LIGHT };
    }
`

export const ButtonSecondary = styled(Button)`
    background-color: ${ Colors.WHITE };
    color: ${ Colors.ORANGE };
    border: 2px solid ${ Colors.ORANGE };

    &:hover {
        background-color: ${ Colors.ORANGE_LIGHTEST };
    }
`

export const ButtonSpecial = styled(Button)`
    background-color: ${ Colors.BLUE };
    border: 2px solid ${ Colors.BLUE };

    &:hover {
        background-color: ${ Colors.BLUE_LIGHT };
    }
`

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
    flex-basis: ${({ width }) => width ? width : 'auto'};
    margin: 10px 0;
`

let StyledButton = styled.button`
    display: block;
    margin: 20px 0;
    font-size: 16px;
    color: ${ props => props.theme === 'light' ? "#F3A35C" : "white"};
    padding: 10px 46px;
    background: ${ props => props.theme === 'light' ? "white" : "#F3A35C"};
    border-radius: 8px;
    border: 2px solid #F3A35C;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        background: rgba(242, 153, 74, 0.2);
    }
`

let ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: flex-end;
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

let NextButton = (props) => (
    <StyledNextButton onClick={props.onClick}>
        NEXT
        <img alt="Right Arrow Icon" src={RightArrowIcon}></img>
    </StyledNextButton>
)

let DoneButton = (props) => (
    <StyledNextButton onClick={props.onClick}>
        DONE
    </StyledNextButton>
)

let SaveButton = (props) => (
    <StyledSaveButton save={ props.save } onClick={ props.onClick }>
        { props.save ? "Changes Saved" : "Save" }
    </StyledSaveButton>
)

let StyledPrevButton = styled.button`
    border: none;
    background: none;
    color: #ACADAE;
    align-self: flex-start;
    font-size: 18px;
`

let PrevButton = (props) => (
    <StyledPrevButton onClick={() => navigate(props.destination, { state: props.state })}>
        PREVIOUS STEP
    </StyledPrevButton>
)

let FormInput = (props) => (
    <StyledFormInput width={props.width}>
        <StyledInput type={props.type} onChange={props.onChange} value={props.value} required></StyledInput>
        <FloatingLabel>{props.placeholder}</FloatingLabel>
    </StyledFormInput>
)

let FormError = styled.p`
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
    margin: 10px 0;
`

let DishFormTextArea = (props) => (
    <StyledNewTextArea type={props.type} onChange={ props.onChange } defaultValue={ props.value } placeholder={ props.placeholder } required/>
)

export { 
    FormInput,
    DishFormInput,
    DishFormTextArea,
    FormContainer,
    FormTitle,
    FormSubtitle,
    FormRow,
    FormError,
    ButtonRow,
    FormButton,
    NextButton,
    PrevButton,
    DoneButton,
    SaveButton,
    FormControls,
    PopupFormTitle
}
