import React, { useState, useEffect } from "react"

import Layout from "../../components/layout"
import { Container, Column, ImageColumn } from "../../components/grid"
import PopulatePersonal from "../../components/dashboard/profile/populate-personal-info"
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

const Personal = () => (
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
                <Orange>Personal Info</Orange>
              </LinkToAnotherPage>
            </SideTitle>
          </MarginTop>
          <SideTitle>
            <LinkToAnotherPage to="/dashboard/restaurant/">
              Restaurant Info
            </LinkToAnotherPage>
          </SideTitle>

          <img src={corner} alt="corner" style={styles.corner}></img>
        </SideBar>

        <GreyBar>
          <InfoTitle>Personal Info</InfoTitle>
          <PopulatePersonal></PopulatePersonal>
        </GreyBar>
      </Container>
    </Wrapper>
  </Layout>
)

export default Personal
