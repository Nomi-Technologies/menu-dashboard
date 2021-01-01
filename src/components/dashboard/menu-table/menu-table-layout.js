import React, { useState, useEffect } from 'react';

import SidebarLayout from "../../dashboard/sidebar/sidebar-layout"
import { Container, Column } from "../../grid"

import { MenuSelector } from "../../dashboard/menu-selector/menu-selector"
import TopBar from "../../top-bar"

const MenuTableLayout = ({ menuId, children }) => {
    return (
        <SidebarLayout>
                <Container>
                    <Column>
                        <TopBar title="Menu Management">
                            <MenuSelector menuId={menuId}/>
                        </TopBar>
                        { children }                
                    </Column>
                </Container>
        </SidebarLayout>
    )
}

export default MenuTableLayout
