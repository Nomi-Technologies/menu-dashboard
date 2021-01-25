import { ButtonPrimary, ButtonSecondary } from "../../basics"
import React, { useState } from 'react';
import Client from '../../../util/client'
import { FileDrop } from "../../file-drop"

import { Modal, useModal } from "./modal"
import { ButtonRow } from "../../basics"
import { FormSubtitle, FormTitle } from "../../form"

const useUploadCSVModal = ( menuId, refreshMenu ) => {
    let [open, openModal, closeModal] = useModal()
    let [errorMessage, setErrorMessage] = useState(null)

    let uploadCSV = async (content) => {
        try {
            await Client.uploadCSV(content, menuId, false)
        } catch (error) {
            setErrorMessage("There was an error uploading your .csv, try again later.")
            return
        }
        
        setErrorMessage(null)
        refreshMenu()
        closeModal()
    }

    return [open, openModal, closeModal, uploadCSV, errorMessage, setErrorMessage]
}


const UploadCSVModal = ({ open, openModal, closeModal, uploadCSV, errorMessage, setErrorMessage }) => {
    let [content, setContent] = useState(null)

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

    
    const submitCSV = () => {
        if(content) {
            uploadCSV(content)
        } else {
            setErrorMessage("Please select a file to upload")
        }
    }

    return (
        <Modal open={ open }  openModal={ openModal } closeModal={ closeModal }>
                <FormTitle>Upload CSV</FormTitle>
                {
                    errorMessage ? <p className='error'>{ errorMessage }</p> : <></>
                }
                <FormSubtitle>CSV File</FormSubtitle>
                <FileDrop acceptedFileTypes={ ['.csv'] } setFile={ setFile } setErrorMessage={ setErrorMessage } clearFile={ () => { setContent(null) } }/>
                <ButtonRow>
                    <ButtonSecondary onClick={ closeModal }>Cancel</ButtonSecondary>
                    <ButtonPrimary onClick={ submitCSV }>Upload CSV</ButtonPrimary>  
                </ButtonRow>
        </Modal>
    )
}

export { UploadCSVModal, useUploadCSVModal }