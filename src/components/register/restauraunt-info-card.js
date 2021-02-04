import React, { useState, useEffect } from 'react';
import { FormTitle, FormSubtitle, FormControls, FormInput, FormContainer, FormSplitColumn, FormSplitRow, FormMessage, FormSubtitleNoCap } from "../form"
import {ButtonPrimary, ButtonRow, ButtonSecondary, Button } from "../basics"
import styled from "styled-components"
import { Colors } from "../../util/colors"
import editIcon from "../../assets/img/edit-icon.png"
import removeIcon from "../../assets/img/remove-icon.png"



import useEventListener from '@use-it/event-listener'
import { setRegistrationData, fetchRegistrationData } from "../../util/registration"

const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    alignItems: center;
`

const StyledAdd = styled.div`
    display: inline-flex;
    color: white;
    text-align: center;
    font-size: 14px;
    margin-top: 8px;

    .new-restaurant-button {
        color: #F3A35C;
        cursor: pointer;

        font-family: HK Grotesk regular;
        font-style: normal;
        font-weight: bold;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-feature-settings: 'cpsp' on;
        z-index: 1;
    }
`

const CompleteCard = styled.div`
    background-color: ${Colors.VERY_LIGHT_GRAY};
    width: 100%;
    border-radius: 6px;
    padding: 16px;
    box-sizing: border-box;
    height: 200px;
    margin-bottom: 24px;
`


const RestaurantInfoCard = (props) => {

    const [currRestaurantDetails, setCurrRestaurantDetails] = useState(props.restaurantList[props.index]);

    const editPressed = () => {
        setCurrRestaurantDetails(props.restaurantList[props.index])
        props.setCurrIndex(props.index)
    }
    
    const removePressed = () => {
        props.removeRestaurant(props.index)
        props.setCurrIndex(props.currIndex - 1)
        setCurrRestaurantDetails(props.restaurantList[props.index])
    }

    // we had to do multiple updates per change since setters are asynchronous so 
    //it was cleaner to separate them all into separate functions

    const updateName = (currName) => {
        let updatedObject = {...currRestaurantDetails, name: currName}
        setCurrRestaurantDetails(updatedObject); 
        props.updateRestaurantList(props.index, updatedObject)
    }

    const updateStreet = (currStreet) => {
        let updatedObject = {...currRestaurantDetails, streetAddress: currStreet}
        setCurrRestaurantDetails(updatedObject); 
        props.updateRestaurantList(props.index, updatedObject)
        
    }

    const updateCity = (currCity) => {
        let updatedObject = {...currRestaurantDetails, city: currCity}
        setCurrRestaurantDetails(updatedObject); 
        props.updateRestaurantList(props.index, updatedObject)
        
    }

    const updateState = (currState) => {
        let updatedObject = {...currRestaurantDetails, state: currState}
        setCurrRestaurantDetails(updatedObject); 
        props.updateRestaurantList(props.index, updatedObject)
        
    }

    const updateZip = (currZip) => {
        let updatedObject = {...currRestaurantDetails, zip: currZip}
        setCurrRestaurantDetails(updatedObject); 
        props.updateRestaurantList(props.index, updatedObject)
        
    }

    const updateNumber = (currNumber) => {
        let updatedObject = {...currRestaurantDetails, phone: currNumber}
        setCurrRestaurantDetails(updatedObject); 
        props.updateRestaurantList(props.index, updatedObject)
        
    }


    return (
        <>
        {
            (props.currIndex != props.index) ? (
                <CompleteCard>
                    <FormTitle>Restaurant {props.index + 1}</FormTitle>
                    <FormMessage>{props.restaurantList[props.index]?.name}</FormMessage>
                    <FormMessage> {props.restaurantList[props.index]?.streetAddress}</FormMessage>
                    <FormMessage style = {{marginBottom: '3px'}} >{props.restaurantList[props.index]?.phone}</FormMessage>
                    <ButtonRow style = {{margin: '0px'}}>
                        <Button style = {{color: '#ACADAE', paddingRight: "0px" }} onClick = { removePressed}>
                        <img src={removeIcon} width = "12px" height = "12px"/> REMOVE 
                        </Button>
                        <Button style = {{color: '#323232' }} onClick = {editPressed}>
                        <img src={editIcon} width = "12px" height = "12px"/> EDIT 
                        </Button>
                    </ButtonRow>
                </CompleteCard>

            ) : (
                <>
                    <TitleRow>
                        <FormTitle>Restaurant {props.index + 1} Information</FormTitle>
                        <FormSubtitle style = {{opacity: 0.8}}> * Required Information</FormSubtitle>
                    </TitleRow>

                    <FormMessage>Name*</FormMessage>
                    <FormInput width='100%' name='restuarant-name' placeholder='Restaurant Name' onChange={(event) => {updateName(event.target.value)}} value={currRestaurantDetails?.name}/>
                    <FormMessage>Street Address*</FormMessage>
                    <FormInput width='100%' name='street-address' placeholder='Restaurant Street Address' onChange={(event) => {updateStreet(event.target.value)}} value={ currRestaurantDetails?.streetAddress }/>
                    <FormSplitRow>
                        <FormSplitColumn style = {{paddingRight: 25}}>
                            <FormMessage>City*</FormMessage>
                            <FormInput  width='50%' name='city' placeholder='City' onChange={(event) => {updateCity(event.target.value) }} value={ currRestaurantDetails?.city }/>
                        </FormSplitColumn>

                        <FormSplitColumn style = {{paddingRight: 25}}>
                            <FormMessage>State*</FormMessage>
                            <FormInput width='15%' name='state' placeholder='State' onChange={(event) => {updateState(event.target.value)}} value={ currRestaurantDetails?.state }/>
                        </FormSplitColumn>

                        <FormSplitColumn>
                            <FormMessage>Zip Code*</FormMessage>
                            <FormInput width='30%' name='zip' placeholder='XXXXX' onChange={(event) => {updateZip(event.target.value) }} value={ currRestaurantDetails?.zip }/>
                        </FormSplitColumn>
                    </FormSplitRow>
                    <FormMessage>Phone Number</FormMessage>
                    <FormInput width='48%' name='restaurant-phone' placeholder='(000) 000-0000' onChange={(event) => {updateNumber(event.target.value) }} value={ currRestaurantDetails?.phone }/>

                </>
            )
        }
        </>
    );
}

export { RestaurantInfoCard }