import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import Layout from "../../components/layout"
import { navigate } from 'gatsby';
import { Container, Column } from "../../components/grid"
import { FormInput, FormContainer, FormTitle, FormSubtitle, FormRow, NextButton, FormControls, PrevButton } from "../../components/form"
import useEventListener from '@use-it/event-listener'
// import { RestaurantProgress } from "../../components/registration-progress"

let SideBar = styled(Column)`
    background-color: #F2994A;
`

let FormColumn = styled(Column)`
    background-color: #F7F8FA;
`

const RestaurantDetails = (props) =>
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
        if(props.location.state == null || props.location.state.contactInfo == null) {
            navigate('/register/contact-info')
        }
    }, [props.location.state])


    const validateForm = () => {
        // TODO: Add validation
        let state = {
            contactInfo: props.location.state.contactInfo,
            restaurantDetails: restaurantDetails
        }
        navigate('/register/review', { state: state })
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
                <SideBar width='33%' style={{ "background-color": "white"}}>
                    {/* TODO: Add restaurant progress later */}
                    {/* <RestaurantProgress steps={['Contact Info', 'Restaurant Setup', 'Review']} currentIdx='1'></RestaurantProgress> */}
                </SideBar>
                <FormColumn>
                    <FormContainer>
                        <FormTitle>Restaurant Details</FormTitle>
                        <FormSubtitle>Details about your restaurant's location and services</FormSubtitle>
                        <FormRow>
                            <FormInput width='100%' name='restuarant-name' placeholder='restaurant name' onChange={(event) => { setRestaurantDetails({...restaurantDetails, name: event.target.value })}}></FormInput>
                        </FormRow>
                        <FormRow>
                            <FormInput width='100%' name='street-address' placeholder='street address' onChange={(event) => { setRestaurantDetails({...restaurantDetails, streetAddress: event.target.value })}}></FormInput>
                        </FormRow>
                        <FormRow>
                            <FormInput width='40%' name='city' placeholder='city' onChange={(event) => { setRestaurantDetails({...restaurantDetails, city: event.target.value })}}></FormInput>
                            <FormInput width='15%' name='state' placeholder='state' onChange={(event) => { setRestaurantDetails({...restaurantDetails, state: event.target.value })}}></FormInput>
                            <FormInput width='30%' name='zip' placeholder='zip code' onChange={(event) => { setRestaurantDetails({...restaurantDetails, zip: event.target.value })}}></FormInput>
                        </FormRow>
                        <FormRow>
                            <FormInput width='45%' name='restaurant-phone' placeholder='phone number' onChange={(event) => { setRestaurantDetails({...restaurantDetails, phone: event.target.value })}}></FormInput>
                            <FormInput width='45%' name='yelp-profile' placeholder='yelp profile (optional)' onChange={(event) => { setRestaurantDetails({...restaurantDetails, url: event.target.value })}}></FormInput>
                        </FormRow>
                        <FormControls>
                            <PrevButton destination='contact-info'/>
                            <NextButton onClick={ validateForm }/>
                        </FormControls>
                    </FormContainer>
                </FormColumn>
            </Container>
        </Layout>
    )
}

export default RestaurantDetails
