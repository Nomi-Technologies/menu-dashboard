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

let NoneSelectedFormMessage = styled(FormMessage)`
  display: ${ props => ((props.type == "multiple" && !props.itemIds) ? "block" : "none")};
`

let SingleFormMessage = styled(FormMessage)`
  display: ${ props => (props.type == "multiple" ? "none" : "block")};
`

let MultipleFormMessage = styled(FormMessage)`
  display: ${ props => ((props.type == "multiple" && props.itemIds) ? "block" : "none")};
`

const DeleteConfirmationModal = ({ props, closeForm }) => {
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
                  <NoneSelectedFormMessage type={type}>
                    There are currently no items selected to delete.
                  </NoneSelectedFormMessage>
                  <SingleFormMessage type={type}>
                      Are you sure you want to delete this item?
                  </SingleFormMessage>
                  <MultipleFormMessage type={type}>
                      Are you sure you want to delete ({itemIds.length}) items?
                  </MultipleFormMessage>
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
