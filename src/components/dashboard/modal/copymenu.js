import { FormButton } from "../../basics"
import React, { useState } from 'react';
import { DishFormInput, ButtonPrimary, ButtonSecondary } from "../../basics"
import Client from '../../../util/client'

import { Modal, useModal } from "./modal"

import useEventListener from '@use-it/event-listener'

// const useDuplicateMenuModal = (refreshMenu, menuId) => {
//     const [open, openModal, closeModal] = useModal()

//     let closeDuplicateMenuModal = (submit, name) => {
//         if(submit) {
//             Client.duplicateMenu()
//         }
//     }
// }

// const DuplicateMenuModal = ({ open, openModal, closeModal }) => {
//     const [name, setName] = useState("")

//     return (
//         <Modal open={ open } openModal={ openModal } closeModal={ closeModal }>
//             <FormTitle>Duplicate Menu</FormTitle>
//             <FormSubtitle>New Menu Name</FormSubtitle>
//             <DishFormInput placeholder='Fall 2020' name='menu' value={ name } onChange={(event) => { setName(event.target.value) }}/>
//             <Divider/>
//             <ButtonRow>
//                 <ButtonSecondary onClick={ () => { closeModal(false, name) } }>Cancel</ButtonSecondary>
//                 <ButtonPrimary onClick={ () => { closeModal(true, name) } }>Create Menu</ButtonPrimary>
//             </ButtonRow>
//         </Modal>
//     )
// }

const CopyMenuModal = ({ closeForm, itemIds }) => {
    const [name, setName] = useState('');

    //press escape to exit the form, press enter to submit
    function handler({ key }) {
        if (key == 'Escape') {
            closeForm(false)
        }
        if (key == 'Enter') {
            closeForm(true)
        }
    }

    useEventListener('keydown', handler);

    return (
        <>
            <ModalBackground />
            <Modal>
                <Container>
                    <FormTitle>Copy ({itemIds.length}) dishes to {name}</FormTitle>
                    <FormSubtitle>Menu Name</FormSubtitle>
                    <DishFormInput placeholder='Fall 2020' name='menu' value={ name } onChange={(event) => { setName(event.target.value) }}/>
                    <Divider/>
                    <ButtonRow>
                        <ButtonSecondary onClick={ () => { closeForm(false, name) } }>Cancel</ButtonSecondary>
                        <ButtonPrimary onClick={ () => { closeForm(true, name) } }>Create Menu</ButtonPrimary>
                    </ButtonRow>
                </Container>
            </Modal>
        </>
    )
}

export { CopyMenuModal }
