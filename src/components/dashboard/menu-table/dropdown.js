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

class OldDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayList: false,
            data: [],
            currentSelection: '',
            categoryOptions: [],
            categoryNames: []
        }

        this.showDropdown = this.showDropdown.bind(this)
        this.hideDropdown = this.hideDropdown.bind(this)

        //let categoryOptions = [];

        Client.getMenu(props.menuId).then((res) => {
            console.log("client ", res.data)
            this.state.data = res.data.Categories
            console.log("getting data", this.state.data);

            for (let i = 0; i < res.data.Categories.length; i++) {
                this.state.categoryNames[i] = res.data.Categories[i].name;
            }
            console.log("cate names", this.state.categoryNames);
            this.state.categoryOptions = _.map(this.state.categoryNames, (category, index) => ({
                key: index + 1,
                text: category,
                value: category
            }));
            console.log(this.state.categoryOptions);
        })

        if (typeof this.props.categoryId !== 'undefined') {
            console.log("prop", props);
            Client.getCategory(this.props.categoryId).then((res) => {
                this.state.currentSelection = res.data.name
            })
        }
        else {
            this.state.currentSelection = this.props.placeholder
        }
        console.log("old data", this.state.data);
        console.log("another prop id", props.menuId);
    }



    showDropdown(event) {
        event.preventDefault()
        console.log("showDropdown")
        this.setState({ displayList: true }, () => {
            document.addEventListener('click', this.hideDropdown)
        });
    }

    hideDropdown() {
        this.setState({ displayList: false }, () => {
            document.removeEventListener('click', this.hideDropdown)
        });
    }

    select(item) {
        this.setState({ currentSelection: item.name });
        this.props.updateSelection(item)
    }

    getCategory = (event, { value }) => {
        console.log("dropdown arr", value);
        //this.setState.currentSelection = value;
        let categoryId = this.state.categoryNames.indexOf(value) + 1;
        console.log("id is", categoryId);
        this.props.updateSelection(categoryId);


        // let newAllergen = event.target.textContent;
        // console.log(newAllergen);
        // let arr = []
        // for (let i = 0; i < value.length; i++) {
        //     console.log("each", value[i]);
        //     let arrIdx = allergenNames.indexOf(value[i]) + 1;
        //     arr.push(arrIdx)
        // }
        // console.log("arr ", arr);
        // setSelectedTags(arr);
        // setTags(arr);
        // console.log("selected tags: ", selectedTags);
        // console.log("tags: ", tags);
    }

    render() {
        return (
            // <FormButton text={this.state.currentSelection} onClick={this.showDropdown} />
            //     {
            //         this.state.displayList ? (
            //             <Categories>
            //                 {
            //                     this.state.data.map((item) => (
            //                         <div className='category' key={item.id} onClick={() => this.select(item)}>{item.name}</div>
            //                     ))
            //                 }
            //             </Categories>
            //         ) : null
            //     }
            < Dropdown
                placeholder='Start typing to begin...'
                fluid
                search
                selection
                options={this.state.categoryOptions}
                onChange={this.getCategory}
            />
        )
    }
}

export { OldDropdown }