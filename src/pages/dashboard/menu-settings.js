import React, { useState, useEffect } from 'react';
import {
    Modal, Container, ButtonRow, ModalBackground, FormTitle, Divider
  } from "../../components/dashboard/modal/modal"
import { DishFormInput, DishFormTextArea, StyledButton } from "../../components/form"
import Switch from "react-switch";
import { FileDrop } from "../../components/file-drop"
import Client from '../../util/client'




import styled from "styled-components"

import BackArrow from "../../assets/img/back-arrow.png"



const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const Col = styled.div`
    flex: ${(props) => props.size};
    display: flex;
    flex-direction: Column;
`;

const Button = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    width: '100%';
    left: 56px;
`;

const FormSubtitle = styled.div`
    position: static;
    text-align: left;
    left: 20px;
    font-family: HK Grotesk Regular;
    font-size: 14px;
    line-height: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #000000;
    margin-top: 10px;
`

const BackText = styled.div`
    font-family: 'HK Grotesk Regular';
    color: #627083;
    margin-left: 14px;
`;

const SubText = styled.div`
    font-family: 'HK Grotesk Regular';
    width: 330px;
    color: #8A9DB7;
    font-size: 14px; 
    `;
const ItemText = styled.div`

    font-family: 'HK Grotesk Regular';
    color: #48484A;
    font-size: 14px;
`;

const PageContainer = styled.div`
    display: block;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    width: 60%;
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

const Parent = styled.div`
    position: 'absolute';
    zIndex: 20;
    backgroundColor: "white";
    width: '100%';

`








