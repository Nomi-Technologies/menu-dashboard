import React from "react"

import Layout from "../../components/layout"
import { Container } from "../../components/grid"
import PopulateRestaurant from "../../components/dashboard/profile/populate-restaurant-info"

import corner from "../../images/corner.png"
import { Link } from "gatsby"

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
} from "../../components/dashboard/profile/account"

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
          <Link to="/dashboard/menu">
            <Back>Back</Back>
          </Link>
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
