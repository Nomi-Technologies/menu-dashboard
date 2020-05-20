import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"

import { Container, Column, ImageColumn } from "../../components/grid"

import { FormInput, FormContainer, FormTitle, FormSubtitle, FormRow, NextButton, FormControls, PrevButton } from "../../components/form"

import { RestaurantProgress } from "../../components/registration-progress"

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

const RestaurantDetails = () => (
    <Layout>
        <Container>
            <SideBar width='33%' style={{ "background-color": "white"}}>
                <RestaurantProgress steps={['Contact Info', 'Restaurant Setup', 'Review']} currentIdx='1'></RestaurantProgress>
            </SideBar>
            <FormColumn>
                <FormContainer>
                    <FormTitle>Restaurant Details</FormTitle>
                    <FormSubtitle>Details about your restaurant's location and services</FormSubtitle>
                    <FormRow>
                        <FormInput width='100%' name='restuarant-name' placeholder='restuarant name'></FormInput>    
                    </FormRow>
                    <FormRow>
                        <FormInput width='100%' name='street-address' placeholder='street address'></FormInput>    
                    </FormRow>
                    <FormRow>
                        <FormInput width='40%' name='city' placeholder='city'></FormInput>    
                        <FormInput width='15%' name='state' placeholder='state'></FormInput>    
                        <FormInput width='30%' name='zip' placeholder='zip code'></FormInput>    
                    </FormRow>
                    <FormRow>
                        <FormInput width='45%' name='restaurant-phone' placeholder='phone number'></FormInput>    
                        <FormInput width='45%' name='yelp-profile' placeholder='yelp profile (optional)'></FormInput>    
                    </FormRow>
                    <FormControls>
                        <PrevButton/>
                        <NextButton/>
                    </FormControls>
                </FormContainer>
            </FormColumn>
        </Container>
    </Layout>
  )
  
  export default RestaurantDetails
  