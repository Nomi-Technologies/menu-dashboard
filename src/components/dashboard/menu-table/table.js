import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import debounce from 'lodash.debounce';
import Client from '../../../util/client'

import Checkbox from "./checkbox";

import styled from "styled-components"
import ArrowIcon from "../../../assets/img/arrow_icon.png"
import PlusIcon from "../../../assets/img/plus-icon.png"
import EditIcon from "../../../assets/img/edit-icon.png"
import DeleteIcon from "../../../assets/img/delete-icon.png"

const TableCell = styled.div`
    display: flex;
    position: relative;
    min-height: 48px;
    box-sizing: border-box;
    align-items: center;
    padding-right: 10px;
    text-overflow: ellipsis;
    min-width: 0px;
    max-width: 100%;
    word-wrap: break-word;
    overflow: hidden;

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
        position: absolute;
        box-sizing: border-box;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        max-height: 100%;
        line-height: 48px;
        white-space: nowrap;
        padding-right: 15px;
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
    font-family: HK Grotesk Regular;
    font-size:18px;
    align-items: center;

    &:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
`

const RowControls = styled.div`
    position: absolute;
    right: 10px;

    img {
        padding-right: 10px;
        width: 15px;
        right: 50px;
        cursor: pointer;
    }
`

const StyledItemRow = styled(TableRow)`
    font-family: HK Grotesk Light;

    &.opened {
        height: inherit;
    }

    &:not(:first-child) {
        border-top: 1px #88929E solid;
    }

    .item-name {
        flex-basis: 15%;
    }

    .item-description {
        flex-basis: 35%;
    }

    .item-price {
        flex-basis: 10%;
    }

    .item-tags {
        flex-basis: 40%;
    }

`

const ItemRow = ({ dish, toggleEditDish, openDeleteConfirmation, handleCheckboxChange, showEditMode, moveDish, getDish, saveDishOrder }) => {
    const { index, categoryId } = getDish(dish.id);

    const [{ isDragging }, drag] = useDrag({
        item: { type: "dish", id: dish.id, categoryId: categoryId, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (dropResult, monitor) => {
            const { id: droppedId, index } = monitor.getItem();
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                // move card back to original position if drop did not occur on given category
                moveDish(droppedId, index);
            } else {
                saveDishOrder()
            }

        },
    });

    const [, drop] = useDrop({
        accept: "dish",
        canDrop: () => false,
        hover({ id: draggedId, categoryId: draggedCategoryId }) {
            if (draggedId !== dish.id && categoryId === draggedCategoryId) {
                // if same category, just move within category
                const overIndex = getDish(dish.id).index;
                moveDish(draggedId, overIndex);
            }
        },
    });

    return (
        <StyledItemRow ref={ (node) => drag(drop(node)) } className='opened'>
          {
            showEditMode ? <Checkbox
              handleCheckboxChange={handleCheckboxChange}
              item={dish}
              key={dish.id}
            />
            : ""
          }
            <TableCell className='item-name'>
                <p>{dish.name}</p>
            </TableCell>
            <TableCell className='item-description'>
                <p>{dish.description}</p>
            </TableCell>
            <TableCell className='item-price'>
                <p>
                    { dish.price ? dish.price : "--" }
                </p>
            </TableCell>
            <TableCell className='item-tags'>
                <p>{allergenList(dish.Tags)}</p>
            </TableCell>
            <RowControls>
                <img className='edit' src={EditIcon} onClick={() => toggleEditDish(dish)} alt="edit icon" />
                <img className='delete' src={DeleteIcon} onClick={() => { openDeleteConfirmation(dish.id, "dish") }} alt="delete icon"/>
            </RowControls>
        </StyledItemRow>
    )
}

const HeaderRow = styled(TableRow)`
    background-color: #8A9DB7;
    color: white;
    text-transform: uppercase;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    .title {
        flex-basis: 15%;
    }

    .description {
        flex-basis: 35%;
    }

    .price {
        flex-basis: 10%;
    }

    .tags {
        flex-basis: 40%;
    }

`
const CategoryHeaderRow = styled(TableRow)`
    background: #F0F2F7;
    color: black;
    cursor: pointer;

    .collapse-icon {
        position: absolute;
        width: 12px;
        height: 6px;
        left: 0px;
        top: 0px;
        padding: 20px;
        cursor: pointer;
    }

    .plus-icon{
        position: absolute;
        left: 10px;
        top: 10px;
        cursor: pointer;
        width: 30px;
    }

    .category-name {
        flex-basis: 15%;
    }

    .category-description {
        flex-basis: 65%;
        box-sizing: border-box;


        p {
            padding-right: 50%;
        }
    }
`

