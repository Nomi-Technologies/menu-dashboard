import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { FormButton, ButtonRow } from "./buttons"


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

const LoginForm = () => (
    <Container>
        <InputField type='email' name='email' placeholder='EMAIL'/>
        <InputField type='password' name='password' placeholder='PASSWORD'/>
        <ForgotPassword>Forgot password?</ForgotPassword>  
        <ButtonRow>
            <FormButton text='Login'/>    
            <FormButton text='Sign Up' theme='light'/>    
        </ButtonRow>
        
    </Container>
)

export default LoginForm