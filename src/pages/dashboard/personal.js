import React from "react"

import SidebarLayout from "../../components/dashboard/sidebar/sidebar-layout"
import { Container } from "../../components/grid"
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
  <SidebarLayout>
    <Wrapper>
      <Container>
        <GreyBar>
          <InfoTitle>Personal Info</InfoTitle>
          <PopulatePersonal></PopulatePersonal>
        </GreyBar>
      </Container>
    </Wrapper>
  </SidebarLayout>
)

export default Personal
