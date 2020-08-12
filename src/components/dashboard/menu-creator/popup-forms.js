import React, { useState, useEffect } from 'react';

import { FormInput } from "../../form"
import { FormButton } from "../../buttons"

import Client from '../../../util/client'

import styled from "styled-components"

const StyledModal = styled.div`
    top: 100px;
    position: absolute;
    width: 80%;
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
    width: 85%;
    margin-top: 30px;

    input {
        border: none;
        background-color: #F4F4F4;
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
    width: 100%;
    height: 100%;
    left: 280px;
    background-color: rgba(10, 10, 10, 0.5);
    z-index: 1;
`

const NewMenuForm = (props) => {
    const [name, setName] = useState('');

    const createMenu = () => {
        let menuData = {
            name: name,
        }
        console.log(menuData)
        if (name !== '') {
            Client.createMenu(menuData).then((res) => {
                console.log("menu created")
                console.log(res.data)
                props.toggleForm()
                props.updateMenuSelection(res.data)
            }).catch((err) => {
                console.log("error creating menu")
                //show some error on form
            })
        } else {
            console.log("missing field")
            //show some error
        }
    }

    return (
        <>
            <ModalBackground/>
            <StyledModal>
                <Container>
                    <FormInput placeholder='menu' name='menu' onChange={ (event) => {setName(event.target.value)} }/>
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm}/>    
                        <FormButton text='Submit' onClick = {createMenu} />    
                    </ButtonRow>
                </Container>
            </StyledModal>
        </>
    )
}

export { NewMenuForm }