import React, { useState, useEffect } from 'react';

import styled from "styled-components"
import EditIcon from "../../../assets/img/edit-orange.png"
import HeartIcon from "../../../assets/img/heart-active.png"
import HeartEmptyIcon from "../../../assets/img/heart-inactive.png"
import { FloatingMenu } from "../../floating-menu"

import Client from "../../../util/client"

const Button = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.1);
    border-radius: 8px;
    font-size: 18px;
    line-height: 26px;
    justify-content: space-between;
    display: flex;
    input {
        margin: 5px;
    }
    .controls {
        margin-right: 15px;
        display: flex;
        align-items: center;
    }
`;

const MenuName = styled.div`
    float: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
    width: 50%;
`;

const MenuCard = (props) => {
    const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);
    const [isFavorite, setisFavorite] = useState(false);

    const toggleFloatingMenu = () => {
        setIsFloatingMenuOpen(!isFloatingMenuOpen);
    }

    const toggleFavorite = () => {
        setisFavorite(!isFavorite);
        //add to database props.id and user id
        Client.favoriteMenu(props.id).then((res) => {

        })
    }

    const navigateToMenu = (id) => {
        const item = {
            "id": id,
        }
        props.updateMenuSelection(item)
    }

    return (
        <>
            <Button {...props}>
                < MenuName onClick={() => navigateToMenu(props.id)}>{props.name}</MenuName>
                <div className='controls'>
                    {
                        isFavorite ?
                        <input type='image' alt="Unfavorite" src={HeartIcon} onClick={toggleFavorite}/> :
                        <input type='image' alt="Favorite" src={HeartEmptyIcon} onClick={toggleFavorite}/>
                    }
                    
                    <input type='image' alt="Edit" src={EditIcon} onClick={toggleFloatingMenu}/>
                </div>
            </Button>
            <FloatingMenu 
                isOpen={isFloatingMenuOpen} 
                menuId={props.id} 
                updateMenu={props.updateMenu} 
                updateMenuSelection={props.updateMenuSelection} 
                onClickMenu={toggleFloatingMenu}
            />
        </>
    );
}

export { MenuCard }