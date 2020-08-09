import React, { useState, useEffect } from 'react';

import { FormInput } from "../form"
import { FormButton, ButtonRow } from "../buttons"

import Client from '../../../util/client'

import styled from "styled-components"

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
        }

        this.showDropdown = this.showDropdown.bind(this)
        this.hideDropdown = this.hideDropdown.bind(this)

        Client.getMenu(props.menuId).then((res) => {
            console.log(res.data)
            this.state.data = res.data.Categories
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

    render() {
        return (
            <>
                <FormButton text={this.state.currentSelection} onClick={this.showDropdown} />
                {
                    this.state.displayList ? (
                        <Categories>
                            {
                                this.state.data.map((item) => (
                                    <div className='category' key={item.id} onClick={() => this.select(item)}>{item.name}</div>
                                ))
                            }
                        </Categories>
                    ) : null
                }
            </>
        )
    }
}

export { OldDropdown }