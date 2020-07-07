import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Layout from "../../components/layout"
import { Container, Column, ImageColumn } from "../../components/grid"
import Populate from "../../components/dashboard/populate"

import {
  FormInput,
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormRow,
  DoneButton,
  FormControls,
} from "../../components/form"

import { navigate } from "@reach/router"

const InfoTitle = styled.p`
  position: relative;
  margin-left: 96px;
  font-family: HK Grotesk Regular;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 43px;
  color: #000000;
  flex: none;
  order: 0;
`
const SideTitle = styled.p`
  margin-left: 96px;
  font-family: HK Grotesk Regular;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #8a9db7;
`

const Wrapper = styled.div`
  margin-top: 65px;
  position: static;
  overflow-y: hidden;
  overflow-x: hidden;
`

const Back = styled.p`
  margin-left: 80px;
  font-family: HK Grotesk Regular;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #c4cedb;
`
const MarginTop = styled.div`
  margin-top: 100px;
`

const Orange = styled.p`
  color: orange;
`

const SideBar = styled(Column)`
  background-color: white;
`

const GreyBar = styled(Column)`
  background-color: #f7f8fa;
`

const Triangle = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  left: -150px;
  top: 720px;

  background: #f4b176;
  transform: rotate(45deg);
`

const SkinnyTriangle = styled.div`
  position: absolute;
  width: 406.93px;
  height: 406.93px;
  left: -100px;
  top: 776px;

  background: rgba(242, 153, 74, 0.5);
  transform: rotate(23.27deg);
`
const NoScroll = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
`

let StyleButton = styled.button`
  float: right;
  background-color: #f2994a;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  color: white;
  padding: 21px 75px;
  margin-top: 200px;
`

const account = () => (
  <Layout>
    <Wrapper>
      <Container>
        <SideBar width="25%">
          <Back>Back</Back>
          <MarginTop>
            <SideTitle>
              <Orange>Personal Info</Orange>
            </SideTitle>
          </MarginTop>
          <SideTitle>Restaurant Info</SideTitle>
          <SideTitle>Internet Accounts</SideTitle>
          <SideTitle>Security</SideTitle>

          <Triangle></Triangle>
          <SkinnyTriangle></SkinnyTriangle>
        </SideBar>

        <GreyBar>
          <InfoTitle>Personal Info</InfoTitle>
          <Populate></Populate>
          {/* <FormContainer>
            <FormRow>
              <FormInput width="48%" name="first-name" placeholder="first name">
                {displayFirst}
              </FormInput>
              <FormInput
                width="48%"
                name="last-name"
                placeholder="last name"
              ></FormInput>
            </FormRow>
            <FormRow>
              <FormInput
                width="80%"
                name="email"
                placeholder="email address"
              ></FormInput>
            </FormRow>
            <FormRow>
              <FormInput
                width="48%"
                name="phone"
                placeholder="phone number"
              ></FormInput>
            </FormRow>

            <SaveButton destination="" />
          </FormContainer> */}
        </GreyBar>
      </Container>
    </Wrapper>
  </Layout>
)

export default account
