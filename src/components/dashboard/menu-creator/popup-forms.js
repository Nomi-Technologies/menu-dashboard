import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

import { FormInput, PopupFormTitle, DishFormInput, DishFormTextArea } from "../../form"
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
    width: 100%;
    height: 100%;
    left: 280px;
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

let Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #DCE2E9;
`

const NewMenuForm = (props) => {
    const [name, setName] = useState('');
    let { show, close, uploadCSV } = props
    let [overwrite, setOverwrite] = useState(false)
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
        Client.uploadCSV(content, props.menuId, overwrite).then(() => {
            setErrorMessage(null)
            setFileName(null)
            setContent(null)
            props.updateMenu()
            props.close()
        })
    }

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
            <StyledModal>
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
                                {console.log(isDragActive)}
                                {
                                    isDragActive ?
                                    <p>Drop the .csv file here ...</p> :
                                    <p>Drag and drop a .csv file here, or click to select a file</p>
                                }
                            </div>
                        }
                    </StyledUploadCSVModal>
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm}/>    
                        <FormButton text='Create Menu' onClick = {createMenu} />    
                    </ButtonRow>
                </Container>
            </StyledModal>
        </>
    )
}

export { NewMenuForm }