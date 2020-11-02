import { FormButton } from "../../buttons"
import React from 'react';
import styled from 'styled-components'

import {
  Modal, Container, ButtonRow, ModalBackground, FormTitle, FormMessage
} from "./modal"

import useEventListener from '@use-it/event-listener'

let StyledDeleteConfirmation = styled.div`
    ${Modal} {
        width: 30%;
    }
`
//Keyboard accessbilities
const ESCAPE_KEYS = ['27', 'Escape'];
const ENTER_KEYS = ['13', 'Enter'];

const DeleteConfirmationModal = ({ props, closeForm }) => {
    //press escape to exit the form, press enter to submit
    function handler({ key }) {
        if (ESCAPE_KEYS.includes(String(key))) {
            closeForm(false)
        }
        if(ENTER_KEYS.includes(String(key))){
            closeForm(true)
        }
    }

    useEventListener('keydown', handler);
    return (
        
    <StyledDeleteConfirmation>
        <ModalBackground />
        <Modal>
            <Container>
                <FormTitle>Delete Confirmation</FormTitle>
                <FormMessage>
                    Are you sure you want to delete this item?    
                </FormMessage>
                <ButtonRow>
                    <FormButton text='Cancel' theme='light' onClick={ () => { closeForm(false) } }/>
                    <FormButton text='Delete' onClick={ () => { closeForm(true) } }/>
                </ButtonRow>
            </Container>

        </Modal>
    </StyledDeleteConfirmation>
    )
}

export { DeleteConfirmationModal }