
import React, { useState, useEffect } from 'react';
import RegisterLayout from "../../components/register/register-layout"
import Client from '../../util/client'
import { FormTitle, FormSubtitle, FormRow, FormButton, FormControls, FormError, FormInput } from "../../components/basics"
import { navigate } from 'gatsby';
import useEventListener from '@use-it/event-listener'
import { setRegistrationData, fetchRegistrationData } from "../../util/registration"


const ContactInfo = () => 
{
    const [contactInfo, setContactInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: ""
    });

    const [error, setError] = useState("")

    useEffect(() => {
        let registrationData = fetchRegistrationData()
        
        if(registrationData !== undefined && registrationData !== null) {
            // console.log(registrationData)
            setContactInfo({
                ...registrationData.contactInfo,
                password: ""
            })
        }
    }, [])

    const validateForm = () => {
        // todo more information
        let invalid = false
        Object.keys(contactInfo).forEach(function(key) {
            if(contactInfo[key] === "")
            {
                invalid = true;
            }
        });

        if(invalid) {
            setError("Error: All fields must be filled out")
        }
        else {
            Client.checkEmail(contactInfo.email).then((response) => {
                if(!response.data.taken) {
                    let oldRegistrationData = fetchRegistrationData()
                    setRegistrationData({
                        ...oldRegistrationData,
                        contactInfo: contactInfo
                    })
                    navigate('/register/restaurant-details')
                } else {
                    if(response.data.taken) {
                        setError("Error: Email taken, please choose a different email")
                    }
                    else {
                        setError("Error: Could not update contact info")
                    }
                    
                }
            })
        }

        
    }

    //press enter to navigate to the next page
    function handler({ key }) {
        if (key === 'Enter') {
            validateForm()
        }
    }

    useEventListener('keydown', handler);
    return (
        <RegisterLayout>
            <FormTitle>About You</FormTitle>
            <FormSubtitle>Restaurant admins can set up restaurants, tag dish information, and invite employees.</FormSubtitle>
            <FormError>{ error }</FormError>
            <FormRow>
                <FormInput width='45%' name='first-name' placeholder='first name' onChange={(event) => { setContactInfo({...contactInfo, firstName: event.target.value })}} value={ contactInfo.firstName }></FormInput>    
                <FormInput width='45%' name='last-name' placeholder='last name' onChange={(event) => { setContactInfo({...contactInfo, lastName: event.target.value })}} value={ contactInfo.lastName }></FormInput>    
            </FormRow>
            <FormRow>
                <FormInput width='100%' name='email' placeholder='email address' onChange={(event) => { setContactInfo({...contactInfo, email: event.target.value })}} value={ contactInfo.email }></FormInput>    
            </FormRow>
            <FormRow>
                <FormInput type="password" width='100%' name='password' placeholder='password' onChange={(event) => { setContactInfo({...contactInfo, password: event.target.value })}} value={ contactInfo.password }></FormInput>    
            </FormRow>
            <FormRow>
                <FormInput width='100%' name='phone' placeholder='phone number' onChange={(event) => { setContactInfo({...contactInfo, phone: event.target.value })}} value={ contactInfo.phone }></FormInput>    
            </FormRow>

            <FormControls>
                <FormButton onClick={ validateForm } text="Next"/>
            </FormControls>
        </RegisterLayout>
    )
}
  
  export default ContactInfo
  