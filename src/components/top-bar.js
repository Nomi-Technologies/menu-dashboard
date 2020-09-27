import React from "react"
import styled from "styled-components"

// Top of most dashboard pages.  Can include children for custom conent (i.e. menu selector)
const StyledTopBar = styled.div`
    box-shadow: 0px 2px 6px rgba(0, 20, 63, 0.05);
    box-sizing: border-box;
    padding: 0 50px;
    margin-top: 50px;

    h1 {
        font-size: 36px;
        margin-bottom: 30px;
    }


`


const TopBar = ({title, children}) => {
    return(
        <StyledTopBar>
            <h1>{ title }</h1>
            { children }
        </StyledTopBar>
    )
}

export default TopBar