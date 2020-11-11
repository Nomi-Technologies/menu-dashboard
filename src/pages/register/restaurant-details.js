import React, { useState, useEffect } from 'react';
import RegisterLayout from "../../components/register/register-layout"
import { navigate } from 'gatsby';
import { FormInput, FormTitle, FormSubtitle, FormRow, FormControls, FormButton } from "../../components/form"
import useEventListener from '@use-it/event-listener'
import { setRegistrationData, fetchRegistrationData } from "../../util/registration"

const RestaurantDetails = () =>
{
    const [restaurantDetails, setRestaurantDetails] = useState({
        name: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        url: ""
    })

    useEffect(() => {
        let registrationData = fetchRegistrationData()
        if(!registrationData?.contactInfo) {
            navigate('/register/contact-info')
        } 

        if(registrationData?.restaurantDetails !== null) {
            setRestaurantDetails(registrationData.restaurantDetails)
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
        <RegisterLayout>
            <FormTitle>Restaurant Details</FormTitle>
            <FormSubtitle>Details about your restaurant's location and services</FormSubtitle>
            <FormRow>
                <FormInput width='100%' name='restuarant-name' placeholder='restaurant name' onChange={(event) => { setRestaurantDetails({...restaurantDetails, name: event.target.value })}} value={ restaurantDetails.name }/>
            </FormRow>
            <FormRow>
                <FormInput width='100%' name='street-address' placeholder='street address' onChange={(event) => { setRestaurantDetails({...restaurantDetails, streetAddress: event.target.value })}} value={ restaurantDetails.streetAddress }/>
            </FormRow>
            <FormRow>
                <FormInput width='50%' name='city' placeholder='city' onChange={(event) => { setRestaurantDetails({...restaurantDetails, city: event.target.value })}} value={ restaurantDetails.city }/>
                <FormInput width='15%' name='state' placeholder='state' onChange={(event) => { setRestaurantDetails({...restaurantDetails, state: event.target.value })}} value={ restaurantDetails.state }/>
                <FormInput width='30%' name='zip' placeholder='zip code' onChange={(event) => { setRestaurantDetails({...restaurantDetails, zip: event.target.value })}} value={ restaurantDetails.zip }/>
            </FormRow>
            <FormRow>
                <FormInput width='48%' name='restaurant-phone' placeholder='phone number' onChange={(event) => { setRestaurantDetails({...restaurantDetails, phone: event.target.value })}} value={ restaurantDetails.phone }/>
                <FormInput width='49%' name='yelp-profile' placeholder='yelp profile (optional)' onChange={(event) => { setRestaurantDetails({...restaurantDetails, url: event.target.value })}} value={ restaurantDetails.url }/>
            </FormRow>
            <FormControls>
                <FormButton destination='contact-info' text="Previous" theme="light"/>
                <FormButton onClick={ validateForm } text="Next"/>
            </FormControls>
        </RegisterLayout>
    )
}

export default RestaurantDetails