const allergenList = allergens => {
  if (allergens.length === 0) {
    return "--"
  }

    let list = ''

    allergens.forEach((element, idx) => {
        if (idx !== allergens.length - 1) {
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
        position: absolute;
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

const CategoryDescription = styled.p`
    color: #8A9DB7;
    font-family: HK Grotesk Light;
`

// Subitem for each cateogry in the menu.  Contains a list of item rows
// Can be toggled on and off, and can be deleted
const TableCategory = ({ menuContext, index, category, toggleEditCategory, toggleEditDish, openDeleteConfirmation, showEditMode, handleCheckboxChange, moveCategory, saveCategoryOrder, updateMenu }) => {
    const [open, setOpen] = useState(false);
    const [dishOrder, setDishOrder] = useState([])

    useEffect(() => {
        if(menuContext.categoryDict && !isDragging) {
            setDishOrder(menuContext.categoryDict[category.id].dishOrder)    
        }
    }, [menuContext.categoryDict])

    const toggleOpen = () => {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    const getDish = (id) => {
        for(let i = 0; i < dishOrder.length; i++) {
            if(dishOrder[i] === id) {
                return { index: i, categoryId: category.id }
            }
        }
        return { index: null, categoryId: category.id }
    }

    const moveDish = useCallback((id, atIndex) => {
        let index = getDish(id).index;

        let newDishOrder = update(dishOrder, {
            $splice: [
                [index, 1],
                [atIndex, 0, id],
            ],
        })
        setDishOrder(newDishOrder)
    }, [dishOrder]);

    const saveDishOrder = async () => {
        await Client.updateDishOrder(menuContext.menuData.id, dishOrder)
        updateMenu()
    }   

    const [{ isDragging }, drag] = useDrag({
        item: { type: "category", id: category.id, index },
        begin: () => { setOpen(false) }, // close category before dragging
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (dropResult, monitor) => {
            const { id: droppedId, index } = monitor.getItem();
            const didDrop = monitor.didDrop();
            if(!didDrop) {
                moveCategory(droppedId, index);
            } else {
                saveCategoryOrder() // save to backend
            }
            
        }
    })

    const [, drop] = useDrop({
        accept: ["dish", "category"],
        hover({ type, id: draggedId }) {
            if(type === "category") {
                moveCategory(draggedId, index);
            }
        }
    });

    return (
        <StyledTableCategory ref={ (node) => drag(drop(node)) } className={ open ? 'open' : '' }>
            <CategoryHeaderRow>
                <img className='collapse-icon' src={ArrowIcon} alt="collapse icon" onClick={toggleOpen}/>
                <TableCell className='category-name' onClick={toggleOpen}>
                    { category.name }
                </TableCell>
                <TableCell className='category-description' onClick={toggleOpen}>
                    <CategoryDescription>
                        { category.description }
                    </CategoryDescription>
                </TableCell>
                <RowControls>
                    <img className='edit' src={EditIcon} onClick={() => toggleEditCategory(category)} alt="edit icon"/>
                    <img className='delete' src={DeleteIcon} onClick={() => openDeleteConfirmation(category.id, "category")} alt="delete icon"/>
                </RowControls>
            </CategoryHeaderRow>
            <div className='items'>
                {
                    open && !isDragging && dishOrder ?
                        dishOrder.map((dishId, index) => (
                            <ItemRow
                                key={dishId}
                                dish={menuContext.dishDict[dishId]}
                                toggleEditDish={toggleEditDish}
                                openDeleteConfirmation={openDeleteConfirmation}
                                handleCheckboxChange={handleCheckboxChange}
                                showEditMode={showEditMode}
                                moveDish={moveDish}
                                getDish={getDish}
                                saveDishOrder={saveDishOrder}
                            />
                        )) : ''
                }
            </div>
        </StyledTableCategory>
    )
}

const AddCategory = () => {
    return (
            <CategoryHeaderRow>
                <img className='plus-icon' src={PlusIcon} alt="plus icon"/>
                <TableCell className='category-name' style={{color: "#B2BED0"}}>
                    Add Menu Section...
                </TableCell>
                
            </CategoryHeaderRow>
    )
}

export {
    TableCell,
    TableRow,
    StyledItemRow,
    ItemRow,
    HeaderRow,
    CategoryHeaderRow,
    StyledTableCategory,
    TableCategory,
    AddCategory
}
