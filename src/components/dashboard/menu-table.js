import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom'

import Client from '../../util/client'

import styled from "styled-components"
import { Column, Table } from 'react-virtualized'
import ArrowIcon from "../../assets/img/arrow_icon.png"

import EditIconGrey from "../../assets/img/edit-grey.png"
import EditIconOrange from "../../assets/img/edit-orange.png"

import EditIcon from "../../assets/img/edit-icon.png"
import DeleteIcon from "../../assets/img/delete-icon.png"

import { NewDishForm, NewCategoryForm, EditDishForm, EditCategoryForm, DeleteConfirmation } from "./popup-forms"

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
        flex-basis: 40%;
    }

    ${TableCell}:nth-child(3) {
        flex-basis: 30%;
    }

    ${TableCell}:nth-child(4) {
        flex-basis: 10%;
    }    

    &:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .edit {
        position: absolute;
        width: 15px;
        right: 50px;
        cursor: pointer;
    }
    .delete {
        position: absolute;
        width: 15px;
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

const ItemRow = ({ item, updateMenu, catId, toggleEditDish, openDeleteConfirmation }) => {
    return (
        <StyledItemRow className='opened'>
            {
                <>
                    <TableCell>
                        <p>{item.Dish.name}</p>
                    </TableCell>
                    <TableCell>
                        <p>{item.Dish.description}</p>
                    </TableCell>
                    <TableCell>
                        <p>{allergen_list(item.Dish.Tags)}</p>
                    </TableCell>
                    <TableCell>
                        <img className='edit' src={EditIcon} onClick={()=>toggleEditDish(item)}/>
                        <img className='delete' src={DeleteIcon} onClick={() => { openDeleteConfirmation(item.id, "dish") }}/>
                    </TableCell> 
                </>
            }
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
const TableCategory = ({ category, updateMenu, toggleEditCategory, toggleEditDish, openDeleteConfirmation }) => {
    const [name, setName] = useState(category.name)
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(category.id)

    const toggleOpen = () => {
        if(open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return (
        <StyledTableCategory className={ open ? 'open' : '' }>
            <CategoryHeaderRow>
                <TableCell>
                    <img className='collapse-icon' src={ ArrowIcon } onClick={ toggleOpen }/>
                    {
                        <>
                            {name}
                            <img className='edit' src={EditIcon} onClick={()=>toggleEditCategory(category)}/>
                            <img className='delete' src={DeleteIcon} onClick={() => openDeleteConfirmation(id, "category")}/>
                        </>
                    }
                </TableCell>
            </CategoryHeaderRow>
            <div className='items'>
                {
                    category ? 
                    category.Dishes.map((item, index) => (
                        <ItemRow key={index} item={item} updateMenu={updateMenu}
                            catId={id} toggleEditDish={toggleEditDish} openDeleteConfirmation={openDeleteConfirmation}/>
                    )) : 
                    ''
                }
            </div>
        </StyledTableCategory>
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

function useAsyncState(initialValue) {
    const [value, setValue] = useState(initialValue);
    const setter = x =>
      new Promise(resolve => {
        setValue(x);
        resolve(x);
      });
    return [value, setter];
  }

// Overall component which renders the table as a list of menu categories
const MenuTable = (props) => {
    const [menuData, setMenuData] = useState()
    const [menuId, setMenuId] = useState(props.menuId)
    const [showNewDishForm, setNewDishForm] = useState(false);
    const [showNewCategoryForm, setNewCategoryForm] = useState(false);
    const [showEditDishForm, setEditDishForm] = useState(false);
    const [showEditCategoryForm, setEditCategoryForm] = useState(false); 
    const [showDeleteConfirmation, setDeleteConfirmation] = useAsyncState(false); 
    const [toDelete, setToDelete] = useAsyncState({})
    const [selectedDish, setSelectedDish] = useState()
    const [selectedCategory, setSelectedCategory] = useState()

    useEffect(() => {
        Client.getMenu(menuId).then((res) => {
            console.log(res.data)
            setMenuData(res.data.Categories)
        })
    }, [])

    const updateMenu = (categoryId) => {
        Client.getMenu(menuId).then((res) => {
            setMenuData(null)
            setMenuData(res.data.Categories)            
        })
    };

    const toggleNewDishForm = () => {
        console.log("toggle new dish form")
        if (!showNewDishForm) closeAllForms() //if about to open form
        setNewDishForm(!showNewDishForm)
    }

    const toggleNewCategoryForm = () => {
        console.log("toggle new category form")
        if (!showNewCategoryForm) closeAllForms() //if about to open form
        setNewCategoryForm(!showNewCategoryForm)
    }

    const toggleEditDishForm = (dish) => {
        console.log("toggle edit dish form")
        console.log(dish)
        if (typeof dish !== 'undefined') setSelectedDish(dish)
        if (!showEditDishForm) closeAllForms() //if about to open form
        setEditDishForm(!showEditDishForm)
    }

    const toggleEditCategoryForm = (category) => {
        console.log("toggle edit category form")
        if (typeof category !== 'undefined') setSelectedCategory(category)
        if (!showEditCategoryForm) closeAllForms() //if about to open form
        setEditCategoryForm(!showEditCategoryForm)
    }

    const openDeleteConfirmation = (id, type) => {
        if (!showDeleteConfirmation) {
            closeAllForms() //if about to open form
            setToDelete({id: id, type: type}).then(() => {
                console.log("Set currentOnDelete")
                setDeleteConfirmation(true)
            })
        }
    }

    const closeDeleteConfirmation = (shouldDelete) => {
        if(shouldDelete) {
            if(toDelete.type == "category") {
                Client.deleteCategory(toDelete.id).then(() => {
                    setToDelete({}).then(() => {
                        setDeleteConfirmation(false).then(() => {
                            updateMenu()
                        })
                    }).catch((err) => {
                        console.error(err)
                    })
                })
            }

            if(toDelete.type == "dish") {
                Client.deleteDish(toDelete.id).then(() => {
                    setToDelete({}).then(() => {
                        setDeleteConfirmation(false).then(() => {
                            updateMenu()
                        })
                    })
                }).catch((err) => {
                    console.error(err)
                })
            }
        } else {
            setDeleteConfirmation(false)
        }
    }


    const closeAllForms = () => {
        setNewDishForm(false)
        setNewCategoryForm(false)
        setEditDishForm(false)
        setEditCategoryForm(false)
        setDeleteConfirmation(false)
    }

    return (
        <>
            <MenuControls>
                {/* <input className='search' name='search' placeholder='DISH SEARCH'/>  */}
                <div className='buttons'>
                    <div className='new-category' onClick={toggleNewCategoryForm}>New Menu Category</div> 
                    <div className='new-dish' onClick={toggleNewDishForm}>New Dish</div>               
                </div>
            </MenuControls>  
            {
                showNewDishForm ? (
                    <NewDishForm toggleForm={toggleNewDishForm} updateMenu={updateMenu} menuId={menuId}/>
                ) : null
            }
            {
                showNewCategoryForm ? (
                    <NewCategoryForm toggleForm={toggleNewCategoryForm} updateMenu={updateMenu} menuId={menuId}/>
                ) : null
            }
            {
                showEditDishForm ? (
                    <EditDishForm toggleForm={toggleEditDishForm} updateMenu={updateMenu}
                        dish={selectedDish} menuId={menuId}/>
                ) : null
            }
            {
                showEditCategoryForm ? (
                    <EditCategoryForm toggleForm={toggleEditCategoryForm} updateMenu={updateMenu}
                        category={selectedCategory} menuId={menuId}/>
                ) : null
            }
            {
                showDeleteConfirmation ? (
                    <DeleteConfirmation closeForm={closeDeleteConfirmation}/>
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
                   { 
                        menuData ? menuData.map((item) => (
                            <TableCategory key={ item.id } category={ item } updateMenu={ updateMenu }
                                toggleEditCategory={toggleEditCategoryForm} toggleEditDish={toggleEditDishForm} openDeleteConfirmation={openDeleteConfirmation}/>
                        )) : ''
                    }
            </StyledMenuTable>
        </>
    )
}

export { MenuTable } 