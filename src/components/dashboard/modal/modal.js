import styled from "styled-components"
import { Button, ButtonDelete } from "../../basics"

const Modal = styled.div`
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    width: 80%;
    max-width: 800px;
    z-index: 100;
    box-shadow: 2px 2px 2px grey;
    border-radius: 5px;
    background-color: white;
    left: 50%;
`

const Container = styled.div`
    display: block;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    width: 90%;
    margin-top: 30px;

    input {
        border: none;
        background-color: #E1E7EC;
    }

    .error {
        color: red;
        padding: 0;
        
    }
` 

export {
    Modal, Container
}
