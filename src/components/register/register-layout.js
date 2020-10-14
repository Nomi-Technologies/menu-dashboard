import React, { useState } from 'react';
import styled from "styled-components"
import { Container, Column } from "../../components/grid"
import { RegistrationProgress } from "./registration-progress"
import { FormContainer } from "../form"
import { useLocation, } from "@reach/router"
import { RegisterContext } from "./register-context"


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
    const { href } = useLocation()
    const [registrationData, setRegistrationData] = useState({})

    const getCurrentIndex = () => {
        if(href.includes('contact-info')) {
            return 1
        } else if (href.includes('restaurant-details')) {
            return 2
        } else {
            return 3
        }
    }

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

    return (
        <StyledRegisterLayout>
            <Container>
                <SideBar>
                    <RegistrationProgress currentIdx={ getCurrentIndex() }/>
                </SideBar>
                <FormColumn>
                    <FormContainer>
                        <RegisterContext.Provider value={ registerContext }>
                            { children }
                        </RegisterContext.Provider>
                    </FormContainer>
                </FormColumn>
            </Container>
        </StyledRegisterLayout>
        
    )
}

export default RegisterLayout