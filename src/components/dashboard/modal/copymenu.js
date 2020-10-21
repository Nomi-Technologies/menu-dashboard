import { FormButton } from "../../buttons"
import React, { useState } from 'react';
import { DishFormInput, DishFormTextArea } from "../../form"
import Client from '../../../util/client'
import {
  Modal, Container, ButtonRow, ModalBackground, FormTitle, FormSubtitle, Divider
} from "./modal"

const CopyMenuModal = (props) => {
    const [name, setName] = useState('');
// how do you know what you need to create a new menu??, API Call
    const createMenuCopy = () => {

    }
// <FormButton text='Create Menu' onClick={createMenuCopy} />
    return (
        <>
            <ModalBackground />
            <Modal>
                <Container>
                    <FormTitle>Copy ({props.itemIds.length}) dishes to {name}</FormTitle>
                    <FormSubtitle>Menu Name</FormSubtitle>
                    <DishFormInput placeholder='Fall 2020' name='menu' value={ name } onChange={(event) => { setName(event.target.value) }}/>
                    <Divider/>
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm} />
                        <FormButton text='Create Menu' />
                    </ButtonRow>
                </Container>
            </Modal>
        </>
    )
}

export { CopyMenuModal }
