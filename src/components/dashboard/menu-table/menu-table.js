import React, { useState, useContext } from 'react';
import styled from "styled-components"

import Client from '../../../util/client'
import { MenuContext } from "../menu-context"
import SearchIcon from "../../../assets/img/search.png"
import CancelIcon from "../../../assets/img/delete-icon.png"
import { DeleteConfirmationModal } from "../modal/delete"
import { NewDishModal, EditDishModal } from "../modal/dish"
import { NewCategoryModal, EditCategoryModal } from "../modal/category"

import * as Table from "./table"

const StyledMenuTable = styled.div`
    width: 100%;
    max-width: 100%;
    transition: 0.5s ease-in-out all;
    margin-bottom: 150px;
`

const MenuControls = styled.div`
    display: flex;
    text-transform: uppercase;
    margin-bottom: 20px;
    justify-content: space-between;
    width: 100%;

    .searchForm {
        flex-basis: 50%;
        position: relative;
    }

    .search {
        padding: 10px 20px;
        background-color: #F9F9F9;
        font-size: 14px;
        padding-left: 10px;
        border-radius: 8px;
        border: 2px #E3EBF2 solid;
        width: 100%;
    }

    .cancelSearch {
        top: 28%;
        position: absolute;
        left: 100%;
        height: 40%;
    }

    .submitSearch {
        top: 25%;
        position: absolute;
        left: 100%;
        height: 50%;
    }

    .buttons {
        display: flex;
        color: white;
        align-self: flex-end;
        text-align: center;
        font-size: 14px;

        

        .new-category {
            border: 2px solid #F3A35C;
            padding: 10px 20px;
            color: #F3A35C;
            border-radius: 8px;
            cursor: pointer;
        }

        .new-dish {
            background-color: #F3A35C;
            padding: 10px 20px;
            text-align: center;
            border: 2px solid #F3A35C;
            border-radius: 8px;
            margin-left: 10px;
            cursor: pointer;
        }

        .upload-csv {
            border: 2px solid #F3A35C;
            padding: 10px 20px;
            color: #F3A35C;
            border-radius: 8px;
            cursor: pointer;
            margin-left: 10px;
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
const MenuTable = () => {
    const menuContext = useContext(MenuContext)
    let menuData = menuContext.menuData
    let updateMenu = menuContext.updateMenu
    
    const [showNewDishForm, setNewDishForm] = useState(false);
    const [showNewCategoryForm, setNewCategoryForm] = useState(false);
    const [showEditDishForm, setEditDishForm] = useState(false);
    const [showEditCategoryForm, setEditCategoryForm] = useState(false);
    const [showDeleteConfirmation, setDeleteConfirmation] = useAsyncState(false);
    const [toDelete, setToDelete] = useAsyncState({})
    const [selectedDish, setSelectedDish] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [searchResults, setSearchResults] = useState([]);
    const [searchBoxValue, setSearchBoxValue] = useState('');
    const [searchBoxFocused, setSearchBoxFocused] = useState(false);
    const [isSearching, setIsSearching] = useState(false);    
    
    const toggleNewDishForm = () => {
        if (!showNewDishForm) closeAllForms() //if about to open form
        setNewDishForm(!showNewDishForm)
    }

    const toggleNewCategoryForm = () => {
        if (!showNewCategoryForm) closeAllForms() //if about to open form
        setNewCategoryForm(!showNewCategoryForm)
    }

    const toggleEditDishForm = (dish) => {
        if (typeof dish !== 'undefined') setSelectedDish(dish)
        if (!showEditDishForm) closeAllForms() //if about to open form
        setEditDishForm(!showEditDishForm)
    }

    const toggleEditCategoryForm = (category) => {
        if (typeof category !== 'undefined') setSelectedCategory(category)
        if (!showEditCategoryForm) closeAllForms() //if about to open form
        setEditCategoryForm(!showEditCategoryForm)
    }

    const openDeleteConfirmation = (id, type) => {
        if (!showDeleteConfirmation) {
            closeAllForms() //if about to open form
            setToDelete({id: id, type: type}).then(() => {
                setDeleteConfirmation(true)
            })
        }
    }

    const closeDeleteConfirmation = (shouldDelete) => {
        if(shouldDelete) {
            if(toDelete.type === "category") {
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

            if(toDelete.type === "dish") {
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

    const renderTableContents = () => {
        if(!isSearching) {
            return (
                <div id='menuTable'>
                {
                    menuData ? menuData.map((item) => (
                        <Table.TableCategory key={ item.id } category={ item } updateMenu={ updateMenu }
                            toggleEditCategory={toggleEditCategoryForm} 
                            toggleEditDish={toggleEditDishForm}
                            openDeleteConfirmation={openDeleteConfirmation} 
                        />
                    )) : ''
                }
                </div>
            );
        } else if (searchResults.length === 0) {
            return (
                <Table.TableCell>
                    No items found
                </Table.TableCell>
            );
        } else {
            return (
                <>
                    {
                        searchResults.map((item, index) => (
                            <Table.ItemRow key={index} item={item} updateMenu={updateMenu} 
                                toggleEditDish={toggleEditDishForm} 
                                openDeleteConfirmation={openDeleteConfirmation}
                                toggleEditCategory={toggleEditCategoryForm}
                            />
                        ))
                    }
                </>
            );
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        e.target.firstChild.blur();
        setSearchBoxFocused(false)
        if (searchBoxValue.trim() === '') {
            setIsSearching(false);
        } else {
            Client.searchDishes(searchBoxValue, menuContext.menuId)
            .then((res) => {
                setSearchResults(res.data);
                setIsSearching(true);
            })
            .catch((err) => {
                console.error("error searching for dishes: " + err);
            })
        }
    }

    return (
        <>
            <MenuControls>
                <form onSubmit={handleSearch} className='searchForm'>
                    <input className='search' placeholder='Search Dishes...' id='searchBox' type='text' value={searchBoxValue} 
                        onChange={(e) => setSearchBoxValue(e.target.value)} 
                        onFocus={(e) => {
                            setSearchBoxFocused(true); 
                            e.target.select(); // highlight text when focus on element
                        }}
                    />
                    {
                        (isSearching && !searchBoxFocused) ?
                        <input className='cancelSearch' type='image' alt="Reset search" src={CancelIcon} onClick={(e) => {
                            e.preventDefault();
                            setSearchBoxValue('');
                            setIsSearching(false);
                        }}/> : 
                        <input className='submitSearch' type='image' alt="Submit" src={SearchIcon} />
                    }

                </form>
                <div className='buttons'>
                    <div className='new-category' onClick={toggleNewCategoryForm} role="button">New Menu Category</div>
                    <div className='new-dish' onClick={toggleNewDishForm}>New Dish</div>
                </div>
            </MenuControls>
            {
                showNewDishForm ? (
                    <NewDishModal toggleForm={toggleNewDishForm} updateMenu={updateMenu} menuId={menuContext.menuId}/>
                ) : null
            }
            {
                showNewCategoryForm ? (
                    <NewCategoryModal toggleForm={toggleNewCategoryForm} updateMenu={updateMenu} menuId={menuContext.menuId}/>
                ) : null
            }
            {
                showEditDishForm ? (
                    <EditDishModal toggleForm={toggleEditDishForm} updateMenu={updateMenu}
                        dish={selectedDish} menuId={menuContext.menuId}/>
                ) : null
            }
            {
                showEditCategoryForm ? (
                    <EditCategoryModal toggleForm={toggleEditCategoryForm} updateMenu={updateMenu}
                        category={selectedCategory} menuId={menuContext.menuId}/>
                ) : null
            }
            {
                showDeleteConfirmation ? (
                    <DeleteConfirmationModal closeForm={closeDeleteConfirmation}/>
                ) : null
            }

            <StyledMenuTable>
                <Table.HeaderRow>
                    <Table.TableCell className='title'>
                        Title
                    </Table.TableCell>
                    <Table.TableCell className='description'>
                        Description
                    </Table.TableCell>
                    <Table.TableCell className='price'>
                        Price
                    </Table.TableCell>
                    <Table.TableCell className='tags'>
                        Allergens
                    </Table.TableCell>
                </Table.HeaderRow>
                {
                    renderTableContents()
                }
            </StyledMenuTable>
        </>
    )
}

export { MenuTable }
