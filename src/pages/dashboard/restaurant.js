import React, { useState, useEffect } from "react"

import Layout from "../../components/layout"
import { Container, Column, ImageColumn } from "../../components/grid"
import PopulateRestaurant from "../../components/dashboard/populate-restaurant-info"

import corner from "../../images/corner.png"
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
} from "../../components/dashboard/account"

let styles = {
  corner: {
    width: "300px",
    position: "fixed",
    left: "0px",
    bottom: "0px",
  },
}

const Restaurant = () => (
  <Layout>
    <Wrapper>
      <Container>
        <SideBar width="25%">
          <Back>Back</Back>
          <MarginTop>
            <SideTitle>
              <LinkToAnotherPage to="/dashboard/personal/">
                Personal Info
              </LinkToAnotherPage>
            </SideTitle>
          </MarginTop>
          <SideTitle>
            <LinkToAnotherPage to="/dashboard/restaurant/">
              <Orange>Restaurant Info</Orange>
            </LinkToAnotherPage>
          </SideTitle>
          <SideTitle>Internet Accounts</SideTitle>
          <SideTitle>Payment</SideTitle>
          <SideTitle>Security</SideTitle>

          <img src={corner} alt="corner" style={styles.corner}></img>
        </SideBar>

        <GreyBar>
          <InfoTitle>Restaurant Info</InfoTitle>
          <PopulateRestaurant></PopulateRestaurant>
        </GreyBar>
      </Container>
    </Wrapper>
  </Layout>
)

export default Restaurant
