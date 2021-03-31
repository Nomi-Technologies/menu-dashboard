import React from "react";
import { Router } from "@reach/router";

import styled from "styled-components";
import { navigate } from "gatsby";
import { FloatingMenuButton } from "../../components/floating-menu-button";
import { MenuTable } from "../../components/dashboard/menu-table/menu-table";
import { MenuTitle } from "../../components/dashboard/menu-table/menu-title";
import MenuTableLayout from "../../components/dashboard/menu-table/menu-table-layout";
import Navigation from "../../util/navigation";
import { AllMenus } from "../../components/dashboard/all-menus-tab/all-menus";

let MenuContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 50px;
  padding-top: 30px;
`;

const MenuTablePage = ({ menuId }) => {
  // TODO: fix menu title and floating menu button
  return (
    <MenuTableLayout menuId={menuId}>
      <MenuContainer>
        <MenuTitle />
        <MenuTable />
        <FloatingMenuButton menuId={menuId} />
      </MenuContainer>
    </MenuTableLayout>
  );
};

const AllMenusPage = () => {
  return (
    <MenuTableLayout menuId="all-menus">
      <AllMenus />
    </MenuTableLayout>
  );
};

export default () => {
  return (
    <Router>
      <MenuTablePage path="/:menuId" />
      <AllMenusPage path="/" />
    </Router>
  );
};
