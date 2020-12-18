import React, { useState, useCallback } from 'react';
import Client from '../../../util/client'

import { DishFormInput, FormButton } from "../../form"
import { FileDrop } from "../../file-drop"

import {
    Modal, Container, ButtonRow, ModalBackground, FormTitle, FormSubtitle, Divider
} from "./modal"


const NewMenuModal = (props) => {
    const [name, setName] = useState('');
    let [content, setContent] = useState(null)
    let [errorMessage, setErrorMessage] = useState(null)
    let [loading, setLoading] = useState(false)

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

    const clearFile = () => {
        setContent(null)
    }
    
    async function createMenu () {
        let menuData = {
            name: name,
            csv: content,
        }

        // avoid creating multiple menus while loading
        if (name !== '' && !loading) {
            setLoading(true)
            await Client.createMenu(menuData).then((res) => {
                props.toggleForm()
                props.updateHasMenu(true)
                props.updateMenuSelection(res.data)
            }).catch((err) => {
                console.error("error creating menu")
                setErrorMessage("An error occured while creating the menu, please try again.")
            }).finally(() => {
                setLoading(false)
            })
        } else {
            console.error("missing field")
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
                    <FileDrop acceptedFileTypes={ ['.csv'] } setFile={ setFile } setErrorMessage={ setErrorMessage } clearFile={ clearFile }/>
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm}/>    
                        <FormButton text='Create Menu' onClick={createMenu} />
                    </ButtonRow>
                </Container>
            </Modal>
        </>
    )
}

export { NewMenuModal }