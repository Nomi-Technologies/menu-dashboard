import React, { useState } from 'react';
import styled from "styled-components"

import Layout from "../../components/layout"

import Client from '../../util/client'

import { Container, Column } from "../../components/grid"

import { FormInput, FormContainer, FormTitle, FormSubtitle, FormRow, NextButton, FormControls, FormError } from "../../components/form"
import { navigate } from 'gatsby';
import useEventListener from '@use-it/event-listener'

let SideBar = styled(Column)`
    background-color: #F2994A;
`

let SideBarText = styled.p`
    color: white;
    font-size: 36px;
    line-height: 43px;
    font-weight: bold;
    margin: 0 64px;
    margin-top: 124px;
`

let FormColumn = styled(Column)`
    background-color: #F7F8FA;
`

const ContactInfo = () => 
{
    const [contactInfo, setContactInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: ""
    });

    const [error, setError] = useState("")

    const validateForm = () => {
        // todo more information
        let invalid = false
        Object.keys(contactInfo).forEach(function(key) {
            if(contactInfo[key] === "")
            {
                invalid = true;
            }
        });

        if(invalid) {
            setError("Error: All fields must be filled out")
        }
        else {
            Client.checkEmail(contactInfo.email).then((response) => {
                if(!response.data.taken) {
                    navigate('/register/restaurant-details', { state: { contactInfo: contactInfo }})
                } else {
                    if(response.data.taken) {
                        setError("Error: Email taken, please choose a different email")
                    }
                    else {
                        setError("Error: Could not update contact info")
                    }
                    
                }
            })
        }

        
    }

    //press enter to navigate to the next page
    function handler({ key }) {
        if (key == 'Enter') {
            validateForm()
        }
    }

    useEventListener('keydown', handler);
    return (
        <Layout>
            <Container>
                <SideBar width='33%'>
                    <SideBarText>A few clicks away from setting up your restaurant profile.</SideBarText>
                </SideBar>
                <FormColumn>
                    <FormContainer>
                        <FormTitle>About You</FormTitle>
                        <FormSubtitle>Restaurant admins can set up restaurants, tag dish information, and invite employees.</FormSubtitle>
                        <FormError>{ error }</FormError>
                        <FormRow>
                            <FormInput width='45%' name='first-name' placeholder='first-name' onChange={(event) => { setContactInfo({...contactInfo, firstName: event.target.value })}}></FormInput>    
                            <FormInput width='45%' name='last-name' placeholder='last-name' onChange={(event) => { setContactInfo({...contactInfo, lastName: event.target.value })}}></FormInput>    
                        </FormRow>
                        <FormRow>
                            <FormInput width='100%' name='email' placeholder='email address' onChange={(event) => { setContactInfo({...contactInfo, email: event.target.value })}}></FormInput>    
                        </FormRow>
                        <FormRow>
                            <FormInput type="password" width='100%' name='password' placeholder='password' onChange={(event) => { setContactInfo({...contactInfo, password: event.target.value })}}></FormInput>    
                        </FormRow>
                        <FormRow>
                            <FormInput width='100%' name='phone' placeholder='phone number' onChange={(event) => { setContactInfo({...contactInfo, phone: event.target.value })}}></FormInput>    
                        </FormRow>

                        <FormControls>
                            <NextButton onClick={ validateForm }/>
                        </FormControls>
                    </FormContainer>
                </FormColumn>
            </Container>
        </Layout>
    )
}
  
  export default ContactInfo
  