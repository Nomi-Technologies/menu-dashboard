import React, { useState, useEffect } from 'react';

import SidebarLayout from "../../components/dashboard/sidebar/sidebar-layout"
import styled from "styled-components"

import { Container, Column } from "../../components/grid"
import { FloatingMenu } from "../../components/dashboard/floating-menu"
import { FloatingMenuButton } from "../../components/floating-menu-button"

import { MenuSelector } from "../../components/dashboard/menu-selector/menu-selector"
import { AllMenus } from "../../components/dashboard/all-menus-tab/all-menus"
import { MenuTable } from "../../components/dashboard/menu-table/menu-table"
import { MenuTitle } from "../../components/dashboard/menu-table/menu-title"
import { MenuCreator } from "../../components/dashboard/menu-creator/menu-creator"
import { FirstMenuSetup } from "../../components/dashboard/first-menu-setup/first-menu-setup"
import TopBar from "../../components/top-bar"

import Client from "../../util/client"

let MenuContainer = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 50px;
    padding-top: 30px;
`
let StyledAllMenus = styled(AllMenus)`
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
    const [favoriteMenus, setFavoriteMenus] = useState([]);

    useEffect(() => {
        updateMenu()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuId])

    const updateMenuSelection = (menu) => {
        if(menu === 'all-menus') {
            setMenuId('all-menus')
        }
        else if (typeof menu === 'undefined' || menu === null) {
            setMenuId(null)
        }
        else {
            setMenuId(menu.id)
        }
    }

    async function updateMenu () {
        Client.getFavoriteMenus().then((res) => {
            setFavoriteMenus(res.data);
        })
        if (menuId !== null && menuId != 'all-menus') {
            await Client.getMenu(menuId).then((res) => {
                setMenuName(res.data.name)
                setMenuData(res.data.Categories)
            })
        }
    };

    const updateHasMenu = (hasMenu) => {
        setHasMenu(hasMenu)
    }

    const toggleFavoriteMenu = (menuId, favorite) => {
        Client.favoriteMenu(menuId, favorite).then((res) => {
            Client.getFavoriteMenus().then((res) => {
                setFavoriteMenus(res.data);
            })
        }) 
    }

    return (
        <SidebarLayout>
            <Container>
                <Column>
                {
                    hasMenu ? (
                        <>
                            <TopBar title="Menu Management">
                                <MenuSelector updateMenuSelection={updateMenuSelection} selectedMenuId={menuId}
                                    updateHasMenu={updateHasMenu} selectedMenuName={menuName} favoriteMenus={favoriteMenus}/>
                            </TopBar>
                            {
                                menuId === 'all-menus' ? (
                                    <StyledAllMenus updateMenu={updateMenu} updateMenuSelection={updateMenuSelection} favoriteMenus={favoriteMenus} toggleFavoriteMenu={toggleFavoriteMenu}></StyledAllMenus>
                                    ) : (
                                    <MenuContainer>  
                                        <MenuTitle menuName={menuName} menuId={menuId} updateMenu={updateMenu}/>
                                        <MenuTable menuId={menuId} menuData={menuData} updateMenu={updateMenu}/>
                                        <FloatingMenuButton menuId={menuId} updateMenu={updateMenu} updateMenuSelection={updateMenuSelection}/>
                                    </MenuContainer>
                                    )
                            }
                            
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
    )
}

export default MenuPage
