import React, { useState, useEffect, useLayoutEffect } from 'react';

import styled from "styled-components"

import { Dropdown } from "../../../components/dashboard/menu-selector/dropdown";

import Client from "../../../util/client"

let StyledMenuSelector = styled.h1`
    text-transform: uppercase;
    font-size: 32px;
    line-height: 38px;
    padding-top: 104px;
`

const MenuSelector = (props) => {
    const [menuTitle, setMenuTitle] = useState("")

    useEffect(() => {
        Client.getMenu(props.menuId).then((res) => {
            console.log(res.data.name)
            setMenuTitle(res.data.name)
        })
    }, [props.menuId])

    const updateSelection = (menu) => {
        props.updateMenuSelection(menu)
    }

    return(
        <>
            <StyledMenuSelector>
                <Dropdown updateSelection={updateSelection} menuId={props.menuId}></Dropdown>
            </StyledMenuSelector>
        </>
    )
}

export { MenuSelector }