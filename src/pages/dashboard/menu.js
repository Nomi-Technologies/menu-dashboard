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


const MenuPage = () => {
    const [selectedMenuId, setSelectedMenuId] = useState(null) // tracks currently selected menuId
    const [selectedMenuData, setSelectedMenuData] = useState()
    const [hasMenu, setHasMenu] = useState(true)
    const [selectedMenuName, setSelectedMenuName] = useState('');

    const [favoriteMenus, setFavoriteMenus] = useState([]);
    const [allMenus, setAllMenus] = useState([])

    useEffect(() => {
        getAllMenus()
    }, [])

    useEffect(() => {
        updateMenu()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMenuId])

    const getAllMenus = () => {
        Client.getAllMenus().then((res) => {
            setAllMenus(res.data);
        })
    }

    const updateMenuSelection = (menu) => {
        if(menu === 'all-menus' || typeof menu === 'undefined' || menu === null) {
            setSelectedMenuId('all-menus')
        }
        else {
            setSelectedMenuId(menu.id)
        }
    }

    let updateMenu = async () => {
        Client.getFavoriteMenus().then((res) => {
            setFavoriteMenus(res.data);
        })
        if (selectedMenuId !== null && selectedMenuId != 'all-menus') {
            await Client.getMenu(selectedMenuId).then((res) => {
                setSelectedMenuName(res.data.name)
                setSelectedMenuData(res.data.Categories)
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
                                <MenuSelector updateMenuSelection={updateMenuSelection} selectedMenuId={selectedMenuId} allMenus={allMenus} getAllMenus={getAllMenus}
                                    updateHasMenu={updateHasMenu} selectedMenuName={selectedMenuName} favoriteMenus={favoriteMenus}/>
                            </TopBar>
                            {
                                selectedMenuId === 'all-menus' ? (
                                    <StyledAllMenus updateMenu={updateMenu} updateMenuSelection={updateMenuSelection} favoriteMenus={favoriteMenus} toggleFavoriteMenu={toggleFavoriteMenu}></StyledAllMenus>
                                    ) : (
                                    <MenuContainer>  
                                        <MenuTitle menuName={selectedMenuName} menuId={selectedMenuId} updateMenu={updateMenu}/>
                                        <MenuTable menuId={selectedMenuId} menuData={selectedMenuData} updateMenu={updateMenu} updateMenuSelection={updateMenuSelection}/>
                                        <FloatingMenuButton menuId={selectedMenuId} updateMenu={updateMenu} updateMenuSelection={updateMenuSelection}/>
                                    </MenuContainer>
                                    )
                            }
                            
                        </>
                    ) : (
                        <>
                            <TopBar title=""></TopBar>
                            <MenuContainer>
                                <MenuCreator updateMenuSelection={updateMenuSelection} updateHasMenu={updateHasMenu}/>
                                <FirstMenuSetup />
                            </MenuContainer>
                        </>
                    )
                }
                </Column>
            </Container>
        </SidebarLayout>
    )
}

export default MenuPage
