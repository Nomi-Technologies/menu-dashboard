import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"

import { Container, Column, ImageColumn } from "../../components/grid"

import { FormInput, FormContainer, FormTitle, FormSubtitle, FormRow, NextButton, FormControls } from "../../components/form"

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

const ContactInfo = () => (
    <Layout>
        <Container>
            <SideBar width='33%'>
                <SideBarText>A few clicks away from setting up your restaurant profile.</SideBarText>
            </SideBar>
            <FormColumn>
                <FormContainer>
                    <FormTitle>About You</FormTitle>
                    <FormSubtitle>Restaurant admins can set up restaurants, tag dish information, and invite employees.</FormSubtitle>
                    <FormRow>
                        <FormInput width='45%' name='first-name' placeholder='first-name'></FormInput>    
                        <FormInput width='45%' name='last-name' placeholder='last-name'></FormInput>    
                    </FormRow>
                    <FormRow>
                        <FormInput width='100%' name='email' placeholder='email address'></FormInput>    
                    </FormRow>
                    <FormRow>
                        <FormInput width='45%' name='phone' placeholder='phone number'></FormInput>    
                    </FormRow>

                    <FormControls>
                        <NextButton/>
                    </FormControls>
                </FormContainer>
            </FormColumn>
        </Container>
    </Layout>
  )
  
  export default ContactInfo
  