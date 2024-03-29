import React from "react";
import styled from "styled-components";

import SidebarLayout from "../../components/dashboard/sidebar/sidebar-layout";
import { Container } from "../../components/grid";
import PopulatePersonal from "../../components/dashboard/profile/populate-personal-info";
import PopulateRestaurant from "../../components/dashboard/profile/populate-restaurant-info";
import ChangePassword from "../../components/dashboard/profile/change-password";
import corner from "../../images/corner.png";
import { Link } from "gatsby";

import {
  InfoTitle,
  SideTitle,
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

const Wrapper = styled.div`
  margin: 0 auto;
  margin-right: 60px;
  margin-bottom: 60px;
`;

const Personal = () => (
  <SidebarLayout>
    <Wrapper>
      <Container>
        <GreyBar>
          <InfoTitle>Settings</InfoTitle>
          <SideTitle>Profile</SideTitle>
          <PopulatePersonal />
          <SideTitle>Change Password</SideTitle>
          <ChangePassword />
          <SideTitle>Restaurant</SideTitle>
          <PopulateRestaurant />
        </GreyBar>
      </Container>
    </Wrapper>
  </SidebarLayout>
);

export default Personal;
