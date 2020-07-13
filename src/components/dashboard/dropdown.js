import React, { useState, useEffect } from 'react';

import {FormInput} from "../form"
import { FormButton, ButtonRow } from "../buttons" 

import Client from '../../util/client'


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

        Client.getDishes().then((res) => {
            console.log(res.data)
            this.state.data = res.data
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
                                <li key={item.id} onClick={()=>this.select(item)}>{item.name}</li>
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