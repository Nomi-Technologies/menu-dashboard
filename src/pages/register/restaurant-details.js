import React, { useState, useEffect } from 'react';
import RegisterLayout from "../../components/register/register-layout"
import { navigate } from 'gatsby';
import { setRegistrationData, fetchRegistrationData } from "../../util/registration"
import {RestaurantInfoCard} from "../../components/register/restauraunt-info-card"
import { FormError, FormControls } from "../../components/form"
import { ButtonPrimary } from "../../components/basics"
import styled from "styled-components"



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

const RestaurantDetails = () =>{

    const [currIndex, setCurrIndex] = useState(0);
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
        if(!registrationData?.contactInfo  && registrationData?.contactInfo == null) {
            navigate('/register/contact-info')
        } else {
            setContactInfo(registrationData?.contactInfo)
        }

        if(registrationData?.restaurantList && registrationData?.restaurantList != null) {
            setRestaurantList(registrationData.restaurantList)
            setCurrIndex(registrationData.restaurantList.length - 1)
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
            setCurrIndex(restaurantList.length - 1)
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

    return (

        <RegisterLayout >
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
                        // only show the next and add locations for the last one
                        (index == restaurantList.length - 1) ? (
                            <>
                            <StyledAdd>
                                <div className="new-restaurant-button" onClick={ () => {addLocation(index, restaurantList[index])}}>
                                    + Add Another Location
                                </div>
                            </StyledAdd>
                            </>
                        )
                    :
                    (<></>)
                      
                    }
                    
                    {
                            // only show looks good button for currently editing restaurant
                            (index == currIndex) ? (
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

            
        </RegisterLayout>
    )
}

export default RestaurantDetails
