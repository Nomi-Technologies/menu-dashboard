import React, { useState, useEffect, useLayoutEffect } from 'react';

import styled from "styled-components"

import { FormButton, ButtonRow } from "../../../components/buttons" 

import { NewMenuForm } from "../../../components/dashboard/menu-creator/popup-forms";

import Client from "../../../util/client"

let StyledMenuCreator = styled.div`
    display: inline-flex;
    color: white;
    text-align: center;
    font-size: 24px;
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
        console.log("toggle new menu form")
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
                    <NewMenuForm updateMenuSelection={props.updateMenuSelection} updateHasMenu={props.updateHasMenu} toggleForm={toggleNewMenuForm}/>
                ) : null
            }
        </StyledMenuCreator>
    )
}

export { MenuCreator }