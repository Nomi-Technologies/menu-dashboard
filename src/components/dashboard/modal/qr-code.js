import React from 'react';
import { FormTitle } from "../../form"
import { ButtonPrimary, ButtonSecondary, ButtonRow } from "../../basics"
import styled from "styled-components"
import { useQRCode } from 'react-qrcode'
import { useModal, Modal } from "./modal"

const QRCode = styled.div`
    display: block;
    margin: 20px auto;
    width: 175px;
    height: 175px;
`;

const useQRCodeModal = () => {
    let [open, openModal, closeModal] = useModal();
    
    let closeQRCodeModal = closeModal
    return [open, openModal, closeQRCodeModal]
}

const QRCodeModal = ({open, openModal, closeModal, uniqueName}) => {
    const url = `${process.env.GATSBY_SMART_MENU_URL}/${uniqueName}`
    const qrCodeDataUrl = useQRCode({
        value: url,
        scale: 128,
        margin: 0,
        type: 'image/png',
    });

    const downloadQRCode = () => {

    }

    return(
        <Modal open={ open } openModal={ openModal } closeModal={ closeModal } width={ "550px" }>
            <FormTitle>QR Code</FormTitle>
            {
                uniqueName === null ?
                <QRCode>Generating QR code...</QRCode>
                :
                <QRCode as='img' src={qrCodeDataUrl}/>
            }
            <ButtonRow>
                <ButtonSecondary onClick={ closeModal }>Close</ButtonSecondary>
                <a
                    href={qrCodeDataUrl}
                    download={`${uniqueName}-QRCode`}>
                    <ButtonPrimary onClick={() => {}}>Download as .PNG</ButtonPrimary>
                </a>
            </ButtonRow>
        </Modal>
    )
}

export { useQRCodeModal, QRCodeModal }