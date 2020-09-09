import { FormButton } from "../../buttons"
import React from 'react';
import styled from 'styled-components'

import {
  Modal, Container, ButtonRow, ModalBackground, FormTitle
} from "./modal"

let StyledDeleteConfirmation = styled.div`
    ${Modal} {
        width: 50%;
        top: 350px;
    }
`

const DeleteConfirmationModal = ({ closeForm }) => (
    <StyledDeleteConfirmation>
        <ModalBackground />
        <Modal>
            <Container>
                <FormTitle>Delete Confirmation</FormTitle>
                Are you sure you want to delete this item?
                <ButtonRow>
                    <FormButton text='Cancel' theme='light' onClick={ () => { closeForm(false) } }/>
                    <FormButton text='Delete' onClick={ () => { closeForm(true) } }/>
                </ButtonRow>
            </Container>

        </Modal>
    </StyledDeleteConfirmation>
)

export { DeleteConfirmationModal }