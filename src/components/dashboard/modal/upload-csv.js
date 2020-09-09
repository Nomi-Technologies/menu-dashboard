import { FormButton } from "../../buttons"
import React, { useState, useCallback } from 'react';
import Client from '../../../util/client'
import styled from "styled-components"
import { useDropzone } from 'react-dropzone'

import {
  Modal, Container, ButtonRow, ModalBackground
} from "./modal"


const StyledUploadCSVModal = styled.div`
    .file-input {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        margin-bottom: 20px;
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
    }
`

const UploadCSVModal = (props) => {
    let { show, close } = props
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

    const postCSVFile = () => {
        Client.uploadCSV(content, props.menuId, false).then(() => {
            setErrorMessage(null)
            setFileName(null)
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
                                <p>Drag and drop a .csv file here, or click to select a file</p>
                            }
                            </div>
                        }

                        </StyledUploadCSVModal>
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