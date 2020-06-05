import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"

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

let adminInfo = {
    firstName: "Pratima",
    lastName: "Manga",
    email: "pratima@dinewithnomi.com",
    phone: "(323) 123-4567"
}

let restaurantInfo = {
    name: "Thai Cuising Express",
    address: "1234 University Ave.",
    city: "Los Angeles",
    state: "CA",
    zip: "90089",
    phone: "(408) 123-4567",
    url: "yelp.com/biz/thai-cuisine-express"
}

const Review = () => (
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
                        <InfoBox>
                            <p className = 'infoTitle'>Admin Info</p>
                            <p>
                                { adminInfo.firstName } { adminInfo.lastName }
                            </p>
                            <p>
                                { adminInfo.email }
                            </p>
                            <p>
                                { adminInfo.phone }
                            </p>
                        </InfoBox>
                        <InfoBox>
                            <p className = 'infoTitle'>Restaurant Info</p>
                            <p>
                                { restaurantInfo.name }
                            </p>
                            <p>
                                { restaurantInfo.address }
                            </p>
                            <p>
                                { restaurantInfo.city } { restaurantInfo.state } { restaurantInfo.zip }
                            </p>
                            <p>
                                { restaurantInfo.phone }
                            </p>
                            <p>
                                { restaurantInfo.url }
                            </p>
                        </InfoBox>
                    <FormControls>
                        <PrevButton destination='restaurant-details'/>
                        <DoneButton destination='/'/>
                    </FormControls>
                </FormContainer>
            </FormColumn>
        </Container>
    </Layout>
  )
  
  export default Review
  