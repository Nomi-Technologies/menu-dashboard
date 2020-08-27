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

import NoMenuIcon from "../../assets/img/no-menu-icon.png"

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
    const [selectedFile, setSelectedFile] = useState(null)
    let fileReader

    // useEffect(() => {
    //     Client.getAllMenus().then((res) => {
    //         console.log(res.data)
    //         setMenuSelectorData(res.data)
    //         console.log(menuSelectorData)
    
    //         if (menuId === null) { //first render, no menu selected
    //             if (res.data.length === 0) { //no menu created yet
    //             }
    //             else { //display first menu
    //                 updateMenuSelection(res.data[0])
    //             }
    //         }
    //         else {
    //             if (menuId !== null) { //menu already selected
                    
    //             }
    //         }
    //     })
    // }, []) 

    function parseFile() {
      const content = fileReader.result;
      var allTextLines = content.split(/\r\n|\n/);
      var headers = allTextLines[0].split(',');
      var lines = [];

      for (var i=1; i<allTextLines.length; i++) {
          var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if (data.length == headers.length) {
              var tarr = []
              for (var j=0; j<headers.length; j++) {
                  tarr.push(data[j].replace(/['"]+/g, ''))
              }
              lines.push(tarr);
          }
      }
      Client.uploadMenu(lines)
    }

    const updateMenuSelection = (menu) => {
        console.log("new menu selected")
        console.log(menu)
        if (typeof menu === 'undefined') {
            setMenuId(null)
        }
        else {
            setMenuId(menu.id)
        }
    }

    const updateHasMenu = (hasMenu) => {
        console.log(hasMenu)
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
                            <MenuCreator updateMenuSelection={updateMenuSelection} updateHasMenu={updateHasMenu}/>
                            <MenuTable menuId={menuId} menuData={menuData}/>
                            <StyledFloatingMenu menuId={menuId} updateMenuSelection={updateMenuSelection}/>
                        </MenuContainer>
                    ) : (
                        <MenuContainer>
                            <MenuCreator updateHasMenu={updateHasMenu}/>
                            <img src={NoMenuIcon} />
                        </MenuContainer>
                    )
                }
                </Column>
            </Container>
        </Layout>
    )
}
export default MenuPage
