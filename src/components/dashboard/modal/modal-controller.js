import React from 'react';
import styled from "styled-components"

import ModalContext from "./modal-context"

// enum for tracking which modal should be visible
const modals = {
    NONE: 'none',
    DISH: 'dish',
    CATEGORY: 'category',
    MENU: 'menu',
    COPYMENU: 'copymenu',
    CSV: 'csv',
    QR: 'qr' 
}

export const ModalController = ({ children }) => {
    let [currentModal, setCurrentModal] = useState(modals.NONE)
    let [modalData, setModalData] = useState({})

    let showDishModal = (dishId, create) => {
        setCurrentModal(modal.DISH)
        setModalData({dishId, create})
    }

    let showCategoryModal = (categoryId, create) => {
        setCurrentModal(modal.CATEGORY)
        setModalData({categoryId, create})
    }

    let showMenuModal = (menuId, create) => {
        setCurrentModal(modal.MENU)
        setModalData({menuId, create})
    }

    let modalControls = {
        showDishModal,
        showCategoryModal,
        showMenuModal
    }

    return (
        <ModalContext.Provider value={ modalControls }>

            { children }
        </ModalContext.Provider>
    )
}