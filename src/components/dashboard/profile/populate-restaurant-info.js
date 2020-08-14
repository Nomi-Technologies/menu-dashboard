import React, { useState, useEffect } from "react"

import styled from "styled-components"
import { FormInput, FormContainer, FormRow } from "../../form"

import Client from "../../../util/client"

let SaveButton = styled.div`
  float: right;
  background-color: #f2994a;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  color: white;
  padding: 21px 75px;
  margin-top: 100px;
`

let ChangeButton = styled.div`
  float: right;
  background-color: #f2994a;
  font-size: 18px;
  color: #f2994a;
  padding: 19px 31px;
  margin-top: 100px;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid #f3a35c;
  box-sizing: border-box;
  border-radius: 8px;
`

const PopulateRestaurant = () => {
  const [restaurant, setRestaurant] = useState(false)
  const [address, setAddress] = useState(false)
  const [city, setCity] = useState(false)
  const [state, setState] = useState(false)
  const [zip, setZip] = useState(false)
  const [phone, setPhone] = useState(false)
  const [website, setWebsite] = useState(false)

  const [id, setId] = useState(false)
  const [save, setSave] = useState(false)

  useEffect(() => {
    Client.getRestaurantInfo().then(response => {
      setRestaurant(response.data.name)
      setAddress(response.data.streetAddress)
      setCity(response.data.city)
      setState(response.data.state)
      setZip(response.data.zip)
      setPhone(response.data.phone)
      setWebsite(response.data.url)
      setId(response.data.id)
      setSave(false)
    })
  }, [])

  const submit = () => {
    Client.updateRestaurantInfo(id, {
      name: restaurant,
      streetAddress: address,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      url: website,
    })
      .then(() => {
        setSave(true)
      })
      .catch(err => {
        Client.getRestaurantInfo().then(oldItem => {
          setRestaurant(oldItem.data.name)
          setAddress(oldItem.data.streetAddress)
          setCity(oldItem.data.city)
          setState(oldItem.data.state)
          setZip(oldItem.data.zip)
          setPhone(oldItem.data.phone)
          setWebsite(oldItem.data.url)
          setId(oldItem.data.id)
          setSave(false)
        })
        console.error(err)
      })
  }

  return (
    <FormContainer>
      <FormRow>
        <FormInput
          width="100%"
          name="restaurant"
          placeholder="restaurant name"
          value={restaurant}
          onChange={event => {
            setRestaurant(event.target.value)
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="100%"
          name="address"
          placeholder="street address"
          value={address}
          onChange={event => {
            setAddress(event.target.value)
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="48%"
          name="city"
          placeholder="city"
          value={city}
          onChange={event => {
            setCity(event.target.value)
          }}
        ></FormInput>
        <FormInput
          width="10%"
          name="state"
          placeholder="state"
          value={state}
          onChange={event => {
            setState(event.target.value)
          }}
        ></FormInput>
        <FormInput
          width="34%"
          name="zip"
          placeholder="zip code"
          value={zip}
          onChange={event => {
            setZip(event.target.value)
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="48%"
          name="phone"
          placeholder="phone number"
          value={phone}
          onChange={event => {
            setPhone(event.target.value)
          }}
        ></FormInput>
        <FormInput
          width="48%"
          name="website"
          placeholder="website (optional)"
          value={website}
          onChange={event => {
            setWebsite(event.target.value)
          }}
        ></FormInput>
      </FormRow>

      {!save ? (
        <SaveButton onClick={submit}>Save</SaveButton>
      ) : (
        <ChangeButton>Changes Saved</ChangeButton>
      )}
    </FormContainer>
  )
}

export default PopulateRestaurant