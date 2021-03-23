import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { retrieveUserToken } from "../util/auth";

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: absolute;
  height: 64px;
  left: 0%;
  right: 0%;
  top: 0px;
  background: #ffffff;
  font-family: "HK Grotesk Bold";
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
`;

const LoginButton = styled(Link)`
  margin-left: auto;
  margin-right: 64px;
  right: 64px;
  font-size: 16px;
  line-height: 19px;
  color: white;
  padding: 8px 20px;
  background: #f3a35c;
  border-radius: 4px;
`;

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(retrieveUserToken() !== null);
  }, []);

  return (
    <Header>
      {loggedIn ? (
        <LoginButton to="dashboard/personal">Your Profile</LoginButton>
      ) : (
        <LoginButton to="login">Member Login</LoginButton>
      )}
    </Header>
  );
};
