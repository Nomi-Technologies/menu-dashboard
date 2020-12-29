import React from "react"
import styled from "styled-components"

import RegisterLayout from "../../components/register/register-layout"
import { navigate } from "@reach/router"
import Client from '../../util/client'
import { saveUserToken } from "../../util/auth"
import { FormTitle, FormSubtitle, FormControls, ButtonPrimary, ButtonSecondary } from "../../components/basics"
import { removeRegistrationData, fetchRegistrationData } from "../../util/registration"
import useEventListener from '@use-it/event-listener'

let InfoBox = styled.div`
    background-color: white;
    background: #FFFFFF;
    border: 1px solid #ACADAE;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 30px;
    width: 60%;

    .infoTitle {
        color: #F2A25C;
        text-transform: uppercase;
        font-size: 14px;
        margin-bottom: 14px;
    }

    p {
        font-size: 18px;
        margin: 8px 0;
    }
`

const Review = (props) => 
{
    let registrationData = fetchRegistrationData()

    if(registrationData?.contactInfo === null) {
        navigate('/register/contact-info')
    } else {
        if(registrationData?.restaurantDetails === null) {
            navigate('/register/restaurant-details')
        }
    }

    const submitRegistration = () => {
        Client.registerRestaurant(registrationData.restaurantDetails).then((response) => {
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
            <FormTitle>Review setup information</FormTitle>
            <FormSubtitle>Please review information before creating a restaurant page and gaining access to the web portal.</FormSubtitle>
            { 
                registrationData ? (
                    <>
                    <InfoBox>
                        <p className = 'infoTitle'>Admin Info</p>
                        <p>
                            { registrationData.contactInfo.firstName } { registrationData.contactInfo.lastName }
                        </p>
                        <p>
                            { registrationData.contactInfo.email }
                        </p>
                        <p>
                            { registrationData.contactInfo.phone }
                        </p>
                    </InfoBox>
                    <InfoBox>
                        <p className = 'infoTitle'>Restaurant Info</p>
                        <p>
                            { registrationData.restaurantDetails.name }
                        </p>
                        <p>
                            { registrationData.restaurantDetails.streetAddress }
                        </p>
                        <p>
                            { registrationData.restaurantDetails.city } { registrationData.restaurantDetails.state } { registrationData.restaurantDetails.zip }
                        </p>
                        <p>
                            { registrationData.restaurantDetails.phone }
                        </p>
                        <p>
                            { registrationData.restaurantDetails.yelp }
                        </p>
                    </InfoBox> 
                    </>
                ) : null
            }   
            <FormControls>
                <ButtonSecondary onClick={ () => { navigate('/register/restaurant-details') } }>Previous</ButtonSecondary>
                <ButtonPrimary onClick={ submitRegistration }>Register</ButtonPrimary>
            </FormControls>
        </RegisterLayout>
    )
}
export default Review;