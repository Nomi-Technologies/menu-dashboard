import React, { useState, useEffect } from 'react';
import RegisterLayout from "../register/register-layout"
import { navigate } from 'gatsby';
import { FormTitle, FormSubtitle, FormControls, FormInput, FormContainer, FormSplitColumn, FormSplitRow, FormMessage, FormSubtitleNoCaps } from "../form"
import {ButtonPrimary, ButtonRow, ButtonSecondary } from "../basics"
import styled from "styled-components"

import useEventListener from '@use-it/event-listener'
import { setRegistrationData, fetchRegistrationData } from "../../util/registration"

const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    alignItems: center;

`

const RestaurantInfoCard = (props) => {



    return (
        <>
            <TitleRow>
                <FormTitle>Restaurant 1 Information</FormTitle>
                <FormSubtitle style = {{opacity: 0.8}}> * Required Information</FormSubtitle>
            </TitleRow>

            <FormMessage>Name*</FormMessage>
            <FormInput width='100%' name='restuarant-name' placeholder='Restaurant Name' onChange={(event) => { props.setRestaurantDetails({...props.getDetails, name: event.target.value })}} value={props.getDetails?.name}/>

            <FormMessage>Street Address*</FormMessage>
            <FormInput width='100%' name='street-address' placeholder='Restaurant Street Address' onChange={(event) => { props.setRestaurantDetails({...props.getDetails, streetAddress: event.target.value })}} value={ props.getDetails?.streetAddress }/>

            <FormSplitRow>
                <FormSplitColumn style = {{paddingRight: 25}}>
                    <FormMessage>City*</FormMessage>
                    <FormInput  width='50%' name='city' placeholder='City' onChange={(event) => { props.setRestaurantDetails({...props.getDetails, city: event.target.value })}} value={ props.getDetails?.city }/>
                </FormSplitColumn>

                <FormSplitColumn style = {{paddingRight: 25}}>
                    <FormMessage>State*</FormMessage>
                    <FormInput width='15%' name='state' placeholder='State' onChange={(event) => { props.setRestaurantDetails({...props.getDetails, state: event.target.value })}} value={ props.getDetails?.state }/>
                </FormSplitColumn>

                <FormSplitColumn>
                    <FormMessage>Zip Code*</FormMessage>
                    <FormInput width='30%' name='zip' placeholder='XXXXX' onChange={(event) => { props.setRestaurantDetails({...props.getDetails, zip: event.target.value })}} value={ props.getDetails?.zip }/>
                </FormSplitColumn>
            </FormSplitRow>
            <FormMessage>Phone Number</FormMessage>
            <FormInput width='48%' name='restaurant-phone' placeholder='(000) 000-0000' onChange={(event) => { props.setRestaurantDetails({...props.getDetails, phone: event.target.value })}} value={ props.getDetails?.phone }/>

        </>
    );
}

export { RestaurantInfoCard }