import React, { useEffect, useState, useCallback, useContext } from 'react';
import styled from "styled-components"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import debounce from 'lodash.debounce';
import { navigate } from 'gatsby';

import Client from '../../../util/client'
import SearchIcon from "../../../assets/img/search.png"
import CancelIcon from "../../../assets/img/delete-icon.png"
import { Button, ButtonPrimary, ButtonSecondary, ButtonSpecial, ButtonDelete } from "../../basics"
import * as Table from "./table"
import { MenuContext } from './menu-context';

const StyledMenuTable = styled.div`
    width: 100%;
    max-width: 100%;
    transition: 0.5s ease-in-out all;
    margin-bottom: 150px;
    border-radius: 8px;
    overflow: hidden;
`

const MenuControls = styled.div`
    display: flex;
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
        align-self: flex-end;
        text-align: center;
    }
    
    .buttons.right-controls {
        ${Button} {
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
    let menuTableContext = useContext(MenuContext)
    console.log(menuTableContext)
    let refreshMenu = menuTableContext?.refreshMenu
    let menu = menuTableContext?.menu


    const [menuData, setMenuData] = useState({}) // includes parsed menuData
    const [showNewDishForm, setNewDishForm] = useState(false);
    const [showNewCategoryForm, setNewCategoryForm] = useState(false);
    const [showCopyMenuConfirmation, setCopyMenuConfirmation] = useAsyncState(false);
    const [showEditDishForm, setEditDishForm] = useState(false);
    const [showEditCategoryForm, setEditCategoryForm] = useState(false);
    const [showEditMode, setEditMode] = useState(false);
    const [showDeleteConfirmation, setDeleteConfirmation] = useAsyncState(false);
    const [toDelete, setToDelete] = useAsyncState({});
    const [selectedDishes, setSelectedDishes] = useAsyncState([]);
    const [toDeleteType, setToDeleteType] = useAsyncState('');
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
        // if (typeof dish !== 'undefined') setSelectedDish(dish)
        if (!showEditDishForm) closeAllForms() //if about to open form
        setEditDishForm(!showEditDishForm)
    }

    const toggleEditCategoryForm = (category) => {
        // if (typeof category !== 'undefined') setSelectedCategory(category)
        if (!showEditCategoryForm) closeAllForms() //if about to open form
        setEditCategoryForm(!showEditCategoryForm)
    }

    const toggleEditMode = () => {
        setEditMode(!showEditMode)
    }

    const handleCheckboxChange = (itemId) => {
        let newSelectedDishes = selectedDishes;

        if (selectedDishes.includes(itemId)) {
            var index = newSelectedDishes.indexOf(itemId);
            newSelectedDishes.splice(index, 1);
        } else {
            newSelectedDishes.push(itemId);
        }

        setSelectedDishes(newSelectedDishes);
    }

    const openDeleteConfirmation = (id, type) => {
        if (!showDeleteConfirmation) {
            closeAllForms() //if about to open form

            if (type === "dishes") {
                setSelectedDishes(id).then(() => {
                    setDeleteConfirmation(true)
                })
                setToDeleteType("multiple");
            } else {
              setToDelete({id: id, type: type}).then(() => {
                  setDeleteConfirmation(true)
              })

              setToDeleteType("single");
            }
        }
    }

    const openCopyMenuConfirmation = (ids) => {
        if (!showCopyMenuConfirmation) {
            closeAllForms() //if about to open form

            setSelectedDishes(ids).then(() => {
                setCopyMenuConfirmation(true)
            })
        }
    }

    const closeAllForms = () => {
        setNewDishForm(false)
        setNewCategoryForm(false)
        setEditDishForm(false)
        setEditCategoryForm(false)
        setDeleteConfirmation(false)
    }

    // TODO: refactor search to be in browser
    const handleSearch = (e) => {
        e.preventDefault();
        e.target.firstChild.blur();
        setSearchBoxFocused(false)
        if (searchBoxValue.trim() === '') {
            setIsSearching(false);
        } else {
            Client.searchDishes(searchBoxValue, menu?.menuId)
            .then((res) => {
                setSearchResults(res.data);
                setIsSearching(true);
            })
            .catch((err) => {
                console.error("error searching for dishes");
            })
        }
    }

    // takes menu object from API and returns dictionary with IDs to data, and an array of categories and menus for ordering
    const parseMenu = (menu) => {
        let categoryDict = {}
        let categoryOrder = []
        let dishDict = {}
        
        menu.Categories.forEach((category) => {
            let dishOrder = []

            category.Dishes.forEach((dish) => {
                dishDict[dish.id] = dish
                dishOrder.push(dish.id)
            })

            categoryDict[category.id] = {
                ...category,
                dishOrder: dishOrder
            }
            categoryOrder.push(category.id)
        })

        return {
            categoryDict: categoryDict,
            categoryOrder: categoryOrder,
            dishDict: dishDict
        }
    }

    useEffect(() => {
        let menuData = menu && Object.keys(menu).length > 0 ? {
            ...parseMenu(menu),
            menuData: menu, // todo: rename menu
        } : {}
        setMenuData(menuData)
        setCategoryOrder(menuData.categoryOrder)
    }, [menu])

    const [categoryOrder, setCategoryOrder] = useState([])

    const moveCategory = useCallback(debounce((id, atIndex) => {
        let index = categoryOrder.indexOf(id)

        let newCategoryOrder = update(categoryOrder, {
            $splice: [
                [index, 1],
                [atIndex, 0, id]
            ]
        })

        setCategoryOrder(newCategoryOrder)
    }, 5))

    const saveCategoryOrder = async () => {
        await Client.updateCategoryOrder(menu.id, categoryOrder)
        refreshMenu()
    } 

    const renderTableContents = () => {
        if(!isSearching) {
            return (
                <div id='menuTable'>
                {
                    categoryOrder?.length > 0 ? categoryOrder.map((categoryId, index) => (
                        <Table.TableCategory 
                            key={ categoryId } 
                            index={index}
                            menuContext={ menuData } 
                            category={ menuData.categoryDict[categoryId] }
                            updateMenu={ refreshMenu }
                            toggleEditCategory={ toggleEditCategoryForm }
                            toggleEditDish={ toggleEditDishForm }
                            openDeleteConfirmation={ openDeleteConfirmation }
                            handleCheckboxChange={ handleCheckboxChange }
                            showEditMode={ showEditMode }
                            moveCategory={ moveCategory }
                            saveCategoryOrder={ saveCategoryOrder }
                            updateMenu={ refreshMenu }
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
        }
        return (
            <>
                {
                    searchResults.map((dish, index) => (
                        <Table.ItemRow
                            key={index}
                            dish={dish}
                            updateMenu={refreshMenu}
                            toggleEditDish={toggleEditDishForm}
                            openDeleteConfirmation={openDeleteConfirmation}
                            toggleEditCategory={toggleEditCategoryForm}
                            handleCheckboxChange={handleCheckboxChange}
                            showEditMode={showEditMode}
                        />
                    ))
                }
            </>
        );
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <MenuControls>
                <div className='buttons'>
                    <ButtonSpecial onClick={toggleEditMode} role="button">{ showEditMode ? "Done" : "Edit" }</ButtonSpecial>
                </div>
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
                <div className='buttons right-controls'>
                    { 
                        showEditMode ? <>
                            <ButtonPrimary onClick={() => openCopyMenuConfirmation(selectedDishes)} showEditMode={showEditMode} role="button">Copy To New Menu</ButtonPrimary>
                            <ButtonDelete onClick={() => openDeleteConfirmation(selectedDishes, "dishes")} showEditMode={showEditMode} role="button">Delete</ButtonDelete>
                        </> 
                        : <> 
                            <ButtonSecondary onClick={toggleNewCategoryForm} showEditMode={showEditMode} role="button">New Menu Category</ButtonSecondary>
                            <ButtonPrimary onClick={() => { navigate('/dashboard/menu/dish', { state: { menuId: menu.id } }) }} showEditMode={showEditMode} role="button">New Dish</ButtonPrimary>
                        </>
                    }
                    
                </div>
            </MenuControls>

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
        </DndProvider>
    )
}

export { MenuTable }
