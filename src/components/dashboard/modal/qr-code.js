import React from 'react';
import { PopupFormTitle, FormButton } from "../../basics"
import styled from "styled-components"
import { useQRCode } from 'react-qrcode'

import {
    Modal, Container, ButtonRow, ModalBackground
} from "./modal"

const QRCode = styled.div`
    display: block;
    margin: 50px auto;
    width: 250px;
    height: 250px;
`;

const QRCodeModal = (props) => {
    const url = `${process.env.GATSBY_SMART_MENU_URL}/${props.uniqueName}`
    const qrCodeDataUrl = useQRCode({
        value: url,
        scale: 128,
        margin: 0,
        type: 'image/png',
    });

    return (
        <>
            <ModalBackground/>
            <Modal>
                <Container>
                    <PopupFormTitle>Download QRCode for {props.name}</PopupFormTitle>
                    {
                        props.uniqueName === null ?
                        <QRCode>Generating QR code...</QRCode>
                        :
                        <QRCode as='img' src={qrCodeDataUrl}/>
                    }
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.closeForm}/>
                        <a
                            href={qrCodeDataUrl}
                            download={`${props.uniqueName}-QRCode`}
                        ><FormButton text='Download as PNG' onClick={() => {}}/></a>
                    </ButtonRow>
                </Container>
            </Modal>
        </>
    );
}

export { QRCodeModal }