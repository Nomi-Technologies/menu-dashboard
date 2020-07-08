import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import LoginForm from "../components/login-form"

import RestaurantBackgroundImage from "../assets/img/restaurant-background.png"

import { Container, Column, ImageColumn } from "../components/grid"

const HeroText = styled.p`
  text-align: center;
  font-size: 60px;
  margin-top: 180px;
`

const Login = () => (
  <Layout>
    <Container>
      <Column width="45%">
        <HeroText>New to Nomi?</HeroText>
        <LoginForm></LoginForm>
      </Column>
      <ImageColumn
        width="55%"
        background={RestaurantBackgroundImage}
      ></ImageColumn>
    </Container>
  </Layout>
)

export default Login
