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
      <div path="/:restaurantId">
        <Dish path="/dish/:menuId/:dishIdOrCreate" />
        <Category path="/category/:menuId/:categoryIdOrCreate" />
        <Restaurant path="/restaurant" />
        <Settings path="/settings" />
        <Table path="/table/:menuId" />
      </div>
      <AllMenus path="/" default />
    </Router>
  );
};
