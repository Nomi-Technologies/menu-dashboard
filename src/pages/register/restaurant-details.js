import React, { useState, useEffect } from 'react';
import RegisterLayout from "../../components/register/register-layout"
import { navigate } from 'gatsby';
import { setRegistrationData, fetchRegistrationData } from "../../util/registration"
import {RestaurantInfoCard} from "../../components/register/restauraunt-info-card"






const RestaurantDetails = () =>{



    // const updateRestaurantList = (index) => {
    //     restaurantList[index] = restaurantDetails
    //     setRestaurantList(restaurantList)
    // }



    const [currIndex, setCurrIndex] = useState(0);

    // restaurant list from local storage
    const [restaurantList, setRestaurantList] = useState([{
        name: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
    }]);
    useEffect(() => {
        let registrationData = fetchRegistrationData()
        if(!registrationData?.contactInfo) {
            navigate('/register/contact-info')
        } 

        if(registrationData?.restaurantList && registrationData?.restaurantList !== null) {
            setRestaurantList(registrationData.restaurantList)
            setCurrIndex(registrationData.restaurantList.length - 1)
        } 
    }, [])





 

    // //press enter to navigate to the next page
    // function handler({ key }) {
    //     if (key === 'Enter') {
    //         validateForm()
    //     }
    // }

    // useEventListener('keydown', handler);


    const localStore = (nextPage) => {
        // todo more information

            setRegistrationData({
                restaurantList: restaurantList                
            })
            if(nextPage){
                navigate('/register/review')
            }
    }


    // let toggleComplete = (index) => {
    //     completeList[index] = !completeList[index]
    //     setCompleteList(completeList)
    // };

    return (

        <RegisterLayout >
         
            {
                restaurantList.map((item, index) => (


  

                    <>
                    {/* <div>{console.log("item")}</div>

                    <div>{console.log(item)}</div> */}
                    {/* <div> {console.log("props.complete")}</div> */}
                    {/* <h1>{console.log(completeList[index])} {completeList[index]}</h1> */}
                    {/* <RestaurantInfoCard restaurantDetails = {item} setRestaurantDetails = {setRestaurantDetails} getDetails = {getDetails()} complete = {completeList[index]} toggleComplete = {toggleComplete} index = {index} addLocation = {addLocation}/> */}
                    <RestaurantInfoCard index = {index} currIndex = {currIndex} setCurrIndex = {setCurrIndex} restaurantList = {restaurantList} setRestaurantList = {setRestaurantList} localStore = {localStore} />


                    </>

                    
                ))
                
            }




            
        </RegisterLayout>
    )
}

export default RestaurantDetails
