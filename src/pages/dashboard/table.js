import React from "react";

import styled from "styled-components";
import { FloatingMenuButton } from "../../components/floating-menu-button";
import { MenuTable } from "../../components/dashboard/menu-table/menu-table";
import { MenuTitle } from "../../components/dashboard/menu-table/menu-title";
import { MenuReorderControl } from "../../components/dashboard/menu-table/menu-reorder-control";
import MenuTableLayout from "../../components/dashboard/menu-table/menu-table-layout";
import { URLParamsContext } from "../../components/URL-params-context";

let MenuContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 50px;
  padding-top: 30px;
`;

const MenuTablePage = () => {
  // TODO: fix menu title and floating menu button
  return (
    <MenuTableLayout>
      <MenuContainer>
        <MenuReorderControl />
        <MenuTitle />
        <MenuTable />
        <FloatingMenuButton />
      </MenuContainer>
    </MenuTableLayout>
  );
};

export default ({ menuId, restoId }) => {
  return (
    <URLParamsContext.Provider value={{ restoId, menuId }}>
      <MenuTablePage />
    </URLParamsContext.Provider>
  );
};
