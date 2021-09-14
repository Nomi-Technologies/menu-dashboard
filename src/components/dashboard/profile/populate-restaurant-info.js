import React, { useState, useEffect } from "react";

import { ButtonPrimary, ButtonRow } from "../../basics";
import {
  FormInput,
  FormContainer,
  FormRow,
  FormSubtitle,
  ImagePreview,
} from "../../form";

import Client from "../../../util/client";
import { FileDrop } from "../../file-drop";

const PopulateRestaurant = () => {
  const [restaurant, setRestaurant] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const [id, setId] = useState();
  const [save, setSave] = useState(false);

  const [logo, setLogo] = useState();
  const [logoUrl, setLogoUrl] = useState();
  const [logoImageHash, setLogoImageHash] = useState(); // trigger reload
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    (async () => {
      const res = await Client.getRestaurantInfo();
      setRestaurant(res.data.name);
      setAddress(res.data.streetAddress);
      setCity(res.data.city);
      setState(res.data.state);
      setZip(res.data.zip);
      setPhone(res.data.phone);
      setWebsite(res.data.url);
      setId(res.data.id);
      setSave(false);
      try {
        const logo = await Client.getRestaurantLogo(res.data.id);
        setLogoUrl(logo.config.url);
      } catch (err) {}
    })();
  }, []);

  const submit = async () => {
    try {
      await Client.updateRestaurantInfo(id, {
        name: restaurant,
        streetAddress: address,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
        url: website,
      });
      await Client.upsertRestaurantLogo(id, logo);
      setSave(true);
      const res = await Client.getRestaurantLogo(id);
      setLogoUrl(res.config.url);
      setLogoImageHash(Date.now());
    } catch (err) {
      const oldItem = await Client.getRestaurantInfo();
      setRestaurant(oldItem.data.name);
      setAddress(oldItem.data.streetAddress);
      setCity(oldItem.data.city);
      setState(oldItem.data.state);
      setZip(oldItem.data.zip);
      setPhone(oldItem.data.phone);
      setWebsite(oldItem.data.url);
      setId(oldItem.data.id);
      setSave(false);
    }
  };

  const setFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onabort = () => console.error("File reading aborted");
    reader.onerror = () => setErrorMessage("An error occurred.");
    reader.onload = () => {
      const formData = new FormData();
      formData.append("file", file);
      setLogo(formData);
      setSave(false);
    };
  };

  const clearFile = () => {
    setLogo(null);
  };

  return (
    <FormContainer>
      <FormRow>
        <FormInput
          width="100%"
          name="restaurant"
          placeholder="restaurant name"
          value={restaurant}
          onChange={(event) => {
            setSave(false);
            setRestaurant(event.target.value);
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="100%"
          name="address"
          placeholder="street address"
          value={address}
          onChange={(event) => {
            setSave(false);
            setAddress(event.target.value);
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="48%"
          name="city"
          placeholder="city"
          value={city}
          onChange={(event) => {
            setSave(false);
            setCity(event.target.value);
          }}
        ></FormInput>
        <FormInput
          width="10%"
          name="state"
          placeholder="state"
          value={state}
          onChange={(event) => {
            setSave(false);
            setState(event.target.value);
          }}
        ></FormInput>
        <FormInput
          width="34%"
          name="zip"
          placeholder="zip code"
          value={zip}
          onChange={(event) => {
            setSave(false);
            setZip(event.target.value);
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormInput
          width="48%"
          name="phone"
          placeholder="phone number"
          value={phone}
          onChange={(event) => {
            setSave(false);
            setPhone(event.target.value);
          }}
        ></FormInput>
        <FormInput
          width="48%"
          name="website"
          placeholder="website (optional)"
          value={website}
          onChange={(event) => {
            setSave(false);
            setWebsite(event.target.value);
          }}
        ></FormInput>
      </FormRow>
      <FormRow>
        <FormSubtitle>Restaurant Logo</FormSubtitle>
        {logoUrl ? (
          <>
            <ImagePreview src={`${logoUrl}?${logoImageHash}`} />
            <p>Replace Image:</p>
          </>
        ) : null}
        <FileDrop
          acceptedFileTypes={[".png", ".jpg", ".jpeg"]}
          setFile={setFile}
          setErrorMessage={setErrorMessage}
          clearFile={clearFile}
        />
      </FormRow>
      <ButtonRow>
        <ButtonPrimary onClick={submit} save={save}>
          Save
        </ButtonPrimary>
      </ButtonRow>
      {/* ! save/setSave is unused */}
    </FormContainer>
  );
};

export default PopulateRestaurant;
