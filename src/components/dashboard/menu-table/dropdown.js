import React, { useState, useEffect } from 'react';

import { FormInput } from "../form"
import { FormButton, ButtonRow } from "../buttons"

import Client from '../../../util/client'

import styled from "styled-components"
import { Dropdown } from 'semantic-ui-react'
import _ from "lodash";

const Categories = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .category {
        padding: 5px 10px;
        margin: 5px 0;
        border: 2px solid #F3A35C;
        box-sizing: border-box;
        flex-basis: 45%; 
        border-radius: 5px;   
        cursor: pointer;
        color: #F3A35C;
    }
`

class CategoryDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayList: false,
            data: [],
            currentSelection: '',
            categoryOptions: [],
            categoryNames: [],
            currCategory: '',
        }

        this.showDropdown = this.showDropdown.bind(this)
        this.hideDropdown = this.hideDropdown.bind(this)

        //let categoryOptions = [];

        Client.getMenu(props.menuId).then((res) => {
            console.log("client ", res.data)
            this.state.data = res.data.Categories

            for (let i = 0; i < res.data.Categories.length; i++) {
                this.state.categoryNames[i] = res.data.Categories[i].name;
            }
            this.state.categoryOptions = _.map(this.state.categoryNames, (category, index) => ({
                key: index + 1,
                text: category,
                value: category
            }));
            this.setState({ currCategory: this.state.categoryNames[props.categoryId - 1] });
        })

        if (typeof this.props.categoryId !== 'undefined') {
            Client.getCategory(this.props.categoryId).then((res) => {
                this.state.currentSelection = res.data.name
            })
        }
        else {
            this.state.currentSelection = this.props.placeholder
        }
    }

    getCategory = (event, { value }) => {
        let categoryId = this.state.categoryNames.indexOf(value) + 1;
        this.props.updateSelection(categoryId);
        this.state.currCategory = this.state.categoryNames[categoryId - 1];
    }

    render() {
        return (
            < Dropdown
                style={{
                    marginTop: "10px",
                }}
                placeholder='Start typing to begin...'
                fluid
                search
                selection
                value={this.state.currCategory}
                options={this.state.categoryOptions}
                onChange={this.getCategory}
            />
        )
    }
}

export { CategoryDropdown }