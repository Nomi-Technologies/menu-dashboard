import React, { useEffect, useState, useCallback, useContext } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import debounce from "lodash.debounce";
import Navigation from "../../../util/navigation";

import Client from "../../../util/client";
import SearchIcon from "../../../assets/img/search.png";
import CancelIcon from "../../../assets/img/delete-icon.png";
import {
  Button,
  ButtonPrimary,
  ButtonSecondary,
  ButtonSpecial,
  ButtonDelete,
} from "../../basics";
import * as Table from "./table";
import { MenuContext } from "./menu-context";
import { URLParamsContext } from "../../URL-params-context";
import { SearchBox } from "./search-box";

const StyledMenuTable = styled.div`
  width: 100%;
  max-width: 100%;
  transition: 0.5s ease-in-out all;
  margin-bottom: 150px;
  border-radius: 8px;
  overflow: hidden;
`;

const MenuControls = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  width: 100%;

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
`;

function useAsyncState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const setter = (x) =>
    new Promise((resolve) => {
      setValue(x);
      resolve(x);
    });
  return [value, setter];
}

// Overall component which renders the table as a list of menu categories
const MenuTable = () => {
  const { restoId } = useContext(URLParamsContext);
  let menuTableContext = useContext(MenuContext);
  let refreshMenu = menuTableContext?.refreshMenu;
  let menu = menuTableContext?.menu;
  const [menuData, setMenuData] = useState({}); // includes parsed menuData

  const [showCopyMenuConfirmation, setCopyMenuConfirmation] = useAsyncState(
    false
  );
  const [showEditDishForm, setEditDishForm] = useState(false);
  const [showEditMode, setEditMode] = useState(false);
  const [showDeleteConfirmation, setDeleteConfirmation] = useAsyncState(false);
  const [toDelete, setToDelete] = useAsyncState({});
  const [selectedDishes, setSelectedDishes] = useAsyncState([]);
  const [toDeleteType, setToDeleteType] = useAsyncState("");
  const [searchResults, setSearchResults] = useState([]);
  // isSearching means we are currently in search mode. It does not mean we are loading results
  const [isSearching, setIsSearching] = useState(false);

  const toggleEditDishForm = (dish) => {
    // if (typeof dish !== 'undefined') setSelectedDish(dish)
    if (!showEditDishForm) closeAllForms(); //if about to open form
    setEditDishForm(!showEditDishForm);
  };

  const handleCheckboxChange = (itemId) => {
    let newSelectedDishes = selectedDishes;

    if (selectedDishes.includes(itemId)) {
      var index = newSelectedDishes.indexOf(itemId);
      newSelectedDishes.splice(index, 1);
    } else {
      newSelectedDishes.push(itemId);
    }

    setSelectedDishes(newSelectedDishes);
  };

  const openDeleteConfirmation = (id, type) => {
    if (!showDeleteConfirmation) {
      closeAllForms(); //if about to open form

      if (type === "dishes") {
        setSelectedDishes(id).then(() => {
          setDeleteConfirmation(true);
        });
        setToDeleteType("multiple");
      } else {
        setToDelete({ id: id, type: type }).then(() => {
          setDeleteConfirmation(true);
        });

        setToDeleteType("single");
      }
    }
  };

  const openCopyMenuConfirmation = (ids) => {
    if (!showCopyMenuConfirmation) {
      closeAllForms(); //if about to open form

      setSelectedDishes(ids).then(() => {
        setCopyMenuConfirmation(true);
      });
    }
  };

  const closeAllForms = () => {
    setEditDishForm(false);
    setDeleteConfirmation(false);
  };

  // takes menu object from API and returns dictionary with IDs to data, and an array of categories and menus for ordering
  const parseMenu = (menu) => {
    let categoryDict = {};
    let categoryOrder = [];
    let dishDict = {};

    menu.Categories.forEach((category) => {
      let dishOrder = [];

      category.Dishes.forEach((dish) => {
        dishDict[dish.id] = dish;
        dishOrder.push(dish.id);
      });

      // new stuff
      categoryDict[category.id] = {
        ...category,
        dishOrder: dishOrder,
      };
      categoryOrder.push(category.id);
    });

    return {
      categoryDict: categoryDict,
      categoryOrder: categoryOrder,
      dishDict: dishDict,
    };
  };

  useEffect(() => {
    if (menu) {
      let menuData =
        menu && Object.keys(menu).length > 0
          ? {
              ...parseMenu(menu),
              menuData: menu, // todo: rename menu
            }
          : {};
      setMenuData(menuData);
      setCategoryOrder(menuData.categoryOrder);
    }
  }, [menu]);

  const [categoryOrder, setCategoryOrder] = useState([]);

  const moveCategory = useCallback(
    debounce((id, atIndex) => {
      let index = categoryOrder.indexOf(id);

      let newCategoryOrder = update(categoryOrder, {
        $splice: [
          [index, 1],
          [atIndex, 0, id],
        ],
      });

      setCategoryOrder(newCategoryOrder);
    }, 5)
  );

  const saveCategoryOrder = async () => {
    try {
      await Client.updateCategoryOrder(menu.id, categoryOrder);
    } catch {
      refreshMenu();
    }
  };

  const renderTableContents = () => {
    if (!isSearching) {
      return (
        <div id="menuTable">
          {categoryOrder?.length > 0
            ? categoryOrder.map((categoryId, index) => (
                <Table.TableCategory
                  key={categoryId}
                  index={index}
                  menuId={menu.id}
                  menuContext={menuData}
                  category={menuData.categoryDict[categoryId]}
                  openDeleteConfirmation={openDeleteConfirmation}
                  handleCheckboxChange={handleCheckboxChange}
                  showEditMode={showEditMode}
                  moveCategory={moveCategory}
                  saveCategoryOrder={saveCategoryOrder}
                  refreshMenu={refreshMenu}
                />
              ))
            : ""}
        </div>
      );
    } else if (searchResults.length === 0) {
      return <Table.TableCell>No items found</Table.TableCell>;
    }
    return (
      <>
        {searchResults.map((dish, index) => (
          <Table.SearchItemRow
            menuId={menu?.id}
            key={index}
            dish={dish}
            toggleEditDish={toggleEditDishForm}
            openDeleteConfirmation={openDeleteConfirmation}
            handleCheckboxChange={handleCheckboxChange}
            showEditMode={showEditMode}
          />
        ))}
      </>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <MenuControls>
        <div className="buttons"></div>

        <SearchBox
          setIsSearching={setIsSearching}
          setSearchResults={setSearchResults}
          menu={menu}
          isSearching={isSearching}
        ></SearchBox>

        <div className="buttons right-controls">
          {showEditMode ? (
            <>
              <ButtonPrimary
                onClick={() => openCopyMenuConfirmation(selectedDishes)}
                showEditMode={showEditMode}
                role="button"
              >
                Copy To New Menu
              </ButtonPrimary>
              <ButtonDelete
                onClick={() => openDeleteConfirmation(selectedDishes, "dishes")}
                showEditMode={showEditMode}
                role="button"
              >
                Delete
              </ButtonDelete>
            </>
          ) : (
            <>
              <ButtonPrimary
                onClick={() => {
                  Navigation.dish(restoId, menu.id);
                }}
                showEditMode={showEditMode}
                role="button"
              >
                New Dish
              </ButtonPrimary>
            </>
          )}
        </div>
      </MenuControls>

      <StyledMenuTable>
        <Table.HeaderRow>
          <Table.TableCell className="title">Title</Table.TableCell>
          <Table.TableCell className="description">Description</Table.TableCell>
          <Table.TableCell className="price">Price</Table.TableCell>
          <Table.TableCell className="tags">Allergens</Table.TableCell>
          <Table.TableCell className="diets">Diets</Table.TableCell>
        </Table.HeaderRow>
        {renderTableContents()}
        <Table.AddCategory
          onClick={() => {
            Navigation.category(restoId, menu.id);
          }}
        />
      </StyledMenuTable>
    </DndProvider>
  );
};

export { MenuTable };
