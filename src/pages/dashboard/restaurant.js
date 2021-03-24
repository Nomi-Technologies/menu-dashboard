import React from "react";

import SidebarLayout from "../../components/dashboard/sidebar/sidebar-layout";
import { Container } from "../../components/grid";
import PopulateRestaurant from "../../components/dashboard/profile/populate-restaurant-info";

import corner from "../../images/corner.png";
import { Link } from "gatsby";

import {
  InfoTitle,
  SideTitle,
  LinkToAnotherPage,
  Wrapper,
  Back,
  MarginTop,
  Orange,
  SideBar,
  GreyBar,
} from "../../components/dashboard/profile/account";

let styles = {
  corner: {
    width: "300px",
    position: "fixed",
    left: "0px",
    bottom: "0px",
  },
};

const Restaurant = () => (
  <SidebarLayout>
    <Wrapper>
      <Container>
        <GreyBar>
          <InfoTitle>Restaurant Info</InfoTitle>
          <PopulateRestaurant></PopulateRestaurant>
        </GreyBar>
      </Container>
    </Wrapper>
  </SidebarLayout>
);

export default Restaurant;
