import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import RegisterLayout from "../../components/register/register-layout"
import { navigate } from "@reach/router"
import Client from '../../util/client'
import { saveUserToken } from "../../util/auth"
import {FormError, FormTitle, FormSubtitle, FormControls, FormInput, FormContainer, FormSplitColumn, FormSplitRow, FormMessage, FormSubtitleNoCap } from "../../components/form"
import {ButtonPrimary, ButtonRow, ButtonSecondary, Button } from "../../components/basics"
import {RestaurantInfoCard} from "../../components/register/restauraunt-info-card"
import { setRegistrationData, removeRegistrationData, fetchRegistrationData } from "../../util/registration"
import useEventListener from '@use-it/event-listener'



const Review = (props) => 
{
    const [currIndex, setCurrIndex] = useState(-1);
    const [invalid, setInvalid] = useState(true)
    const [error, setError] = useState("")
    // restaurant list from local storage
    const [restaurantList, setRestaurantList] = useState([{
        name: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
    }]);
    const [contactInfo, setContactInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });



    useEffect(() => {
        let registrationData = fetchRegistrationData()
        console.log(registrationData)
        if(!registrationData?.contactInfo || registrationData?.contactInfo === null ) {
            navigate('/register/contact-info')
        } else if(!registrationData?.restaurantList || registrationData?.restaurantList === null) {
            navigate('/register/restaurant-details')
        } else {
            setRestaurantList(registrationData?.restaurantList)
            setContactInfo(registrationData?.contactInfo)
        }
    }, [])

    const updateRestaurantList = (index, restaurantDetails) => {
        restaurantList[index] = restaurantDetails
        setRestaurantList(restaurantList)
        localStore(false)
    }

    const appendRestaurant = (restaurantDetails) => {
        restaurantList.push(restaurantDetails)
        setRestaurantList(restaurantList)
        localStore(false)
    }

    const removeRestaurant = (index) => {
        restaurantList.splice(index,1)
        setRestaurantList(restaurantList)
        localStore(false)
    }

    const validate = (addLocation, currRestaurantDetails, index) => {

        let invalid = false
        Object.keys(currRestaurantDetails).forEach(function(key) {
            if(currRestaurantDetails[key] === "" && key != "phone")
            {
                invalid = true;
            }
        });

        setInvalid(invalid)
        if(invalid) {
            setError("Error: There are missing fields that are required")
            return invalid
        }
        //if hit looks good on the last element
        else if (!addLocation && index == restaurantList.length - 1) {
            setError("")
            localStore(true)
        } else if (addLocation){
            setError("")
            return invalid
        } else {
            // this is when they hit looks good on an edit
            setError("")
            updateRestaurantList(index, currRestaurantDetails)
            localStore(false)
            setCurrIndex(-1)
            return invalid
        }
    }


    function addLocation (index, currRestaurantDetails){        
        let invalid = validate(true, currRestaurantDetails, restaurantList.length - 1)

        if(!invalid){
            updateRestaurantList(index, currRestaurantDetails)
            let tempRestaurant = {
                name: "",
                streetAddress: "",
                city: "",
                state: "",
                zip: "",
                phone: "",
            }
            appendRestaurant(tempRestaurant)
            setCurrIndex(currIndex + 1)
            localStore(false)
        }
    }

    const localStore = (nextPage) => {
        setRegistrationData({
            contactInfo: contactInfo,
            restaurantList: restaurantList                
        })
        if(nextPage){
            navigate('/register/review')
        }
}
    // let registrationData = fetchRegistrationData()

    const submitRegistration = () => {
        let registrationData = {
            contactInfo: contactInfo,
            restaurantList: restaurantList
        }


        Client.registerRestaurant(registrationData.restaurantList).then((response) => {
            const restaurantId = response.data.id
            const userData = { 
                ...registrationData.contactInfo,
                restaurantId: restaurantId,
                role: 1,
            }

            // register user
            Client.registerUser(userData).then(() => {
                let { email, password } = registrationData.contactInfo
                // log user in
                Client.login(email, password).then((response) => {
                    saveUserToken(response.data['token'])
                    removeRegistrationData()
                    navigate('/dashboard/menu')
                })
            })
        })
    }

    //press enter to finish set up
    function handler({ key }) {
        if (key === 'Enter') {
            submitRegistration()
        }
    }
    useEventListener('keydown', handler);

    return (
        <RegisterLayout>
             {
                restaurantList.map((item, index) => (
                    <>
                    {   
                        index == currIndex ? (
                            <FormError>{error}</FormError>
                        ) :
                        (<> </>)
                    }

                    <RestaurantInfoCard 
                        appendRestaurant = {appendRestaurant} 
                        index = {index} 
                        currIndex = {currIndex} 
                        setCurrIndex = {setCurrIndex} 
                        restaurantList = {restaurantList} 
                        setRestaurantList = {setRestaurantList} 
                        localStore = {localStore} 
                        updateRestaurantList = {updateRestaurantList}
                        addLocation = {addLocation}
                        validate = {validate}
                        removeRestaurant = {removeRestaurant}
                    />

                    {
                            // only show looks good button for currently editing restaurant and its not the last one
                            (index == currIndex && index != (restaurantList.length - 1)) ? (
                            <>
                            <FormControls>
                                <ButtonPrimary style = {{width: '211px', height: '56px', fontSize: '18px'}} onClick={ () => validate(false, restaurantList[index], index) }>Looks good!</ButtonPrimary>
                            </FormControls>
                            </>
                        )
                        :
                        (<></>)
                    }
                    </>
                ))
            }

            
            <FormControls>
                <ButtonPrimary style = {{width: '211px', height: '56px', fontSize: '18px'}} onClick={ submitRegistration }>Finish</ButtonPrimary>
            </FormControls>
        </RegisterLayout>
    )
}
export default Review;