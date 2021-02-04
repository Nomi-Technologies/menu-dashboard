import React from "react"
import styled from "styled-components"
import { navigate } from 'gatsby';
import CompletedIcon from "../../assets/img/Ellipse-Orange.png"
import backArrow from "../../assets/img/left-arrow.png"
import { FormSubtitle, FormMessage } from "../form"
import {Button } from "../basics"




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
        color: ${({status}) => status === 'active' ? "black" : "black" };
        ${'' /* opacity: ${({status}) => status === 'completed' ? "0.8" : "1" }; */}
        display: inline-block;
        font-size: ${({status}) => status === 'active' ? "18px" : "36px" };
    }
    
    .icon {
        height: 16px;
        width: 16px;
        margin-right: 20px;
    }

    .step-indicator {
        display: inline-block;
        margin-right: 20px;
        color: ${({status}) => status === 'active' ? "#F2994A" : "#8A9DB7" };
        border: 2px solid ${({status}) => status === 'active' ? "#F2994A" : "#8A9DB7" };
        padding: 5px;
        height: 2px;
        width: 2px;
        line-height: 20px;
        border-radius: 200px;
        font-size: 18px;
        text-align: center;
    }
`

let Step = ({ idx, label, status }) => {
    return(
        <StyledStep status={ status }>
            { status === 'completed' ? 
            <img src={ CompletedIcon } className="icon"/> 
                : <div className='step-indicator'>{ }</div>
            }
            <p>{ label }</p>
        </StyledStep>
    )
}
const goBack = (currentIdx) => {
    if(currentIdx == 2){
        navigate('/register/contact-info')
    } else if (currentIdx == 3){
        navigate('/register/restaurant-details')

    }

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
            <Button 
            onClick={ () => { goBack (currentIdx)}}
                style = {{color: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px'}}>

                <img src={ backArrow } width = "16px" height = "16px" style = {{marginRight: '20px'}}/> 
                <FormSubtitle>Go Back</FormSubtitle>
            </Button>
            
            { (currentIdx == 1 || currentIdx == 2) ? 
            (
                <>
                    <Step label="Let's get down to business" idx="1" status={ checkStatus(1) }/>
                    <Step label="Tell us about your restaurants" idx="2" status={ checkStatus(2) }/>
                </>
            ) :
            (
                <>
                    <Step label="One and done!" idx="2" status={ checkStatus(2) }/>
                    <Step label="Here's a summary of your restaurants" idx="3" status={ checkStatus(3) }/>
                    <FormMessage style = {{marginLeft: '35px'}} >(Don't worry, you can always edit or add more later)!</FormMessage>
                </>

            )
            }
            
        </StyledRegistrationProgress>
    ) 
}

export { RegistrationProgress }