import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom'

import Client from '../../util/client'

import styled from "styled-components"
import { Column, Table } from 'react-virtualized'
import ArrowIcon from "../../assets/img/arrow_icon.png"

import EditIconGrey from "../../assets/img/edit-grey.png"
import EditIconOrange from "../../assets/img/edit-orange.png"

import CheckIconGrey from "../../assets/img/check-black.png"
import CheckIconOrange from "../../assets/img/check-orange.png"

import {NewDishForm, NewCategoryForm, EditDishForm, EditCategoryForm} from "./popup-forms"

const StyledMenuTable = styled.div`
    width: 100%;
    max-width: 100%;
    transition: 0.5s ease-in-out all;
    margin-bottom: 20px;
`


const TableCell = styled.div`
    display: flex;
    min-height: 48px;
    box-sizing: border-box;
    align-items: center;
    padding-right: 10px;
    text-overflow: ellipsis;
    min-width: 0px;
    max-width: 100%;

    input, textarea {
        width: 100%;
        height: 50%;
        padding-left: 8px;
        font-size: 16px;
        resize: none;
    }

    input, textarea:focus {
        position: relative;
        height: auto;
        overflow: wrap;
    }

    p {
        padding: 0;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

const TableRow = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    min-width: 0px;
    flex-direction: row;
    box-sizing: border-box;
    padding-left: 52px;
    background-color: #f9f9f9;
    

    ${TableCell}:nth-child(1) {
        flex-basis: 20%;
    }

    ${TableCell}:nth-child(2) {
        flex-basis: 50%;
    }

    ${TableCell}:nth-child(3) {
        flex-basis: 30%;
    }

    &:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .edit {
        position: absolute;
        width: 11px;
        right: 20px;
        cursor: pointer;
    }
`

const StyledItemRow = styled(TableRow)`

    &.opened {
        height: inherit;
    }

    &:not(:first-child) {
        border-top: 1px #88929E solid;
    }

`

