import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import styled from "styled-components"
import { useLocation, navigate } from "@reach/router"


import CollapseIcon from "../../../assets/img/collapse-sidebar.png"
import ExpandIcon from "../../../assets/img/expand-sidebar.png"
import MenuIcon from "../../../assets/img/menu-management.png"
import SettingsIcon from "../../../assets/img/settings.png"
import SidebarActive from "../../../assets/img/sidebar-active.png"
import SidebarActiveSettings from "../../../assets/img/sidebar-active-grey.png"

let SidebarItemList = styled.div`
  margin-top: 120px;
`

let LinkText = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  opacity: ${ props => props.sidebarOpen ? 1 : 0};
  overflow: hidden;
  white-space: nowrap;
  transition: opacity 0.2s ease;
  transition-delay: ${ props => props.sidebarOpen ? "0.3s" : "0s"};
`;

let StyledMenuIcon = styled.div`
  width: 32px;
  padding-right: 25px;
  padding-left: 30px;
  img {
    margin: 0 auto;
    display: block;
    width: 32px;
  }
`;

let Hamburger = styled.div`
  margin: 30px 0;

  img {
    width: 45px;
  }
`

let Collapse = styled.img`
  position: absolute;
  right: 10px;  
`

let Expand = styled.img`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
`

let ActiveIndicator = styled.img`
  position: absolute;
  left: 0px;
  width: 4px;
  height: 100%;
`

let StyledSidebarItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  font-family: HK Grotesk Regular;
  position: relative;
  color: #F3A35C;
  cursor: pointer;
`;

const SidebarItem = ({ destination, title, icon, sidebarOpen, href }) => {
  let active = false
  if(href && href.includes(destination)) {
    active = true
  }

  return(
    <StyledSidebarItem onClick={ () => {navigate( destination )} }>
      { active ? <ActiveIndicator src={SidebarActive}/> : "" } 
      <StyledMenuIcon sidebarOpen={ sidebarOpen }>
          <img src={ icon }/>
      </StyledMenuIcon>
        <LinkText sidebarOpen={ sidebarOpen }>{ title }</LinkText>
    </StyledSidebarItem>
  )
}

let StyledSettingsSidebarItem = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  font-family: HK Grotesk Regular;
  color: #B2BED0;
  cursor: pointer;
`;


const SettingsSidebarItem = ({ destination, title, icon, sidebarOpen, href }) => {
  let active = false

  if(href && href.includes(destination)) {
    active = true
  }

  return(
    <StyledSettingsSidebarItem onClick={ () => {navigate( destination )} }>
      { active ? <ActiveIndicator src={SidebarActiveSettings}/> : "" } 
      <StyledMenuIcon sidebarOpen={ sidebarOpen }>
          <img src={ icon }/>
      </StyledMenuIcon>
      <LinkText sidebarOpen={ sidebarOpen }>{ title }</LinkText>
    </StyledSettingsSidebarItem>
  )
}

let StyledLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: row;
`;

let PageContent = styled.div`
  flex: 1;
  transition: width 0.5s ease;
`;

let Sidebar = styled.div`
  position: relative;
  width: ${ props => props.sidebarOpen ? "290px" : "90px"};
  z-index: 10;
  transition: width 0.5s ease;
  flex-direction: column;
  -moz-box-shadow:    0px 8px 20px rgba(0, 20, 63, 0.1);
  -webkit-box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.1);
  box-shadow:         0px 8px 20px rgba(0, 20, 63, 0.1);

  img {
    cursor: pointer;
  }
`;

const SidebarLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { href } = useLocation()

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  };

  return (
    <StyledLayout>
      <Sidebar
        sidebarOpen={sidebarOpen}
      >
        <Hamburger onClick={ handleToggleSidebar }>
          {
            sidebarOpen ? <Collapse src={CollapseIcon}/> : <Expand src={ExpandIcon}/>
          }
        </Hamburger>

        <SidebarItemList>
          <SidebarItem destination='/dashboard/menu' title='Menu Management' icon={ MenuIcon } sidebarOpen={ sidebarOpen } href={ href }/>
        </SidebarItemList>
        <SettingsSidebarItem destination='/dashboard/personal' title='Settings' icon={ SettingsIcon } sidebarOpen={ sidebarOpen } href={ href }/>
        
        
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
