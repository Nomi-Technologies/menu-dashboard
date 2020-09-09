import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

import { DishFormInput} from "../../form"
import { FormButton } from "../../buttons"

import Client from '../../../util/client'
import styled from "styled-components"
import CSVUploadIcon from "../../../assets/img/csv-upload-icon.png"

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
    
    p {
        margin-left: 20px;
        display: inline-block;

        font-size: 14px;
        line-height: 12px;
        font-family: HK Grotesk regular;
        font-style: normal;
        font-weight: bold;
        color: #8A9DB7;
    }
`

const NewMenuModal = (props) => {
    const [name, setName] = useState('');
    let [content, setContent] = useState(null)
    let [fileName, setFileName] = useState(null)
    let [errorMessage, setErrorMessage] = useState(null)
    
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()      
            reader.onabort = () => console.error('file reading was aborted')
            reader.onerror = () => {
                console.error('file reading has failed')
                setErrorMessage("Error uploading file")
            }
            reader.onload = () => {
            // Do whatever you want with the file contents
              const fileContent = reader.result
              setContent(fileContent)
              setFileName(file.path)
            }

            if(file.path.includes(".csv")) {
                setErrorMessage(null)
                reader.readAsText(file)
            } else {
                console.error("Incorrect file type chosen")
                setErrorMessage("Incorrect file uploaded, please choose a .csv file")
            }
          })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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
                    <FormSubtitle>Menu Name</FormSubtitle>
                    <DishFormInput
                        placeholder="Type menu name..."
                        name="name"
                        onChange={event => {
                            setName(event.target.value)
                        }}
                    />
                    <Divider color="#DCE2E9" />
                    <FormSubtitle>CSV Upload (Optional)</FormSubtitle>
                    <StyledUploadCSVModal>
                        {
                            errorMessage ? <p className='error-msg'>{ errorMessage }</p> : <></>
                        }
                        {
                            content ? 
                            <div>
                                <p>Selected File: { fileName }</p>
                            </div>
                            : 
                            <div className='file-input' {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                    <p>Drop the .csv file here ...</p> :
                                    <div>
                                        <img src={CSVUploadIcon} alt="Upload icon for CSV" />
                                        <p>Drag and drop a .csv file here, or click to select a file</p>
                                     </div>
                                }
                            </div>
                        }
                    </StyledUploadCSVModal>
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