const ItemRow = ({ item, updateMenu, catId }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [id, setId] = useState(item.id)
    const [categoryId, setCategoryId] = useState(catId);

    const toggleMenu = () => {
        if(!displayMenu) {
            setDisplayMenu(true);
        } else {
            setDisplayMenu(false)
        }

        console.log(displayMenu)
    }

    const enableEdit = () => {
        console.log("in edit item")
        setEditMode(true)
        toggleMenu()
    }

    const closeEditForm = () => {
        setEditMode(false)
    }

    const deleteItem = () => {
        console.log("in delete item")
        Client.deleteDish(id).then((res) => {
            console.log(res);
            updateMenu(categoryId)
            setEditMode(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const submit = () => {
        // send update to API from edit field
        console.log("in update dish")
        Client.updateDish(id, {name: name, description: description}).then(() => {
            setEditMode(false)
        }).catch((err) => {
            Client.getDish(item.id).then((oldItem) => {
                setName(oldItem.name)
                setDescription(oldItem.description)
                setCategoryId(oldItem.categoryId)
            })
            console.error(err)
        })
    }

    return (
        <StyledItemRow className='opened'>
            {
                !editMode ? 
                (
                    <>
                        <TableCell>
                            <p>
                                { name }
                            </p>
                        </TableCell>
                        <TableCell>
                            <p>
                                { description }
                            </p>
                            
                        </TableCell>
                        <TableCell>
                            <p>
                                { allergen_list(item.tags) }
                            </p>
                            
                            <img className='edit' src={ EditIconGrey } onClick={ toggleMenu }/>
                        </TableCell>  
                    </>
                ) : (
                    <>
                        <TableCell>
                            <input name='name' defaultValue={ name } onChange={(event) => { setName(event.target.value) } }/>
                        </TableCell>
                        <TableCell>
                            <textarea name='description' defaultValue={ description } onChange={(event) => { setDescription(event.target.value) } }/>
                        </TableCell>
                        <TableCell>
                            { allergen_list(item.tags) }
                            <img className='edit' src={ CheckIconGrey } onClick={ submit }/>
                        </TableCell>  
                        {/*<EditDishForm dish={item} toggleForm={closeEditForm}/>*/}
                    </>
                )
            }
            <OptionMenu display={ displayMenu } onEdit={ enableEdit } onDelete={deleteItem}/>
        </StyledItemRow>
    )
}


const HeaderRow = styled(TableRow)`
    background-color: #C4C4C4;
    color: white;
    text-transform: uppercase;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`

const CategoryHeaderRow = styled(TableRow)`
    background: #FEEBDA;
    color: #F3A35C;

    .collapse-icon {
        position: absolute;
        width: 12px;
        height: 6px;
        margin-left: -38px;
        padding: 9px 7px;
        background-color: #F3A35C;
        border-radius: 4px;
        cursor: pointer;
    }
`

const allergen_list = ( allergens ) => {
    if(allergens.length === 0) {
        return '--'
    }

    let list = ''
    
    allergens.forEach((element, idx) => {
        if(idx !== allergens.length - 1) {
            list += element.name + ', '
        } else {
            list += element.name
        }
    });

    return list
}

const StyledTableCategory = styled.div`
    transition: 0.4s ease all;

    .collapse-icon {
        transform: rotate(180deg);
        transition: 0.2s ease-in-out all;
    }

    .items {
        display: none;
        max-height: 0;
        transition: 0.5s ease-in-out all;
    }

    &.open {
        .items {
            max-height: none;
            display: block;
        }
        
        .collapse-icon {
            transform: none;
        }
    }
`

// Subitem for each cateogry in the menu.  Contains a list of item rows
// Can be toggled on and off, and can be deleted
const TableCategory = ({ category, updateMenu }) => {
    const [name, setName] = useState(category.name)
    const [open, setOpen] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState(category.id)

    const toggleOpen = () => {
        if(open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    const toggleMenu = () => {
        if(!displayMenu) {
            setDisplayMenu(true);
        } else {
            setDisplayMenu(false)
        }
    }

    const enableEdit = () => {
        setEditMode(true)
        toggleMenu()
    }

    const closeEditForm = () => {
        setEditMode(false)
    }

    const deleteCategory = () => {
        console.log("in delete category")
        Client.deleteCategory(id).then((res) => {
            console.log(res);
            updateMenu()
            setEditMode(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const submit = () => {
        // send update to API from edit field
        console.log("in update category")
        Client.updateCategory(id, {name: name}).then(() => {
            setEditMode(false)
        }).catch((err) => {
            Client.getCategory(category.id).then((oldCategory) => {
                setName(oldCategory.name)
                setId(oldCategory.id)
            })
            console.error(err)
        })
    }

    return (
        <StyledTableCategory className={ open ? 'open' : '' }>
            <CategoryHeaderRow>
                <TableCell>
                    <img className='collapse-icon' src={ ArrowIcon } onClick={ toggleOpen }/>
                    { 
                    !editMode ? 
                        (
                            <>
                                { name }
                                <img className='edit' src={ EditIconOrange } onClick={ toggleMenu }/>
                            </>
                        ) : (
                            <>
                                <input className='edit-field' defaultValue={name} onChange={(event) => { setName(event.target.value) }}></input>
                                <img className='edit' src={CheckIconOrange} onClick={ submit }/>
                                {/*<EditCategoryForm category={category} toggleForm={closeEditForm}/>*/}
                            </>
                        )
                    }
                </TableCell>
                <OptionMenu display={ displayMenu } onEdit={ enableEdit } onDelete={deleteCategory}/>
            </CategoryHeaderRow>
            <div className='items'>
                {
                    category ? 
                    category.dishes.map((item, index) => (
                        <ItemRow key={ index } item={ item } updateMenu={updateMenu}
                            catId={id}/>
                    )) : 
                    ''
                }
            </div>
        </StyledTableCategory>
    )
}

const StyledOptionMenu = styled.div`
    position: absolute;
    background-color: white;
    border-radius: 8px;
    color: black;
    box-shadow: 2px 2px 2px grey;
    font-size: 14px;
    right: -20px;
    top: 40px;
    overflow: hidden;
    z-index: 4;

    display: ${({shouldDisplay}) => shouldDisplay ? 'block' : 'none'};


    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        padding: 5px 10px;
        cursor: pointer;

        &:hover {
            background-color: #F0F0F0;
        }
    }

`

const OptionMenu = (props) => {
    return (
        <StyledOptionMenu shouldDisplay={props.display}>
            <ul>
                <li onClick={props.onEdit}>Edit</li>
                <li onClick={props.onDelete}>Delete</li>
            </ul>
        </StyledOptionMenu>
    )    
}

const MenuControls = styled.div`
    display: flex;
    text-transform: uppercase;
    margin-bottom: 20px;
    justify-content: space-between;
    width: 100%;

    .search {
        padding: 10px 20px;
        background-color: #F9F9F9;
        font-size: 14px;
        padding-left: 10px;
        border-radius: 8px;
        border: 2px #E3EBF2 solid;
        flex-basis: 50%;
    }

    .buttons {
        display: flex;
        color: white;
        align-self: flex-end;
        text-align: center;
        font-size: 14px;

        .new-dish {
            background-color: #F3A35C;
            padding: 10px 20px;
            text-align: center;
            border: 2px solid #F3A35C;
            border-radius: 8px;
            cursor: pointer;
        }

        .new-category {
            border: 2px solid #F3A35C;
            padding: 10px 20px;
            color: #F3A35C;
            border-radius: 8px;
            margin-right: 10px;
            cursor: pointer;
        }
    }
`

// Overall component which renders the table as a list of menu categories
const MenuTable = () => {
    const [menuData, setMenuData] = useState()
    const [showNewDishForm, setNewDishForm] = useState(false);
    const [showNewCategoryForm, setNewCategoryForm] = useState(false);

    useEffect(() => {
        Client.getDishes().then((response) => {
            console.log("menu init")
            setMenuData(response.data)
            console.log(response.data)
        })
    }, [])

    const updateMenu = (categoryId) => {
        Client.getDishes().then((res) => {
            console.log("update menu")
            console.log(res.data)
            setMenuData(null)
            setMenuData(res.data)

            /*
            console.log(menuData)
            var i
            for (i=0; i<res.data.length; i++) {
                if (res.data[i].id === categoryId) {
                    break
                }
            }
            console.log(i)
            var newMenuData = menuData
            newMenuData[i].dishes = []
            setMenuData(newMenuData)
            setMenuData(res.data)
            */
            
        })
    };

    const toggleNewDishForm = () => {
        console.log("toggle new dish form")
        setNewDishForm(!showNewDishForm)
    }

    const toggleNewCategoryForm = () => {
        console.log("toggle new category form")
        setNewCategoryForm(!showNewCategoryForm)
    }

    return (
        <>
            <MenuControls>
                <input className='search' name='search' placeholder='DISH SEARCH'/> 
                <div className='buttons'>
                    <div className='new-category' onClick={toggleNewCategoryForm}>New Menu Category</div> 
                    <div className='new-dish' onClick={toggleNewDishForm}>New Dish</div>               
                </div>
            </MenuControls>  
            {
                showNewDishForm ? (
                    <NewDishForm toggleForm={toggleNewDishForm} updateMenu={updateMenu}/>
                ) : null
            }
            {
                showNewCategoryForm ? (
                    <NewCategoryForm toggleForm={toggleNewCategoryForm} updateMenu={updateMenu}/>
                ) : null
            } 
            <StyledMenuTable>
                <HeaderRow>
                    <TableCell>
                        Title
                    </TableCell>
                    <TableCell>
                        Description
                    </TableCell>
                    <TableCell>
                        Allergens
                    </TableCell>
                </HeaderRow>
                {/* <TableCategory categoryTitle='Appetizers' category={ menu['Appetizers'] }></TableCategory>
                <TableCategory categoryTitle='Pastas' category={ menu['Pastas'] }></TableCategory> */}


                   { 
                        menuData ? menuData.map((item) => (
                            <TableCategory category={ item } updateMenu={updateMenu}></TableCategory>
                        )) : ''

                    }
            </StyledMenuTable>
        </>
    )
}

export { MenuTable } 