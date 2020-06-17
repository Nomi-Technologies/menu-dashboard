import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useEffect } from 'react';

import styled from "styled-components"
import { FormButton, ButtonRow } from "./buttons"
import { navigate } from "@reach/router"
import { FormInput, FormContainer, FormTitle, FormSubtitle, FormRow, NextButton, FormControls } from "../components/form"
import Client from "../util/client"
import { saveUserToken } from "../util/auth"



const ForgotPassword = styled(Link)`
    color: rgba(242, 153, 74, 0.9);
    font-size: 18px;
    text-align: right;
    margin-bottom: 10px;
`

const Container = styled.div`
    margin-top: 24px;
    display: flex;
    margin: 0 auto;
    width: 90%; 
    flex-direction: column;
    max-width: 400px;

    input {
        border: none;
        background-color: #F4F4F4;
    }

    .error {
        color: red;
        padding: 0;
        margin: 0;
    }
`

const InputField = styled.input`
    font-size: 18px;
    line-height: 22px;
    padding: 18px 32px;
    display: block;
    background-color: #F4F4F4;
    border-radius: 8px;
    border: none;
    margin-bottom: 24px;
`

const LoginForm = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [loginError, setLoginError] = useState(false)

    const loginUser = () => {
        Client.login(email, password).then((response) => {
            console.log(response.data)
            saveUserToken(response.data['token'])
            setLoginError(false)
            navigate('/')
        }).catch((response) => {
            setLoginError(true)
        })
    }

    return (
        <Container>
            {/* <InputField type='email' name='email' placeholder='EMAIL'/>
            <InputField type='password' name='password' placeholder='PASSWORD'/> */}
            <p className='error'>{ loginError ? 'Could not log in with credentials provided.' : '' }</p>
            <FormInput placeholder='email' name='email' onChange={ (event) => {setEmail(event.target.value)} }/>
            <FormInput placeholder='password' name='password' type='password' onChange={ (event) => {setPassword(event.target.value)} }/>
            <ForgotPassword>Forgot password?</ForgotPassword>  
            <ButtonRow>
                <FormButton text='Login' onClick={ loginUser }/>    
                <FormButton text='Sign Up' theme='light' onClick = {() => navigate('register/contact-info') } />    
            </ButtonRow>
        </Container>
    )
}

export default LoginForm