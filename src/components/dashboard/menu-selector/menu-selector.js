import React, { useState, useEffect, useLayoutEffect } from 'react';

import styled from "styled-components"

import Client from "../../../util/client"

let StyledMenuSelector = styled.h1`
    text-transform: uppercase;
    font-size: 32px;
    line-height: 38px;
`

const Menus = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const MenuTab = styled.div`
    padding-bottom: 15px;
    margin-right: 30px;
    box-sizing: border-box;
    flex-basis: 15%; 
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

        Client.getAllMenus().then((res) => {
            console.log(props)
            console.log(res.data)
            this.state.data = res.data

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
                if (this.props.menuId !== null) { //menu already selected
                    
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
                </Menus>
            </StyledMenuSelector>
        )
    }
}

export { MenuSelector }