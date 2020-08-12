import React, { useState, useEffect, useLayoutEffect } from 'react';

import { FormButton, ButtonRow } from "../../../components/buttons" 

import { NewMenuForm } from "../../../components/dashboard/menu-creator/popup-forms";

import Client from "../../../util/client"

const MenuCreator = (props) => {
    const [showNewMenuForm, setNewMenuForm] = useState(false);
    
    const toggleNewMenuForm = () => {
        console.log("toggle new menu form")
        //if (!showNewMenuForm) closeAllForms() //if about to open form
        setNewMenuForm(!showNewMenuForm)
    }
    
    return (
        <>
            <FormButton text="New Menu" onClick={toggleNewMenuForm} />
            {
                showNewMenuForm ? (
                    <NewMenuForm toggleForm={toggleNewMenuForm} updateMenuSelection={props.updateMenuSelection}/>
                ) : null
            }
        </>
    )
}

export { MenuCreator }