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
                    <FormInput width='100%' name='restuarant-name' placeholder='Restaurant Name' onChange={(event) => { setCurrRestaurantDetails({...currRestaurantDetails, name: event.target.value}); props.updateRestaurantList(props.index, currRestaurantDetails)}} value={currRestaurantDetails?.name}/>
                    <FormMessage>Street Address*</FormMessage>
                    <FormInput width='100%' name='street-address' placeholder='Restaurant Street Address' onChange={(event) => { setCurrRestaurantDetails({...currRestaurantDetails, streetAddress: event.target.value }); props.updateRestaurantList(props.index, currRestaurantDetails)}} value={ currRestaurantDetails?.streetAddress }/>
                    <FormSplitRow>
                        <FormSplitColumn style = {{paddingRight: 25}}>
                            <FormMessage>City*</FormMessage>
                            <FormInput  width='50%' name='city' placeholder='City' onChange={(event) => { setCurrRestaurantDetails({...currRestaurantDetails, city: event.target.value }); props.updateRestaurantList(props.index, currRestaurantDetails)}} value={ currRestaurantDetails?.city }/>
                        </FormSplitColumn>

                        <FormSplitColumn style = {{paddingRight: 25}}>
                            <FormMessage>State*</FormMessage>
                            <FormInput width='15%' name='state' placeholder='State' onChange={(event) => { setCurrRestaurantDetails({...currRestaurantDetails, state: event.target.value }); props.updateRestaurantList(props.index, currRestaurantDetails)}} value={ currRestaurantDetails?.state }/>
                        </FormSplitColumn>

                        <FormSplitColumn>
                            <FormMessage>Zip Code*</FormMessage>
                            <FormInput width='30%' name='zip' placeholder='XXXXX' onChange={(event) => { setCurrRestaurantDetails({...currRestaurantDetails, zip: event.target.value }); props.updateRestaurantList(props.index, currRestaurantDetails)}} value={ currRestaurantDetails?.zip }/>
                        </FormSplitColumn>
                    </FormSplitRow>
                    <FormMessage>Phone Number</FormMessage>
                    <FormInput width='48%' name='restaurant-phone' placeholder='(000) 000-0000' onChange={(event) => { setCurrRestaurantDetails({...currRestaurantDetails, phone: event.target.value }); props.updateRestaurantList(props.index, currRestaurantDetails)}} value={ currRestaurantDetails?.phone }/>

                    {
                        // only show the next and add locations for the last one
                        (props.index == props.restaurantList.length - 1) ? (
                            <>
                            <StyledAdd>
                                <div className="new-restaurant-button" onClick={ () => {props.addLocation(props.index, currRestaurantDetails)}}>
                                    + Add Another Location
                                </div>
                            </StyledAdd>
                            </>
                        )
                    :
                    (<></>)
                      
                    }

                    <FormControls>
                                <ButtonPrimary onClick={ () => props.validate(false, currRestaurantDetails, props.index) }>Looks good!</ButtonPrimary>
                    </FormControls>
                </>
            )
        }
        </>
    );
}

export { CompleteCard }