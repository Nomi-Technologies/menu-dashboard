import React, { useContext } from "react";
import styled from "styled-components";
import { ButtonPrimary } from "./basics";
import { retrieveUserToken, logout } from "../util/auth";
import { navigate } from "gatsby";
import { Breadcrumb } from "./dashboard/menu-table/breadcrumb";
import { URLParamsContext } from "./URL-params-context";

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
`;

const LogoutButton = styled(ButtonPrimary)`
  position: absolute;
  right: 80px;
`;

const TopBar = ({ title, currentRestaurant, currentMenu, children }) => {
  const loggedIn = retrieveUserToken();
  const context = useContext(URLParamsContext);

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  return (
    <StyledTopBar>
      {context.menuId !== "all-menus" ? (
        <Breadcrumb
          currentRestaurant={currentRestaurant}
          currentMenu={currentMenu}
        />
      ) : null}
      {loggedIn ? <LogoutButton onClick={logoutUser}>Logout</LogoutButton> : ""}
      <h1>
        {context.menuId == "all-menus"
          ? "Menus"
          : context.dishIdOrCreate
          ? "Add new dish"
          : context.categoryIdOrCreate
          ? "Add new category"
          : currentMenu
          ? currentMenu.name
          : "Loading"}
      </h1>
      {children}
    </StyledTopBar>
  );
};

export default TopBar;
