import React, { useState, useEffect } from 'react';

import SidebarLayout from "../../dashboard/sidebar/sidebar-layout"
import styled from "styled-components"

import { Container, Column } from "../../grid"

import { MenuSelector } from "../../dashboard/menu-selector/menu-selector"
import TopBar from "../../top-bar"

import Client from "../../../util/client"
import { MenuContext } from "./menu-context"
import { navigate } from 'gatsby';

const MenuTableLayout = ({ menuId, children }) => {
    useEffect(() => {
        refreshMenu()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuId])

    const refreshMenu = async () => {
        if (menuId !== null && menuId !== undefined && menuId !== 'all-menus') {
            Client.getMenu(menuId).then((res) => {
                setMenuContext({
                    ...menuContext,
                    menu: res.data
                })
            })
        } else {
            if(menuId !== 'all-menus') {
                navigate('/dashboard/all-menus')
            }
        }
    };

    const [menuContext, setMenuContext] = useState({
        menu: null,
        refreshMenu: refreshMenu,
        updateMenuContext: setMenuContext
    });

    return (
        <SidebarLayout>
            <MenuContext.Provider value={ menuContext }>
                <Container>
                    <Column>
                        <TopBar title="Menu Management">
                            <MenuSelector menuId={menuId}/>
                        </TopBar>
                        { children }                
                    </Column>
                </Container>
            </MenuContext.Provider>
        </SidebarLayout>
    )
}

export default MenuTableLayout
