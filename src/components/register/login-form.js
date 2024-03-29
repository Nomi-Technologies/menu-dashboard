import { Link, navigate } from "gatsby";
import React, { useState } from "react";

import styled from "styled-components";
import { ButtonPrimary, ButtonSecondary, ButtonRow, Button } from "../basics";
import { FormInput } from "../form";
import Client from "../../util/client";
import { saveUserToken } from "../../util/auth";
import useEventListener from "@use-it/event-listener";
import Navigation from "../../util/navigation";

const ForgotPassword = styled(Link)`
  color: rgba(242, 153, 74, 0.9);
  font-size: 18px;
  text-align: right;
  margin-bottom: 10px;
`;

const Container = styled.div`
  margin-top: 24px;
  display: flex;
  margin: 0 auto;
  width: 90%;
  flex-direction: column;
  max-width: 400px;

  input {
    border: none;
    background-color: #e1e7ec;
  }

  .error {
    color: red;
    padding: 0;
    margin: 0;
  }

  ${ButtonRow} {
    justify-content: space-between;

    ${Button} {
      margin-left: 0;
      width: 25%;
      text-align: center;
    }
  }
`;

const LoginForm = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loginError, setLoginError] = useState(false);

  const loginUser = () => {
    Client.login(email, password)
      .then((response) => {
        saveUserToken(response.data["token"]);
        setLoginError(false);
        Navigation.allMenus();
      })
      .catch((response) => {
        setLoginError(true);
      });
  };

  //press enter to login
  function handler({ key }) {
    if (key === "Enter") {
      loginUser();
    }
  }

  useEventListener("keydown", handler);
  return (
    <Container>
      <p className="error">
        {loginError ? "Could not log in with credentials provided." : ""}
      </p>
      <FormInput
        placeholder="email"
        name="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <FormInput
        placeholder="password"
        name="password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {/* <ForgotPassword>Forgot password?</ForgotPassword>   */}
      <ButtonRow>
        <ButtonPrimary style={{ textAlign: "center" }} onClick={loginUser}>
          Login
        </ButtonPrimary>
        <ButtonSecondary
          theme="light"
          onClick={() => navigate("/register/contact-info")}
        >
          Sign Up
        </ButtonSecondary>
      </ButtonRow>
    </Container>
  );
};

export default LoginForm;
