import React from "react";

import styled from "styled-components";
import { FloatingMenuButton } from "../../components/floating-menu-button";
import { MenuTable } from "../../components/dashboard/menu-table/menu-table";
import { MenuTitle } from "../../components/dashboard/menu-table/menu-title";
import MenuTableLayout from "../../components/dashboard/menu-table/menu-table-layout";
import { RestaurantContext } from "../../components/restaurant-context";

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

export default ({ menuId, restoId }) => {
  return (
    <RestaurantContext.Provider value={{ restoId }}>
      <MenuTablePage menuId={menuId} />
    </RestaurantContext.Provider>
  );
};
