import React, { useContext, useState } from 'react';

import { MenuContext } from "./menu-context" 
import { FormInput } from "../../form"

import styled from "styled-components"
import CheckIcon from "../../../assets/img/check-orange.png"
import EditIcon from "../../../assets/img/edit-icon.png"
import Client from "../../../util/client"

let StyledMenuTitle = styled.div`
    display: flex; 
    align-items: center;
    margin: 16px;
    margin-left: 0;

    #editBox {
        width: auto;
        margin-bottom: 0;
        padding: 10px;
    }

    .checkIcon {
        width: 20px;
        display: inline-block;
        margin-left: 16px;
        cursor: pointer;
    }

    .pencilIcon {
        width: 15px;
        margin-left: 16px;
        cursor: pointer;
        display: none;
    }

    &:hover{
        .pencilIcon {
            display: inline-block;
        }
    }

    .menuTitle {
        float: left;
        cursor: pointer;
        margin: 0;
    }
`

let MenuTitle = () => {
    let menuContext = useContext(MenuContext)
    let { menu, refreshMenu } = menuContext
    
    let [edit, setEdit] = useState(false)
    let [newName, setNewName] = useState(menu?.name)

    let enableEditing = () => {
        setNewName(menu.name)   
        setEdit(true);
    }

    let submitChange = async () => {
        // call api
        // refresh menu
        try {
            await Client.updateMenu(menu.id, {name: newName})
            refreshMenu()
        } finally {
            setEdit(false)
        }
    }

    return(
        <StyledMenuTitle>
            { edit ? 
                <>
                    <FormInput type='text' value={ newName } id='editBox' onChange={(event) => { setNewName(event.target.value) } }/>
                    <img className='checkIcon' src={CheckIcon} onClick={ submitChange }/>    
                </> :
                <>
                    <h1 className='menuTitle' onClick={ enableEditing }> { menu?.name } </h1>
                    <img src={EditIcon} className='pencilIcon'/>
                </> 
            }
        </StyledMenuTitle>
    )
}

// class MenuTitle extends React.Component {
//     constructor(props)  {
//         super(props);
//         this.state = {
//             editingMenuName: false,
//             textBoxContents: props.menuName,
//         }
//         this.textInput = React.createRef();
//     }

//     componentDidUpdate(prevProps) {
//         if(this.props.menuName != prevProps.menuName) {
//             this.setState({
//                 textBoxContents: this.props.menuName
//             });
//         }
//         if(this.textInput.current) {
//             this.textInput.current.focus();
//         }
//     }

//     changeMenuName = (e) => {
//         e.preventDefault();
//         if(this.state.textBoxContents && this.state.textBoxContents != this.props.menuName ) {
//             Client.updateMenu(this.props.menuId, {name: this.state.textBoxContents})
//             .then( (res) => {
//                 this.setState({
//                     editingMenuName: false,
//                     textBoxContents: this.props.menuName
//                 })
//                 this.props.updateMenu();
//             });
//         } else {
//             this.setState({
//                 editingMenuName: false,
//             })
//         }
//     }

//     render() {
//         if(this.state.editingMenuName) {
//             return (
//                 <StyledMenuTitle>
//                     <form className='changeNameForm' onSubmit={this.changeMenuName}>
//                         <input type='text' value={this.state.textBoxContents} id='editBox' ref={this.textInput}
//                             onChange={(event) => { this.setState({ textBoxContents: event.target.value }) }} 
//                             onFocus={(e) => { e.target.select() }} 
//                         />
//                         <input type='image' alt="Submit" className='checkIcon' src={CheckIcon} />
//                     </form>
//                 </StyledMenuTitle>
//             );
//         } else {
//             return (
//                 <StyledMenuTitle>
//                     <div>
//                         <h1 className='menuTitle'> {this.props.menuName} </h1>
//                         <img src={EditIcon} className='pencilIcon' onClick={ () => { 
//                             this.setState({
//                                 editingMenuName: true,
//                             })
//                         } }/>
//                     </div>
//                 </StyledMenuTitle>
//             );
//         }
//     }

// }

export {MenuTitle}