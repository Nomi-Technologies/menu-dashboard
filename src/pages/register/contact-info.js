import React, { useState, useEffect } from 'react';
import Client from '../../util/client'
import {ButtonPrimary, ButtonRow } from "../../components/basics"
import { FormTitle, FormSubtitle, FormControls, FormError, FormInput,FormContainer, FormSplitColumn, FormSplitRow, FormMessage, FormSubtitleNoCaps } from "../../components/form"
import OnboardingImage from "../../assets/img/onboarding-image.png"
import LogoImage from "../../assets/img/favicon-white.png"
import { navigate } from 'gatsby';
import useEventListener from '@use-it/event-listener'
import { setRegistrationData, fetchRegistrationData } from "../../util/registration"
import styled from "styled-components"
import FittedImage from "react-fitted-image"



const Logo = styled.div`

    position: absolute;
    left: 37px;
    top: 21px;
    width: 44px;
    height: 40px;


`


const ContactInfo = () => 
{
    const [contactInfo, setContactInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(" ")

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


    // const size = useWindowSize();
  
    // // Hook
    // function useWindowSize() {
    //     // Initialize state with undefined width/height so server and client renders match
    //     // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

    //     const [windowSize, setWindowSize] = useState({
    //     width: undefined,
    //     height: undefined,
    //     });
    
    //     useEffect(() => {
    //     // Handler to call on window resize
    //     function handleResize() {
    //         // Set window width/height to state
    //         setWindowSize({
    //         width:  typeof window !== 'undefined' && window.innerWidth,
    //         height: typeof window !== 'undefined' && window.innerHeight,
    //         });
    //     }
        
    //     // Add event listener
    //     if(typeof window !== 'undefined'){
    //         window.addEventListener("resize", handleResize);
    //     }
        
    //     // Call handler right away so state gets updated with initial window size
    //     handleResize();
        
    //     // Remove event listener on cleanup
    //     return () => typeof window !== 'undefined' && window.removeEventListener("resize", handleResize);
    //     }, []); // Empty array ensures that effect is only run on mount
    
    //     return windowSize;
    // }


    useEventListener('keydown', handler);
    return (
        <FormSplitRow style = {{alignItems: 'center'}}>
            <Logo>
                <FittedImage 
                    fit="fill"
                    src={LogoImage} 
                    />
            </Logo>

            <FormSplitColumn  >
                    {/* <img resizeMode="fill" src={OnboardingImage} alt="No Onboarding Image"/> */}
                    {/* <FittedImg src={OnboardingImage} alt="Thing" fit="cover" position="0 50%" />; */}
                    <div style = {{height: '100vh'}}>
                    <FittedImage 
                        fit="fill"
                        src={OnboardingImage} 
                        />
                    </div>
            </FormSplitColumn>

            <FormSplitColumn >
                    <FormContainer>
                        <FormTitle>It's Menu Wizardry</FormTitle>
                        <FormSubtitleNoCaps>Making Dining Accessible with Nomi </FormSubtitleNoCaps>
                        <FormMessage>Tell us about yourself</FormMessage>

                        <FormError>{ error }</FormError>
                        <FormSplitRow> 
                            <FormSplitColumn>
                                <FormInput width='45%' name='first-name' placeholder='First Name' onChange={(event) => { setContactInfo({...contactInfo, firstName: event.target.value })}} value={ contactInfo.firstName }></FormInput>    
                            </FormSplitColumn>
                            <FormSplitColumn>
                                <FormInput width='45%' name='last-name' placeholder='Last Name' onChange={(event) => { setContactInfo({...contactInfo, lastName: event.target.value })}} value={ contactInfo.lastName }></FormInput>    
                            </FormSplitColumn>
                        </FormSplitRow>

                        <FormInput width='100%' name='email' placeholder='Email' onChange={(event) => { setContactInfo({...contactInfo, email: event.target.value })}} value={ contactInfo.email }></FormInput>    
                        <FormInput type="password" width='100%' name='Password' placeholder='password' onChange={(event) => { setContactInfo({...contactInfo, password: event.target.value })}} value={ contactInfo.password }></FormInput>   
    
                        <FormSplitRow> 
                                <ButtonPrimary style = {{width: "100%"}} onClick={ validateForm }>Sign Up</ButtonPrimary>
                        </FormSplitRow>     

                        <FormSplitRow style = {{justifyContent: 'center'}}> 
                            <p>Already have an account? <a href=''>Sign in</a></p> 
                        </FormSplitRow>  

                    </FormContainer>


                
            </FormSplitColumn>



        </FormSplitRow>
    )
}
  
  export default ContactInfo
  