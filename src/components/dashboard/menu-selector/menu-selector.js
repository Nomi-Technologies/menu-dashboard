import React, { useState, useEffect, useLayoutEffect } from 'react';

import styled from "styled-components"

import { MenuCreator } from "../menu-creator/menu-creator"

import Client from "../../../util/client"

let StyledMenuSelector = styled.div`
    text-transform: uppercase;
    font-size: 24px;
    line-height: 12px;
    font-family: HK Grotesk Regular;
    font-style: normal;
    font-weight: bold;
    font-feature-settings: 'cpsp' on;
    letter-spacing: 0.1em;
    width: 100%;
    padding-bottom: 20px;
`

const Menus = styled.div`
    .menu-creator {
        display: inline-block;
        width: auto;
    }
`

const MenuTab = styled.div`
    display: inline-block;
    padding-bottom: 10px;
    margin-bottom: 15px;
    margin-right: 50px;
    box-sizing: border-box;
    border-radius: 5px;   
    cursor: pointer;
    color: black;
    border-bottom: ${ props => props.selected ? "3px solid #F3A35C" : ""};
    text-align: center;
`

class MenuSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            selectedMenuId: this.props.selectedMenuId,
        }

        this.updateData();
    }

    componentDidUpdate(prevProps) {
        // TODO(Tommy): avoid refreshing when only switching menus
        // Used for when creating/deleting menus but also gets called when switching
        if (this.props.selectedMenuId != prevProps.selectedMenuId) {
            this.updateData();
        }
    }

    updateData() {
        Client.getAllMenus().then((res) => {
            console.log(this.props)
            console.log(res.data)
            this.setState({data: res.data, selectedMenuId: this.props.selectedMenuId})
            console.log(this.state)

            if (this.props.selectedMenuId === null) { //first render, no menu selected
                if (res.data.length === 0) { //no menu created yet
                    console.log("no menu exists")
                    this.props.updateHasMenu(false)
                }
                else { //display first menu
                    console.log("has menu; show first one")
                    this.setState({selectedMenuId: res.data[0].id});
                    this.props.updateMenuSelection(res.data[0])
                }
            }
            else {
                if (this.props.selectedMenuId !== null) { //menu already selected
                    
                }
            }
        })
    }

    select (item) {
        this.setState({selectedMenuId: item.id});
        this.props.updateMenuSelection(item)
    }

    render() {
        return (
            <StyledMenuSelector>
                <Menus>
                    {
                        this.state.data.map((item) => (
                            <MenuTab key={item.id} onClick={()=>this.select(item)} selected={item.id==this.state.selectedMenuId}>
                                {item.name}
                            </MenuTab>
                       ))
                    }
                    <MenuCreator className="menu-creator" updateMenuSelection={this.props.updateMenuSelection} updateHasMenu={this.props.updateHasMenu}/>
                </Menus>
            </StyledMenuSelector>
        )
    }
}

export { MenuSelector }