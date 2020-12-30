import React from "react"
import styled from "styled-components"
import { ButtonPrimary } from "./basics"
import { retrieveUserToken, logout } from "../util/auth"
import { navigate } from "@reach/router"

// Top of most dashboard pages.  Can include children for custom conent (i.e. menu selector)
const StyledTopBar = styled.div`
    box-shadow: 0px 2px 6px rgba(0, 20, 63, 0.05);
    box-sizing: border-box;
    padding: 0 50px;
    padding-top: 50px;

    h1 {
        position: relative;
        font-size: 36px;
        margin-bottom: 30px;
    }
`

const LogoutButton = styled(ButtonPrimary)`
    position: absolute;
    right: 80px;
`

const TopBar = ({title, children}) => {
    const loggedIn = retrieveUserToken()

    const logoutUser = () => {
        logout()
        navigate('/')
    }
    
    return(
        <StyledTopBar>
            { loggedIn ? <LogoutButton onClick={ logoutUser }>Logout</LogoutButton>: "" }
            <h1>{ title }</h1>
            { children }
        </StyledTopBar>
    )
}

export default TopBar