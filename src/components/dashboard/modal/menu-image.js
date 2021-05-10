import { ButtonPrimary, ButtonSecondary } from "../../basics";
import React, { useEffect, useState } from "react";
import Client from "../../../util/client";
import { FileDrop } from "../../file-drop";

import { Modal, useModal } from "./modal";
import { ButtonRow } from "../../basics";
import { FormSubtitle, FormTitle } from "../../form";
import ImagePreview from "../../image-preview";

const useMenuImageModal = (menuId) => {
  let [open, openModal, closeModal] = useModal();
  let [errorMessage, setErrorMessage] = useState(null);
  let [updateTime, setUpdateTime] = useState(Date.now()); // trigger reload

  let upsertMenuImage = async (image) => {
    try {
      Client.upsertMenuImage(menuId, image);
      setUpdateTime(Date.now());
    } catch (err) {
      setErrorMessage(err);
    }
  };

  return [
    open,
    openModal,
    closeModal,
    upsertMenuImage,
    `${process.env.GATSBY_AWS_S3_BASE_URL}/menus/${menuId}?${updateTime}`, // menuImage
    errorMessage,
    setErrorMessage,
  ];
};

const MenuImageModal = ({
  open,
  openModal,
  closeModal,
  upsertMenuImage,
  menuImage,
  errorMessage,
  setErrorMessage,
}) => {
  let [image, setImage] = useState(null);

  const setFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onabort = () => console.error("File reading aborted");
    reader.onerror = () => setErrorMessage("An error occurred.");
    reader.onload = () => {
      const formData = new FormData();
      formData.append("file", file);
      setImage(formData);
    };
  };

  const submit = () => {
    if (image) {
      upsertMenuImage(image);
    } else {
      setErrorMessage("Please select a file to upload");
    }
  };
  return (
    <Modal open={open} openModal={openModal} closeModal={closeModal}>
      <FormTitle>Upload Menu Header Image</FormTitle>
      {errorMessage ? <p className="error">{errorMessage}</p> : <></>}
      <FormSubtitle>Menu Header Image</FormSubtitle>
      <ImagePreview src={menuImage}>
        <div>Replace Image:</div>
      </ImagePreview>
      <FileDrop
        acceptedFileTypes={[".png", ".jpg", ".jpeg"]}
        setFile={setFile}
        setErrorMessage={setErrorMessage}
        clearFile={() => {
          setImage(null);
        }}
      />
      <ButtonRow>
        <ButtonSecondary onClick={closeModal}>Cancel</ButtonSecondary>
        <ButtonPrimary onClick={submit}>Upload Image</ButtonPrimary>
      </ButtonRow>
    </Modal>
  );
};

export { MenuImageModal, useMenuImageModal };
