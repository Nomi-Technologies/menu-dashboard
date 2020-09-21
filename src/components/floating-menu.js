import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import HamburgerMenu from 'react-hamburger-menu';
import Client from "../util/client";
import { QRCodeModal } from "../components/dashboard/modal/qr-code"
import { UploadCSVModal } from "../components/dashboard/modal/upload-csv"

const FloatingMenuButton = styled.div`
    position: absolute;
    width: 62px;
    height: 62px;
    right: 0;
    bottom: 0;
    border-radius: 36px;
    background: #F3A35C;
    box-shadow: 0px 10px 20px rgba(243, 163, 92, 0.2);
    cursor: pointer;
`;

const StyledHamburger = styled(HamburgerMenu)`
    margin: auto;
    position: absolute !important; /* overrides the in-line css of hamburger menu */
    top: 0; left: 0; bottom: 0; right: 0;
`;

const Menu = styled.div`
    position: absolute;
    background-color: white;
    width: 250px;
    bottom: 36px;
    right: 100px;
    border-radius: 8px;
    box-shadow: 4px 4px 15px #D9D9D9;
    display: ${({ isOpen }) => isOpen ? 'block' : 'none' };
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
    const [isOpen, setIsOpen] = useState(false);
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [showCSVUploadModal, setShowCSVUploadModal] = useState(false);
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

    function onClickMenu() {
        setIsOpen(!isOpen);
    }

    async function deleteMenu(id) {
        await Client.deleteMenu(id)
        onClickMenu();
        props.updateMenuSelection();
    }

    async function duplicateMenu(id) {
        const res = await Client.duplicateMenu(id);
        onClickMenu();
        props.updateMenuSelection(res.data.menu);
    }
    
    return (
        <>
            <div className={props.className}>
                <Menu isOpen={isOpen}>
                    <OrangeTextMenuItem>Download as .csv</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <OrangeTextMenuItem
                        onClick={() => setShowCSVUploadModal(true)}
                    >Upload Spreadsheet</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <OrangeTextMenuItem
                        onClick={() => duplicateMenu(props.menuId)}
                    >Duplicate Menu</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <OrangeTextMenuItem
                        onClick={() => setShowQRCodeModal(true)}
                    >Create QR Code</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <RedTextMenuItem onClick={()=>deleteMenu(props.menuId)}> Delete Menu</RedTextMenuItem>
                </Menu>
                <FloatingMenuButton onClick={onClickMenu}>
                    <StyledHamburger
                        isOpen={isOpen}
                        menuClicked={() => {}}
                        width={26}
                        height={24}
                        borderRadius={2}
                        color='white'
                        strokeWidth={4}
                        />
                </FloatingMenuButton>
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
        </>
    )
}

export { FloatingMenu };
