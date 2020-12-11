import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import debounce from 'lodash.debounce';

import Client from '../../../util/client'

import SearchIcon from "../../../assets/img/search.png"
import CancelIcon from "../../../assets/img/delete-icon.png"
import { DeleteConfirmationModal } from "../modal/delete"
import { NewDishModal, EditDishModal } from "../modal/dish"
import { NewCategoryModal, EditCategoryModal } from "../modal/category"
import { CopyMenuModal } from "../modal/copymenu"
import { MenuTableContext } from "./menu-table-context"

import * as Table from "./table"

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

const EditModeButton = styled.div`
  display: ${ props => (props.showEditMode ? "none" : "block") };
  background: #628DEB;
  box-shadow: 0px 10px 20px rgba(83, 131, 236, 0.2);
  border-radius: 6px;
  text-align: center;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 7;
  width: 50px;
`

const EditModeDoneButton = styled.div`
  display: ${ props => (props.showEditMode ? "block" : "none")};
  background: #628DEB;
  box-shadow: 0px 10px 20px rgba(83, 131, 236, 0.2);
  border-radius: 6px;
  text-align: center;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 10;
  width: 50px;
`

const CopyNewMenuButton = styled.div`
  display: ${ props => (props.showEditMode ? "block" : "none")};
  background-color: #F3A35C;
  padding: 10px 20px;
  text-align: center;
  border: 2px solid #F3A35C;
  border-radius: 6px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  width: 200px;
`

const NewCategoryButton = styled.div`
  display: ${ props => (props.showEditMode ? "none" : "block")};
  background-color: #F3A35C;
  padding: 10px 20px;
  text-align: center;
  border: 2px solid #F3A35C;
  border-radius: 6px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  width: 200px;
`

const NewDishButton = styled.div`
  display: ${ props => (props.showEditMode ? "none" : "block")};
  border: 2px solid #F3A35C;
  padding: 10px 20px;
  color: #F3A35C;
  border-radius: 6px;
  cursor: pointer;
  width: 100px;
`

const DeleteButton = styled.div`
  display: ${ props => (props.showEditMode ? "block" : "none")};
  border: 2px solid #FA3838;
  padding: 10px 20px;
  background: #FA3838;
  border-radius: 6px;
  cursor: pointer;
  width: 100px;
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
    // const [menuData, setMenuData] = useState(props.menuData)
    let updateMenu = props.updateMenu
    let updateMenuSelection = props.updateMenuSelection

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
    const [selectedDish, setSelectedDish] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [searchBoxValue, setSearchBoxValue] = useState('');
    const [searchBoxFocused, setSearchBoxFocused] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [menuContext, setMenuContext] = useState({})

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

            if(toDeleteType === "multiple") {
              Client.bulkDeleteDish(props.menuId, selectedDishes).then(() => {
                  setSelectedDishes([]).then(() => {
                      setDeleteConfirmation(false).then(() => {
                          updateMenu()
                      })
                  })
              }).catch((err) => {
                  console.error(err)
              })
            }

            setToDeleteType('');
        } else {
            setDeleteConfirmation(false)
        }
    }

    const closeCopyMenuConfirmation = (shouldCopy, menuName) => {
      if (shouldCopy) {

        let createDishesData = {
          ids: selectedDishes,
          name: menuName,
        }

        Client.bulkCreateDish(createDishesData).then((res) => {
              setSelectedDishes([]).then(() => {
                  setCopyMenuConfirmation(false).then(() => {
                      updateMenu()
                      updateMenuSelection(res.data.id)
                  });
              })
          }).catch((err) => {
              console.error(err)
          })
      } else {
          setCopyMenuConfirmation(false)
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
            Client.searchDishes(searchBoxValue, props.menuId)
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
    const parseMenu = (menuData) => {
        let categoryDict = {}
        let categoryOrder = []
        let dishDict = {}
        
        menuData.Categories.forEach((category) => {
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

    let updateMenuContext = (newMenuContext) => {
        setMenuContext(newMenuContext)
    }

    useEffect(() => {
        let menuContextObj = props.menuData && Object.keys(props.menuData).length > 0 ? {
            ...parseMenu(props.menuData),
            menuData: props.menuData,
            updateMenuContext: updateMenuContext
        } : {}
        setMenuContext(menuContextObj)
        setCategoryOrder(menuContextObj.categoryOrder)
    }, [props.menuData])

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
        console.log(categoryOrder)
        await Client.updateCategoryOrder(props.menuData.id, categoryOrder)
        updateMenu()
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
                            menuContext={ menuContext } 
                            category={ menuContext.categoryDict[categoryId] }
                            updateMenu={ updateMenu }
                            toggleEditCategory={ toggleEditCategoryForm }
                            toggleEditDish={ toggleEditDishForm }
                            openDeleteConfirmation={ openDeleteConfirmation }
                            handleCheckboxChange={ handleCheckboxChange }
                            showEditMode={ showEditMode }
                            moveCategory={ moveCategory }
                            saveCategoryOrder={ saveCategoryOrder }
                            updateMenu={ updateMenu }
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
                            updateMenu={updateMenu}
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
                <EditModeButton onClick={toggleEditMode} showEditMode={showEditMode} role="button">Edit</EditModeButton>
                <EditModeDoneButton onClick={toggleEditMode} showEditMode={showEditMode} role="button">Done</EditModeDoneButton>
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
                <div className='buttons'>
                    <NewCategoryButton onClick={toggleNewCategoryForm} showEditMode={showEditMode} role="button">New Menu Category</NewCategoryButton>
                    <CopyNewMenuButton onClick={() => openCopyMenuConfirmation(selectedDishes)} showEditMode={showEditMode} role="button">Copy To New Menu</CopyNewMenuButton>
                    <NewDishButton onClick={toggleNewDishForm} showEditMode={showEditMode} role="button">New Dish</NewDishButton>
                    <DeleteButton onClick={() => openDeleteConfirmation(selectedDishes, "dishes")} showEditMode={showEditMode} role="button">Delete</DeleteButton>
                </div>
            </MenuControls>
            {
                showNewDishForm ? (
                    <NewDishModal toggleForm={toggleNewDishForm} updateMenu={updateMenu} menuId={props.menuId}/>
                ) : null
            }
            {
                showNewCategoryForm ? (
                    <NewCategoryModal toggleForm={toggleNewCategoryForm} updateMenu={updateMenu} menuId={props.menuId}/>
                ) : null
            }
            {
                showCopyMenuConfirmation ? (
                    <CopyMenuModal closeForm={closeCopyMenuConfirmation} updateMenu={updateMenu} menuId={props.menuId} itemIds={selectedDishes}/>
                ) : null
            }
            {
                showEditDishForm ? (
                    <EditDishModal toggleForm={toggleEditDishForm} updateMenu={updateMenu}
                        dish={selectedDish} menuId={props.menuId}/>
                ) : null
            }
            {
                showEditCategoryForm ? (
                    <EditCategoryModal toggleForm={toggleEditCategoryForm} updateMenu={updateMenu}
                        category={selectedCategory} menuId={props.menuId}/>
                ) : null
            }
            {
                showDeleteConfirmation ? (
                    <DeleteConfirmationModal closeForm={closeDeleteConfirmation} type={toDeleteType} itemIds={selectedDishes}/>
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
        </DndProvider>
    )
}

export { MenuTable }
