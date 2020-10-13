import React, { useState, useEffect } from 'react';

import SidebarLayout from "../../components/dashboard/sidebar/sidebar-layout"
import styled from "styled-components"

import { Container, Column } from "../../components/grid"
import { FloatingMenu } from "../../components/floating-menu"

import { MenuSelector } from "../../components/dashboard/menu-selector/menu-selector"
import { MenuTable } from "../../components/dashboard/menu-table/menu-table"
import { MenuTitle } from "../../components/dashboard/menu-table/menu-title"
import { MenuCreator } from "../../components/dashboard/menu-creator/menu-creator"
import { FirstMenuSetup } from "../../components/dashboard/first-menu-setup/first-menu-setup"
import TopBar from "../../components/top-bar"

import { MenuContext } from "../../components/dashboard/menu-context"

import Client from "../../util/client"

let MenuContainer = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 50px;
    padding-top: 30px;
`

let StyledFloatingMenu = styled(FloatingMenu)`
    position: fixed;
    right: 64px;
    bottom: 56px;
`;


const MenuPage = () => {
    const [menuId, setMenuId] = useState(null)
    const [menuData, setMenuData] = useState()
    const [hasMenu, setHasMenu] = useState(true)
    const [menuName, setMenuName] = useState('');

    useEffect(() => {
        updateMenu()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuId])

    const updateMenuSelection = (menu) => {
        if (typeof menu === 'undefined') {
            setMenuId(null)
        }
        else {
            setMenuId(menu.id)
        }
    }

    async function updateMenu () {
        if (menuId !== null) {
            await Client.getMenu(menuId).then((res) => {
                setMenuName(res.data.name)
                setMenuData(res.data.Categories)
            })
        }
    };

    const updateHasMenu = (hasMenu) => {
        setHasMenu(hasMenu)
    }

    let context = {
        menuData: menuData,
        menuId: menuId,
        menuName: menuName,
        updateMenu: updateMenu
    }

    return (
        <MenuContext.Provider value={ context }>
            <SidebarLayout>
                <Container>
                    <Column>
                    {
                        hasMenu ? (
                            <>
                                <TopBar title="Menu Management">
                                    <MenuSelector updateMenuSelection={updateMenuSelection} selectedMenuId={menuId}
                                        updateHasMenu={updateHasMenu} selectedMenuName={menuName} />
                                </TopBar>
                                <MenuContainer>  
                                    <MenuTitle menuName={menuName} menuId={menuId} updateMenu={updateMenu}/>
                                    <MenuTable/>
                                    <StyledFloatingMenu menuId={menuId} updateMenu={updateMenu} updateMenuSelection={updateMenuSelection}/>
                                </MenuContainer>
                            </>
                        ) : (
                            <MenuContainer>
                                <MenuCreator updateMenuSelection={updateMenuSelection} updateHasMenu={updateHasMenu}/>
                                <FirstMenuSetup />
                            </MenuContainer>
                        )
                    }
                    </Column>
                </Container>
            </SidebarLayout>
        </MenuContext.Provider>
    )
}

export default MenuPage
