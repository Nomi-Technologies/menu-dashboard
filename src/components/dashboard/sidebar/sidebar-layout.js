import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import styled from "styled-components"
import { navigate } from "@reach/router"

import CollapseIcon from "../../../assets/img/collapse-sidebar.png"
import ExpandIcon from "../../../assets/img/expand-sidebar.png"
import MenuIcon from "../../../assets/img/menu-management.png"
import SettingsIcon from "../../../assets/img/settings.png"


let StyledLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

let PageContent = styled.div`
  max-width: 95%;
  width: ${ props => props.sidebarOpen ? "87%" : "95%"};
  transition: width 0.5s ease;
`;

let Sidebar = styled.div`
  width: ${ props => props.sidebarOpen ? "13%" : "5%"};
  z-index: 10;
  transition: width 0.5s ease;
  display: flex;
  flex-direction: column;
  -moz-box-shadow:    1px 2px 4px 5px #ccc;
  -webkit-box-shadow: 1px 2px 4px 5px #ccc;
  box-shadow:         1px 2px 4px 5px #ccc;
`;

let SidebarItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-top: 5%;
  margin-bottom: 5%;
`;

let SettingsSidebarItem = styled(SidebarItem)`
  position: absolute;
  bottom: 0;
  margin-bottom: 2%;
`;

let LinkText = styled.div`
  display: ${ props => props.sidebarOpen ? "inline" : "none"};
  margin-left: 15px;
  margin-right: 15px;
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`;

let MenuTabText = styled.div`
  color: #F3A35C;
`;

let SettingsTabText = styled.div`
  color: #B2BED0;
`;

let StyledMenuIcon = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`;

let StyledSettingsIcon = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`;

let StyledExpandIcon = styled.div`
  display: ${ props => props.sidebarOpen ? "none" : "inline"};
  margin-left: 15px;
  margin-right: 15px;
`;

let StyledCollapseIcon = styled.div`
  display: ${ props => props.sidebarOpen ? "inline" : "none"};
  margin-left: 65%;
  margin-right: 15px;
`;

const SidebarLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  };

  return (
    <StyledLayout>
      <Sidebar
        sidebarOpen={sidebarOpen}
      >
        <SidebarItem>
          <StyledExpandIcon
            sidebarOpen={sidebarOpen}
            onClick={handleToggleSidebar}
          >
              <img src={ExpandIcon} />
          </StyledExpandIcon>
          <StyledCollapseIcon
            sidebarOpen={sidebarOpen}
            onClick={handleToggleSidebar}
          >
              <img src={CollapseIcon} />
          </StyledCollapseIcon>
        </SidebarItem>
        <SidebarItem>
          <StyledMenuIcon
            onClick={() => {navigate('/dashboard/menu')}}
          >
              <img src={MenuIcon} />
          </StyledMenuIcon>
          <LinkText
            sidebarOpen={sidebarOpen}
            onClick={() => {navigate('/dashboard/menu')}}
          >
            <MenuTabText>
            Menu
            </MenuTabText>
          </LinkText>
        </SidebarItem>
        <SettingsSidebarItem>
          <StyledSettingsIcon
            onClick={() => {navigate('/dashboard/personal')}}
          >
              <img src={SettingsIcon} />
          </StyledSettingsIcon>
          <LinkText
            sidebarOpen={sidebarOpen}
            onClick={() => {navigate('/dashboard/personal')}}
          >
            <SettingsTabText>
              Settings
            </SettingsTabText>
          </LinkText>
        </SettingsSidebarItem>
      </Sidebar>
      <PageContent
        sidebarOpen={sidebarOpen}
      >
        { children }
      </PageContent>
    </StyledLayout>
  )
}

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SidebarLayout
