import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"

import { navigate } from "@reach/router"

import Client from '../../util/client'
import { saveUserToken } from "../../util/auth"

import { Container, Column, ImageColumn } from "../../components/grid"

import { FormInput, FormContainer, FormTitle, FormSubtitle, FormRow, DoneButton, FormControls, PrevButton } from "../../components/form"

import { RestaurantProgress } from "../../components/registration-progress"

let SideBar = styled(Column)`
    background-color: #F2994A;
`

let SideBarText = styled.p`
    color: white;
    font-size: 36px;
    line-height: 43px;
    font-weight: bold;
    margin: 0 64px;
    margin-top: 124px;
`

let FormColumn = styled(Column)`
    background-color: #F7F8FA;
`

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
    if(props.location.state == null || props.location.state.contactInfo == null) {
        navigate('/register/contact-info')
    } else {
        if(props.location.state == null || props.location.state.restaurantDetails == null) {
            navigate('/register/restaurant-details')
        }
    }


    const submitRegistration = () => {
        Client.registerRestaurant(props.location.state.restaurantDetails).then((response) => {
            const restaurantId = response.data.id

            console.log(response)

            const userData = { 
                ...props.location.state.contactInfo,
                restaurantId: restaurantId,
                role: "admin"
            }

            // register user
            Client.registerUser(userData).then(() => {
                let { email, password } = props.location.state.contactInfo
                // log user in
                Client.login(email, password).then((response) => {
                    console.log(response.data)
                    saveUserToken(response.data['token'])
                    navigate('/dashboard/menu')
                })
            })
        })
    }

    return (
        <Layout>
            <Container>
                <SideBar width='33%' style={{ "background-color": "white"}}>
                    {/* TODO: Add restaurant progress later */}
                    {/* <RestaurantProgress steps={['Contact Info', 'Restaurant Setup', 'Review']} currentIdx='1'></RestaurantProgress> */}
                </SideBar>
                <FormColumn>
                    <FormContainer>
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
                                                { props.location.state.restaurantDetails.address }
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
                            <PrevButton destination='restaurant-details'/>
                            <DoneButton onClick={ submitRegistration }/>
                        </FormControls>
                    </FormContainer>
                </FormColumn>
            </Container>
        </Layout>
    )
}
export default Review;