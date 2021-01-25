import React, { useState  } from 'react';

import styled from "styled-components"
import { NewMenuModal, useNewMenuModal } from "../../../components/dashboard/modal/new-menu";
import { Colors } from "../../../util/colors"

let StyledMenuCreator = styled.div`
    display: inline-flex;
    color: white;
    text-align: center;
    font-size: 14px;
    margin-top: 8px;

    .new-menu-button {
        color: ${ Colors.ORANGE };
        cursor: pointer;

        font-family: HK Grotesk regular;
        font-style: normal;
        font-weight: bold;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-feature-settings: 'cpsp' on;
        z-index: 4;
    }
`

const MenuCreator = (props) => {
    let [open, openModal, closeModal, createMenu, title, setTitle, fileContent, setFileContent, errorMessage, setErrorMessage] = useNewMenuModal(props.refreshMenu)
        
    return (
        <>
            <StyledMenuCreator>
                <div className="new-menu-button" onClick={ openModal }>
                    + Add New Menu
                </div>

            </StyledMenuCreator>
            <NewMenuModal 
                open={ open } 
                openModal={ openModal }  
                closeModal={ closeModal } 
                createMenu={ createMenu } 
                title={ title } 
                setTitle={ setTitle } 
                fileContent={ fileContent }
                setFileContent={ setFileContent } 
                errorMessage={ errorMessage } 
                setErrorMessage={ setErrorMessage }
            />
        </>
    )
}

export { MenuCreator }