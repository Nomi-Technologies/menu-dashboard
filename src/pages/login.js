import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import LoginForm from "../components/login-form"

import RestaurantBackgroundImage from "../assets/img/restaurant-background.png"

import { Container, Column, ImageColumn } from "../components/grid"

const HeroText = styled.div`
  text-align: center;
  font-size: 60px;
  margin: 200px 0px 50px;
  font-family:HK Grotesk Bold;
`


const Login = () => (
  <Layout>
    <Container>
      <Column width='45%'>
        <HeroText>Dine Confidently</HeroText>
        <LoginForm/>
      </Column>
      <ImageColumn width='55%' background={RestaurantBackgroundImage}></ImageColumn>
    </Container>
  </Layout>
)

export default Login
