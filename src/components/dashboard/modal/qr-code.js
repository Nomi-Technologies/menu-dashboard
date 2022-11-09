import React, { useEffect, useState } from "react";
import { FormTitle } from "../../form";
import { ButtonPrimary, ButtonSecondary, ButtonRow } from "../../basics";
import styled from "styled-components";
import QRCode from "qrcode";
import { useModal, Modal } from "./modal";

const QRCodeContainer = styled.div`
  display: block;
  margin: 20px auto;
  width: 175px;
  height: 175px;
`;

const useQRCodeModal = () => {
  let [open, openModal, closeModal] = useModal();

  let closeQRCodeModal = closeModal;
  return [open, openModal, closeQRCodeModal];
};

const QRCodeModal = ({ open, openModal, closeModal, restoId, menuId }) => {
  const url = `${process.env.GATSBY_REDIRECT_SERVICE_URL}?restoId=${restoId}&menuId=${menuId}`;

  const [qrCodeDataUrl, setQRCodeDataUrl] = useState();

  useEffect(() => {
    setQRCodeDataUrl(null);
  }, [menuId]);

  useEffect(() => {
    // only start generation if modal is opened & qr code not generated
    if (open && !qrCodeDataUrl) {
      QRCode.toDataURL(url, {
        scale: 128,
        margin: 0,
        type: "image/png",
      }).then((dataUrl) => {
        setQRCodeDataUrl(dataUrl);
      });
    }
  }, [open, qrCodeDataUrl]);

  const downloadQRCode = () => {};

  return (
    <Modal
      open={open}
      openModal={openModal}
      closeModal={closeModal}
      width={"550px"}
    >
      <FormTitle>QR Code</FormTitle>
      {qrCodeDataUrl ? (
        <QRCodeContainer as="img" src={qrCodeDataUrl} />
      ) : (
        <QRCodeContainer>Generating QR code...</QRCodeContainer>
      )}
      <ButtonRow>
        <ButtonSecondary onClick={closeModal}>Close</ButtonSecondary>
        <a href={qrCodeDataUrl} download={`${menuId}-QRCode`}>
          <ButtonPrimary onClick={() => {}}>Download as .PNG</ButtonPrimary>
        </a>
      </ButtonRow>
    </Modal>
  );
};

export { useQRCodeModal, QRCodeModal };
