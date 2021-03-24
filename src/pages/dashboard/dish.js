import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { Router } from "@reach/router";
import styled from "styled-components";

import Client from "../../util/client";

import MenuTableLayout from "../../components/dashboard/menu-table/menu-table-layout";
import { ButtonPrimary, ButtonSecondary } from "../../components/basics";
import {
  FormTitle,
  FormSubtitle,
  FormInput,
  FormTextArea,
  FormSplitRow,
  FormSplitColumn,
  FormContainer,
  FormControls,
} from "../../components/form";
import { FileDrop } from "../../components/file-drop";
import { CategoryDropdown } from "../../components/dashboard/menu-table/form/dropdown";
import { DishTagForm } from "../../components/dashboard/menu-table/form/dish-tag-form";
import { DishDietForm } from "../../components/dashboard/menu-table/form/dish-diet-form";

import ModificationForm from "../../components/dashboard/menu-table/form/modifier-form";
import Navigation from "../../util/navigation";

import {
  ModificationModal,
  useModificationModal,
} from "../../components/dashboard/modal/modification";

const Banner = styled.div`
  background: url(${({ src }) => src});
  background-size: cover;
  width: 300px;
  height: 200px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DishPage = ({ location }) => {
  const { state = {} } = location;

  if (state === null || state === {}) {
    navigate("/dashboard/all-menus");
  }

  const { menuId, dishId, create } = state;
  const [dishData, setDishData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: 0,
    Tags: [],
    Diets: [],
    modIds: [], // only contains ids
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [dishImage, setDishImage] = useState(null);
  const [selectedDishImageURL, setSelectedDishImageURL] = useState(null);
  const modificationModalControls = useModificationModal();

  const updateCategorySelection = (categoryId) => {
    setDishData({
      ...dishData,
      categoryId: categoryId,
    });

    console.log(dishData);
  };

  const setDishTags = (tags) => {
    setDishData({
      ...dishData,
      Tags: tags,
    });
  };

  const setDishDiets = (diets) => {
    setDishData({
      ...dishData,
      Diets: diets,
    });
  };

  const setDishModIds = (ids) => {
    setDishData({
      ...dishData,
      modIds: ids,
    });
  };

  const setFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onabort = () => console.error("file reading was aborted");
    reader.onerror = () => {
      console.error("file reading has failed");
      setErrorMessage("Error reading file");
    };
    reader.onload = () => {
      const formData = new FormData();
      formData.append("file", file);
      setDishImage(formData);
    };
  };

  const clearFile = () => {
    setDishImage(null);
  };

  const initializeForm = () => {
    if (!create) {
      Client.getDish(dishId).then((res) => {
        const dish = res.data;
        console.log(dish);
        dish.modIds = dish.Modifications.map((mod) => mod.id);
        delete dish["Modification"];
        setDishData(dish);
      });
      Client.getDishImage(dishId).then((res) => {
        if (res.config.url) {
          setSelectedDishImageURL(res.config.url);
        }
      });
    }
  };

  const validateDishData = () => {
    if (dishData.categoryId === 0) {
      return false;
    }

    if (dishData.name === "") {
      return false;
    }
    return true;
  };

  const createOrUpdateDish = async () => {
    // first validate dish form
    if (!validateDishData()) return;

    let postDishData = {
      ...dishData,
      dishTags: dishData.Tags.map((tag) => tag.id),
      dishDiets: dishData.Diets.map((diet) => diet.id),
      dishModifications: dishData.modIds,
    };

    try {
      if (create) {
        await Client.createDish(postDishData);
        if (dishImage) {
          await Client.upsertDishImage(dishId, dishImage);
        }
      } else {
        await Client.updateDish(dishId, postDishData);
        if (dishImage) {
          await Client.upsertDishImage(dishId, dishImage);
        }
      }

      Navigation.table(menuId);
    } catch (error) {
      console.log("could not create dish");
    }
  };

  useEffect(() => {
    initializeForm();
  }, []);

  return (
    <MenuTableLayout menuId={menuId}>
      <FormContainer>
        <FormTitle>{create ? "Create Dish" : "Edit Dish Info"}</FormTitle>
        <FormSubtitle>Dish Name</FormSubtitle>
        <FormInput
          placeholder="Set dish name..."
          value={dishData.name}
          name="name"
          onChange={(event) => {
            setDishData({
              ...dishData,
              name: event.target.value,
            });
          }}
        />
        <FormSubtitle>Description</FormSubtitle>
        <FormTextArea
          placeholder="Set description..."
          value={dishData.description}
          name="description"
          onChange={(event) => {
            setDishData({
              ...dishData,
              description: event.target.value,
            });
          }}
        />
        <FormSplitRow>
          <FormSplitColumn>
            <FormSubtitle>Menu Section</FormSubtitle>
            <CategoryDropdown
              categoryId={dishData.categoryId}
              updateSelection={updateCategorySelection}
              menuId={menuId}
            />
          </FormSplitColumn>
          <FormSplitColumn>
            <FormSubtitle>Price</FormSubtitle>
            <FormInput
              placeholder="Set price..."
              name="price"
              value={dishData.price}
              onChange={(event) => {
                setDishData({
                  ...dishData,
                  price: event.target.value,
                });
              }}
            />
          </FormSplitColumn>
        </FormSplitRow>
        <FormSubtitle>Allergens</FormSubtitle>
        <DishTagForm tags={dishData.Tags} setTags={setDishTags}></DishTagForm>

        <FormSubtitle>Diets</FormSubtitle>
        <DishDietForm
          diets={dishData.Diets}
          setDiets={setDishDiets}
        ></DishDietForm>
        <FormSubtitle>Image (Optional)</FormSubtitle>
        {selectedDishImageURL ? (
          <>
            <Banner src={selectedDishImageURL} /> <div>Replace Image:</div>{" "}
          </>
        ) : null}
        <FileDrop
          acceptedFileTypes={[".png", ".jpg", ".jpeg"]}
          setFile={setFile}
          setErrorMessage={setErrorMessage}
          clearFile={clearFile}
        />

        <FormTitle>Dish Modifiers</FormTitle>
        <ModificationForm
          modalControls={modificationModalControls}
          dishModIds={dishData.modIds}
          setDishModIds={setDishModIds}
        />
        <FormControls>
          <ButtonSecondary
            onClick={() => {
              Navigation.table(menuId);
            }}
          >
            Cancel
          </ButtonSecondary>
          <ButtonPrimary onClick={createOrUpdateDish}>
            {create ? "Create Dish" : "Update Dish"}
          </ButtonPrimary>
        </FormControls>
      </FormContainer>
      <ModificationModal controls={modificationModalControls} />
    </MenuTableLayout>
  );
};

const AllMenusPage = () => {
  if (typeof window !== `undefined`) {
    Navigation.allMenus();
  }

  return <></>;
};

export default () => {
  return (
    <Router basepath="/dashboard/dish">
      <DishPage path="/:menuId/:dishIdOrCreate" />
      <AllMenusPage path="/" />
    </Router>
  );
};
