import styled from "styled-components"
import React, { useEffect, useState } from "react"
import useEventListener from '@use-it/event-listener'

const StyledModal = styled.div`
    display: ${({open}) => open ? "block" : "none"};
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    width: ${ ({width}) => width ? width : "80%" };
    max-width: 600px;
    z-index: 100;
    box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.1);
    border-radius: 5px;
    background-color: white;
    left: 50%;
`

const Container = styled.div`
    display: block;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    .error {
        color: red;
        padding: 0;   
    }
` 

const useModal = () => {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return [open, openModal, closeModal]
}

const Modal = ({children, open, openModal, closeModal, width}) => {
    //press escape to exit the form, press enter to submit
    function handler({ key }) {
        if(!open) {
            return
        }

        if (key === 'Escape') {
            closeModal(false)
        }
        if (key === 'Enter') {
            closeModal(true)
        }
    }

    useEventListener('keydown', handler);
    
    return(
        <StyledModal open={ open } width={ width }>
            <Container>
                { children }
            </Container>
        </StyledModal>
    )
}



export {
    Modal, useModal, Container
}
