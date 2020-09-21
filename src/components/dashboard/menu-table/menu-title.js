import React  from 'react';

import styled from "styled-components"
import CheckIcon from "../../../assets/img/check-orange.png"
import EditIcon from "../../../assets/img/edit-icon.png"
import Client from "../../../util/client"

let StyledMenuTitle = styled.div`
    .changeNameForm {
        margin-right: 50px;
        display: inline-block;
        position: relative;
        margin-bottom: 21.40px;
        margin-top: 10px;
        height: 39px;
    }

    #editBox {
        background-color: #F9F9F9;
        font-size: 1.2em;
        border: 2px #E3EBF2 solid;
        border-radius: 10px;
        padding: 10px;
    }

    .checkIcon {
        width: 20px;
        display: inline-block;
        margin-left: 10px;
        position: absolute;
        top: 30%;
    }

    .pencilIcon {
        width: 15px;
        margin-top: 20px;
        margin-left: 10px;
        cursor: pointer;
    }

    .menuTitle {
        float: left;
        margin-top: 10px;
    }
`

class MenuTitle extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {
            editingMenuName: false,
            textBoxContents: props.menuName,
        }
        this.textInput = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if(this.props.menuName != prevProps.menuName) {
            this.setState({
                textBoxContents: this.props.menuName
            });
        }
        if(this.textInput.current) {
            this.textInput.current.focus();
        }
    }

    changeMenuName = (e) => {
        e.preventDefault();
        if(this.state.textBoxContents && this.state.textBoxContents != this.props.menuName ) {
            console.log('updating name');
            Client.updateMenu(this.props.menuId, {name: this.state.textBoxContents})
            .then( (res) => {
                this.setState({
                    editingMenuName: false,
                    textBoxContents: this.props.menuName
                })
                this.props.updateMenu();
            });
        } else {
            this.setState({
                editingMenuName: false,
            })
        }
    }

    render() {
        if(this.state.editingMenuName) {
            return (
                <StyledMenuTitle>
                    <form className='changeNameForm' onSubmit={this.changeMenuName}>
                        <input type='text' value={this.state.textBoxContents} id='editBox' ref={this.textInput}
                            onChange={(event) => { this.setState({ textBoxContents: event.target.value }) }} 
                            onFocus={(e) => { e.target.select() }} 
                        />
                        <input type='image' alt="Submit" className='checkIcon' src={CheckIcon} />
                    </form>
                </StyledMenuTitle>
            );
        } else {
            return (
                <StyledMenuTitle>
                    <div>
                        <h1 className='menuTitle'> {this.props.menuName} </h1>
                        <img src={EditIcon} className='pencilIcon' onClick={ () => { 
                            this.setState({
                                editingMenuName: true,
                            })
                        } }/>
                    </div>
                </StyledMenuTitle>
            );
        }
    }

}

export {MenuTitle}