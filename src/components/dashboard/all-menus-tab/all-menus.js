import React, { useState, useEffect } from 'react';
import styled from "styled-components"

import { MenuCard } from "./menu-card"

import Client from "../../../util/client"

const StyledMenuCard = styled(MenuCard)`
    margin: 10px;
    min-width: 160px;
    width: 30%;
    display: flex;
    height: 80px;
    z-index: 2;
`;

const Grid = styled.div`
    margin-left: 40px;
    margin-top: 60px;
`;

const Row =styled.div`
    display: flex;
    flex-direction: row;
`;

function CardGrid(props) {
    const menuData = props.menuData;
    let rows = []; 
    for (let i = 0; i < menuData.length; i += 2) {

        rows.push(
            <Row key={i}>

                <StyledMenuCard name={menuData[i].name} id={menuData[i].id} updateMenuSelection={props.updateMenuSelection} updateMenu={props.updateMenu} isFavorited={props.favoriteMenus.some((menu) => menu.id == menuData[i].id)} toggleFavoriteMenu={props.toggleFavoriteMenu}></StyledMenuCard>
                { (i+1) < menuData.length ? 
                    <StyledMenuCard name={menuData[i+1].name} id={menuData[i+1].id} updateMenuSelection={props.updateMenuSelection} updateMenu={props.updateMenu} isFavorited={props.favoriteMenus.some((menu) => menu.id == menuData[i+1].id)} toggleFavoriteMenu={props.toggleFavoriteMenu}></StyledMenuCard> 
                    :
                    null
                }
            </Row>
        );
    }
    return (
        <Grid>{rows}</Grid>
      );
}


const AllMenus = (props) => {
    const [menuData, setMenuData] = useState(null)

    useEffect(() => {
        updateMenuData()
    }, [props.menuData])

    const updateMenuData = () => {
        Client.getAllMenus().then((res) => {
            setMenuData(res.data);
        })
    }

    return (
        <>
            {
                menuData ? 
                <CardGrid
                    menuData={menuData}
                    {...props}
                /> :
                null
            }
        </>
    );
}

export { AllMenus }