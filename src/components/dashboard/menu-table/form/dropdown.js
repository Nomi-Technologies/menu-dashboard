import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import DropdownArrow from "../../../../assets/img/dropdown-arrow.png"
import Client from "../../../../util/client"

let StyledCategoryDropdown = styled.div`
    margin-bottom: 24px;
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
        font-size: 16px;
        padding: 16px;
        padding-left: 20px;
        font-family: HK Grotesk Regular;
        box-sizing: border-box;
        border: none;
        -webkit-appearance:none;
        -moz-appearance:none;
    }
`


let CategoryDropdown = (props) => {
    let [categories, setCategories] = useState([])

    useEffect(() => { 
        Client.getAllCategoriesByMenu(props.menuId).then(response => {
            setCategories(response.data)
        })
    },[])
    
    return (
        <StyledCategoryDropdown>
            <select onChange={ (event) => props.updateSelection(event.target.value) } value={ props.categoryId }>
                <option value={0}>Please create a category first.</option>
                {
                    categories.length > 0 ? 
                        categories.map((category) => 
                            <option key={category.id} value={ category.id }>{ category.name }</option>
                        ) : ""
                }
            </select>
        </StyledCategoryDropdown>
    )
}

export { CategoryDropdown }