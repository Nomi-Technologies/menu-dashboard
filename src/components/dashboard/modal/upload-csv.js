import { FormButton } from "../../form"
import React, { useState, useCallback } from 'react';
import Client from '../../../util/client'
import { FileDrop } from "../../file-drop"

import {
  Modal, Container, ButtonRow, ModalBackground, FormTitle
} from "./modal"

const UploadCSVModal = (props) => {
    let { show, close } = props
    let [content, setContent] = useState(null)
    let [errorMessage, setErrorMessage] = useState(null)

    const setFile = (file) => {
        const reader = new FileReader()      
        reader.readAsText(file)
        reader.onabort = () => console.error('file reading was aborted')
        reader.onerror = () => {
            console.error('file reading has failed')
            setErrorMessage("Error uploading file")
        }
        reader.onload = () => {
        // Do whatever you want with the file contents
          const fileContent = reader.result
          setContent(fileContent)
        }
    }
    
    const postCSVFile = () => {
        Client.uploadCSV(content, props.menuId, false).then(() => {
            setErrorMessage(null)
            setContent(null)
            props.updateMenu()
            props.close()
        })
    }

    if(show) {
        return (
            <>
                <ModalBackground/>
                <Modal>
                    <Container>
                        <FormTitle>Upload CSV</FormTitle>
                        {
                            errorMessage ? <p className='error'>{ errorMessage }</p> : <></>
                        }
                        <FileDrop acceptedFileTypes={ ['.csv'] } setFile={ setFile } setErrorMessage={ setErrorMessage }/>
                        <ButtonRow>
                            <FormButton text='Cancel' theme='light' onClick={ () => {
                                close()
                            } }
                            />    
                            <FormButton text="Upload CSV" onClick={ () => { 
                                if(content) {
                                    postCSVFile()
                                } else {
                                    setErrorMessage("Please select a file to upload")
                                }
                            } }
                            />    
                        </ButtonRow>
                    </Container>
                </Modal>
            </>
        )
    } else {
        return null
    }
}

export { UploadCSVModal }