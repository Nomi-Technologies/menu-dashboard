import React from "react"
import styled from "styled-components"

import RegisterLayout from "../../components/register/register-layout"
import { navigate } from "@reach/router"
import Client from '../../util/client'
import { saveUserToken } from "../../util/auth"
import { FormTitle, FormSubtitle, FormControls, FormButton } from "../../components/form"
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
    if(props.location.state === null || props.location.state.contactInfo === null) {
        navigate('/register/contact-info')
    } else {
        if(props.location.state === null || props.location.state.restaurantDetails === null) {
            navigate('/register/restaurant-details')
        }
    }


    const submitRegistration = () => {
        Client.registerRestaurant(props.location.state.restaurantDetails).then((response) => {
            const restaurantId = response.data.id
            const userData = { 
                ...props.location.state.contactInfo,
                restaurantId: restaurantId,
                role: 1,
            }

            // register user
            Client.registerUser(userData).then(() => {
                let { email, password } = props.location.state.contactInfo
                // log user in
                Client.login(email, password).then((response) => {
                    saveUserToken(response.data['token'])
                    navigate('/dashboard/menu')
                })
            })
        })
    }

    //press enter to finish set up
    function handler({ key }) {
        if (key == 'Enter') {
            submitRegistration()
        }
    }
    useEventListener('keydown', handler);

    return (
        <RegisterLayout>
            <FormTitle>Review setup information</FormTitle>
            <FormSubtitle>Please review information before creating a restaurant page and gaining access to the web portal.</FormSubtitle>
            { 
                props.location.state ? (
                    <>
                    <InfoBox>
                        <p className = 'infoTitle'>Admin Info</p>
                        <p>
                            { props.location.state.contactInfo.firstName } { props.location.state.contactInfo.lastName }
                        </p>
                        <p>
                            { props.location.state.contactInfo.email }
                        </p>
                        <p>
                            { props.location.state.contactInfo.phone }
                        </p>
                    </InfoBox>
                    <InfoBox>
                        <p className = 'infoTitle'>Restaurant Info</p>
                        <p>
                            { props.location.state.restaurantDetails.name }
                        </p>
                        <p>
                            { props.location.state.restaurantDetails.streetAddress }
                        </p>
                        <p>
                            { props.location.state.restaurantDetails.city } { props.location.state.restaurantDetails.state } { props.location.state.restaurantDetails.zip }
                        </p>
                        <p>
                            { props.location.state.restaurantDetails.phone }
                        </p>
                        <p>
                            { props.location.state.restaurantDetails.yelp }
                        </p>
                    </InfoBox> 
                    </>
                ) : null
            }   
            <FormControls>
                <FormButton destination='restaurant-details' text="Previous" theme="light"/>
                <FormButton onClick={ submitRegistration } text="Register"/>
            </FormControls>
        </RegisterLayout>
    )
}
export default Review;