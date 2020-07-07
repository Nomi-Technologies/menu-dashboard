import React, { useState, useEffect } from "react"

import styled from "styled-components"
import { FormButton, ButtonRow } from "../buttons"
import {
  FormInput,
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormRow,
  NextButton,
  FormControls,
} from "../form"

import Client from "../../util/client"
import { navigate } from "@reach/router"

let StyleButton = styled.button`
  float: right;
  background-color: #f2994a;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  color: white;
  padding: 21px 75px;
  margin-top: 200px;
`

let SaveButton = props => (
  <StyleButton onClick={() => navigate(props.destination)}>Save</StyleButton>
)

const Populate = () => {
  const [first, setFirst] = useState(false)
  const [last, setLast] = useState(false)
  const [email, setEmail] = useState(false)
  const [phone, setPhone] = useState(false)

  const [personalInfo, displayPersonalInfo] = useState()

  useEffect(() => {
    Client.getPersonalInfo(3).then(response => {
      displayPersonalInfo(response.data)
      console.log("got personal data in populate.js")
      console.log(response.data)
    })
  }, [])

  //   const submit = () => {
  //     Client.updatePersonalInfo(item.id, { firstname: setFirst })
  //       .then(() => {
  //         setEditMode(false)
  //       })
  //       .catch(err => {
  //         Client.getPersonalInfo(item.id).then(oldItem => {
  //           setName(oldItem.name)
  //           setDescription(oldItem.description)
  //         })
  //         console.error(err)
  //       })
  //   }

  return (
    <FormContainer>
      <p>componenet populate is returning something...</p>
      <FormRow>
        {/* onSubmit={submit}> */}
        <FormInput width="48%" name="first-name" placeholder="first name">
          {first}
        </FormInput>
        <FormInput
          width="48%"
          name="last-name"
          placeholder="last name"
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="80%"
          name="email"
          placeholder="email address"
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="48%"
          name="phone"
          placeholder="phone number"
        ></FormInput>
      </FormRow>

      <SaveButton destination="" />
    </FormContainer>
  )
}
export default Populate
