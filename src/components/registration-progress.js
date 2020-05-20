import React from "react"
import styled from "styled-components"

import CompletedIcon from "../assets/img/check-progress-icon.png"

let StyledRegistrationProgress = styled.div`
    position: relative;
    top: 200px;
    width: 70%;

`

let RegistrationStepIcon = styled.div`

`

let CompletedStepIcon = styled.img`

`

let RegistrationStepLabel = styled.div`

`



const RegistrationProgress = ({steps, currentIdx}) => (
     <StyledRegistrationProgress>
        { 
            steps.map((step, idx) => {
                if(idx < currentIdx) {
                    return <>
                            <CompletedStepIcon src={ CompletedIcon }/> 
                            <RegistrationStepLabel>{ step }</RegistrationStepLabel>
                        </>
                } else if (idx === currentIdx) {
                    return <>
                            <RegistrationStepIcon type='active'>{ idx+1 }</RegistrationStepIcon> 
                            <RegistrationStepLabel type='active'>{ step }</RegistrationStepLabel>
                        </>
                } else {    
                    return <>
                        <RegistrationStepIcon>{ idx+1 }</RegistrationStepIcon> 
                        <RegistrationStepLabel>{ step }</RegistrationStepLabel>
                    </>
                }
            }) 
        }
     </StyledRegistrationProgress>
)

export default RegistrationProgress