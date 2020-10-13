import React, { useState } from 'react';
import styled from "styled-components"
import { Container, Column } from "../../components/grid"
<<<<<<< HEAD
import { RegisterContext } from "./register-context"
import { RegistrationProgress } from "./registration-progress"
import { FormContainer } from "../form"
import { useLocation, } from "@reach/router"
=======
import { RegistrationProgress } from "./registration-progress"
import { FormContainer } from "../form"
import { useLocation, navigate } from "@reach/router"
>>>>>>> 844bac7... redo registration flow

const StyledRegisterLayout = styled.div`

`

let SideBar = styled(Column)`
    min-width: 350px;
    max-width: 450px;
`

let FormColumn = styled(Column)`
    padding-right: 52px;

`

const RegisterLayout = ({ children }) => {
<<<<<<< HEAD
    const { href } = useLocation()
    const [registrationData, setRegistrationData] = useState({})

=======
    const [registrationData, setRegistrationData] = useState({})

    const { href } = useLocation()

>>>>>>> 844bac7... redo registration flow
    const getCurrentIndex = () => {
        if(href.includes('contact-info')) {
            return 1
        } else if (href.includes('restaurant-details')) {
            return 2
        } else {
            return 3
        }
    }

<<<<<<< HEAD
    const updateRegistrationData = (newFields) => {
        setRegistrationData({
            ...registrationData,
            ...newFields
        })
    }

    const registerContext = {
        registrationData: registrationData,
        updateRegistrationData: updateRegistrationData
    }

    console.log(registerContext)

=======
>>>>>>> 844bac7... redo registration flow
    return (
        <StyledRegisterLayout>
            <Container>
                <SideBar>
                    <RegistrationProgress currentIdx={ getCurrentIndex() }/>
                </SideBar>
                <FormColumn>
                    <FormContainer>
<<<<<<< HEAD
                        <RegisterContext.Provider value={ registerContext }>
                            { children }
                        </RegisterContext.Provider>
=======
                        { children }
>>>>>>> 844bac7... redo registration flow
                    </FormContainer>
                </FormColumn>
            </Container>
        </StyledRegisterLayout>
<<<<<<< HEAD
        
=======
>>>>>>> 844bac7... redo registration flow
    )
}

export default RegisterLayout