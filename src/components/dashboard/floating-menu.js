import React, { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import Client from "../../util/client";
import { Colors } from "../../util/colors";

import { MenuContext } from "./menu-table/menu-context";

import { useQRCodeModal, QRCodeModal } from "./modal/qr-code";
import { useUploadCSVModal, UploadCSVModal } from "./modal/upload-csv";
import {
  DeleteConfirmationModal,
  DeleteMenuModal,
  useDeleteMenuModal,
} from "./modal/delete";
import { useMenuImageModal, MenuImageModal } from "./modal/menu-image";
import { checkPropTypes } from "prop-types";

const Menu = styled.div`
  position: absolute;
  background-color: white;
  width: 250px;
  border-radius: 8px;
  box-shadow: 4px 4px 15px #d9d9d9;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 3;
`;

const MenuItem = styled.div`
  height: 60px;
  width: 100%;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
  transition: 0.2s ease-in-out;
  color: ${Colors.ORANGE};
  &:hover {
    background: rgba(242, 153, 74, 0.1);
  }
`;

const HorizontalSeparator = styled.div`
  height: 0;
  width: 195px;
  border: 1px solid #e1e7ec;
  margin: 0 auto;
`;

const FloatingMenu = ({ isOpen, close, menuId, className }) => {
  const [uniqueName, setUniqueName] = useState(null);
  let { refreshMenu, menu } = useContext(MenuContext);

  useEffect(() => {
    Client.getRestaurantInfo().then((res) => {
      setUniqueName(res.data.uniqueName);
    });
  }, []);

  // TODO: Re-add this feature
  async function duplicateMenu() {
    const res = await Client.duplicateMenu(menuId);
    // props.onClickMenu();
    // props.updateMenuSelection(res.data.menu);
  }

  async function downloadCSV() {
    Client.downloadCSV(menuId).then((res) => {
      if (res.status == 200 && res.data.csv) {
        var csv = res.data.csv;
        var hiddenElement = document.createElement("a");
        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
        hiddenElement.target = "_blank";
        hiddenElement.download = "menu.csv";
        hiddenElement.click();
      }
    });
  }

  async function togglePublished() {
    if (menu.published) {
      await Client.setPublished(menuId, false);
    } else {
      await Client.setPublished(menuId, true);
    }
    refreshMenu();
  }

  let [showQRCodeModal, openQRCodeModal, closeQRCodeModal] = useQRCodeModal();
  let [
    showUploadCSVModal,
    openUploadCSVModal,
    closeUploadCSVModal,
    uploadCSV,
    errorMessage,
    setErrorMessage,
  ] = useUploadCSVModal(menuId, refreshMenu);
  let [
    showDeleteMenuModal,
    openDeleteMenuModal,
    closeDeleteMenuModal,
  ] = useDeleteMenuModal(menuId, refreshMenu);
  let [
    showMenuImageModal,
    openMenuImageModal,
    closeMenuImageModal,
    upsertMenuImage,
    menuImage,
    menuImageErrorMessage,
    setMenuImageErrorMessage,
  ] = useMenuImageModal(menuId);

  return (
    <>
      <div className={className}>
        <Menu isOpen={isOpen} className={className}>
          <MenuItem onClick={openMenuImageModal}>
            Set Menu Header Image
          </MenuItem>
          <HorizontalSeparator />
          <MenuItem onClick={() => downloadCSV()}>Download as .csv</MenuItem>
          <HorizontalSeparator />
          <MenuItem onClick={openUploadCSVModal}>Upload .csv Menu</MenuItem>
          <HorizontalSeparator />
          <MenuItem onClick={openDeleteMenuModal}>Delete Menu</MenuItem>
          <HorizontalSeparator />
          <MenuItem onClick={openQRCodeModal}>View QR Code</MenuItem>
          <HorizontalSeparator />
          <MenuItem onClick={togglePublished}>
            {menu?.published ? "Unpublish Menu" : "Publish Menu"}
          </MenuItem>
        </Menu>
      </div>
      <QRCodeModal
        open={showQRCodeModal}
        openModal={openQRCodeModal}
        closeModal={closeQRCodeModal}
        uniqueName={uniqueName}
      />
      <UploadCSVModal
        open={showUploadCSVModal}
        openModal={openUploadCSVModal}
        closeModal={closeUploadCSVModal}
        uploadCSV={uploadCSV}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <DeleteMenuModal
        open={showDeleteMenuModal}
        openModal={openDeleteMenuModal}
        closeModal={closeDeleteMenuModal}
      />
      <MenuImageModal
        open={showMenuImageModal}
        openModal={openMenuImageModal}
        closeModal={closeMenuImageModal}
        upsertMenuImage={upsertMenuImage}
        menuImage={menuImage}
        errorMessage={menuImageErrorMessage}
        setErrorMessage={setMenuImageErrorMessage}
      />
    </>
  );
};

export { FloatingMenu };
