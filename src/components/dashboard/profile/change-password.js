import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { ButtonPrimary, ButtonRow } from "../../basics";
import { FormInput, FormContainer, FormRow, FormError } from "../../form";

import Client from "../../../util/client";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [save, setSave] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    setError("");
    if (formData.newPassword === formData.newPasswordConfirmation) {
      Client.updatePassword(formData.currentPassword, formData.newPassword)
        .then((_) => {
          setSave(true);
        })
        .catch((_) => {
          setError("Could not update password. Please try again later.");
        });
    } else {
      setError("Passwords do not match.");
    }
  };

  return (
    <FormContainer>
      {error ? <FormError>{error}</FormError> : ""}

      <FormRow>
        <FormInput
          width="60%"
          name="currentPassword"
          type="password"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={(event) => {
            setSave(false);
            setFormData({ ...formData, currentPassword: event.target.value });
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="60%"
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={(event) => {
            setSave(false);
            setFormData({ ...formData, newPassword: event.target.value });
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="60%"
          name="newPasswordConfirmation"
          type="password"
          placeholder="Confirm New Password"
          value={formData.newPasswordConfirmation}
          onChange={(event) => {
            setSave(false);
            setFormData({
              ...formData,
              newPasswordConfirmation: event.target.value,
            });
          }}
        ></FormInput>
      </FormRow>
      <ButtonRow>
        <ButtonPrimary onClick={submit} save={save}>
          Save
        </ButtonPrimary>
      </ButtonRow>
    </FormContainer>
  );
};

export default ChangePassword;
