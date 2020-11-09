import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import HamburgerMenu from 'react-hamburger-menu';
import Client from "../util/client";
import { QRCodeModal } from "../components/dashboard/modal/qr-code"
import { UploadCSVModal } from "../components/dashboard/modal/upload-csv"
import { DeleteConfirmationModal } from "../components/dashboard/modal/delete"

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
    &:hover {
        background: rgba(242, 153, 74, 0.1);
    }
`;

const OrangeTextMenuItem = styled(MenuItem)`
    color: #F5B57A;
`;

const RedTextMenuItem = styled(MenuItem)`
    color: #FB6565;
`;

const HorizontalSeparator = styled.div`
    height: 0;
    width: 195px;
    border: 1px solid #E1E7EC;
    margin: 0 auto;
`;

const FloatingMenu = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [showCSVUploadModal, setShowCSVUploadModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [uniqueName, setUniqueName] = useState(null);
    const [restaurantName, setRestaurantName] = useState(null);
    
    useEffect(() => {
        // TODO(Tony): use global context for restaurant info
        // Currently put here to avoid multiple requests
        Client.getRestaurantInfo().then(res => {
            setUniqueName(res.data.uniqueName);
            setRestaurantName(res.data.name);
        });

    }, [props.menuId]);

    async function deleteMenu(id) {
        props.onClickMenu();
        setShowDeleteConfirmationModal(true); // show delete confirmation modal
    }

    async function duplicateMenu(id) {
        const res = await Client.duplicateMenu(id);
        props.onClickMenu();
        props.updateMenuSelection(res.data.menu);
    }

    async function closeDeleteConfirmation(shouldDelete) {
        if(shouldDelete) {
            await Client.deleteMenu(props.menuId);
            props.updateMenuSelection();
        }
        setShowDeleteConfirmationModal(false)
    }
    
    return (
        <>
            <div className={props.className}>
                <Menu isOpen={props.isOpen} className={props.className}>
                    {/* <OrangeTextMenuItem>Download as .csv</OrangeTextMenuItem>
                    <HorizontalSeparator/> */}
                    <OrangeTextMenuItem
                        onClick={() => setShowCSVUploadModal(true)}
                    >Upload .csv Menu</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <OrangeTextMenuItem
                        onClick={() => duplicateMenu(props.menuId)}
                    >Duplicate Menu</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <OrangeTextMenuItem
                        onClick={() => setShowQRCodeModal(true)}
                    >View QR Code</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <RedTextMenuItem onClick={()=>deleteMenu(props.menuId)}> Delete Menu</RedTextMenuItem>
                </Menu>
                
            </div>
            <UploadCSVModal show={ showCSVUploadModal } close={() => setShowCSVUploadModal(false) } menuId={ props.menuId } updateMenu={ props.updateMenu }/>
            {
                showQRCodeModal ? (
                    <QRCodeModal
                        uniqueName={uniqueName}
                        name={restaurantName}
                        closeForm={() => setShowQRCodeModal(false)}
                    />
                ) : <></>
            }
            {
                showDeleteConfirmationModal ? (
                    <DeleteConfirmationModal closeForm={closeDeleteConfirmation}/>
                ) : null
            }
        </>
    )
}

export { FloatingMenu };
