import React from "react";
import styled from "styled-components";

import { FloatingMenuButton } from "../../components/floating-menu-button";
import { MenuTable } from "../../components/dashboard/menu-table/menu-table";
import { MenuTitle } from "../../components/dashboard/menu-table/menu-title";
import MenuTableLayout from "../../components/dashboard/menu-table/menu-table-layout";
import { AllMenus } from "../../components/dashboard/all-menus-tab/all-menus";

let MenuContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 50px;
  padding-top: 30px;
`;

const AllMenusPage = () => {
  // need to check if menu id was passed in during navigation, else use first menu, else navigate to create-first-menu screen
  return (
    <MenuTableLayout menuId="all-menus">
      <AllMenus />
    </MenuTableLayout>
  );
};

export default AllMenusPage;
