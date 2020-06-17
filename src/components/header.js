import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { retrieveUserToken } from "../util/auth"


const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: absolute;
  height: 64px;
  left: 0%;
  right: 0%;
  top: 0px;
  background: #FFFFFF;
  font-family: 'HK Grotesk Bold';
  /* TopBar */
  box-shadow: 0px 0px 20px rgba(0, 12, 54, 0.2);
  z-index: 10;

  ul {
    padding-left: 0;
    margin: 0 30px;
    display: flex;
    align-items: center;
  }

  li {
    display: inline-block;
    margin: 0;
    margin-right: 60px;
    list-style-type: none;
    font-size: 18px;
    color: black;
  }
`

const Logo = styled.img`

`

const LoginButton = styled(Link)`
  margin-left: auto;
  margin-right: 64px;
  right: 64px;
  font-size: 16px;
  line-height: 19px;
  color: white;
  padding: 8px 20px;
  background: #F3A35C;
  border-radius: 4px;
`


export default () => (
  <Header>
    <ul>
      <li>
        Mission
      </li>
      <li>
        Product
      </li>
      <li>
        Pricing
      </li>
      <li>
        Team
      </li>
    </ul>

    { retrieveUserToken() !== null ? 
      (
        <LoginButton to='profile'>Your Profile</LoginButton>
      ) : (
        <LoginButton to='login'>Member Login</LoginButton>
      )
    
    }
    


  </Header>
)
