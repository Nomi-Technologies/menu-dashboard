import { FormButton } from "../../basics"
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

let NoneSelectedFormMessage = styled(FormMessage)`
`

let SingleFormMessage = styled(FormMessage)`
`

let MultipleFormMessage = styled(FormMessage)`
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
                    <NoneSelectedFormMessage type={type} itemIds={itemIds}>
                      There are currently no items selected to delete.
                    </NoneSelectedFormMessage> : ""
                  }
                  {
                    type === "multiple" ? "" : <SingleFormMessage type={type} itemIds={itemIds}>
                      Are you sure you want to delete this item?
                    </SingleFormMessage>
                  }
                  {
                    type === "multiple" && itemIds && itemIds.length > 0 ?
                    <MultipleFormMessage type={type} itemIds={itemIds}>
                      Are you sure you want to delete ({itemIds.length}) items?
                    </MultipleFormMessage> : ""
                  }

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
