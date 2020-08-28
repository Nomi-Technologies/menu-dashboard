import React from "react"
import styled from "styled-components"


let StyledButton = styled.button`
    display: block;
    margin: 20px 0;
    font-size: 18px;
    line-height: 22px;
    color: ${ props => props.theme === 'light' ? "#F3A35C" : "white"};
    padding: 10px 56px;
    background: ${ props => props.theme === 'light' ? "white" : "#F3A35C"};
    border-radius: 4px;
    border: 2px solid #F3A35C;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;

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

const FormButton = (props) => (
    <StyledButton theme={props.theme} onClick={ props.onClick }>{ props.text }</StyledButton>
)

export { FormButton, ButtonRow } 