
import React, { useState, useEffect } from 'react';
import RegisterLayout from "../../components/register/register-layout"
import Client from '../../util/client'
// import { FormTitle, FormSubtitle, FormRow, FormControls, FormError, FormInput, ButtonPrimary } from "../../components/basics"
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
        // <p>Hello</p>
        <RegisterLayout>
        </RegisterLayout>
    )
}
  
  export default ContactInfo
  