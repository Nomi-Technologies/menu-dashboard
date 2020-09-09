import styled from "styled-components"

const Modal = styled.div`
    top: 10%;
    position: absolute;
    width: 80%;
    max-width: 800px;
    z-index: 100;
    box-shadow: 2px 2px 2px grey;
    border-radius: 5px;
    background-color: white;
    left: 50%;
    transform: translate(-50%, 0);
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
        margin: 0;
    }
` 

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    button {
        margin-left: 10px;
    }
`

const ModalBackground = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 10, 0.5);
    z-index: 1;
`

const FormTitle = styled.div`
    position: static;
    width: 800px;
    left: 20px;
    top: 20px;
    font-family: HK Grotesk Bold;
    font-size: 28px;
    line-height: 34px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    color: #000000;
    align-self: flex-start;
`

const FormSubtitle = styled.div`
    position: static;
    text-align: left;
    width: 800px;
    height: 12px;
    left: 20px;
    font-family: HK Grotesk Regular;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #000000;
    margin-top: 10px;
`

let Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #DCE2E9;
`
export {
    Modal, Container, ButtonRow, ModalBackground, FormTitle, FormSubtitle, Divider
}
