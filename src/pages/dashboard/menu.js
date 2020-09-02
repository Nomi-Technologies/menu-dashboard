import React, { useState, useEffect, useLayoutEffect } from 'react';

import { Link } from "gatsby"

import Layout from "../../components/layout"
import styled from "styled-components"
import SEO from "../../components/seo"

import { FormButton, ButtonRow } from "../../components/buttons" 
import { Container, Column, ImageColumn } from "../../components/grid"
import FloatingMenu from "../../components/floating-menu"

import { MenuSelector } from "../../components/dashboard/menu-selector/menu-selector"
import { MenuTable } from "../../components/dashboard/menu-table/menu-table"
import { MenuCreator } from "../../components/dashboard/menu-creator/menu-creator"
import { FirstMenuSetup } from "../../components/dashboard/first-menu-setup/first-menu-setup"

import Client from "../../util/client"

let SideBar = styled(Column)`
    background-color: #F3A35C;
`

let MenuContainer = styled.div`
    position: relative;
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
    padding-top: 104px;
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
    const [menuSelectorData, setMenuSelectorData] = useState([])

    useEffect(() => {
        updateMenu()
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
                setMenuData(null)
                setMenuData(res.data.Categories)
            })
        }
    };

    const updateHasMenu = (hasMenu) => {
        setHasMenu(hasMenu)
    }

    return (
        <Layout>
            <Container>
                <SideBar width='280px'>
                </SideBar>
                <Column>
                {
                    hasMenu ? (
                        <MenuContainer>
                            <MenuSelector updateMenuSelection={updateMenuSelection} selectedMenuId={menuId}
                                updateHasMenu={updateHasMenu} data={menuSelectorData} />
                            <MenuTable menuId={menuId} menuData={menuData} updateMenu={updateMenu}/>
                            <StyledFloatingMenu menuId={menuId} updateMenu={updateMenu} updateMenuSelection={updateMenuSelection}/>
                        </MenuContainer>
                    ) : (
                        <MenuContainer>
                            <MenuCreator updateMenuSelection={updateMenuSelection} updateHasMenu={updateHasMenu}/>
                            <FirstMenuSetup />
                        </MenuContainer>
                    )
                }
                </Column>
            </Container>
        </Layout>
    )
}

export default MenuPage