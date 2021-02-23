import React, { useState, useEffect } from 'react';

import styled from "styled-components"
import EditIcon from "../../../assets/img/edit-orange.png"
import HeartIcon from "../../../assets/img/heart-active.png"
import HeartEmptyIcon from "../../../assets/img/heart-inactive.png"
import { FloatingMenu } from "../../dashboard/floating-menu"

import Client from "../../../util/client"
import { navigate } from 'gatsby';

const StyledMenuCard = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.1);
    border-radius: 8px;
    font-size: 18px;
    line-height: 26px;
    justify-content: space-between;
    display: flex;

    img {
        margin: 10px;
        cursor: pointer;
        width: 22px;
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

    const toggleFloatingMenu = () => {
        setIsFloatingMenuOpen(!isFloatingMenuOpen);
    }



    const navigateToMenu = (id) => {
        navigate('/dashboard/table', { state: { menuId: id } })
    }

    return (
        <>
            <StyledMenuCard {...props}>
                < MenuName onClick={() => navigateToMenu(props.id)}>{props.name}</MenuName>
                <div className='controls'>
                    {
                        props.isFavorited ?
                        <img alt="Unfavorite" src={HeartIcon} onClick={() => props.toggleFavoriteMenu(props.id, false)}/> :
                        <img alt="Favorite" src={HeartEmptyIcon} onClick={() => props.toggleFavoriteMenu(props.id, true)}/>
                    }
                    <img type='image' alt="Edit" src={EditIcon} onClick={toggleFloatingMenu}/>
                </div>
            </StyledMenuCard>
            {/* <FloatingMenu  // TODO: Fix this
                isOpen={isFloatingMenuOpen} 
                menuId={props.id} 
                updateMenu={props.updateMenu} 
                updateMenuSelection={props.updateMenuSelection} 
                updateMenuData={props.updateMenuData}
                onClickMenu={toggleFloatingMenu}
            /> */}
        </>
    );
}

export { MenuCard }