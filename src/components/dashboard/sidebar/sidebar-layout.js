import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import styled from "styled-components"
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import Sidebar from "react-sidebar";
import { navigate } from "@reach/router"

let StyledLayout = styled.div`
  display: flex;
`;

const SidebarLayout = ({ children }) => {

  const [sidebarOpen, onSetSidebarOpen] = useState(true)

  const handleToggleSidebar = () => {
    onSetSidebarOpen(!sidebarOpen)
  };

  return (
    <StyledLayout>
      <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={sidebarOpen}
        onSetOpen={handleToggleSidebar}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
      { children }
    </StyledLayout>
  )
}

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SidebarLayout
