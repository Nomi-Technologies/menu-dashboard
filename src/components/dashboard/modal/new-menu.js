import React, { useState, useContext } from "react";
import Client from "../../../util/client";

import { ButtonPrimary, ButtonSecondary, ButtonRow } from "../../basics";
import { FormInput, FormTitle, FormSubtitle } from "../../form";
import { FileDrop } from "../../file-drop";

import Navigation from "../../../util/navigation";

import { Modal, useModal } from "./modal";
import { RestaurantContext } from "../../restaurant-context";

const useNewMenuModal = (refreshMenu) => {
  const { restoId } = useContext(RestaurantContext);

  let [open, openModal, closeModal] = useModal();
  let [errorMessage, setErrorMessage] = useState(null);
  let [title, setTitle] = useState(null);
  let [fileContent, setFileContent] = useState(null);

  let createMenu = async () => {
    let menuData = {
      name: title,
    };
    if (fileContent !== null) {
      menuData = {
        ...menuData,
        csv: fileContent,
      };
    }

    try {
      let response = await Client.createMenu(menuData);
      if (response) {
        Navigation.table(restoId, response.data.id);
        closeModal();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "An error occured while trying to create your new menu.  Please try again later."
      );
      return;
    }
  };

  return [
    open,
    openModal,
    closeModal,
    createMenu,
    title,
    setTitle,
    fileContent,
    setFileContent,
    errorMessage,
    setErrorMessage,
  ];
};

const NewMenuModal = ({
  open,
  openModal,
  closeModal,
  createMenu,
  title,
  setTitle,
  fileContent,
  setFileContent,
  errorMessage,
  setErrorMessage,
}) => {
  const setFile = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onabort = () => console.error("file reading was aborted");
    reader.onerror = () => {
      console.error("file reading has failed");
      setErrorMessage("Error uploading file");
    };
    reader.onload = () => {
      // Do whatever you want with the file contents
      const fileContent = reader.result;
      setFileContent(fileContent);
    };
  };

  return (
    <Modal open={open} openModal={openModal} closeModal={closeModal}>
      <FormTitle>Create Menu</FormTitle>
      {errorMessage ? <p className="error">{errorMessage}</p> : <></>}
      <FormSubtitle>Menu Title</FormSubtitle>
      <FormInput
        placeholder="Type your menu title here..."
        name="menu"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <FormSubtitle>CSV File (Optional)</FormSubtitle>
      <FileDrop
        acceptedFileTypes={[".csv"]}
        setFile={setFile}
        setErrorMessage={setErrorMessage}
        clearFile={() => {
          setFileContent(null);
        }}
      />
      <ButtonRow>
        <ButtonSecondary onClick={closeModal}>Cancel</ButtonSecondary>
        <ButtonPrimary onClick={createMenu}>Create Menu</ButtonPrimary>
      </ButtonRow>
    </Modal>
  );
};

export { NewMenuModal, useNewMenuModal };
