import React from "react";
import MenuTableLayout from "../../components/dashboard/menu-table/menu-table-layout";
import { AllMenus } from "../../components/dashboard/all-menus-tab/all-menus";

export default () => {
  return (
    <MenuTableLayout menuId="all-menus">
      <AllMenus />
    </MenuTableLayout>
  );
};
