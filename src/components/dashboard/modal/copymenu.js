import { FormButton } from "../../form"
import React, { useState } from 'react';
import { DishFormInput, DishFormTextArea } from "../../form"
import Client from '../../../util/client'
import {
  Modal, Container, ButtonRow, ModalBackground, FormTitle, FormSubtitle, Divider
} from "./modal"

import useEventListener from '@use-it/event-listener'

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
                        <FormButton text='Cancel' theme='light' onClick={ () => { closeForm(false, name) } }/>
                        <FormButton text='Create Menu' onClick={ () => { closeForm(true, name) } }/>
                    </ButtonRow>
                </Container>
            </Modal>
        </>
    )
}

export { CopyMenuModal }
