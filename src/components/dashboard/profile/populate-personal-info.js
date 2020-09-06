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
  padding: 10px 75px;
  margin-top: 100px;
`

let ChangeButton = styled.div`
  float: right;
  background-color: #f2994a;
  font-size: 18px;
  color: #f2994a;
  padding: 10px 31px;
  margin-top: 100px;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid #f3a35c;
  box-sizing: border-box;
  border-radius: 8px;
`

const PopulatePersonal = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [id, setId] = useState("")
  const [save, setSave] = useState(false)

  useEffect(() => {
    Client.getPersonalInfo().then(response => {
      console.log(response.data)
      setFirstname(response.data.firstName)
      setLastname(response.data.lastName)
      setEmail(response.data.email)
      setPhone(response.data.phone)
      setSave(false)
    })
  }, [])

  const submit = () => {
    Client.updatePersonalInfo(id, {
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
            setFirstname(event.target.value)
          }}
        ></FormInput>
        <FormInput
          width="48%"
          name="last-name"
          placeholder="last name"
          value={lastname}
          onChange={event => {
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
            setPhone(event.target.value)
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

export default PopulatePersonal