let MenuSettingsPage = (props) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    let [content, setContent] = useState(null)
    let [errorMessage, setErrorMessage] = useState(null)
    let [loading, setLoading] = useState(false)
    const [menuData, setMenuData] = useState({})
    const [enableFiltering, setEnableFiltering] = useState(false)



    
    useEffect(() =>{
        if (props.menuId){
            getMenuData()
        } else {
            let menuData = {
                name: name,
                description: description,
                enableFiltering: false
            }
            setMenuData(menuData);

        }

    }, [props.menuId])
    
    const getMenuData = async () => {
        await Client.getMenu(props.menuId).then((res) => {
            setMenuData(res.data);
            setEnableFiltering(res.data.enableFiltering)
        })
    }

    
    const updateMenuData = () => {
        Client.getMenu(props.menuId).then((res) => {
            setMenuData(res.data);
            setEnableFiltering(res.data.enableFiltering)
        })
    }

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
    //toggling this switch has a delay because it only changes after we receive the updateMenuData request
    //We should consider changing for more immediate change
    const toggleSwitch = () => {

        if(props.menuId){
            Client.toggleFiltering(props.menuId, !enableFiltering).then(res => {
                if(res.status == 200 && res.data){
                    updateMenuData()
                }
            })

        } else {
            setEnableFiltering(!enableFiltering)
        }


        

    }
    const clearFile = () => {
        setContent(null)
    }
    
    async function createMenu () {
        let newMenu = {
            name: name,
            description: description,
            enableFiltering: enableFiltering,
            csv: content,
        }

        // avoid creating multiple menus while loading
        if (name !== '' && !loading) {
            setLoading(true)
            await Client.createMenu(newMenu).then((res) => {
                props.toggleForm()
                props.updateHasMenu(true)
                props.updateMenuSelection(res.data)
                uploadMenu()
            }).catch((err) => {
                console.error("error creating menu")
                setErrorMessage("An error occurred while creating the menu, please try again.")
            }).finally(() => {
                setLoading(false)
            })
        } else {
            console.error("missing field")
        }
    }

    const postCSVFile = () => {
        Client.uploadCSV(content, props.menuId, false).then(res => {
            if(res.status == 200 && res.data){
                console.log("success");
            }
            setErrorMessage(null)
            setContent(null)
        })
    }

    async function uploadMenu () {
        if(content) {
            postCSVFile()
        } else {
            setErrorMessage("Please select a file to upload")
            console.log(errorMessage)
        }
    }

    async function saveMenu () {
        Client.updateMenu(props.menuId, menuData).then(res => {
            if(res.status == 200 && res.data){
                console.log("success");
            }
        })
    }

    const backPressed = () => {
        if(props.editingMenu){
            props.editMenuPressed()
        } else {
            console.log("test")
            props.newMenuPressed()
        }
    }


    return(
        // This wouldn't work with the styled div Parent for some reason
        <div style = {{position: 'absolute', zIndex: 20, backgroundColor: "white", width: '100%'}}>
            <PageContainer >
                    
                    {/* change this to display absolute instead of three cols */}
                    <Button onClick={backPressed}>
                        <img className='collapse-icon' src={BackArrow} width = "19px" height = "16px" alt="collapse icon" />
                        <BackText >BACK TO MENU</BackText>
                    </Button> 

                <Col size={2}>
                    {/* Check if Name exists else do this */}
                    {/* TODO */}

                <FormTitle> {props.menuId ? "Edit Menu Info" : "Create New Menu"}</FormTitle>
                    <FormSubtitle>Menu Name</FormSubtitle>
                    <DishFormInput  
                    //Check if Name exists else do this
                        placeholder="Type Menu name..."
                        value = {menuData.name ?  menuData.name : ""}
                        onChange={event => {
                        menuData.name = event.target.value
                        setName(event.target.value)
                        }}
                    />
                    <FormSubtitle>Description</FormSubtitle>
                    {/* TODO */}

                    <DishFormTextArea
                        //Check if Menu exists else do this

                        placeholder="Type description..."
                        value = {menuData.description ?  menuData.description : ""}
                        onChange={event => {
                        menuData.description = event.target.value
                        setDescription(event.target.value)
                        }}
                    />
                    <Row>
                        <Col size={1}>
                            <FormSubtitle>Allergen Filters</FormSubtitle>
                            {/* TODO */}
                            {/* Here we have to handle whether the toggle says enable or disable */}
                            <SubText style = {{marginTop: '3%'}}>Allow Guest to view and filter menus by allergen information. </SubText>
                            <Row style = {{alignItems: "center", marginTop: '3%' }}>
                                    <Col><Switch onChange={toggleSwitch} checked={enableFiltering} checkedIcon = {false} uncheckedIcon = {false} onColor = {"#F5B57A"} activeBoxShadow = {null}/></Col>
                                    <Col style = {{marginLeft: '5%'}}><ItemText>{enableFiltering ? "Enabled" : "Disabled"}</ItemText></Col>
                            </Row>
                        </Col>
                    </Row>

                    <FormSubtitle>CSV File (Optional)</FormSubtitle>
                            {
                                // for some reason className='error' is not working so hardcoded to red
                                errorMessage ? <p style = {{color: 'red'}}>{ errorMessage }</p> : <></>
                            }
                        <FileDrop acceptedFileTypes={ ['.csv'] } setFile={ setFile } setErrorMessage={ setErrorMessage } clearFile={ clearFile }/>
                        {
                            props.menuId ?  (
                                <ButtonRow>
                                    <StyledButton onClick={uploadMenu}> Upload CSV </StyledButton>
                                </ButtonRow>
                            ) : 
                            (
                                <></>
                            )

                        }
                        


                        <ButtonRow>
                            <StyledButton theme='light' onClick={props.editMenuPressed}>Cancel</StyledButton>
                            {/* TODO */}
                            {/* This will Either say create menu or Save Changes?     */}
                            {
                                props.menuId ?  (
                                    <StyledButton onClick={saveMenu}> Save Menu </StyledButton>
                                ) : 
                                (
                                    <StyledButton onClick={createMenu}> Create Menu </StyledButton>
                                )
                            }
                        </ButtonRow>

                </Col>



            </PageContainer>


        </div>

        
    )
  }

  // have a button for just uploading the csv then creating the menu


  // get rid of locations and make allergens on the left

  // change menu in menu for when the selected menu changes close the menu
export default MenuSettingsPage
