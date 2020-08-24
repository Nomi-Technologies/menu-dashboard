import React, { useState, useEffect, Component } from 'react';

import styled from "styled-components"
import ArrowIcon from "../../../assets/img/arrow_icon.png"

import EditIcon from "../../../assets/img/edit-icon.png"
import DeleteIcon from "../../../assets/img/delete-icon.png"

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
    font-family: HK Grotesk Regular;
    font-size:18px;

    ${TableCell}:nth-child(1) {
        flex-basis: 15%;
    }

    ${TableCell}:nth-child(2) {
        flex-basis: 35%;
    }

    ${TableCell}:nth-child(3) {
        flex-basis: 10%;
    }

    ${TableCell}:nth-child(4) {
        flex-basis: 30%;
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
                        <p>{item.name}</p>
                    </TableCell>
                    <TableCell>
                        <p>{item.description}</p>
                    </TableCell>
                    <TableCell>
                        <p>
                            { item.price ? item.price : "--" }
                        </p>
                    </TableCell>
                    <TableCell>
                        <p>{allergen_list(item.Tags)}</p>
                    </TableCell>
                    <TableCell>
                        <img className='edit' src={EditIcon} onClick={() => toggleEditDish(item)} />
                        <img className='delete' src={DeleteIcon} onClick={() => { openDeleteConfirmation(item.id, "dish") }} />
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
        width: 30px;
        height: 15px;
        margin-left: -38px;
        margin-right:10px;
        //padding: 9px 7px;
        border-style: solid;
        border-width: 4px;
        background-color: #F3A35C;
        border-radius: 4px;
        cursor: pointer;
    }
`

const allergen_list = (allergens) => {
    if (allergens.length === 0) {
        return '--'
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
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return (
        <StyledTableCategory className={open ? 'open' : ''}>
            <CategoryHeaderRow>
                <TableCell>
                    <div className="orange-box">
                        <img className='collapse-icon' src={ArrowIcon} onClick={toggleOpen} />
                        {
                            <>
                                {name}
                                <img className='edit' src={EditIcon} onClick={() => toggleEditCategory(category)} />
                                <img className='delete' src={DeleteIcon} onClick={() => openDeleteConfirmation(id, "category")} />
                            </>
                        }
                    </div>
                </TableCell>
            </CategoryHeaderRow>
            <div className='items'>
                {
                    category ?
                        category.Dishes.map((item, index) => (
                            <ItemRow key={index} item={item} updateMenu={updateMenu}
                                catId={id} toggleEditDish={toggleEditDish} openDeleteConfirmation={openDeleteConfirmation} />
                        )) :
                        ''
                }
            </div>
        </StyledTableCategory>
    )
}

export {
    TableCell,
    TableRow,
    StyledItemRow,
    ItemRow,
    HeaderRow,
    CategoryHeaderRow,
    allergen_list,
    StyledTableCategory,
    TableCategory
}
