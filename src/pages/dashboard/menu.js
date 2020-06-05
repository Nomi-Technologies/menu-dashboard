import React, { useState, useEffect, useLayoutEffect } from 'react';

import { Link } from "gatsby"

import Layout from "../../components/layout"
import styled from "styled-components"
import SEO from "../../components/seo"

import { Container, Column, ImageColumn } from "../../components/grid"

import { MenuTable } from "../../components/dashboard/menu-table"

import { getDishes } from "../../util/client"



let SideBar = styled(Column)`
    background-color: #F3A35C;
`

let MenuTitleText = 'Spring 2020 Menu'

let MenuTitle = styled.h1`
    text-transform: uppercase;
    font-size: 32px;
    line-height: 38px;
    padding-top: 104px;
`

let Content = styled.div`
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;

`

// let MenuData = {
//     "Appetizers": [
//         {
//             name: "Pizza",
//             description: "Pizza. That's all.",
//             allergens: ["Egg", "Dairy", "Shellfish"]
//         },
//         {
//             name: "Pizza Again",
//             description: "Pizza. That's all.",
//             allergens: ["Egg", "Dairy", "Shellfish"]
//         },
//         {
//             name: "Pizza One More Time",
//             description: "Pizza. That's all.",
//             allergens: ["Egg", "Shellfish"]
//         },
//     ],
//     "Pastas": [
//         {
//             name: "Linguini",
//             description: "Flat bois",
//             allergens: ["Egg"]
//         },
//         {
//             name: "Spaghet",
//             description: "Who touch",
//             allergens: []
//         },

//     ]
// }

// console.log(MenuData)

const MenuPage = () => {
    const [menuData, setMenuData] = useState()

    useEffect(() => {
        getDishes().then((response) => {
            setMenuData(response.data)
            console.log(response.data)
        })
    }, [])

    return (
        <Layout>
            <Container>
                <SideBar width='280px'>
                </SideBar>
                <Column>
                    <Content>
                        <MenuTitle >{ MenuTitleText }</MenuTitle>
                        <MenuTable menu={ menuData }/>
                    </Content>
                </Column>
            </Container>
        </Layout>
    )
}
export default MenuPage
