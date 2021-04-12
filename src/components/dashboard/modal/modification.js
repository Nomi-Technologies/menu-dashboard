import React, { useContext, useState } from "react";
import Client from "../../../util/client";
import { ButtonPrimary, ButtonSecondary } from "../../basics";
import {
  FormControls,
  FormInput,
  FormNotice,
  FormSplitColumn,
  FormSplitRow,
  FormSubtitle,
  FormTitle,
} from "../../form";
import { DishTagForm } from "../menu-table/form/dish-tag-form";
import { ModificationContext } from "../menu-table/modification-context";

import { Modal, useModal } from "./modal";

export const useModificationModal = () => {
  const [open, _openModal, closeModal] = useModal();
  const [modification, setModification] = useState();
  const [create, setCreate] = useState(true);

  const createModification = async (mod) => {
    try {
      const res = await Client.createModification(mod);
      if (res) {
        closeModal();
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateModification = async (mod) => {
    try {
      const res = await Client.updateModification(mod.id, mod);
      if (res) {
        closeModal();
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const saveModification = async () => {
    const mod = {
      ...modification,
      addTags: modification.addTags.map((tag) => tag.id),
      removeTags: modification.removeTags.map((tag) => tag.id),
    };
    return (create
      ? await createModification(mod)
      : await updateModification(mod)
    ).modification;
  };

  const openModal = (modificationOrName) => {
    if (typeof modificationOrName === "string") {
      setModification({
        name: modificationOrName,
        price: "",
        addTags: [],
        removeTags: [],
      });
      setCreate(true);
    } else {
      setModification(modificationOrName);
      setCreate(false);
    }
    _openModal();
  };

  return {
    open,
    openModal,
    create,
    setCreate,
    closeModal,
    modification,
    setModification,
    saveModification,
  };
};

export const ModificationModal = ({
  addModification,
  controls: {
    open,
    closeModal,
    create,
    modification,
    setModification,
    saveModification,
  },
}) => {
  const { refreshModifications } = useContext(ModificationContext);

  return (
    <Modal open={open} closeModal={closeModal}>
      {create ? (
        <FormTitle>Add New Dish Modifier</FormTitle>
      ) : (
        <>
          <FormTitle style={{ marginBottom: "10px" }}>
            Edit Dish Modifier
          </FormTitle>
          <FormNotice style={{ marginBottom: "28px" }}>
            Editing this modifier will update across all dishes
          </FormNotice>
        </>
      )}
      <FormSplitRow>
        <FormSplitColumn style={{ flex: "1 1 auto" }}>
          <FormSubtitle>Modification Description</FormSubtitle>
          <FormInput
            placeholder="Set modifier description..."
            value={modification?.name}
            name="name"
            onChange={(e) => {
              setModification({
                ...modification,
                name: e.target.value,
              });
            }}
          />
        </FormSplitColumn>
        <FormSplitColumn
          style={{
            flex: "0 1 auto",
            width: "90px",
            marginLeft: "24px",
          }}
        >
          <FormSubtitle>Upcharge</FormSubtitle>
          <FormInput
            placeholder="1"
            value={modification?.price}
            name="price"
            onChange={(e) => {
              setModification({
                ...modification,
                price: e.target.value,
              });
            }}
          />
        </FormSplitColumn>
      </FormSplitRow>
      <FormSubtitle>Adds the Following Allergens</FormSubtitle>
      <DishTagForm
        tags={modification?.addTags}
        setTags={(selected) => {
          setModification({
            ...modification,
            addTags: selected,
          });
        }}
      ></DishTagForm>
      <FormSubtitle>Removes the Following Allergens</FormSubtitle>
      <DishTagForm
        tags={modification?.removeTags}
        setTags={(selected) => {
          setModification({
            ...modification,
            removeTags: selected,
          });
        }}
      ></DishTagForm>
      <FormControls>
        <ButtonSecondary onClick={closeModal}>Cancel</ButtonSecondary>
        <ButtonPrimary
          onClick={async () => {
            const mod = await saveModification();
            await refreshModifications();
            create && addModification(mod);
          }}
        >
          Save Modifier
        </ButtonPrimary>
      </FormControls>
    </Modal>
  );
};
