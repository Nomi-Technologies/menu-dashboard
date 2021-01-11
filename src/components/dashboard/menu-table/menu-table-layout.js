import React, { useState, useEffect } from 'react';

import SidebarLayout from "../../dashboard/sidebar/sidebar-layout"
import { Container, Column } from "../../grid"
import { navigate } from 'gatsby';
import Client from "../../../util/client"
import { MenuContext } from "./menu-context" 

import { MenuSelector } from "../../dashboard/menu-selector/menu-selector"
import TopBar from "../../top-bar"

const MenuTableLayout = ({ menuId, children }) => {
    let [menus, setMenus] = useState([])

    const getAllMenus = async () => {
        Client.getAllMenus().then((res) => {
            setMenus(res.data)
        })
    }

    const getMenu = async (menuId) => {
        await Client.getMenu(menuId).then((res) => {
            setMenuContext({
                ...menuContext,
                menu: res.data
            })
        })
    }

    useEffect(() => {
        refreshMenu()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuId])

    const refreshMenu = async () => {
        if (menuId !== null && menuId !== undefined && menuId !== 'all-menus') {
            setMenuContext({
                ...menuContext,
                menu: {}
            })
            await getMenu(menuId)
            await getAllMenus()
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
                            <MenuSelector menuId={menuId} menus={ menus }/>
                        </TopBar>
                        { children }                
                    </Column>
                </Container>
            </MenuContext.Provider>
        </SidebarLayout>
    )
}

export default MenuTableLayout
