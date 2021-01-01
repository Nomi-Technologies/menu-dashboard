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
    max-width: 1400px;
`;

const Row =styled.div`
    display: flex;
    flex-direction: row;
`;


function CardGrid(props) {
    const menus = props.menus;
    let rows = []; 
    for (let i = 0; i < menus.length; i += 2) {
        rows.push(
            <Row key={i}>
                <StyledMenuCard 
                    name={menus[i].name} 
                    id={menus[i].id} 
                    isFavorited={props.favoriteMenus?.some((menu) => menu.id == menus[i].id)} 
                    // toggleFavoriteMenu={ props.toggleFavoriteMenu }
                    getMenus={ props.getMenus }
                ></StyledMenuCard> 
                { (i+1) < menus.length ? 
                    <StyledMenuCard 
                        name={menus[i+1].name} 
                        id={menus[i+1].id} 
                        isFavorited={props.favoriteMenus?.some((menu) => menu.id == menus[i+1].id)} 
                        // toggleFavoriteMenu={ props.toggleFavoriteMenu }
                        getMenus={ props.getMenus }
                    ></StyledMenuCard> 
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
    const [menus, setMenus] = useState(null)
    const [favoriteMenus, setFavoriteMenus] = useState(null)

    useEffect(() => {
        getMenus()
    }, [])

    const getMenus = async () => {
        await Client.getAllMenus().then((res) => {
            console.log(res.data)
            setMenus(res.data);
        })

        await Client.getFavoriteMenus().then((res) => {
            setFavoriteMenus(res.data);
        })
    }

    const toggleFavoriteMenu = (menuId, favorite) => {
        // Client.favoriteMenu(menuId, favorite).then((res) => {
        //     Client.getFavoriteMenus().then((res) => {
        //         // setFavoriteMenus(res.data);
        //     })
        // }) 
    }

    return (
        <>
            {
                menus ? 
                <CardGrid
                    menus={ menus }
                    favoriteMenus={ [] }
                    getMenus={ getMenus }
                    toggleFavoriteMenu={ toggleFavoriteMenu }
                    {...props}
                /> :
                null
            }
        </>
    );
}

export { AllMenus }