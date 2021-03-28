import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { Router } from "@reach/router";

import Client from "../../util/client";

import { MenuFormLayout } from "../../components/dashboard/menu-table/menu-form-layout";
import { ButtonPrimary, ButtonSecondary } from "../../components/basics";
import {
  FormTitle,
  FormSubtitle,
  FormInput,
  FormTextArea,
  FormContainer,
  FormControls,
} from "../../components/form";
import Navigation from "../../util/navigation";

const CategoryPage = ({ menuId, categoryIdOrCreate }) => {
  let categoryId, create;
  if (categoryIdOrCreate === "create") {
    create = true;
  } else {
    create = false;
    categoryId = categoryIdOrCreate;
  }

  let [categoryData, setCategoryData] = useState({
    menuId: menuId,
    name: "",
    description: "",
  });

  const initializeForm = () => {
    if (!create) {
      Client.getCategory(categoryId).then((res) => {
        setCategoryData(res.data);
      });
    }
  };

  useEffect(() => {
    initializeForm();
  }, []);

  const validateCategoryData = () => {
    return true;
  };

  const createOrUpdateCategory = async () => {
    if (!validateCategoryData()) return;

    try {
      if (create) {
        await Client.createCategory(categoryData);
      } else {
        await Client.updateCategory(categoryId, categoryData);
      }

      Navigation.table(menuId);
    } catch (error) {
      console.log("could not create/update category");
    }
  };

  return (
    <MenuFormLayout menuId={menuId}>
      <FormContainer>
        <FormTitle>
          {create ? "Create Menu Section" : "Edit Menu Section"}
        </FormTitle>
        <FormSubtitle>Section Name</FormSubtitle>
        <FormInput
          placeholder="Set section name..."
          value={categoryData.name}
          name="name"
          onChange={(event) => {
            setCategoryData({
              ...categoryData,
              name: event.target.value,
            });
          }}
        />
        <FormSubtitle>Description</FormSubtitle>
        <FormTextArea
          placeholder="Set description..."
          value={categoryData.description}
          name="description"
          onChange={(event) => {
            setCategoryData({
              ...categoryData,
              description: event.target.value,
            });
          }}
        />
        <FormControls>
          <ButtonSecondary
            onClick={() => {
              Navigation.table(menuId);
            }}
          >
            Cancel
          </ButtonSecondary>
          <ButtonPrimary onClick={createOrUpdateCategory}>
            {create ? "Create Menu Section" : "Update Menu Section"}
          </ButtonPrimary>
        </FormControls>
      </FormContainer>
    </MenuFormLayout>
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
    <Router basepath="/dashboard/category">
      <CategoryPage path="/:menuId/:categoryIdOrCreate" />
      <AllMenusPage path="/" />
    </Router>
  );
};
