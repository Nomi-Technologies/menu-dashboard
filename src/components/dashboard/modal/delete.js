import React, { useState } from "react";
import styled from "styled-components";

import { FormTitle, FormMessage } from "../../form";
import { ButtonRow, ButtonSecondary, ButtonDelete } from "../../basics";
import { Modal, useModal } from "./modal";
import Client from "../../../util/client";
import { navigate } from "gatsby";

let StyledDeleteConfirmation = styled.div`
  ${Modal} {
    width: 30%;
  }
`;

export const useDeleteDishModal = (refreshMenu) => {
  let [open, openModal, closeModal] = useModal();
  let [dishId, setDishId] = useState(null);

  let openDeleteDishModal = (dishId) => {
    setDishId(dishId);
    openModal();
  };

  let closeDeleteDishModal = async (shouldDelete) => {
    if (shouldDelete) {
      // call delete api
      try {
        await Client.deleteDish(dishId);
        refreshMenu();
      } catch (error) {
        console.error(error);
      }
    }

    closeModal();
  };

  return [open, openDeleteDishModal, closeDeleteDishModal];
};

export const DeleteDishModal = ({ open, openModal, closeModal }) => {
  return (
    <Modal open={open} openModal={openModal} closeModal={closeModal}>
      <FormTitle>Confirm Delete Dish</FormTitle>
      <FormMessage>Are you sure you want to delete this dish?</FormMessage>
      <ButtonRow>
        <ButtonSecondary
          onClick={() => {
            closeModal(false);
          }}
        >
          Cancel
        </ButtonSecondary>
        <ButtonDelete
          onClick={() => {
            closeModal(true);
          }}
        >
          Delete
        </ButtonDelete>
      </ButtonRow>
    </Modal>
  );
};

export const useDeleteCategoryModal = (refreshMenu) => {
  let [open, openModal, closeModal] = useModal();
  let [categoryId, setCategoryId] = useState(null);

  let openDeleteCategoryModal = (categoryId) => {
    setCategoryId(categoryId);
    openModal();
  };

  let closeDeleteCategoryModal = async (shouldDelete) => {
    if (shouldDelete) {
      try {
        await Client.deleteCategory(categoryId);
        refreshMenu();
      } catch (error) {
        console.error(error);
      }
    }

    closeModal();
  };

  return [open, openDeleteCategoryModal, closeDeleteCategoryModal];
};

export const DeleteCategoryModal = ({ open, openModal, closeModal }) => {
  return (
    <Modal open={open} openModal={openModal} closeModal={closeModal}>
      <FormTitle>Confirm Delete Menu Section</FormTitle>
      <FormMessage>
        Are you sure you want to delete this menu section?
      </FormMessage>
      <ButtonRow>
        <ButtonSecondary
          onClick={() => {
            closeModal(false);
          }}
        >
          Cancel
        </ButtonSecondary>
        <ButtonDelete
          onClick={() => {
            closeModal(true);
          }}
        >
          Delete
        </ButtonDelete>
      </ButtonRow>
    </Modal>
  );
};

export const useDeleteMenuModal = (menuId, refreshMenu) => {
  let [open, openModal, closeModal] = useModal();

  let openDeleteMenuModal = () => {
    openModal();
  };

  let closeDeleteMenuModal = async (shouldDelete) => {
    if (shouldDelete) {
      try {
        await Client.deleteMenu(menuId);
        navigate("/dashboard");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }

    closeModal();
  };

  return [open, openDeleteMenuModal, closeDeleteMenuModal];
};

export const DeleteMenuModal = ({ open, openModal, closeModal }) => {
  return (
    <Modal open={open} openModal={openModal} closeModal={closeModal}>
      <FormTitle>Confirm Delete Menu</FormTitle>
      <FormMessage>Are you sure you want to delete this menu?</FormMessage>
      <ButtonRow>
        <ButtonSecondary
          onClick={() => {
            closeModal(false);
          }}
        >
          Cancel
        </ButtonSecondary>
        <ButtonDelete
          onClick={() => {
            closeModal(true);
          }}
        >
          Delete
        </ButtonDelete>
      </ButtonRow>
    </Modal>
  );
};
