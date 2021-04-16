import React from "react";
import { Router } from "@reach/router";

import Category from "./dashboard/category";
import Dish from "./dashboard/dish";
import Restaurant from "./dashboard/restaurant";
import Settings from "./dashboard/settings";
import Table from "./dashboard/table";
import AllMenus from "./dashboard/all-menus";

export default () => {
  return (
    <Router basepath="/dashboard">
      <div path="/:restoId">
        <Dish path="/dishes/:menuId/:dishIdOrCreate" />
        <Category path="/categories/:menuId/:categoryIdOrCreate" />
        <Restaurant path="/restaurant" />
        <Table path="/tables/:menuId" />
      </div>
      <Settings path="/settings" />
      <AllMenus path="/" default />
    </Router>
  );
};
