import React, { useState, useEffect } from "react"
import Client from "../../../util/client"
import styled from "styled-components"
import _ from "lodash"
import DropdownArrow from "../../../assets/img/dropdown-arrow.png"

let StyledCategoryDropdown = styled.div`
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 45%;
        right: 10px;
        height: 10px;
        width: 20px;
        background-repeat: no-repeat;
        background-image: url(${ DropdownArrow });
    }
 
    select {
        width: 100%;
        border-radius: 6px;
        background-color: #E1E7EC;
        opacity: 0.75;
        font-size: 14px;
        padding: 14px;
        padding-left: 20px;
        font-family: HK Grotesk Regular;
        box-sizing: border-box;
        border: none;
        margin: 10px 0;
        -webkit-appearance:none;
        -moz-appearance:none;
    }
`


let CategoryDropdown = (props) => {
    return (
        <StyledCategoryDropdown>
            <select onChange={ (event) => props.updateSelection(event.target.value) } value={ props.categoryId }>
                {
                    props.categories.length > 0 ? 
                    props.categories.map((category) => 
                        <option key={category.id} value={ category.id }>{ category.name }</option>
                    )
                    :
                    <option value={0}>Please create a category first.</option>
                }
            </select>
        </StyledCategoryDropdown>
    )
}

export { CategoryDropdown }