import React, { useState, useEffect } from "react"

import styled from "styled-components"
import { FormInput, FormContainer, FormRow, SaveButton } from "../../form"

import Client from "../../../util/client"

const PopulateRestaurant = () => {
  const [restaurant, setRestaurant] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [phone, setPhone] = useState("")
  const [website, setWebsite] = useState("")

  const [id, setId] = useState()
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
            setSave(false)
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
            setSave(false)
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
            setSave(false)
            setCity(event.target.value)
          }}
        ></FormInput>
        <FormInput
          width="10%"
          name="state"
          placeholder="state"
          value={state}
          onChange={event => {
            setSave(false)
            setState(event.target.value)
          }}
        ></FormInput>
        <FormInput
          width="34%"
          name="zip"
          placeholder="zip code"
          value={zip}
          onChange={event => {
            setSave(false)
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
            setSave(false)
            setPhone(event.target.value)
          }}
        ></FormInput>
        <FormInput
          width="48%"
          name="website"
          placeholder="website (optional)"
          value={website}
          onChange={event => {
            setSave(false)
            setWebsite(event.target.value)
          }}
        ></FormInput>
      </FormRow>

      <SaveButton onClick={ submit } save={ save }/>
    </FormContainer>
  )
}

export default PopulateRestaurant
