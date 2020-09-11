import React, { useState  } from 'react';

import styled from "styled-components"
import { NewMenuModal } from "../../../components/dashboard/modal/new-menu";

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
    }
`

const MenuCreator = (props) => {
    const [showNewMenuForm, setNewMenuForm] = useState(false);
    
    const toggleNewMenuForm = () => {
        //if (!showNewMenuForm) closeAllForms() //if about to open form
        setNewMenuForm(!showNewMenuForm)
    }
    
    return (
        <StyledMenuCreator>
            <div className="new-menu-button" onClick={toggleNewMenuForm}>
                + Add New Menu
            </div>
            {
                showNewMenuForm ? (
                    <NewMenuModal updateMenuSelection={props.updateMenuSelection} updateHasMenu={props.updateHasMenu} toggleForm={toggleNewMenuForm}/>
                ) : null
            }
        </StyledMenuCreator>
    )
}

export { MenuCreator }