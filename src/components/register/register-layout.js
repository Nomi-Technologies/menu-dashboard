import React, { useState } from 'react';
import styled from "styled-components"
import { Container, Column } from "../../components/grid"
import { RegistrationProgress } from "./registration-progress"
import { FormContainer } from "../form"
import { useLocation, navigate } from "@reach/router"

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
    const [registrationData, setRegistrationData] = useState({})

    const { href } = useLocation()

    const getCurrentIndex = () => {
        if(href) {
            if(href.includes('contact-info')) {
                return 1
            } else if (href.includes('restaurant-details')) {
                return 2
            } else {
                return 3
            }
        }    
        return -1
    }

    return (
        <StyledRegisterLayout>
            <Container>
                <SideBar>
                    <RegistrationProgress currentIdx={ getCurrentIndex() }/>
                </SideBar>
                <FormColumn>
                    <FormContainer>
                        { children }
                    </FormContainer>
                </FormColumn>
            </Container>
        </StyledRegisterLayout>
    )
}

export default RegisterLayout