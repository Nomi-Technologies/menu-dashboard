import React from 'react';

import styled from "styled-components"

import NoMenuIcon from "../../../assets/img/no-menu-icon.png"

let StyledFirstMenuSetup = styled.div`
    position: relative;
    display: flex;
    align-content: center;
    flex-direction: column;
`

let StyledNoMenuIcon = styled.div`
    width: 200px;
    height: 197px;
    margin-left: 489px;
    margin-top: 118px;
    margin-bottom: 56px;
`

let StyledNoMenuText = styled.h1`
    font-family: HK Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 34px;
    text-align: center;
    align-items: center;
    letter-spacing: 0.02em;
    color: #8A9DB7;
    white-space: pre-line;
`

let NoMenuText = "You don't have any menus yet. \n Let's get you set up!"

const FirstMenuSetup = (props) => {
    return (
        <StyledFirstMenuSetup>
            <StyledNoMenuIcon>
                <img src={NoMenuIcon} />
            </StyledNoMenuIcon>
            <StyledNoMenuText>
                {NoMenuText}
            </StyledNoMenuText>
        </StyledFirstMenuSetup>
    )
}

export { FirstMenuSetup }