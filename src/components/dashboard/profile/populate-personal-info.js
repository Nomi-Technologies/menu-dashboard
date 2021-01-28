import React, { useState, useEffect } from "react"

import styled from "styled-components"
import { ButtonPrimary } from "../../basics"
import { FormInput, FormContainer, FormRow } from "../../form"

import Client from "../../../util/client"

const PopulatePersonal = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [save, setSave] = useState(false)

  useEffect(() => {
    Client.getPersonalInfo().then(response => {
      setFirstname(response.data.firstName)
      setLastname(response.data.lastName)
      setEmail(response.data.email)
      setPhone(response.data.phone)
      setSave(false)
    })
  }, [])

  const submit = () => {
    Client.updatePersonalInfo({
      firstName: firstname,
      lastName: lastname,
      email: email,
      phone: phone,
    })
      .then(() => {
        setSave(true)
      })
      .catch(err => {
        Client.getPersonalInfo().then(oldItem => {
          setFirstname(oldItem.data.firstname)
          setLastname(oldItem.data.lastname)
          setEmail(oldItem.data.email)
          setPhone(oldItem.data.phone)
          setSave(false)
        })
        console.error(err)
      })
  }

  return (
    <FormContainer>
      <FormRow>
        <FormInput
          width="48%"
          name="first-name"
          placeholder="first name"
          value={firstname}
          onChange={event => {
            setSave(false)
            setFirstname(event.target.value)
          }}
        ></FormInput>
        <FormInput
          width="48%"
          name="last-name"
          placeholder="last name"
          value={lastname}
          onChange={event => {
            setSave(false)
            setLastname(event.target.value)
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="80%"
          name="email"
          placeholder="email address"
          value={email}
          onChange={event => {
            setSave(false)
            setEmail(event.target.value)
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
      </FormRow>

      <ButtonPrimary onClick={ submit } save={ save }>Save</ButtonPrimary>
    </FormContainer>
  )
}

export default PopulatePersonal
