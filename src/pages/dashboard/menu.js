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

import Client from "../../util/client"

let SideBar = styled(Column)`
    background-color: #F3A35C;
`

let MenuContainer = styled.div`
    position: relative;
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
`

let StyledFloatingMenu = styled(FloatingMenu)`
    position: fixed;
    right: 64px;
    bottom: 56px;
`;


const MenuPage = () => {
    const [menuId, setMenuId] = useState(null)
    const [menuData, setMenuData] = useState()

    const updateMenuSelection = (menu) => {
        if(menu.id) {
            setMenuId(menu.id)

            Client.getMenu(menu.id).then((res) => {
                setMenuData(res.data.Categories)            
            })
        }
        
    }
    const updateMenu = () => {
        console.log("updating menu")
        Client.getMenu(menuId).then((res) => {
            setMenuData(res.data.Categories)            
        })
    };

    return (
        <Layout>
            <Container>
                <SideBar width='280px'>
                </SideBar>
                <Column>
                    <MenuContainer>
                        <MenuSelector updateMenuSelection={updateMenuSelection} menuId={menuId} />
                        <MenuTable menuId={menuId} menuData={menuData} updateMenu={updateMenu}/>
                        <MenuCreator />
                        <StyledFloatingMenu menuId={menuId} updateMenu={updateMenu}/>
                    </MenuContainer>
                </Column>
            </Container>
        </Layout>
    )
}
export default MenuPage
