import React, { useState  } from 'react';

import styled from "styled-components"
import { NewMenuModal } from "../../../components/dashboard/modal/new-menu";
import MenuSettingsPage from '../../../pages/dashboard/menu-settings';


let StyledMenuCreator = styled.div`
    display: inline-flex;
    color: white;
    text-align: center;
    font-size: 14px;
    margin-top: 8px;

    .new-menu-button {
        color: #F3A35C;
        cursor: pointer;

        font-family: HK Grotesk regular;
        font-style: normal;
        font-weight: bold;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-feature-settings: 'cpsp' on;
        z-index: 1;
    }
`

const MenuCreator = (props) => {
    const [newMenu, setNewMenu] = useState(false)

    let newMenuPressed = () => {
        setNewMenu(!newMenu) 
    };
    
    return (
        <React.Fragment>
            <StyledMenuCreator>
                <div className="new-menu-button" onClick={newMenuPressed}>
                    + Add New Menu
                </div>

            </StyledMenuCreator>
            {
                newMenu ? (
                    <MenuSettingsPage newMenuPressed = {newMenuPressed}  menuId={null} editingMenu = {false} />
                ) : null
            }
      </React.Fragment>
    )
}

export { MenuCreator }