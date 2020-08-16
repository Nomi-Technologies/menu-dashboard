import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom'

import Client from '../../../util/client'

import styled from "styled-components"
import ArrowIcon from "../../../assets/img/arrow_icon.png"
import SearchIcon from "../../../assets/img/search.png"
import CancelIcon from "../../../assets/img/delete-icon.png"

import * as Forms from "./popup-forms"
import * as Table from "./table"

const StyledMenuTable = styled.div`
    width: 100%;
    max-width: 100%;
    transition: 0.5s ease-in-out all;
    margin-bottom: 20px;
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
        top: 30%;
        position: absolute;
        left: 100%;
        height: 40%;
    }

    .submitSearch {
        top: 25%;
        position: absolute;
        left: 100%;
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
    const [menuData, setMenuData] = useState(props.menuData)
    const [showNewDishForm, setNewDishForm] = useState(false);
    const [showNewCategoryForm, setNewCategoryForm] = useState(false);
    const [showEditDishForm, setEditDishForm] = useState(false);
    const [showEditCategoryForm, setEditCategoryForm] = useState(false); 
    const [showDeleteConfirmation, setDeleteConfirmation] = useAsyncState(false); 
    const [toDelete, setToDelete] = useAsyncState({})
    const [selectedDish, setSelectedDish] = useState()
    const [selectedCategory, setSelectedCategory] = useState()

    const [selectedFile, setSelectedFile] = useState(null)

    const [searchResults, setSearchResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    let fileReader

    useEffect(() => {
        Client.getMenu(props.menuId).then((res) => {
            console.log(res.data)
            setMenuData(res.data.Categories)
        })
    }, [props.menuId])

    const updateMenu = () => {
        Client.getMenu(props.menuId).then((res) => {
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
                console.log(toDelete)
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

    const onFileChange = (event) => {
        if(event.target.files){
          setSelectedFile(event.target.files[0]);
          fileReader = new FileReader();
          fileReader.onloadend = parseFile;
          fileReader.readAsText(event.target.files[0]);
        }
    }

    const parseFile = () => {
      const content = fileReader.result;
      var allTextLines = content.split(/\r\n|\n/);
      var headers = allTextLines[0].split(',');
      var lines = [];

      for (var i = 1; i < allTextLines.length; i++) {
          var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if (data.length == headers.length) {
              var tarr = []
              for (var j = 0; j < headers.length; j++) {
                  tarr.push(data[j].replace(/['"]+/g, ''));
              }
              lines.push(tarr);
          }
      }
      Client.setMenu(lines).then((res) => {
          updateMenu();
      }).catch((err) => {
          console.log(err)
      })
    }

    const renderTableOutput = () => {
        if(!isSearching) {
            return (
                <div id='menuTable'>
                {
                    menuData ? menuData.map((item) => (
                        <Table.TableCategory key={ item.id } category={ item } updateMenu={ updateMenu }
                            toggleEditCategory={toggleEditCategoryForm} toggleEditDish={toggleEditDishForm}
                            openDeleteConfirmation={openDeleteConfirmation} />
                    )) : ''
                }
                </div>
            );
        } else if (searchResults ==  null || searchResults.length == 0) {
            return (
                <div id="searchResults" > 
                    {
                        <Table.TableCell>
                            No items found
                        </Table.TableCell>
                    }
                </div>
            );
        }
        return (
            <div id="searchResults" > 
                {
                    searchResults.map((item, index) => (
                        <Table.ItemRow key={index} item={item} updateMenu={updateMenu} toggleEditDish={toggleEditDishForm}/>
                    ))
                }
            </div>
        );      
    }
 
    const handleSearch = (e) => {
        e.preventDefault();
        if (document.getElementById('searchBox').value.trim() == '') {
            setSearchResults(null);
        } else {
            Client.searchDishes(document.getElementById('searchBox').value)
            .then((res) => {
                setSearchResults(null);
                setSearchResults(res.data);
                setIsSearching(true);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <>
            <MenuControls>
                <form onSubmit={handleSearch} className='searchForm'>
                    <input className='search' name='search' placeholder='Search Dishes...' id='searchBox' type='text' />
                    { 
                        isSearching ? 
                        <input className='cancelSearch' type='image' alt="Reset search" src={CancelIcon} onClick={(e) => { 
                            e.preventDefault();
                            document.getElementById('searchBox').value ='';
                            setIsSearching(false); 
                        }}/> :
                        <input className='submitSearch' type='image' alt="Submit" src={SearchIcon}/>
                    }

                </form>
                <div className='buttons'>
                    <div className='new-category' onClick={toggleNewCategoryForm}>New Menu Category</div>
                    <div className='new-dish' onClick={toggleNewDishForm}>New Dish</div>
                </div>
            </MenuControls>
            {
                showNewDishForm ? (
                    <Forms.NewDishForm toggleForm={toggleNewDishForm} updateMenu={updateMenu} menuId={props.menuId}/>
                ) : null
            }
            {
                showNewCategoryForm ? (
                    <Forms.NewCategoryForm toggleForm={toggleNewCategoryForm} updateMenu={updateMenu} menuId={props.menuId}/>
                ) : null
            }
            {
                showEditDishForm ? (
                    <Forms.EditDishForm toggleForm={toggleEditDishForm} updateMenu={updateMenu}
                        dish={selectedDish} menuId={props.menuId}/>
                ) : null
            }
            {
                showEditCategoryForm ? (
                    <Forms.EditCategoryForm toggleForm={toggleEditCategoryForm} updateMenu={updateMenu}
                        category={selectedCategory} menuId={props.menuId}/>
                ) : null
            }
            {
                showDeleteConfirmation ? (
                    <Forms.DeleteConfirmation closeForm={closeDeleteConfirmation}/>
                ) : null
            }
            <StyledMenuTable>
                <Table.HeaderRow>
                    <Table.TableCell>
                        Title
                    </Table.TableCell>
                    <Table.TableCell>
                        Description
                    </Table.TableCell>
                    <Table.TableCell>
                        Allergens
                    </Table.TableCell>
                </Table.HeaderRow>
                   {/* { 
                        menuData ? menuData.map((item) => (
                            <Table.TableCategory key={ item.id } category={ item } updateMenu={ updateMenu }
                                toggleEditCategory={toggleEditCategoryForm} toggleEditDish={toggleEditDishForm} openDeleteConfirmation={openDeleteConfirmation}/>
                        )) : ''
                    } */}

                   { 
                    renderTableOutput()
                   }
            </StyledMenuTable>
        </>
    )
}

export { MenuTable }
