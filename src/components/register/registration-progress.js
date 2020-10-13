import React from "react"
import styled from "styled-components"

import CompletedIcon from "../../assets/img/check-white.png"

let StyledRegistrationProgress = styled.div`
    position: relative;
    top: 200px;
    width: 70%;
    margin: 0 auto;
`



let RegistrationStepIcon = styled.div`

`

let CompletedStepIcon = styled.img`

`

let RegistrationStepLabel = styled.div`

`

let StyledStep = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;

    p {
        text-transform: uppercase;
        color: ${({status}) => status === 'active' ? "#F2994A" : "#8A9DB7" };
        opacity: ${({status}) => status === 'completed' ? "0.8" : "1" };
        display: inline-block;
    }
    
    .icon {
        height: 17px;
        width: 17px;
        padding: 6.5px;
        border: 3px solid #F2994A;
        border-radius: 200px;
        margin-right: 20px;
        background-color: #F2994A;
    }

    .step-indicator {
        display: inline-block;
        margin-right: 20px;
        color: ${({status}) => status === 'active' ? "#F2994A" : "#8A9DB7" };
        border: 3px solid ${({status}) => status === 'active' ? "#F2994A" : "#8A9DB7" };
        padding: 10px;
        height: 10px;
        width: 10px;
        line-height: 10px;
        border-radius: 200px;
        font-size: 18px;
        text-align: center;
    }
`

let Step = ({ idx, label, status }) => {
    console.log(`${label} - ${status}`)
    return(
        <StyledStep status={ status }>
            { status === 'completed' ? 
                <img src={ CompletedIcon } className="icon"/> 
                : <div className='step-indicator'>{ idx }</div>
            }
            <p>{ label }</p>
        </StyledStep>
    )
}


const RegistrationProgress = ({ currentIdx }) => {
    const checkStatus=(idx) => {
        if(idx === currentIdx) {
            return "active"
        } else if (idx < currentIdx) {
            return "completed"
        } else {
            return "upcoming"
        }
    }

    return (
        <StyledRegistrationProgress>
            <Step label="Contact Info" idx="1" status={ checkStatus(1) }/>
            <Step label="Restaurant Setup" idx="2" status={ checkStatus(2) }/>
            <Step label="Review" idx="3" status={ checkStatus(3) }/>
        </StyledRegistrationProgress>
    ) 
}

export { RegistrationProgress }