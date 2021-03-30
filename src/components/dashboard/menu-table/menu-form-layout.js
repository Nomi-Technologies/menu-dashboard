import React from "react";
import styled from "styled-components";

import "../../layout.css";
import SidebarLayout from "../sidebar/sidebar-layout";
import { MenuSelector } from "../menu-selector/menu-selector";
import { Container, Column } from "../../grid";
import TopBar from "../../top-bar";

let MenuFormContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const MenuFormLayout = ({ children, menuId }) => {
  return (
    <SidebarLayout>
      <Container>
        <TopBar title="Menu Management">
          <MenuSelector menuId={menuId} />
        </TopBar>
        <MenuFormContainer>{children}</MenuFormContainer>
      </Container>
    </SidebarLayout>
  );
};
