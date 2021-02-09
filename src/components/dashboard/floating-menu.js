import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Client from "../../util/client";
import { Colors } from "../../util/colors"

import { useQRCodeModal, QRCodeModal } from "./modal/qr-code"

import { UploadCSVModal } from "./modal/upload-csv"
import { DeleteConfirmationModal } from "./modal/delete"
import { checkPropTypes } from 'prop-types';

const Menu = styled.div`
    position: absolute;
    background-color: white;
    width: 250px;
    border-radius: 8px;
    box-shadow: 4px 4px 15px #D9D9D9;
    display: ${({ isOpen }) => isOpen ? 'block' : 'none' };
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

const DeleteMenuItem = styled(MenuItem)`
    color: #FB6565;
`;

const HorizontalSeparator = styled.div`
    height: 0;
    width: 195px;
    border: 1px solid #E1E7EC;
    margin: 0 auto;
`;

const FloatingMenu = (props) => {
    const [showCSVUploadModal, setShowCSVUploadModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [uniqueName, setUniqueName] = useState(null);
    const [restaurantName, setRestaurantName] = useState(null);

    useEffect(() => {
        Client.getRestaurantInfo().then(res => {
            setUniqueName(res.data.uniqueName);
            setRestaurantName(res.data.name);
        });

    }, [props.menuId]);

    async function duplicateMenu(id) {
        const res = await Client.duplicateMenu(id);
        props.onClickMenu();
        // props.updateMenuSelection(res.data.menu);
    }

    async function downloadCSV(){
        Client.downloadCSV(props.menuId).then(res => {
            if(res.status == 200 && res.data.csv){
                var csv = res.data.csv
                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'menu.csv';
                hiddenElement.click();
            }
        })
    }

    let [showQRCodeModal, openQRCodeModal, closeQRCodeModal] = useQRCodeModal();
    
    return (
        <>
            <div className={props.className}>
                <Menu isOpen={props.isOpen} className={props.className}>
                    <MenuItem onClick = {() => downloadCSV()}>Download as .csv</MenuItem>
                    <HorizontalSeparator/>
                    <MenuItem onClick={() => setShowCSVUploadModal(true)}>Upload .csv Menu</MenuItem>
                    <HorizontalSeparator/>
                    <MenuItem onClick={() => duplicateMenu(props.menuId)}>Duplicate Menu</MenuItem>
                    <HorizontalSeparator/>
                    <MenuItem onClick={openQRCodeModal}>View QR Code</MenuItem>
                </Menu>
            </div>

            <QRCodeModal open={ showQRCodeModal } openModal={ openQRCodeModal } closeModal={ closeQRCodeModal } uniqueName={ uniqueName }/>
        </>
    )
}

export { FloatingMenu };
