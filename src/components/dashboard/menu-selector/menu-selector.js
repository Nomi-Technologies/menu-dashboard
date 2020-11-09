import React  from 'react';

import styled from "styled-components"

import { MenuCreator } from "../menu-creator/menu-creator"

import Client from "../../../util/client"

let StyledMenuSelector = styled.div`
    width: 100%;
`

const Menus = styled.div`
    .menu-creator {
        display: inline-block;
        width: auto;
    }
`

let ActiveIndicator = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 4px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  background-color: #628DEB;
  width: 100%;
`

const MenuTab = styled.div`
    position: relative;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 12px;
    font-family: HK Grotesk Regular;
    font-style: normal;
    font-weight: bold;
    font-feature-settings: 'cpsp' on;
    letter-spacing: 0.1em;
    display: inline-block;
    padding-bottom: 15px;
    margin-right: 50px;
    box-sizing: border-box;
    border-radius: 5px;   
    cursor: pointer;
    color: ${ props => props.selected ? "#628DEB" : "#8A9DB7"};
    text-align: center;
`

class MenuSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedMenuId: this.props.selectedMenuId
        }
        this.updateData();
    }

    componentDidUpdate(prevProps) {
        // TODO(Tommy): avoid refreshing when only switching menus
        // Used for when creating/deleting menus but also gets called when switching
        if (prevProps.favoriteMenus.length === 0 && this.props.favoriteMenus.length > 0 && this.props.selectedMenuId != 'all-menus') { //change default menu when favorites load
            this.setState({selectedMenuId: null});
            this.props.updateMenuSelection(null);
        }
        if (this.props.selectedMenuId !== prevProps.selectedMenuId || this.props.selectedMenuName !== prevProps.selectedMenuName || this.props.favoriteMenus !== prevProps.favoriteMenus) {
            this.updateData();
        }
    }

    updateData() {
        Client.getAllMenus().then((res) => {
            this.setState({data: res.data, selectedMenuId: this.props.selectedMenuId})
            if (this.props.selectedMenuId === null) { //first render, no menu selected
                if (res.data.length === 0) { //no menu created yet
                    this.props.updateHasMenu(false)
                }
                else { //display first menu
                    if(this.props.favoriteMenus.length > 0 ) { //display first favorite menu
                        this.setState({selectedMenuId: this.props.favoriteMenus[0].id});
                        this.props.updateMenuSelection(this.props.favoriteMenus[0])
                    } else { //no favorites, display first menu
                        this.setState({selectedMenuId: res.data[0].id});
                        this.props.updateMenuSelection(res.data[0])
                    }
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

    viewAllMenus() {
        this.setState({selectedMenuId: 'all-menus'});
        this.props.updateMenuSelection('all-menus');
    }

    render() {
        return (
            <StyledMenuSelector>
                <Menus>
                    <MenuTab onClick={()=>this.viewAllMenus()} selected={'all-menus'===this.state.selectedMenuId}>
                        See All Menus
                        { 'all-menus'===this.state.selectedMenuId ? <ActiveIndicator/> : "" }
                    </MenuTab>
                    {
                        this.props.favoriteMenus.length > 0?
                        this.props.favoriteMenus.map((item) => (
                            <React.Fragment key={item.id}>
                                <MenuTab onClick={()=>this.select(item)} selected={item.id===this.state.selectedMenuId}>
                                    { item.name }
                                    { item.id===this.state.selectedMenuId ? <ActiveIndicator/> : "" }
                                </MenuTab>
                                
                            </React.Fragment>
                        )) :
                        this.state.data.map((item) => (
                            <React.Fragment key={item.id}>
                                <MenuTab onClick={()=>this.select(item)} selected={item.id===this.state.selectedMenuId}>
                                    {item.name}
                                    { item.id===this.state.selectedMenuId ? <ActiveIndicator/> : "" }
                                </MenuTab>
                                
                            </React.Fragment>
                        ))
                    }
                    <MenuCreator className="menu-creator" updateMenuSelection={this.props.updateMenuSelection} updateHasMenu={this.props.updateHasMenu}/>
                </Menus>
            </StyledMenuSelector>
        )
    }
}

export { MenuSelector }