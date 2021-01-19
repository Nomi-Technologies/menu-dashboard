import React, { useState, useEffect } from 'react';
import RegisterLayout from "../../components/register/register-layout"
import { navigate } from 'gatsby';
import { FormTitle, FormSubtitle, FormControls, FormInput, FormContainer, FormSplitColumn, FormSplitRow, FormMessage, FormSubtitleNoCaps } from "../../components/form"
import {ButtonPrimary, ButtonRow, ButtonSecondary } from "../../components/basics"
import styled from "styled-components"

import useEventListener from '@use-it/event-listener'
import { setRegistrationData, fetchRegistrationData } from "../../util/registration"
import {RestaurantInfoCard} from "../../components/register/restauraunt-info-card"


const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    alignItems: center;

`



const RestaurantDetails = () =>{

    const [restaurantDetails, setRestaurantDetails] = useState({
        name: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        url: ""
    });

    const getDetails = () => {
        return restaurantDetails
    }

    const [restaurantList, setRestaurantList] = useState([]);



    useEffect(() => {
        let registrationData = fetchRegistrationData()
        if(!registrationData?.contactInfo) {
            navigate('/register/contact-info')
        } 

        if(registrationData?.restaurantDetails !== null) {
            setRestaurantDetails(registrationData.restaurantDetails)
            console.log("set registrationData.restaurantDetails")
            setRestaurantList([restaurantDetails])
        }
    }, [])


    const validateForm = () => {
        // TODO: Add validation
        setRegistrationData({
            ...fetchRegistrationData(),
            restaurantDetails: restaurantDetails
        })
        navigate('/register/review')
    }

    //press enter to navigate to the next page
    function handler({ key }) {
        if (key === 'Enter') {
            validateForm()
        }
    }

    useEventListener('keydown', handler);

    return (

        <RegisterLayout >
            {
                restaurantList.map((item, index) => (
                    <>
                    {/* <div>{console.log("item")}</div>

                    <div>{console.log(item)}</div> */}
                    <RestaurantInfoCard restaurantDetails = {item} setRestaurantDetails = {setRestaurantDetails} getDetails = {getDetails()}/>
                    </>

                    
                ))
                
            }


            {/* <TitleRow>
                <FormTitle>Restaurant 1 Information</FormTitle>
                <FormSubtitle style = {{opacity: 0.8}}> * Required Information</FormSubtitle>
            </TitleRow>

            <FormMessage>Name*</FormMessage>

            <FormInput width='100%' name='restuarant-name' placeholder='Restaurant Name' onChange={(event) => { setRestaurantDetails({...restaurantDetails, name: event.target.value })}} value={restaurantDetails?.name}/>

            <FormMessage>Street Address*</FormMessage>
            <FormInput width='100%' name='street-address' placeholder='Restaurant Street Address' onChange={(event) => { setRestaurantDetails({...restaurantDetails, streetAddress: event.target.value })}} value={ restaurantDetails?.streetAddress }/>

            <FormSplitRow>
                <FormSplitColumn style = {{paddingRight: 25}}>
                    <FormMessage>City*</FormMessage>
                    <FormInput  width='50%' name='city' placeholder='City' onChange={(event) => { setRestaurantDetails({...restaurantDetails, city: event.target.value })}} value={ restaurantDetails?.city }/>
                </FormSplitColumn>

                <FormSplitColumn style = {{paddingRight: 25}}>
                    <FormMessage>State*</FormMessage>
                    <FormInput width='15%' name='state' placeholder='State' onChange={(event) => { setRestaurantDetails({...restaurantDetails, state: event.target.value })}} value={ restaurantDetails?.state }/>
                </FormSplitColumn>

                <FormSplitColumn>
                    <FormMessage>Zip Code*</FormMessage>
                    <FormInput width='30%' name='zip' placeholder='XXXXX' onChange={(event) => { setRestaurantDetails({...restaurantDetails, zip: event.target.value })}} value={ restaurantDetails?.zip }/>
                </FormSplitColumn>
            </FormSplitRow>
            <FormMessage>Phone Number</FormMessage>
            <FormInput width='48%' name='restaurant-phone' placeholder='(000) 000-0000' onChange={(event) => { setRestaurantDetails({...restaurantDetails, phone: event.target.value })}} value={ restaurantDetails?.phone }/> */}

            <FormControls>
                <ButtonSecondary onClick={ () => { navigate('/register/contact-info') } }>Previous</ButtonSecondary>
                <ButtonPrimary onClick={ validateForm }>Looks good!</ButtonPrimary>
            </FormControls>




            
        </RegisterLayout>
    )
}

export default RestaurantDetails
