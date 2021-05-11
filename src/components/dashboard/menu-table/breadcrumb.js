import React, { useContext } from "react";

import styled from "styled-components";
import { navigate } from "gatsby";
import Navigation from "../../../util/navigation";
import { URLParamsContext } from "../../URL-params-context";

const StyledBreadcrumb = styled.div`
  color: #627083;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`;

const Breadcrumb = ({ currentRestaurant, currentMenu }) => {
  const context = useContext(URLParamsContext);
  console.log(currentRestaurant);
  return (
    <>
      <StyledBreadcrumb>
        {currentRestaurant ? currentRestaurant.name + " > " : " > "}
        {currentMenu ? currentMenu.name : ""}
        {context.dishIdOrCreate ? " > Add new dish" : null}
        {context.categoryIdOrCreate ? " > Add new category" : null}
      </StyledBreadcrumb>
    </>
  );
};

export { Breadcrumb };
