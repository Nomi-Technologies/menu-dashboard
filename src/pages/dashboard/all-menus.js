import React from "react";
import styled from "styled-components";
import { Router } from "@reach/router";

import MenuTableLayout from "../../components/dashboard/menu-table/menu-table-layout";
import { AllMenus } from "../../components/dashboard/all-menus-tab/all-menus";

const AllMenusPage = () => {
  return (
    <MenuTableLayout menuId="all-menus">
      <AllMenus />
    </MenuTableLayout>
  );
};

export default () => {
  return (
    <Router basepath="/dashboard/all-menus">
      <AllMenusPage path="/" />
    </Router>
  );
};
