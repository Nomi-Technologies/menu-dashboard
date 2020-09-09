import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

import { DishFormInput} from "../../form"
import { FormButton } from "../../buttons"

import Client from '../../../util/client'
import styled from "styled-components"
import CSVUploadIcon from "../../../assets/img/csv-upload-icon.png"

import { FileDrop } from "../../file-drop"

import {
    Modal, Container, ButtonRow, ModalBackground, FormTitle, FormSubtitle, Divider
} from "./modal"



const StyledUploadCSVModal = styled.div`
    .file-input {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        margin: 10px 0px;
        border: 2px dashed grey;
        border-radius: 15px;

        &:focus {
            outline: none;
        }
    }

    .error-msg {
        color: red;
    }
    
`

const NewMenuModal = (props) => {
    const [name, setName] = useState('');
    let [content, setContent] = useState(null)
    let [errorMessage, setErrorMessage] = useState(null)

    const setFile = (file) => {
        const reader = new FileReader()      
        reader.readAsText(file)
        reader.onabort = () => console.error('file reading was aborted')
        reader.onerror = () => {
            console.error('file reading has failed')
            setErrorMessage("Error reading file")
        }
        reader.onload = () => {
        // Do whatever you want with the file contents
          const fileContent = reader.result
          setContent(fileContent)
        }
    }
    
    async function createMenu () {
        let menuData = {
            name: name,
            csv: content,
        }
        console.log(menuData)
        if (name !== '') {
            await Client.createMenu(menuData).then((res) => {
                console.log("menu created")
                console.log(res.data)
                props.toggleForm()
                props.updateHasMenu(true)
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
            <Modal>
                <Container>
                    <FormTitle>New Menu</FormTitle>
                    {
                        errorMessage ? <p className='error'>{ errorMessage }</p> : <></>
                    }
                    <FormSubtitle>Menu Name</FormSubtitle>
                    
                    <DishFormInput
                        placeholder="Type menu name..."
                        name="name"
                        onChange={event => {
                            setName(event.target.value)
                        }}
                    />
                    <Divider color="#DCE2E9" />
                    <FormSubtitle>CSV File (Optional)</FormSubtitle>
                    <FileDrop acceptedFileTypes={ ['.csv'] } setFile={ setFile } setErrorMessage={ setErrorMessage }/>
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm}/>    
                        <FormButton text='Create Menu' onClick = {createMenu} />    
                    </ButtonRow>
                </Container>
            </Modal>
        </>
    )
}

export { NewMenuModal }