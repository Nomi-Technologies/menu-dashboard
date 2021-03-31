import React from "react";
import { Router } from "@reach/router";

import Category from "./dashboard/category";
import Dish from "./dashboard/dish";
import Restaurant from "./dashboard/restaurant";
import Settings from "./dashboard/settings";
import Table from "./dashboard/table";
import NotFound from "./404";

export default () => {
  return (
    <Router basepath="/dashboard">
      <Dish path="/dish/*" />
      <Category path="/category/*" />
      <Restaurant path="/restaurant" />
      <Settings path="/settings" />
      <Table path="/table/*" />
      <NotFound path="/" />
    </Router>
  );
};
