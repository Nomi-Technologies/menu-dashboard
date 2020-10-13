import { FormButton } from "../../form"
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

const DeleteConfirmationModal = ({ props, closeForm }) => {
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