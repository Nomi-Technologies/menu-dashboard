import React, { useState, useEffect } from "react"

import Client from "../../util/client"

import styled from "styled-components"
import { Column, Table } from "react-virtualized"
import ArrowIcon from "../../assets/img/arrow_icon.png"

import EditIconGrey from "../../assets/img/edit-grey.png"
import EditIconOrange from "../../assets/img/edit-orange.png"

import CheckIconGrey from "../../assets/img/check-black.png"
import CheckIconOrange from "../../assets/img/check-orange.png"

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

  input,
  textarea {
    width: 100%;
    height: 50%;
    padding-left: 8px;
    font-size: 16px;
    resize: none;
  }

  input,
  textarea:focus {
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
    border-top: 1px #88929e solid;
  }
`

const ItemRow = ({ item }) => {
  const [displayMenu, setDisplayMenu] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description)

  const toggleMenu = () => {
    if (!displayMenu) {
      setDisplayMenu(true)
    } else {
      setDisplayMenu(false)
    }

    console.log(displayMenu)
  }

  const enableEdit = () => {
    setEditMode(true)
    toggleMenu()
  }

  const submit = () => {
    // send update to API from edit field
    Client.updateDish(item.id, { name: name, description: description })
      .then(() => {
        setEditMode(false)
      })
      .catch(err => {
        Client.getDish(item.id).then(oldItem => {
          setName(oldItem.name)
          setDescription(oldItem.description)
        })
        console.error(err)
      })
  }

  return (
    <StyledItemRow className="opened">
      {!editMode ? (
        <>
          <TableCell>
            <p>{name}</p>
          </TableCell>
          <TableCell>
            <p>{description}</p>
          </TableCell>
          <TableCell>
            <p>{allergen_list(item.tags)}</p>

            <img className="edit" src={EditIconGrey} onClick={toggleMenu} />
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>
            <input
              name="name"
              defaultValue={name}
              onChange={event => {
                setName(event.target.value)
              }}
            />
          </TableCell>
          <TableCell>
            <textarea
              name="description"
              defaultValue={description}
              onChange={event => {
                setDescription(event.target.value)
              }}
            />
          </TableCell>
          <TableCell>
            {allergen_list(item.tags)}
            <img className="edit" src={CheckIconGrey} onClick={submit} />
          </TableCell>
        </>
      )}
      <OptionMenu display={displayMenu} onEdit={enableEdit} />
    </StyledItemRow>
  )
}

const HeaderRow = styled(TableRow)`
  background-color: #c4c4c4;
  color: white;
  text-transform: uppercase;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

const CategoryHeaderRow = styled(TableRow)`
  background: #feebda;
  color: #f3a35c;

  .collapse-icon {
    position: absolute;
    width: 12px;
    height: 6px;
    margin-left: -38px;
    padding: 9px 7px;
    background-color: #f3a35c;
    border-radius: 4px;
    cursor: pointer;
  }
`

const allergen_list = allergens => {
  if (allergens.length == 0) {
    return "--"
  }

  let list = ""

  allergens.forEach((element, idx) => {
    if (idx != allergens.length - 1) {
      list += element.name + ", "
    } else {
      list += element.name
    }
  })

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
const TableCategory = ({ category, categoryTitle }) => {
  const [open, setOpen] = useState(false)
  const [displayMenu, setDisplayMenu] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const toggleOpen = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  const toggleMenu = () => {
    if (!displayMenu) {
      setDisplayMenu(true)
    } else {
      setDisplayMenu(false)
    }
  }

  const enableEdit = () => {
    setEditMode(true)
    toggleMenu()
  }

  const submit = () => {
    // send update to API from edit field
    setEditMode(false)
  }

  return (
    <StyledTableCategory className={open ? "open" : ""}>
      <CategoryHeaderRow>
        <TableCell>
          <img className="collapse-icon" src={ArrowIcon} onClick={toggleOpen} />
          {!editMode ? (
            <>
              {categoryTitle}
              <img className="edit" src={EditIconOrange} onClick={toggleMenu} />
            </>
          ) : (
            <>
              <input
                className="edit-field"
                defaultValue={categoryTitle}
              ></input>
              <img className="edit" src={CheckIconOrange} onClick={submit} />
            </>
          )}
        </TableCell>
        <OptionMenu display={displayMenu} onEdit={enableEdit} />
      </CategoryHeaderRow>
      <div className="items">
        {category
          ? category.dishes.map((item, index) => (
              <ItemRow key={index} item={item} />
            ))
          : ""}
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

  display: ${({ shouldDisplay }) => (shouldDisplay ? "block" : "none")};

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`

const OptionMenu = ({ display, onEdit }) => {
  return (
    <StyledOptionMenu shouldDisplay={display}>
      <ul>
        <li onClick={onEdit}>Edit</li>
        <li>Delete</li>
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
    background-color: #f9f9f9;
    font-size: 14px;
    padding-left: 10px;
    border-radius: 8px;
    border: 2px #e3ebf2 solid;
    flex-basis: 50%;
  }

  .buttons {
    display: flex;
    color: white;
    align-self: flex-end;
    text-align: center;
    font-size: 14px;

    .new-dish {
      background-color: #f3a35c;
      padding: 10px 20px;
      text-align: center;
      border: 2px solid #f3a35c;
      border-radius: 8px;
      cursor: pointer;
    }

    .new-category {
      border: 2px solid #f3a35c;
      padding: 10px 20px;
      color: #f3a35c;
      border-radius: 8px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`

// Overall component which renders the table as a list of menu categories
const MenuTable = ({ menu }) => {
  return (
    <>
      <MenuControls>
        <input className="search" name="search" placeholder="DISH SEARCH" />
        <div className="buttons">
          <div className="new-category">New Menu Category</div>
          <div className="new-dish">New Dish</div>
        </div>
      </MenuControls>
      <StyledMenuTable>
        <HeaderRow>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Allergens</TableCell>
        </HeaderRow>
        {/* <TableCategory categoryTitle='Appetizers' category={ menu['Appetizers'] }></TableCategory>
                <TableCategory categoryTitle='Pastas' category={ menu['Pastas'] }></TableCategory> */}

        {menu
          ? menu.map(item => (
              <TableCategory
                categoryTitle={item.name}
                category={item}
              ></TableCategory>
            ))
          : ""}
      </StyledMenuTable>
    </>
  )
}

export { MenuTable }
