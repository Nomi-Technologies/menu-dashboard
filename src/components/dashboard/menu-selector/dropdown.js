import React, { useState, useEffect } from 'react';

import {FormInput} from "../../form"
import { FormButton, ButtonRow } from "../../buttons" 

import Client from '../../../util/client'

import styled from "styled-components"

const Menus = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .menu {
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

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayList: false,
            data: [],
            currentSelection: '',
        }

        this.showDropdown = this.showDropdown.bind(this)
        this.hideDropdown = this.hideDropdown.bind(this)

        Client.getAllMenus().then((res) => {
            this.state.data = res.data

            if (this.props.menuId === null) { //first render, no menu selected
                if (res.data.length === 0) { //no menu created yet
                }
                else { //display first menu
                    this.setState({currentSelection: res.data[0].name});
                    this.props.updateSelection(res.data[0])
                }
            }
            else {
                if (this.props.menuId !== null) { //menu already select
                    Client.getMenu(this.props.menuId).then((res) => {
                        this.state.currentSelection = res.data.name
                    })
                }
            }
        })
    }

    showDropdown (event) {
        event.preventDefault()
        this.setState({displayList: true}, () => {
            document.addEventListener('click', this.hideDropdown)
        });
    }

    hideDropdown () {
        this.setState({displayList: false}, () => {
            document.removeEventListener('click', this.hideDropdown)
        });
    }

    select (item) {
        this.setState({currentSelection: item.name});
        this.props.updateSelection(item)
    }

    render() {
        return (
            <>
                <FormButton text={this.state.currentSelection} onClick={this.showDropdown} />
                {
                this.state.displayList ? (
                    <ul>
                        {
                            this.state.data.map((item) => (
                                <li className='menu' key={item.id} onClick={()=>this.select(item)}>{item.name}</li>
                            ))
                        }
                    </ul>
                ) : null
                }
            </>
        )
    }
}

export {Dropdown}