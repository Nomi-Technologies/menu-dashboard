import React, { useState } from 'react';

import styled from "styled-components"
import ArrowIcon from "../../../assets/img/arrow_icon.png"

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

const ItemRow = ({ item, updateMenu, catId, toggleEditDish, openDeleteConfirmation }) => {
    return (
        <StyledItemRow className='opened'>
            <TableCell className='item-name'>
                <p>{item.name}</p>
            </TableCell>
            <TableCell className='item-description'>
                <p>{item.description}</p>
            </TableCell>
            <TableCell className='item-price'>
                <p>
                    { item.price ? item.price : "--" }
                </p>
            </TableCell>
            <TableCell className='item-tags'>
                <p>{allergen_list(item.Tags)}</p>
            </TableCell>
            <RowControls>
                <img className='edit' src={EditIcon} onClick={() => toggleEditDish(item)} alt="edit icon" />
                <img className='delete' src={DeleteIcon} onClick={() => { openDeleteConfirmation(item.id, "dish") }} alt="delete icon"/>
            </RowControls>
        </StyledItemRow>
    )
}

const HeaderRow = styled(TableRow)`
    background-color: #C4C4C4;
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

    .collapse-icon { 
        position: absolute;
        width: 12px;
        height: 6px;
        left: 20px;
        top: 45%;
        cursor: pointer;
    }

    .category-name {
        flex-basis: 15%;
    }

    .category-description {
        flex-basis: 35%;
    }
`

const allergen_list = allergens => {
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
        left: 20px;
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
const TableCategory = ({ category, updateMenu, toggleEditCategory, toggleEditDish, openDeleteConfirmation }) => {
    const [open, setOpen] = useState(false);

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
                <img className='collapse-icon' src={ArrowIcon} onClick={toggleOpen} alt="collapse icon"/>
                <TableCell className='category-name'>
                    { category.name }
                </TableCell>
                <TableCell className='category-description'>
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
                    category ?
                        category.Dishes.map((item, index) => (
                            <ItemRow key={index} item={item} updateMenu={updateMenu}
                                catId={ category.id } toggleEditDish={toggleEditDish} openDeleteConfirmation={openDeleteConfirmation} />
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
