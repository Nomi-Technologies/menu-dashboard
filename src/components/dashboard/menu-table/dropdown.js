import React, { useState, useEffect } from 'react';

import { FormInput } from "../form"
import { FormButton, ButtonRow } from "../buttons"

import Client from '../../../util/client'

import styled from "styled-components"
import { Dropdown } from 'semantic-ui-react'
import _ from "lodash";
import { Multiselect } from 'multiselect-react-dropdown'

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
            categoryOptions: [],
            currCategory: '',
            categoryObjects: {},
        }

        Client.getAllCategoriesByMenu(props.menuId).then((res) => {
            let obj = {};
            for (let i = 0; i < res.data.length; i++) {
                obj[res.data[i].name] = res.data[i].id;
            }
            this.setState({ categoryObjects: obj });
        })

        Client.getMenu(props.menuId).then((res) => {
            console.log("client ", res.data)
            let data_category = res.data.Categories
            let nameArr = new Array(data_category.length)
            let currname;
            for (let i = 0; i < data_category.length; i++) {
                nameArr[i] = data_category[i].name;
                if (data_category[i].id === props.categoryId) {
                    currname = data_category[i].name
                }
            }
            this.setState({ currCategory: currname });
            console.log("this.state.currCategory", this.state.currCategory)
            let options = _.map(nameArr, (category, index) => ({
                key: index + 1,
                text: category,
                value: category
            }));
            this.setState({ categoryOptions: options, currCategory: currname });
        })


    }

    getCategory = (event, { value }) => {
        let categoryId = this.state.categoryObjects[value];
        this.props.updateSelection(categoryId); //id
        this.setState({ currCategory: value }); //name
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