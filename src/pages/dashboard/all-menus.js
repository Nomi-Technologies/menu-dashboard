import React from "react";
import MenuTableLayout from "../../components/dashboard/menu-table/menu-table-layout";
import { AllMenus } from "../../components/dashboard/all-menus-tab/all-menus";
import { URLParamsContext } from "../../components/URL-params-context";

export default () => {
  return (
    <URLParamsContext.Provider value={{ menuId: "all-menus" }}>
      <MenuTableLayout>
        <AllMenus />
      </MenuTableLayout>
    </URLParamsContext.Provider>
  );
};
