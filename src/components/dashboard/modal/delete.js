import { ButtonSecondary, ButtonDelete } from "../../basics"
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

const DeleteConfirmationModal = ({ type, itemIds, closeForm }) => {
    //press escape to exit the form, press enter to submit
    function handler({ key }) {
        if (key === 'Escape') {
            closeForm(false)
        }
        if (key === 'Enter') {
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
                  {
                    type === "multiple" && itemIds && itemIds.length === 0 ?
                    <FormMessage type={type} itemIds={itemIds}>
                      There are currently no items selected to delete.
                    </FormMessage> : ""
                  }
                  {
                    type === "multiple" ? "" : <FormMessage type={type} itemIds={itemIds}>
                      Are you sure you want to delete this item?
                    </FormMessage>
                  }
                  {
                    type === "multiple" && itemIds && itemIds.length > 0 ?
                    <FormMessage type={type} itemIds={itemIds}>
                      Are you sure you want to delete ({itemIds.length}) items?
                    </FormMessage> : ""
                  }

                  <ButtonRow>
                      <ButtonSecondary onClick={ () => { closeForm(false) } }>Cancel</ButtonSecondary>
                      <ButtonDelete onClick={ () => { closeForm(true) } }>Delete</ButtonDelete>
                  </ButtonRow>
              </Container>

          </Modal>
      </StyledDeleteConfirmation>
    )
}

export { DeleteConfirmationModal }
